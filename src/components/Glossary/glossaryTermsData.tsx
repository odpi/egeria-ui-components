import { ActionIcon, LoadingOverlay, Paper } from '@mantine/core';
import { ListDetails } from 'tabler-icons-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.scss';
import { getGridOptionsGlossary } from './helpers';

interface Props {
  columnMinWidth?: number;
  data: any;
  isLoading: boolean;
  onUserSelect: any;
}

export function GlossaryTermsData (props: Props) {
  const { columnMinWidth, data, isLoading} = props;
  const gridOptionsGlossaryTermsData = getGridOptionsGlossary([
    {
      field: 'displayName',
      filter: true,
      headerName: 'Terms'
    },
    {
      field: 'status',
      filter: true,
      headerName: 'Status'
    },
    {
      headerName: 'Details',
      sortable: false,
      cellRenderer: (object:any) => {
        return <a href={`/assets/${object.data.guid}/details`} target="_blank" rel="noreferrer">
                        <ActionIcon><ListDetails /></ActionIcon>
               </a>;
      }
    },
  ], columnMinWidth);

  return (
    <Paper shadow="xs" style={{height: '100%', position: 'relative'}}>
      <LoadingOverlay visible={isLoading} />
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptionsGlossaryTermsData}
                     rowData={data} />
      </div>
    </Paper>
    );
}
