import { Tabs } from '@mantine/core';
import { useState } from 'react';

import {
  HappiGraph,
  HappiGraphActions
} from 'happi-graph';

import 'happi-graph/src/components/HappiGraph/happi-graph.scss';


import './index.scss';

enum LINEAGE {
  END_TO_END = 'end-to-end',
  VERTICAL_LINEAGE = 'vertical-lineage',
  ULTIMATE_SOURCE = 'ultimate-source',
  ULTIMATE_DESTINATION = 'ultimate-destination'
}

interface Props {
  lineageType: string;
  rawData: any;
  selectedNodeId: string;
}

export function EgeriaLineageGraph(props: Props) {
  const { lineageType, rawData, selectedNodeId } = props;

  const indexOfLineage = Object.values(LINEAGE).indexOf(lineageType as LINEAGE)

  const [activeTab, setActiveTab] = useState(indexOfLineage);

  return (
    <div className="egeria-lineage">
      <Tabs grow style={{height: '100%'}} active={activeTab} onTabChange={(tabIndex: number) => { setActiveTab(tabIndex) }}>
        <Tabs.Tab label={LINEAGE.END_TO_END}>
          <HappiGraph rawData={{...rawData}}
                      algorithm={"VISJS"}
                      debug={false}
                      graphDirection={"HORIZONTAL"}
                      selectedNodeId={selectedNodeId}
                      actions={<HappiGraphActions rawData={{...rawData}}/>} />
        </Tabs.Tab>
        <Tabs.Tab label={LINEAGE.VERTICAL_LINEAGE}>
          <HappiGraph rawData={{...rawData}}
                        algorithm={"ELK"}
                        debug={false}
                        graphDirection={"VERTICAL"}
                        selectedNodeId={selectedNodeId}
                        actions={<HappiGraphActions rawData={{...rawData}}/>} />
        </Tabs.Tab>
        <Tabs.Tab label={LINEAGE.ULTIMATE_SOURCE}>
          <HappiGraph rawData={{...rawData}}
                        algorithm={"VISJS"}
                        debug={false}
                        graphDirection={"HORIZONTAL"}
                        selectedNodeId={selectedNodeId}
                        actions={<HappiGraphActions rawData={{...rawData}}/>} />
        </Tabs.Tab>
        <Tabs.Tab label={LINEAGE.ULTIMATE_DESTINATION}>
          <HappiGraph rawData={{...rawData}}
                        algorithm={"VISJS"}
                        debug={false}
                        graphDirection={"HORIZONTAL"}
                        selectedNodeId={selectedNodeId}
                        actions={<HappiGraphActions rawData={{...rawData}}/>} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}
