import { ActionIcon, LoadingOverlay, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ListDetails } from 'tabler-icons-react';
import { glossaries } from '@lfai/egeria-js-commons';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.scss';
import { getGridOptionsGlossary } from './helpers';

interface Props {
  columnMinWidth?: number;
}

export function GlossaryCategoriesData (props: Props) {
  const { columnMinWidth } = props;
  const [glossaryCategoriesData, setGlossaryCategoriesData] = useState([]);
  const gridOptionsGlossaryCategoriesData = getGridOptionsGlossary([
    {
      field: 'displayName',
      filter: true,
      headerName: 'Category'
    },
    {
      field: 'status',
      filter: true,
      headerName: 'Status'
    },
    {
      headerName: '',
      sortable: false,
      cellRenderer: () => {
        return <ActionIcon><ListDetails /></ActionIcon>;
        // on click will be here to link to terms
        // should put relevant data in there depending on which one is clicked
      }
    },
  ], columnMinWidth);

  useEffect(() => {
    glossaries.getGlossaryCategories().then((response: any) => response.json()).then((data: any) => {
      setGlossaryCategoriesData(data.map((d: any) => {
        return {
          displayName: d.displayName,
          status: d.status
          /* when i click the button: i need to get data from the glossaryData it's attached to
          so i can get the relevant data (example: get all categories linked to the displayName of glossaryData)
          these should then show up in the category table/grid

          >> should it be showing 'no rows to show'  when not clicked on any button?
            > set a value of visibility to false until the data is requested then is true to show the data

          the category data retrieved here (?) should be related to clicked glossary
          do i put a filter?
          glossaries.filter(glossaryCategories => glossaryCategories.includes()).map(relevantData =>({}))
          or do i do something with return d.displayName / d.status where glossaryCategoriesData = glossaryData of pressed button
          orrrrr work with key/item id's to be used as input for the filter?


          */

        };
      }));
    })
  });

  return (
    <Paper shadow="xs" style={{height: '100%', position: 'relative'}}>
      <LoadingOverlay visible={!(glossaryCategoriesData.length > 0)} />
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptionsGlossaryCategoriesData}
                     rowData={glossaryCategoriesData} />
      </div>
    </Paper>
    );
  };