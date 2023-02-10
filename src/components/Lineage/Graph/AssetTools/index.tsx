import { hasTab } from '@lfai/egeria-js-commons';
import { Button, SimpleGrid } from '@mantine/core';

interface Props {
  selectedNode: any;
}

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
