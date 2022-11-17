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

export function GlossaryTermsData (props: Props) {
  const { columnMinWidth } = props;
  const [glossaryTermsData, setGlossaryTermsData] = useState([])
  const gridOptionsGlossaryTermsData = getGridOptionsGlossary([
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
    glossaries.getGlossaryTerms().then((response: any) => response.json()).then((data: any) => {
      setGlossaryTermsData(data.map((d: any) => {
        return {
          displayName: d.displayName,
          status: d.status
        };
      }));
    })
  });

  return (
    <Paper shadow="xs" style={{height: '100%', position: 'relative'}}>
      <LoadingOverlay visible={!(glossaryTermsData.length > 0)} />
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptionsGlossaryTermsData}
                     rowData={glossaryTermsData} />
      </div>
    </Paper>
    );
  };