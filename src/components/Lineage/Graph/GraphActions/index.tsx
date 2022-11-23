import {
  ActionIcon 
} from '@mantine/core';

import {
  HappiGraphActions
} from '@lfai/happi-graph';

import {
  AiOutlinePrinter
} from 'react-icons/ai'

interface Props {
  rawData: any;
  printUri: string;
}

export function EgeriaLineageGraphActions (props: Props) {
  const { rawData, printUri } = props;

  return (
    <>
      <HappiGraphActions rawData={{...rawData}}/>
      <ActionIcon title="Print" variant='subtle' size={35} onClick={() => window.open(printUri)}>
        <AiOutlinePrinter size={25} />
      </ActionIcon> 
    </>
  );
}