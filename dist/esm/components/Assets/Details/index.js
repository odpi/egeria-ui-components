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
import { egeriaFetch, authHeader } from '@lfai/egeria-js-commons';
import { Accordion, LoadingOverlay, Table, Paper, Divider, Button, SimpleGrid } from '@mantine/core';
import { EgeriaAssetTools } from '../../Lineage/Graph/AssetTools';
import { Printer } from 'tabler-icons-react';
const getProperties = (object) => {
    if (object) {
        return Object.keys(object).map((k) => {
            return {
                key: k,
                value: object[k]
            };
        }).filter((k) => {
            return typeof k.value !== 'object';
        });
    }
    else {
        return [];
    }
};
const renderHTMLTable = (title, properties) => {
    return _jsxs(_Fragment, { children: [properties && properties.length > 0 && _jsxs(_Fragment, { children: [_jsx(Paper, Object.assign({ shadow: "xs" }, { children: _jsxs(Table, Object.assign({ striped: true }, { children: [title && _jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", Object.assign({ style: { width: '30%' } }, { children: title })), _jsx("th", {})] }) }), _jsx("tbody", { children: properties
                                        .map((p, index) => {
                                        return (_jsxs("tr", { children: [_jsx("td", { children: _jsx("strong", { children: p.key }) }), _jsx("td", { children: p.value })] }, index));
                                    }) })] })) })), _jsx(Divider, { my: "sm", variant: "dashed" })] }), " "] });
};
export const renderTable = (title, object) => {
    const properties = getProperties(object);
    return renderHTMLTable(title, properties);
};
export function EgeriaAssetDetails(props) {
    var _a;
    const [loading, setLoading] = useState(false);
    const [asset, setAsset] = useState(undefined);
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
        fetchData(`/api/assets/${guid}`);
    }, [guid]);
    const selectedNode = {
        id: asset === null || asset === void 0 ? void 0 : asset.guid,
        label: (_a = asset === null || asset === void 0 ? void 0 : asset.type) === null || _a === void 0 ? void 0 : _a.name
    };
    return _jsxs(_Fragment, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && _jsx("div", Object.assign({ style: { margin: 0 } }, { children: asset && _jsxs(_Fragment, { children: [_jsx(EgeriaAssetTools, { selectedNode: selectedNode }), _jsx(Divider, { my: "sm", variant: "dashed" }), _jsx(SimpleGrid, Object.assign({ cols: 4 }, { children: _jsx(Button, Object.assign({ leftIcon: _jsx(Printer, { size: 20 }), color: "gray", component: "a", target: "_blank", href: `/assets/${guid}/details/print` }, { children: "Print" })) })), _jsx(Divider, { my: "sm", variant: "dashed" })] }) })), !loading && asset && _jsxs(_Fragment, { children: [renderTable('General', asset), renderTable('Properties', asset.properties), renderTable('Type', asset.type), renderTable('Origin', asset.origin), renderTable('Aditional Properties', asset.additionalProperties), !loading && asset && asset.classifications && asset.classifications.length > 0 && _jsx(_Fragment, { children: _jsx(Paper, { children: _jsx(Accordion, { children: asset.classifications.map((c, index) => {
                                    return _jsx(Accordion.Item, Object.assign({ label: `Classification ${c.name}` }, { children: renderTable('', c) }), index);
                                }) }) }) })] })] });
}
