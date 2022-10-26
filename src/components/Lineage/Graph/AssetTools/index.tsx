import { Button, SimpleGrid } from '@mantine/core';
import { lineageViewsTypesMapping } from '@lfai/egeria-js-commons';

interface Props {
  selectedNode: any;
}

const hasTab = (type: string, tabName: string) => {
  if (Object.keys(lineageViewsTypesMapping).includes(type)) {
    return lineageViewsTypesMapping[type].includes(tabName);
  } else {
    return false;
  }
};

export function EgeriaAssetTools(props: Props) {
  const { selectedNode } = props;

  return (<>
    <SimpleGrid cols={4}>
      { hasTab(selectedNode.label, 'end-to-end') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/end-to-end` }>
          end-to-end
        </Button> }
      { hasTab(selectedNode.label, 'vertical-lineage') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/vertical-lineage` }>
          vertical-lineage
        </Button> }
      { hasTab(selectedNode.label, 'ultimate-source') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/ultimate-source` }>
          ultimate-source
        </Button> }
      { hasTab(selectedNode.label, 'ultimate-destination') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/ultimate-destination` }>
          ultimate-destination
        </Button> }
    </SimpleGrid>
  </>);
}
