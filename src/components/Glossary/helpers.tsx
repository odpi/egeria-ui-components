
const getGridOptionsGlossary = (columnDefs: any, columnMinWidth?: number) => {
  return {
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: columnMinWidth ? columnMinWidth : 120
    },

    columnDefs: [
      ...columnDefs
    ],

    onFirstDataRendered: (params: any) => {
      const allColumnIds: string[] = [];
      params.columnApi.getColumns()?.forEach((column: any) => {
        allColumnIds.push(column.getId());
      });
      params.columnApi.autoSizeColumns(allColumnIds, true);
    },
  };
}

export {
  getGridOptionsGlossary
}