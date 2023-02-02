import { Modal, LoadingOverlay, Tabs } from '@mantine/core';
import { egeriaFetch, authHeader, getAssetLineagePrintPath, LINEAGE_TYPES } from '@lfai/egeria-js-commons';

import {
  HappiGraph
} from '@lfai/happi-graph';

import '@lfai/happi-graph/src/components/HappiGraph/happi-graph.scss';

import './index.scss';

import { useEffect, useState } from 'react';
import { EgeriaSelectedNode } from './SelectedNode';

import { EgeriaLineageGraphActions } from './GraphActions';
import { EgeriaCantDisplay, LineageTypeNotAvailable } from './CantDisplay';
import { hasTab } from './AssetTools';
import { useNavigate } from 'react-router-dom';

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
  return `/api/lineage/entities/${guid}/${lineageType}?includeProcesses=true`;
};

export function EgeriaLineageGraph(props: Props) {
  const {
    guid,
    lineageType,
    navigateTo
  } = props;

  const initialData: IGraphData = {nodes: [], edges: []};
  const navigate = useNavigate();

  const [rawData, setRawData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState(undefined);
  const [selectedNodeGroup, setSelectedNodeGroup] = useState(String);

  // TODO: extract URL to URL Map
  const uri = (lineageType: any) => `/api/lineage/entities/${guid}/${lineageType}?includeProcesses=true`;

  const printUri = getAssetLineagePrintPath(guid, lineageType);

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', { ...authHeader() }, {});
    if (res) {
      const data = await res.json();

      setRawData(data);
      setSelectedNodeGroup(data.nodes.find((d: any) => d.id == guid).group);
    } else {
      setRawData({...initialData});
    }

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

    if (!Object.values(LINEAGE_TYPES).includes(lineageType)) {
      const assetDetailsPath = `/assets/${guid}/details`;
      navigate(assetDetailsPath);
      return;
    }

    setLoading(true);

    fetchData(uri(lineageType));
  }, []);

  return (
    <div className="egeria-lineage">
      {loading && <div style={{ height: '100%', position: 'relative' }}><LoadingOverlay visible /></div>}

      {!loading && (!hasTab(selectedNodeGroup, lineageType)) && <LineageTypeNotAvailable lineageType={lineageType} />}

      {!loading && hasTab(selectedNodeGroup, lineageType) && <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
          centered
          size="50%"
        >
          <EgeriaSelectedNode selectedNode={selectedNodeData} />
        </Modal>

        <Tabs defaultValue={LINEAGE_TYPES.END_TO_END}
          keepMounted={false}
          value={lineageType}
          onTabChange={(value) => onTabChange(value)}
          style={{height: '100%'}}>
          <Tabs.List grow>
            {hasTab(selectedNodeGroup, LINEAGE_TYPES.END_TO_END) &&
              <Tabs.Tab value={LINEAGE_TYPES.END_TO_END}>{LINEAGE_TYPES.END_TO_END}</Tabs.Tab>}
            {hasTab(selectedNodeGroup, LINEAGE_TYPES.VERTICAL_LINEAGE) &&
              <Tabs.Tab value={LINEAGE_TYPES.VERTICAL_LINEAGE}>{LINEAGE_TYPES.VERTICAL_LINEAGE}</Tabs.Tab>}
            {hasTab(selectedNodeGroup, LINEAGE_TYPES.ULTIMATE_SOURCE) &&
              <Tabs.Tab value={LINEAGE_TYPES.ULTIMATE_SOURCE}>{LINEAGE_TYPES.ULTIMATE_SOURCE}</Tabs.Tab>}
            {hasTab(selectedNodeGroup, LINEAGE_TYPES.ULTIMATE_DESTINATION) &&
              <Tabs.Tab value={LINEAGE_TYPES.ULTIMATE_DESTINATION}>{LINEAGE_TYPES.ULTIMATE_DESTINATION}</Tabs.Tab>}
          </Tabs.List>

          <Tabs.Panel value={LINEAGE_TYPES.END_TO_END}>
            {!loading && (rawData.nodes.length === 0) && <EgeriaCantDisplay />}
            {!loading && (rawData.nodes.length > 0) && <HappiGraph rawData={{...rawData}}
              algorithm={'VISJS'}
              debug={false}
              graphDirection={'HORIZONTAL'}
              selectedNodeId={guid}
              actions={<EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri} />}
              onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} />}
          </Tabs.Panel>

          <Tabs.Panel value={LINEAGE_TYPES.VERTICAL_LINEAGE}>
            {!loading && (rawData.nodes.length === 0) && <EgeriaCantDisplay />}
            {!loading && (rawData.nodes.length > 0) && <HappiGraph rawData={{...rawData}}
              algorithm={'ELK'}
              debug={false}
              graphDirection={'VERTICAL'}
              selectedNodeId={guid}
              actions={<EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri} />}
              onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} />}
          </Tabs.Panel>

          <Tabs.Panel value={LINEAGE_TYPES.ULTIMATE_SOURCE}>
            {!loading && (rawData.nodes.length === 0) && <EgeriaCantDisplay />}
            {!loading && (rawData.nodes.length > 0) && <HappiGraph rawData={{...rawData}}
              algorithm={'VISJS'}
              debug={false}
              graphDirection={'HORIZONTAL'}
              selectedNodeId={guid}
              actions={<EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri} />}
              onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} />}
          </Tabs.Panel>

          <Tabs.Panel value={LINEAGE_TYPES.ULTIMATE_DESTINATION}>
            {!loading && (rawData.nodes.length === 0) && <EgeriaCantDisplay />}
            {!loading && (rawData.nodes.length > 0) && <HappiGraph rawData={{...rawData}}
              algorithm={'VISJS'}
              debug={false}
              graphDirection={'HORIZONTAL'}
              selectedNodeId={guid}
              actions={<EgeriaLineageGraphActions rawData={{...rawData}} printUri={printUri} />}
              onNodeClick={(d: any) => { setSelectedNodeData(d); setOpened(true); }} />}
          </Tabs.Panel>
        </Tabs>
      </>}
    </div>
  );
}