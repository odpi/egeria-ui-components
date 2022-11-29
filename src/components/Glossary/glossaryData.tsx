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
  onUserSelect: any;
}

export function GlossaryData (props: Props) {
  const { columnMinWidth, onUserSelect } = props;
  const [glossaryData, setGlossaryData] = useState([]);
  const gridOptionsGlossaryData = getGridOptionsGlossary([
    {
      field: 'displayName',
      filter: true,
      headerName: 'Glossary',
      lockPosition: 'left',
    },
    {
      field: 'status',
      filter: true,
      headerName: 'Status',
      suppressMovable: true
    },
    {
      headerName: 'Details',
      sortable: false,
      lockPosition: 'right',
      cellRenderer: (object: any) => {
        return <ActionIcon onClick={() => onUserSelect(object.data)}><ListDetails /></ActionIcon>;
      }
    },
  ], columnMinWidth);

  useEffect(() => {
    glossaries.getAll().then((response: any) => response.json()).then((data: any) => {
      setGlossaryData(data.map((d: any) => {
        return {
          displayName: d.displayName,
          status: d.status
        }
      }));
    });
  });

  return (
    <Paper shadow="xs" style={{height: '100%', position: 'relative'}}>
      <LoadingOverlay visible={!(glossaryData.length > 0)} />
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptionsGlossaryData}
                     rowData={glossaryData} />
      </div>
    </Paper>
    );
  };