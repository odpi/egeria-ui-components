import { Grid } from '@mantine/core';
import { GlossaryCategoriesData } from './glossaryCategoriesData';
import { GlossaryData } from './glossaryData';
import { GlossaryTermsData } from './glossaryTermsData';
import { useState } from 'react';
import { glossaries } from '@lfai/egeria-js-commons';

interface Props {
  columnMinWidth?: number;
}

export function EgeriaGlossary (props: Props) {
  const { columnMinWidth } = props;
  const [categories, setCategories] = useState([]);
  const [categoryIsLoading, setCategoryIsLoading] = useState(false);
  const [terms, setTerms] = useState([]);
  const [termIsLoading, setTermIsLoading] = useState(false);

  const onUserSelectGlossaryData = (id: string) => {
    console.log('onUserSelectGlossaryData', id);
    setCategoryIsLoading(true);

    glossaries.getGlossaryCategories().then((response: any) => response.json()).then((data: any) => {
        setCategories(data.map((d: any) => {
            return {
                displayName: d.displayName,
                status: d.status
            };
        }));
    setCategoryIsLoading(false);
    });
  };


  const onUserSelectTermData = (id: string) => {
    console.log('onUserSelectTermData', id);
    setTermIsLoading(true);

    glossaries.getGlossaryTerms().then((response: any) => response.json()).then((data: any) => {
        setTerms(data.map((d: any) => {
            return {
                displayName: d.displayName,
                status: d.status
            };
        }));
        setTermIsLoading(false);
    });
  };

  return (
    <Grid grow gutter="xs" style={{height:'100%'}} className="egeria-glossary" >
      <Grid.Col span={4}>
        <GlossaryData columnMinWidth={columnMinWidth}
                      onUserSelect={(id: string) => onUserSelectGlossaryData(id)}/>
      </Grid.Col>
      <Grid.Col span={4}>
        <GlossaryCategoriesData columnMinWidth={columnMinWidth}
                                data={categories}
                                isLoading={categoryIsLoading}
                                onUserSelect={(id: string) => onUserSelectTermData(id)}/>
      </Grid.Col>
      <Grid.Col span={4}>
        <GlossaryTermsData columnMinWidth={columnMinWidth}
                           data={terms}
                           isLoading={termIsLoading}/>
      </Grid.Col>
    </Grid>
  );
}
