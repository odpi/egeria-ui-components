import { ActionIcon, LoadingOverlay, Paper } from '@mantine/core';
import { ListDetails } from 'tabler-icons-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.scss';
import { getGridOptionsGlossary } from './helpers';
import { GridOptions } from 'ag-grid-community';

interface Props {
  data: any;
  isLoading: boolean;
  onUserSelect: any;
}

export function GlossaryTermsData (props: Props) {
  const { data, isLoading, onUserSelect } = props;
  const gridOptionsGlossaryTermsData: GridOptions<any> = getGridOptionsGlossary([
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
  ], onUserSelect);

  return (
    <Paper shadow="xs" style={{height: '100%', position: 'relative'}}>
      <LoadingOverlay visible={isLoading} />
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptionsGlossaryTermsData}
                     rowSelection='single'
                     rowData={data} />
      </div>
    </Paper>
    );
}
