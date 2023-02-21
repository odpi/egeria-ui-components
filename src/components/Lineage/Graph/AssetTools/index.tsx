import { hasComponent, hasTab, VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';
import { RequirePermissions } from '@lfai/egeria-ui-core';
import { Button, SimpleGrid } from '@mantine/core';

interface Props {
  selectedNode: any;
}

export function EgeriaAssetTools(props: Props) {
  const { selectedNode } = props;

  return (<>
    <SimpleGrid cols={4}>
      <RequirePermissions component={VISIBLE_COMPONENTS.END_TO_END} element={ hasTab(selectedNode.label, 'end-to-end') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/end-to-end` }>
          end-to-end
        </Button>} />
      <RequirePermissions component={VISIBLE_COMPONENTS.VERTICAL_LINEAGE} element={ hasTab(selectedNode.label, 'vertical-lineage') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/vertical-lineage` }>
          vertical-lineage
        </Button> } />
      <RequirePermissions component={VISIBLE_COMPONENTS.ULTIMATE_SOURCE} element={ hasTab(selectedNode.label, 'ultimate-source') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/ultimate-source` }>
          ultimate-source
        </Button> } />
      <RequirePermissions component={VISIBLE_COMPONENTS.ULTIMATE_DESTINATION} element={ hasTab(selectedNode.label, 'ultimate-destination') && <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/ultimate-destination` }>
          ultimate-destination
        </Button> } />
    </SimpleGrid>
  </>);
}
