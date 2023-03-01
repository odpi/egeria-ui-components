import {
  ActionIcon, Tooltip
} from '@mantine/core';

import {
  HappiGraphActions
} from '@lfai/happi-graph';

import {
  AiOutlinePrinter
} from 'react-icons/ai';
import { RequirePermissions } from '@lfai/egeria-ui-core';
import { VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';

import '@lfai/happi-graph/src/components/HappiGraph/happi-graph.scss';
import '../index.scss';
import { ToggleLeft, ToggleRight } from 'tabler-icons-react';

interface Props {
  rawData: any;
  printUri: string;
  selectedNodeGroup: any;
  includeProcess: boolean;
  lineageType: any;
  onSwitchChange: any;
}

export function EgeriaLineageGraphActions (props: Props) {
  const { rawData,
          printUri,
          selectedNodeGroup,
          includeProcess,
          lineageType,
          onSwitchChange
        } = props;

  return (
    <>
      <HappiGraphActions rawData={{...rawData}}/>
      <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_LINEAGE_PRINT} element={ <Tooltip label="Print" position="right">
          <ActionIcon variant="subtle" size={35} onClick={() => window.open(printUri)}>
            <AiOutlinePrinter size={25}/>
          </ActionIcon>
        </Tooltip>} />
      { selectedNodeGroup !== 'Process' && <Tooltip label="Processes" position="right">
          <ActionIcon variant="subtle" size={35} onClick={() => onSwitchChange(lineageType, !includeProcess)}>
            { includeProcess ? <ToggleRight size={25} color="var(--happi-graph-primary-color)"/> : <ToggleLeft size={25} /> }
          </ActionIcon>
        </Tooltip> }
   </>

  );
}
