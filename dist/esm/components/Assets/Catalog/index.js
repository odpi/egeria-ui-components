var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Checkbox, TextInput, MultiSelect, Button, LoadingOverlay } from '@mantine/core';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import QualifiedName from './qualified-name';
import DisplayNameCellRenderer from './displayNameCellRenderer';
import { ASSET_CATALOG_PATH, PAGE_SIZE_INCREASE_VALUE, getQueryParams, getQueryParamsPath, fetchTypes, fetchRawData } from '@lfai/egeria-js-commons';
/**
 * Initial empty form value.
 */
const emptyForm = {
    q: '',
    types: [],
    exactMatch: false,
    caseSensitive: false,
    pageSize: 25
};
/**
 * Initial types data value.
 */
const emptyTypesData = [];
export function EgeriaAssetCatalog(props) {
    const { apiUrl } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = getQueryParams(searchParams);
    const navigate = useNavigate();
    const [typesData, setTypesData] = useState({
        isLoading: false,
        typesData: [...emptyTypesData, ...queryParams.types]
    });
    const [form, setForm] = useState(Object.assign(Object.assign({}, emptyForm), queryParams));
    const [rowData, setRowData] = useState({
        isLoading: false,
        rowData: []
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
                cellRenderer: (params) => {
                    return _jsx(DisplayNameCellRenderer, { apiUrl: apiUrl, data: params.data });
                }
            },
            { field: 'origin.metadataCollectionName', filter: true, headerName: 'Origin' },
            { field: 'type.name', filter: true, headerName: 'Type' },
            {
                field: 'properties.qualifiedName',
                filter: true,
                headerName: 'Context Info',
                cellRenderer: (params) => {
                    return _jsx(QualifiedName, { qualified: params.value });
                }
            },
            { field: 'properties.summary', filter: true, headerName: 'Description' }
        ],
        onFirstDataRendered: (params) => {
            const allColumnIds = [];
            params.columnApi.getColumns().forEach((column) => {
                allColumnIds.push(column.getId());
            });
            params.columnApi.autoSizeColumns(allColumnIds, true);
        }
    };
    useEffect(() => {
        const _queryParams = getQueryParams(searchParams);
        setForm(Object.assign({}, _queryParams));
    }, [searchParams]);
    useEffect(() => {
        setTypesData(Object.assign(Object.assign({}, typesData), { isLoading: true }));
        const bringTypes = () => __awaiter(this, void 0, void 0, function* () {
            const rawTypesData = yield fetchTypes(apiUrl);
            setTypesData({
                isLoading: false,
                typesData: [...rawTypesData]
            });
        });
        bringTypes();
    }, []);
    useEffect(() => {
        const _queryParams = getQueryParams(searchParams);
        setRowData(Object.assign(Object.assign({}, rowData), { isLoading: true }));
        const queryData = () => __awaiter(this, void 0, void 0, function* () {
            const _rowData = yield fetchRawData(Object.assign(Object.assign({}, form), _queryParams), apiUrl);
            setRowData({
                isLoading: false,
                rowData: [
                    ..._rowData
                ]
            });
        });
        queryData();
    }, [searchParams]);
    /*
     * Submit handler for the main form.
     */
    const submit = () => {
        setSearchParams(form);
    };
    /*
     * Submit handler for the main form on ENTER keypress.
     */
    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    };
    /*
     * Load more handler for loading more elements, pagintation.
     */
    const loadMore = () => {
        const newPageSize = form.pageSize + PAGE_SIZE_INCREASE_VALUE;
        const newFormData = Object.assign(Object.assign({}, form), { pageSize: newPageSize });
        // TODO: check if last page (new array === last data array)
        setForm(Object.assign({}, newFormData));
        goTo(newFormData);
    };
    /*
     * Method used to update current browser's URL.
     */
    const goTo = (formData) => {
        const path = ASSET_CATALOG_PATH;
        const queryParams = getQueryParamsPath(formData);
        navigate(`${path}${queryParams.length ? `?${queryParams.join('&')}` : ``}`);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", Object.assign({ style: { display: 'flex', alignItems: 'stretch', flexDirection: 'column', position: 'relative', height: '100%', } }, { children: [_jsx(LoadingOverlay, { visible: rowData.isLoading || typesData.isLoading }), _jsxs("div", Object.assign({ style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 } }, { children: [_jsx(TextInput, { mr: "xl", style: { minWidth: 180 }, placeholder: "Search", value: form.q, onKeyPress: handleEnterPress, onChange: (event) => setForm(Object.assign(Object.assign({}, form), { q: event.currentTarget.value })) }), _jsx(MultiSelect, { mr: "xl", style: { minWidth: 230 }, data: typesData.typesData, value: form.types, placeholder: "Types", onChange: (value) => setForm(Object.assign(Object.assign({}, form), { types: [...value] })) }), _jsx(Checkbox, { mr: "xl", label: 'Exact match', checked: form.exactMatch, onChange: (event) => setForm(Object.assign(Object.assign({}, form), { exactMatch: event.currentTarget.checked })) }), _jsx(Checkbox, { mr: "xl", label: 'Case sensitive', checked: form.caseSensitive, onChange: (event) => setForm(Object.assign(Object.assign({}, form), { caseSensitive: event.currentTarget.checked })) }), _jsx(Button, Object.assign({ onClick: () => submit() }, { children: "Search" }))] })), _jsx("div", Object.assign({ className: "ag-theme-alpine", style: { width: '100%', height: '100%' } }, { children: _jsx(AgGridReact, { gridOptions: gridOptions, rowData: rowData.rowData }) })), _jsx("div", { children: _jsx(Button, Object.assign({ size: "xs", compact: true, fullWidth: true, onClick: () => loadMore(), style: { marginBottom: 1, marginTop: 10 } }, { children: "Load more..." })) })] })) }));
}
