import { Button, Grid } from '@mantine/core';
import { lineageViewsTypesMapping } from 'egeria-js-commons';

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
    <Grid grow gutter="xs">
      { hasTab(selectedNode.label, 'end-to-end') && <Grid.Col span={3}>
        <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/end-to-end` }>
          end-to-end
        </Button>
      </Grid.Col> }
      { hasTab(selectedNode.label, 'vertical-lineage') && <Grid.Col span={3}>
        <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/vertical-lineage` }>
          vertical-lineage
        </Button>
      </Grid.Col> }
      { hasTab(selectedNode.label, 'ultimate-source') && <Grid.Col span={3}>
        <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/ultimate-source` }>
          ultimate-source
        </Button>
      </Grid.Col> }
      { hasTab(selectedNode.label, 'ultimate-destination') && <Grid.Col span={3}>
        <Button component="a"
                target="_blank"
                href={ `/asset-lineage/${ selectedNode.id }/ultimate-destination` }>
          ultimate-destination
        </Button>
      </Grid.Col> }
    </Grid>
  </>);
}
