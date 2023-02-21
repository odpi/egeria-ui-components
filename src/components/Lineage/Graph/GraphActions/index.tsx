import {
  ActionIcon
} from '@mantine/core';

import {
  HappiGraphActions
} from '@lfai/happi-graph';

import {
  AiOutlinePrinter
} from 'react-icons/ai'
import { RequirePermissions } from '@lfai/egeria-ui-core';
import { VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';

interface Props {
  rawData: any;
  printUri: string;
}

export function EgeriaLineageGraphActions (props: Props) {
  const { rawData, printUri } = props;

  return (
    <>
      <HappiGraphActions rawData={{...rawData}}/>
      <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_LINEAGE_PRINT} element={<ActionIcon title="Print" variant='subtle' size={35} onClick={() => window.open(printUri)}>
        <AiOutlinePrinter size={25}/>
      </ActionIcon>} />
    </>
  );
}