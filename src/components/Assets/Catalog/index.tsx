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
  fetchRawData,
  fetchTypes,
  formData,
  formIsValid,
  getQueryParamsPath,
  getQueryParams,
  isArrayEmpty,
  isStringLonger,
  validateQueryAndTypes
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
  const [searchParams]: [any, any] = useSearchParams();
  const navigate = useNavigate();

  const [typesData, setTypesData] = useState({
    isLoading: false,
    typesData: [...emptyTypesData]
  } as any);

  const [form, setForm]: [formData, any] = useState({...emptyForm} as formData);

  const [rowData, setRowData] = useState({
    isLoading: false,
    rowData: [] as any
  });

  useEffect(() => {
    if(formIsValid(form)) {
      console.log('valid form = ', form);
    } else {
      console.log('invalid form = ', form);
    }
  }, [form]);

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

  const queryData = async (newForm: formData) => {
    const _rowData = await fetchRawData({
      ...newForm
    });

    setRowData({
      isLoading: false,
      rowData: [
        ...(_rowData ? _rowData : [])
      ]
    });

    setForm({
      ...newForm
    });
  };

  useEffect(() => {
    setTypesData({...typesData, isLoading: true});

    fetchTypes().then((rawTypesData: any) => {
      setTypesData({
        isLoading: false,
        typesData: [...rawTypesData]
      });
    });
  }, []);

  useEffect(() => {
    if (typesData.typesData.length > 0) {
      const newForm: formData = validateQueryAndTypes(
        getQueryParams(searchParams),
        typesData.typesData
      );

      if(formIsValid(newForm)) {
        setRowData({...rowData, isLoading: true});

        queryData({
          ...form,
          ...newForm
        });
      } else {
        setForm({
          ...form,
          ...newForm
        });
      }
    }
  }, [typesData]);

  useEffect(() => {
    const newForm: formData = validateQueryAndTypes(
      getQueryParams(searchParams),
      typesData.typesData
    );

    if(typesData.typesData.length && formIsValid(newForm)) {
      setRowData({...rowData, isLoading: true});

      queryData({
        ...form,
        ...newForm
      });
    }
  }, [searchParams]);

  /*
   * Submit handler for the main form.
   */
  const submit = () => {
    setForm({
      ...form,
      q: {
        ...form.q,
        isPristine: false
      },
      types: {
        ...form.types,
        isPristine: false
      }
    } as formData);

    if(formIsValid(form)) {
      goTo(form);

      const currentSearchParams = getQueryParamsPath(validateQueryAndTypes(
        getQueryParams(searchParams),
        typesData.typesData
      ));

      // Trigger new HTTP call if user clicks submit
      if((getQueryParamsPath(form) === currentSearchParams) && formIsValid(form)) {
        setRowData({...rowData, isLoading: true});

        queryData(form);
      }
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
  const loadMore = (_form: formData) => {
    const newPageSize = (_form.pageSize ? _form.pageSize : 0) + PAGE_SIZE_INCREASE_VALUE;
    const newFormData = {..._form, pageSize: newPageSize};

    goTo(newFormData);
  };

  /*
   * Method used to update current browser's URL.
   */
  const goTo = (formData: formData) => {
    const newPath = getQueryParamsPath(formData);

    const path = `${ASSET_CATALOG_PATH}${newPath ? `?${newPath}` : ''}`;

    navigate(path);
  };

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column', position: 'relative', height: '100%', }}>
      <LoadingOverlay visible={rowData.isLoading || typesData.isLoading} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
        <TextInput mr="xl"
                   style={{minWidth: 180}}
                   disabled={typesData.typesData.length === 0}
                   placeholder="Search"
                   value={form.q?.value}
                   required
                   error={!form.q?.isPristine && !form.q?.isValid ? 'Query must be at least ' + QUERY_MIN_LENGTH + ' characters' : ''}
                   onKeyPress={handleEnterPress}
                   onChange={(event: any) => setForm({
                     ...form,
                     q: {
                       ...form.q,
                       value: event.currentTarget.value,
                       isValid: isStringLonger(event.currentTarget.value, QUERY_MIN_LENGTH)
                     }
                   })}
                  />

        <MultiSelect mr="xl"
                     style={{minWidth: 230}}
                     searchable
                     disabled={typesData.typesData.length === 0}
                     data={typesData.typesData}
                     value={form.types?.value}
                     error={!form.types?.isPristine && !form.types?.isValid ? 'At least one type has to be selected' : ''}
                     placeholder="Types"
                     onChange={(value) => setForm({
                       ...form,
                       types: {
                         value: [...value],
                         isPristine: false,
                         isValid : !isArrayEmpty([...value])
                       }
                      })}
                     />

        <Checkbox mr="xl"
                  label={'Exact match'}
                  disabled={typesData.typesData.length === 0}
                  checked={form.exactMatch}
                  onChange={(event) => setForm({
                    ...form,
                    exactMatch: event.currentTarget.checked
                  })}
                  />

        <Checkbox mr="xl"
                  label={'Case sensitive'}
                  disabled={typesData.typesData.length === 0}
                  checked={form.caseSensitive}
                  onChange={(event) => setForm({
                    ...form,
                    caseSensitive: event.currentTarget.checked
                  })}
                  />

        <Button
                onClick={() => submit()}
                disabled={typesData.typesData.length === 0}
                >
          Search
        </Button>

      </div>
      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptions}
                     rowData={rowData.rowData} />
      </div>

      <div>
        {(rowData.rowData.length > form.pageSize) &&
            <Button size="xs"
                compact
                fullWidth
                onClick={() => loadMore(form)}
                style={{marginBottom:1, marginTop:10}}
                >
          Load more...
        </Button>}
      </div>
    </div>
    </>
  );
}
