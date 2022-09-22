import { Modal, LoadingOverlay, Tabs } from '@mantine/core';
import { egeriaFetch, authHeader } from 'egeria-js-commons';

import {
  HappiGraph,
  HappiGraphActions
} from 'happi-graph';

import 'happi-graph/src/components/HappiGraph/happi-graph.scss';

import './index.scss';

import { useEffect, useState } from 'react';
import { EgeriaSelectedNode } from './SelectedNode';

enum LINEAGE {
  END_TO_END = 'end-to-end',
  VERTICAL_LINEAGE = 'vertical-lineage',
  ULTIMATE_SOURCE = 'ultimate-source',
  ULTIMATE_DESTINATION = 'ultimate-destination'
}

interface IGraphData {
  nodes: Array<any>;
  edges: Array<any>;
}

interface Props {
  apiUrl: any;
  guid: any;
  lineageType: any;
  navigateTo: Function;
}

const getIndexOfLineage = (lineageType?: string) => {
  return Object.values(LINEAGE).indexOf(lineageType as LINEAGE);
};

const getLineageOfIndex = (lineageIndex: number) => {
  return Object.values(LINEAGE)[lineageIndex];
}

export function EgeriaLineageGraph(props: Props) {
  const {
    apiUrl,
    guid,
    lineageType,
    navigateTo
  } = props;

  const initialData: IGraphData = {nodes: [], edges: []};

  const [rawData, setRawData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState(undefined);

  // TODO: extract URL to URL Map
  const uri = (lineageType: any) => `${apiUrl}/api/lineage/entities/${ guid }/${ lineageType }?includeProcesses=true`;

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', { ...authHeader() }, {});
    const data = await res.json();

    setRawData(data);
    setLoading(false);
  };

  const onTabChange = async (value: number) => {
    setLoading(true);

    await fetchData(uri(getLineageOfIndex(value)));

    // TODO: extract URL to URL Map
    const path = `/asset-lineage/${guid}/${getLineageOfIndex(value)}`;

    await navigateTo(path);
  };

  useEffect(() => {
    setLoading(true);

    fetchData(uri(lineageType));
  }, []);

  return (
    <div className="egeria-lineage">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        centered
        size="50%"
      >
        <EgeriaSelectedNode selectedNode={selectedNodeData} />
      </Modal>

      <Tabs grow
            style={{height: '100%'}}
            initialTab={getIndexOfLineage(lineageType)}
            active={getIndexOfLineage(lineageType)}
            onTabChange={(value) => onTabChange(value)}>
          <Tabs.Tab label={LINEAGE.END_TO_END}>
            { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
            { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={"VISJS"}
                          debug={false}
                          graphDirection={"HORIZONTAL"}
                          selectedNodeId={guid}
                          actions={<HappiGraphActions rawData={{...rawData}}/>}
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
          </Tabs.Tab>
          <Tabs.Tab label={LINEAGE.VERTICAL_LINEAGE}>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={"ELK"}
                          debug={false}
                          graphDirection={"VERTICAL"}
                          selectedNodeId={guid}
                          actions={<HappiGraphActions rawData={{...rawData}}/>}
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
          </Tabs.Tab>
          <Tabs.Tab label={LINEAGE.ULTIMATE_SOURCE}>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={"VISJS"}
                          debug={false}
                          graphDirection={"HORIZONTAL"}
                          selectedNodeId={guid}
                          actions={<HappiGraphActions rawData={{...rawData}}/>}
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
          </Tabs.Tab>
          <Tabs.Tab label={LINEAGE.ULTIMATE_DESTINATION}>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={"VISJS"}
                          debug={false}
                          graphDirection={"HORIZONTAL"}
                          selectedNodeId={guid}
                          actions={<HappiGraphActions rawData={{...rawData}}/>}
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
          </Tabs.Tab>
      </Tabs>
    </div>
  );
}
