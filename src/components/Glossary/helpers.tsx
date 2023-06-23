
const getGridOptionsGlossary = (columnDefs: any, onUserSelect: any) => {

  return {
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
      suppressMovable: true,
      suppressSizeToFit: false,
    },
      suppressRowDeselection: true,

    columnDefs: [
      ...columnDefs
    ],

    onSelectionChanged: onSelectionChanged,

    onGridReady: (params: any) => {
      params.api.sizeColumnsToFit()

    window.addEventListener('resize', function () {
        params.api.sizeColumnsToFit();
    });
  },

    onFirstDataRendered: (params: any) => {
      params.api.sizeColumnsToFit()
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