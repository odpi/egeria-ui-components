
const getGridOptionsGlossary = (columnDefs: any, columnMinWidth?: number) => {
  const _columnMinWidth = columnMinWidth ? columnMinWidth : 120;

  return {
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: _columnMinWidth,
      suppressMovable: true,
      rowSelection: 'single',
    },

    columnDefs: [
      ...columnDefs
    ],

    onSelectionChanged: onSelectionChanged,

    onGridReady: (params: any) => {
        params.api!.sizeColumnsToFit({
            defaultMinWidth: _columnMinWidth
        });
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
    const selectedRows = params.api!.getSelectedRows();
    (document.querySelector('#selectedRows') as any).innerHTML =
      selectedRows.length === 1 ? selectedRows[0].any : '';
  }
}

export {
  getGridOptionsGlossary
}