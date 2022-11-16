import { Grid } from '@mantine/core';

import { GlossaryCategoriesData } from './glossaryCategoriesData'
import { GlossaryData } from './glossaryData'
import { GlossaryTermsData } from './glossaryTermsData'

interface Props {
  columnMinWidth?: number;
}



export function EgeriaGlossary(props: Props) {
  const { columnMinWidth } = props;


  // const gridOptionsGlossary = declare the width here maybe?

  return (
    <Grid grow gutter="xs" style={{height:'100%'}} className="egeria-glossary" >
      <Grid.Col span={4}>
        {<GlossaryData columnMinWidth={columnMinWidth}/>}
      </Grid.Col>
      <Grid.Col span={4}>
        {<GlossaryCategoriesData columnMinWidth={columnMinWidth}/>}
      </Grid.Col>
      <Grid.Col span={4}>
        {<GlossaryTermsData columnMinWidth={columnMinWidth}/>}
      </Grid.Col>
    </Grid>
  );
}
