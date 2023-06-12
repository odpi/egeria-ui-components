
const getGridOptionsGlossary = (columnDefs: any, onUserSelect: any) => {
  const _columnMinWidth = 50;

  return {
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
      suppressMovable: true,
    },
      suppressRowDeselection: true,

    columnDefs: [
      ...columnDefs
    ],

    onSelectionChanged: onSelectionChanged,

    onGridReady: (params: any) => {
      params.api ? params.api.sizeColumnsToFit({
        defaultMinWidth: _columnMinWidth
      }) : 0;
    },

    onFirstDataRendered: (params: any) => {
      const allColumnIds: string[] = [];
      params.columnApi.getColumns()?.forEach((column: any) => {
        allColumnIds.push(column.getId());
      });
      params.columnApi.autoSizeColumns(allColumnIds, true);
    },
  };

function onSelectionChanged (params: any) {
  const selectedRows = params.api.getSelectedRows();
  onUserSelect(selectedRows[0].guid);
  }
}

export {
  getGridOptionsGlossary
}