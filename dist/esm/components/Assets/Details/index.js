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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { egeriaFetch, authHeader } from 'egeria-js-commons';
import { LoadingOverlay, Table } from '@mantine/core';
const getProperties = (object, key) => {
    if (object && object[key]) {
        return Object.keys(object[key]);
    }
    else {
        return [];
    }
};
const renderTable = (column, object, key) => {
    let properties = [];
    if (object && object[key]) {
        properties = getProperties(object, key);
    }
    return _jsx(_Fragment, { children: properties.length > 0 && _jsxs(Table, Object.assign({ striped: true }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: column }), _jsx("th", {})] }) }), _jsx("tbody", { children: properties
                        .map((p, index) => {
                        return (_jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: p }) }), _jsx("td", { children: object[key][p] })] }, index));
                    }) })] })) });
};
export function EgeriaAssetDetails(props) {
    const [loading, setLoading] = useState(false);
    const [asset, setAsset] = useState(undefined);
    const { apiUrl } = props;
    const { guid: guidFromParams } = useParams();
    let { guid } = props;
    if (!guid) {
        guid = guidFromParams;
    }
    const fetchData = (uri) => __awaiter(this, void 0, void 0, function* () {
        const res = yield egeriaFetch(uri, 'GET', authHeader(), {});
        const data = yield res.json();
        setAsset(data);
        setLoading(false);
    });
    useEffect(() => {
        setLoading(true);
        fetchData(`${apiUrl}/api/assets/${guid}`);
    }, [apiUrl, guid]);
    return _jsxs(_Fragment, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && _jsxs(_Fragment, { children: [renderTable('Properties', asset, 'properties'), renderTable('Type', asset, 'type'), renderTable('Origin', asset, 'origin')] })] });
}
