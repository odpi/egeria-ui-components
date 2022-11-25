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
      headerName: 'Glossary'
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
      }
    },
  ], columnMinWidth);

  useEffect(() => {
    glossaries.getGlossaryCategories().then((response: any) => response.json()).then((data: any) => {
      setGlossaryCategoriesData(data.map((d: any) => {
        return {
          displayName: d.displayName,
          status: d.status
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