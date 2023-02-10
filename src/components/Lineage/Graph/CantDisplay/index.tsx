import { Text } from '@mantine/core';
import { ArticleOff } from 'tabler-icons-react';

interface LineageTypeNotAvailableProps {
  lineageType: any;
}

export function EgeriaCantDisplay() {
  return <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <ArticleOff size={48} strokeWidth={2} />

    <Text>Data can&apos;t be loaded or it wasn&apos;t provided.</Text>
  </div>;
}

export function LineageTypeNotAvailable(props: LineageTypeNotAvailableProps) {
  const { lineageType } = props;
  return <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <ArticleOff size={48} strokeWidth={2} />

    <Text>This asset doesn&apos;t have {lineageType} graph!</Text>
  </div>;
}
