import { useState, useEffect } from 'react';
import {Checkbox, TextInput, MultiSelect, Button, LoadingOverlay} from '@mantine/core';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import QualifiedName from './qualified-name';
import DisplayNameCellRenderer from './displayNameCellRenderer';

import {
  ASSET_CATALOG_PATH,
  PAGE_SIZE_INCREASE_VALUE,
  QUERY_MIN_LENGTH,
  formData,
  getQueryParams,
  getQueryParamsPath,
  fetchTypes,
  fetchRawData,
  isStringLonger,
  isArrayEmpty
} from '@lfai/egeria-js-commons';


/**
 * Initial empty form value.
 */
const emptyForm: formData = {
  q: {
    value : '',
    isValid : false,
    isPristine : true
  },
  types: {
    value : [] as Array<string>,
    isValid : false,
    isPristine : true
  },
  exactMatch: false,
  caseSensitive: false,
  pageSize: 25
};

/**
 * Initial types data value.
 */
const emptyTypesData: Array<any> = [];

export function EgeriaAssetCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = getQueryParams(searchParams);
  const navigate = useNavigate();

  const [typesData, setTypesData] = useState({
    isLoading: false,
    typesData: [...emptyTypesData, ...queryParams.types]
  } as any);

  const [form, setForm] = useState({
    ...emptyForm,
    ...queryParams
  } as any);

  const [rowData, setRowData] = useState({
    isLoading: false,
    rowData: [] as any
  });

  /*
   * Contains AGGrid data-table information and config.
   */
  const gridOptions = {
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: 150
    },
    columnDefs: [
      {
        field: 'properties.displayName',
        filter: true,
        headerName: 'Name',
        cellRenderer: (params: any) => {
          return <DisplayNameCellRenderer data={params.data}/>;
        }
      },
      {field: 'origin.metadataCollectionName', filter: true, headerName: 'Origin' },
      {field: 'type.name', filter: true, headerName: 'Type' },
      {
        field: 'properties.qualifiedName',
        filter: true,
        headerName: 'Context Info',
        cellRenderer: (params: any) => {
          return <QualifiedName qualified={params.value}/>;
        }
      },
      {field: 'properties.summary', filter: true, headerName: 'Description' }
    ],
    onFirstDataRendered: (params: any) => {
      const allColumnIds: string[] = [];

      params.columnApi.getColumns()?.forEach((column: any) => {
        allColumnIds.push(column.getId());
      });

      params.columnApi.autoSizeColumns(allColumnIds, true);
    }
  };

  useEffect(() => {
    const _queryParams = getQueryParams(searchParams);
    let qIsPristine = form.q.isPristine;
    let qIsValid = form.q.isValid;
    let typesIsPristine = form.types.isPristine;
    let typesIsValid = form.types.isValid;
    if (_queryParams.q !== '' && qIsPristine) {
      qIsPristine = false;
      qIsValid = isStringLonger(_queryParams.q, QUERY_MIN_LENGTH);
    }
    if (!isArrayEmpty(_queryParams.types) && typesIsPristine) {
      typesIsPristine = false;
      typesIsValid = !isArrayEmpty(_queryParams.types);
    }
    setForm({
      ..._queryParams,
      q: {
        value: _queryParams.q || '',
        isPristine : qIsPristine,
        isValid: qIsValid
      },
      types: {
        value: [..._queryParams.types],
        isPristine : typesIsPristine,
        isValid: typesIsValid
      }
    });
  }, [searchParams]);


  useEffect(() => {
    setTypesData({...typesData, isLoading: true});

    const bringTypes = async () => {
      const rawTypesData = await fetchTypes();

      setTypesData({
        isLoading: false,
        typesData: [...rawTypesData]
      });
    };

    bringTypes();
  }, []);

  useEffect(() => {
    const _queryParams = getQueryParams(searchParams);

    setRowData({...rowData, isLoading: true});

    const queryData = async () => {
      const _rowData = await fetchRawData({...form, ..._queryParams});

      setRowData({
        isLoading: false,
        rowData: [
          ..._rowData
        ]
      });
    };

    queryData();
  }, [searchParams]);

  /*
   * Submit handler for the main form.
   */
  const submit = () => {
    if (form.q.isValid && form.types.isValid) {
      setSearchParams(form);
    }
  };

  /*
   * Submit handler for the main form on ENTER keypress.
   */
  const handleEnterPress = (e: any) => {
    if(e.key === 'Enter') {
      submit();
    }
  };

  /*
   * Load more handler for loading more elements, pagination.
   */
  const loadMore = () => {
    const newPageSize = form.pageSize + PAGE_SIZE_INCREASE_VALUE;
    const newFormData = {...form, pageSize: newPageSize};

    // TODO: check if last page (new array === last data array)
    setForm({
      ...newFormData
    });

    goTo(newFormData);
  };

  /*
   * Method used to update current browser's URL.
   */
  const goTo = (formData: formData) => {
    const path = ASSET_CATALOG_PATH;
    const queryParams = getQueryParamsPath(formData);

    navigate(`${path}${queryParams.length ? `?${queryParams.join('&')}` : ''}` );
  };

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column', position: 'relative', height: '100%', }}>
      <LoadingOverlay visible={rowData.isLoading || typesData.isLoading} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
        <TextInput mr="xl"
                   style={{minWidth: 180}}
                   placeholder="Search"
                   value={form.q.value}
                   required
                   error={(!form.q.isPristine) && !form.q.isValid  ? 'Query must be at least ' + QUERY_MIN_LENGTH + ' characters' : ''}
                   onKeyPress={handleEnterPress}
                   onChange={(event: any) => setForm({
                     ...form,
                     q: {
                       value : event.currentTarget.value,
                       isPristine : false,
                       isValid : isStringLonger(form.q.value, QUERY_MIN_LENGTH)
                     }
                   })} />

        <MultiSelect mr="xl"
                     style={{minWidth: 230}}
                     data={typesData.typesData}
                     value={form.types.value}
                     error={!form.types.isPristine && !form.types.isValid ? 'At least one type has to be selected' : ''}
                     placeholder="Types"
                     onChange={(value) => setForm({
                       ...form,
                       types: {
                         value : [...value],
                         isPristine : false,
                         isValid : !isArrayEmpty(form.types.value)
                       }
                     })} />

        <Checkbox mr="xl"
                  label={'Exact match'}
                  checked={form.exactMatch}
                  onChange={(event) => setForm({...form, exactMatch: event.currentTarget.checked})} />

        <Checkbox mr="xl"
                  label={'Case sensitive'}
                  checked={form.caseSensitive}
                  onChange={(event) => setForm({...form, caseSensitive: event.currentTarget.checked})} />

        <Button onClick={() => submit()}>
          Search
        </Button>

      </div>
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptions}
                     rowData={rowData.rowData} />
      </div>

      <div>
        <Button size="xs" compact fullWidth onClick={() => loadMore()} style={{marginBottom:1, marginTop:10}}>
          Load more...
        </Button>
      </div>
    </div>
    </>
  );
}
