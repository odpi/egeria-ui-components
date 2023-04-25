import { ActionIcon, LoadingOverlay, Paper } from '@mantine/core';
import { ListDetails } from 'tabler-icons-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.scss';
import { getGridOptionsGlossary } from './helpers';
import { GridOptions } from 'ag-grid-community';

interface Props {
  columnMinWidth?: number;
  data: any;
  isLoading: boolean;
  onUserSelect: any;
}

export function GlossaryCategoriesData (props: Props) {
  const { columnMinWidth, data, isLoading, onUserSelect } = props;
  const gridOptionsGlossaryCategoriesData: GridOptions<any> = getGridOptionsGlossary([
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
      headerName: 'Details',
      sortable: false,
      cellRenderer: (object: any) => {
        return <ActionIcon onClick={() => onUserSelect(object.data)}><ListDetails /></ActionIcon>;
      }
    },
  ], columnMinWidth);

  return (
    <Paper shadow="xs" style={{height: '100%', position: 'relative'}}>
      <LoadingOverlay visible={isLoading} />
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptionsGlossaryCategoriesData}
                     rowData={data} />
      </div>
    </Paper>
    );
}
