var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { authHeader, egeriaFetch } from "@lfai/egeria-js-commons";
import { LoadingOverlay, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { renderTable } from ".";
export function EgeriaAssetDetailsPrint(props) {
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
    useEffect(() => {
        if (asset) {
            window.print();
        }
    }, [asset]);
    return _jsxs(_Fragment, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && asset && _jsxs(_Fragment, { children: [renderTable('General', asset), renderTable('Properties', asset.properties), renderTable('Type', asset.type), renderTable('Origin', asset.origin), renderTable('Aditional Properties', asset.additionalProperties), !loading && asset && asset.classifications && asset.classifications.length > 0 && _jsx(_Fragment, { children: asset.classifications.map((c, index) => {
                            return _jsx(Paper, { children: renderTable(`Classification ${c.name}`, c) }, index);
                        }) })] })] });
}
