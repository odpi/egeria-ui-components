import { Tabs } from '@mantine/core';
import { useState } from 'react';

enum LINEAGE {
  END_TO_END = 'end-to-end',
  VERTICAL_LINEAGE = 'vertical-lineage',
  ULTIMATE_SOURCE = 'ultimate-source',
  ULTIMATE_DESTINATION = 'ultimate-destination'
}

interface Props {
  lineage: string;
}

export function EgeriaLineage(props: Props) {
  const { lineage } = props;

  const indexOfLineage = Object.values(LINEAGE).indexOf(lineage as LINEAGE)

  const [activeTab, setActiveTab] = useState(indexOfLineage);

  return (
    <>
      <Tabs grow active={activeTab} onTabChange={(tabIndex: number) => { setActiveTab(tabIndex) }}>
        <Tabs.Tab label={LINEAGE.END_TO_END}>

        </Tabs.Tab>
        <Tabs.Tab label={LINEAGE.VERTICAL_LINEAGE} disabled>

        </Tabs.Tab>
        <Tabs.Tab label={LINEAGE.ULTIMATE_SOURCE}>

        </Tabs.Tab>
        <Tabs.Tab label={LINEAGE.ULTIMATE_DESTINATION}>

        </Tabs.Tab>
      </Tabs>
    </>
  );
}
