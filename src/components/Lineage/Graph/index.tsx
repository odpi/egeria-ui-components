import { Modal, LoadingOverlay, Tabs } from '@mantine/core';
import { egeriaFetch, authHeader } from '@lfai/egeria-js-commons';

import {
  HappiGraph
} from '@lfai/happi-graph';

import '@lfai/happi-graph/src/components/HappiGraph/happi-graph.scss';

import './index.scss';

import { useEffect, useState } from 'react';
import { EgeriaSelectedNode } from './SelectedNode';

import { EgeriaLineageGraphActions } from './GraphActions';

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
  guid: any;
  lineageType: any;
  navigateTo: any;
}

export const getApiDataUrl = (guid: any, lineageType: any) => {
  return `/api/lineage/entities/${ guid }/${ lineageType }?includeProcesses=true`;
};

export function EgeriaLineageGraph(props: Props) {
  const {
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
  const uri = (lineageType: any) => `/api/lineage/entities/${ guid }/${ lineageType }?includeProcesses=true`;

  const printUri = `/asset-lineage/${ guid }/${ lineageType }/print`;

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', { ...authHeader() }, {});
    const data = await res.json();

    setRawData(data);
    setLoading(false);
  };

  const onTabChange = async (value: any) => {
    setLoading(true);

    await fetchData(uri(value));

    // TODO: extract URL to URL Map
    const path = `/asset-lineage/${guid}/${value}`;

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

      <Tabs defaultValue={ LINEAGE.END_TO_END }
            keepMounted={false}
            value={lineageType}
            onTabChange={(value) => onTabChange(value)}
            style={{height: '100%'}}>
        <Tabs.List grow>
          <Tabs.Tab value={ LINEAGE.END_TO_END }>{ LINEAGE.END_TO_END }</Tabs.Tab>
          <Tabs.Tab value={ LINEAGE.VERTICAL_LINEAGE }>{ LINEAGE.VERTICAL_LINEAGE }</Tabs.Tab>
          <Tabs.Tab value={ LINEAGE.ULTIMATE_SOURCE }>{ LINEAGE.ULTIMATE_SOURCE }</Tabs.Tab>
          <Tabs.Tab value={ LINEAGE.ULTIMATE_DESTINATION }>{ LINEAGE.ULTIMATE_DESTINATION }</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={ LINEAGE.END_TO_END }>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                        algorithm={'VISJS'}
                        debug={false}
                        graphDirection={'HORIZONTAL'}
                        selectedNodeId={guid}
                        actions={ <EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri}/> }
                        onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
        </Tabs.Panel>
        <Tabs.Panel value={ LINEAGE.VERTICAL_LINEAGE }>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={'ELK'}
                          debug={false}
                          graphDirection={'VERTICAL'}
                          selectedNodeId={guid}
                          actions={ <EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri}/> }
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
        </Tabs.Panel>
        <Tabs.Panel value={ LINEAGE.ULTIMATE_SOURCE }>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={'VISJS'}
                          debug={false}
                          graphDirection={'HORIZONTAL'}
                          selectedNodeId={guid}
                          actions={ <EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri}/> }
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
        </Tabs.Panel>
        <Tabs.Panel value={ LINEAGE.ULTIMATE_DESTINATION }>
          { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
          { !loading && <HappiGraph rawData={{...rawData}}
                          algorithm={'VISJS'}
                          debug={false}
                          graphDirection={'HORIZONTAL'}
                          selectedNodeId={guid}
                          actions={ <EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri}/> }
                          onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} /> }
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
