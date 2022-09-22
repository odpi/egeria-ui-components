import { useState, useEffect } from 'react';
import { Checkbox, TextInput, MultiSelect, Button, LoadingOverlay } from '@mantine/core';
import { authHeader, egeriaFetch } from 'egeria-js-commons';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import QualifiedName from './qualified-name';
import DisplayNameCellRenderer from './displayNameCellRenderer';

const QUERY_MIN_LENGTH = 3;
const TYPES_MIN_SELECTED = 1;
const PAGE_SIZE_INCREASE_VALUE = 25;

interface formData {
  caseSensitive: boolean,
  exactMatch: boolean,
  pageSize: number,
  q: string,
  types: Array<string>
}

const emptyForm: formData = {
  caseSensitive: false,
  exactMatch: false,
  pageSize: 25,
  q: '',
  types: []
};

const emptyTypesData: Array<any> = [];

const getQueryParams = (searchParams: any) => {
  return {
    q: searchParams.get('q') || '',
    types: searchParams.get('types')?.split(',') || [],
    exactMatch: searchParams.get('exactMatch') === "true" ? true : false,
    caseSensitive: searchParams.get('caseSensitive') === "true" ? true : false,
    pageSize: searchParams.get('pageSize') ? parseInt(searchParams.get('pageSize')) : PAGE_SIZE_INCREASE_VALUE
  };
};

const getQueryParamsPath = (formData: formData) => {
  const {q, exactMatch, caseSensitive, types, pageSize } = formData;

  let queryParams = [];

  if(q) {
    queryParams.push(`q=${q}`);
  }

  if(types && types.length > 0) {
    queryParams.push(`types=${types.join(',')}`);
  }

  if(exactMatch) {
    queryParams.push(`exactMatch=true`);
  }

  if(caseSensitive) {
    queryParams.push(`caseSensitive=true`);
  }

  if(types) {
    queryParams.push(`pageSize=${pageSize}`);
  }

  return queryParams;
};

const fetchData = async (uri: string, method: string, callback?: Function) => {
  const res = await egeriaFetch(uri, method, {...authHeader()}, {});
  const data = await res.json();

  if(callback) {
    callback(data);
  } else {
    return data;
  }
};

const fetchRawData = async (formData: formData, apiUrl?: string) => {
  const {q, types} = formData;

  if(q.length >= QUERY_MIN_LENGTH && types.length >= TYPES_MIN_SELECTED) {
    const _queryParams = getQueryParamsPath(formData);
    const path = `${apiUrl || ''}/api/assets/search${_queryParams.length ? `?${_queryParams.join('&')}` : ``}`;

    const rawData = await fetchData(path, 'GET');

    return rawData;
  } else {
    return [];
  }
};

const fetchTypes = async (apiUrl?: string) => {
  let typesData = await fetchData(`${apiUrl || ''}/api/assets/types`, 'GET');

  typesData = [
    ...typesData.map((d: any) => {
      return {
        value: d.name,
        label: d.name
      };
    })
  ];

  return typesData;
};

const initData = async (formData: formData, callback: Function, apiUrl?: string) => {
  const typesData = await fetchTypes(apiUrl);
  const rawData = await fetchRawData(formData, apiUrl);

  if(callback) {
    callback({types: typesData, rawData: rawData});
  }
};

interface Props {
  apiUrl?: string;
}

export function EgeriaAssetCatalog(props: Props) {
  const { apiUrl } = props;
  const navigate = useNavigate();

  const [ URLSearchParams ] = useSearchParams();
  const queryParams = getQueryParams(URLSearchParams);

  const [isLoading, setIsLoading] = useState(false);
  const [typesData, setTypesData] = useState([...emptyTypesData, ...queryParams.types]);

  const [formData, setFormData] = useState({...emptyForm, ...queryParams});
  const [userFormData, setUserFormData] = useState({...emptyForm, ...queryParams});

  const { exactMatch, caseSensitive, q, types } = userFormData;
  const { pageSize } = formData;

  const [rowData, setRowData]: any = useState([]);

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
          return <DisplayNameCellRenderer apiUrl={apiUrl} data={params.data}/>;
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

      params.columnApi.getColumns()!.forEach((column: any) => {
        allColumnIds.push(column.getId());
      });

      params.columnApi.autoSizeColumns(allColumnIds, true);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    initData(formData, (data: any) => {
      const { types, rawData } = data;

      // TODO: handle types request only once
      setTypesData(types);
      setRowData(rawData);

      setIsLoading(false);
    }, apiUrl);
  }, [apiUrl, formData, pageSize]);

  const submit = () => {
    setFormData({
      ...userFormData
    });

    goTo(userFormData);
  };

  const handleEnterPress = (e: any) => {
    if(e.key === 'Enter') {
      submit();
    }
  };

  const loadMore = () => {
    const newPageSize = formData.pageSize + PAGE_SIZE_INCREASE_VALUE;
    const newFormData = {...formData, pageSize: newPageSize};

    // TODO: check if last page (new array === last data array)
    setFormData(newFormData);
    goTo(newFormData);
  };

  const goTo = (formData: formData) => {
    const path = `/assets/catalog`;
    const queryParams = getQueryParamsPath(formData);

    navigate(`${path}${queryParams.length ? `?${queryParams.join('&')}` : ``}` );
  };

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column', position: 'relative', height: '100%', }}>
      <LoadingOverlay visible={isLoading} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
        <TextInput mr="xl"
                   style={{minWidth: 180}}
                   placeholder="Search"
                   value={q}
                   onKeyPress={handleEnterPress}
                   onChange={(event: any) => setUserFormData({...userFormData, q: event.currentTarget.value})} />

        <MultiSelect mr="xl"
                     style={{minWidth: 230}}
                     data={typesData}
                     value={types}
                     placeholder="Types"
                     onChange={(value) => setUserFormData({...userFormData, types: [...value]})} />

        <Checkbox mr="xl"
                  label={'Exact match'}
                  checked={exactMatch}
                  onChange={(event) => setUserFormData({...userFormData, exactMatch: event.currentTarget.checked})} />

        <Checkbox mr="xl"
                  label={'Case sensitive'}
                  checked={caseSensitive}
                  onChange={(event) => setUserFormData({...userFormData, caseSensitive: event.currentTarget.checked})} />

        <Button onClick={() => submit()}>
          Search
        </Button>
      </div>

      <div className="ag-theme-alpine" style={{width: '100%', height: '100%'}}>
        <AgGridReact gridOptions={gridOptions}
                     rowData={rowData} />
      </div>

      <div>
        <Button size="xs" compact fullWidth onClick={() => loadMore()} style={{marginBottom:1}}>
          Load more...
        </Button>
      </div>
    </div>
    </>
  );
}
