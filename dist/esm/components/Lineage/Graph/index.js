var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, LoadingOverlay, Tabs } from '@mantine/core';
import { egeriaFetch, authHeader } from 'egeria-js-commons';
import { HappiGraph, HappiGraphActions } from '@lfai/happi-graph';
import 'happi-graph/src/components/HappiGraph/happi-graph.scss';
import './index.scss';
import { useEffect, useState } from 'react';
import { EgeriaSelectedNode } from './SelectedNode';
var LINEAGE;
(function (LINEAGE) {
    LINEAGE["END_TO_END"] = "end-to-end";
    LINEAGE["VERTICAL_LINEAGE"] = "vertical-lineage";
    LINEAGE["ULTIMATE_SOURCE"] = "ultimate-source";
    LINEAGE["ULTIMATE_DESTINATION"] = "ultimate-destination";
})(LINEAGE || (LINEAGE = {}));
const getIndexOfLineage = (lineageType) => {
    return Object.values(LINEAGE).indexOf(lineageType);
};
const getLineageOfIndex = (lineageIndex) => {
    return Object.values(LINEAGE)[lineageIndex];
};
export function EgeriaLineageGraph(props) {
    const { apiUrl, guid, lineageType, navigateTo } = props;
    const initialData = { nodes: [], edges: [] };
    const [rawData, setRawData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [opened, setOpened] = useState(false);
    const [selectedNodeData, setSelectedNodeData] = useState(undefined);
    // TODO: extract URL to URL Map
    const uri = (lineageType) => `${apiUrl}/api/lineage/entities/${guid}/${lineageType}?includeProcesses=true`;
    const fetchData = (uri) => __awaiter(this, void 0, void 0, function* () {
        const res = yield egeriaFetch(uri, 'GET', Object.assign({}, authHeader()), {});
        const data = yield res.json();
        setRawData(data);
        setLoading(false);
    });
    const onTabChange = (value) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        yield fetchData(uri(getLineageOfIndex(value)));
        // TODO: extract URL to URL Map
        const path = `/asset-lineage/${guid}/${getLineageOfIndex(value)}`;
        yield navigateTo(path);
    });
    useEffect(() => {
        setLoading(true);
        fetchData(uri(lineageType));
    }, []);
    return (_jsxs("div", Object.assign({ className: "egeria-lineage" }, { children: [_jsx(Modal, Object.assign({ opened: opened, onClose: () => setOpened(false), withCloseButton: false, centered: true, size: "50%" }, { children: _jsx(EgeriaSelectedNode, { selectedNode: selectedNodeData }) })), _jsxs(Tabs, Object.assign({ grow: true, style: { height: '100%' }, initialTab: getIndexOfLineage(lineageType), active: getIndexOfLineage(lineageType), onTabChange: (value) => onTabChange(value) }, { children: [_jsxs(Tabs.Tab, Object.assign({ label: LINEAGE.END_TO_END }, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && _jsx(HappiGraph, { rawData: Object.assign({}, rawData), algorithm: "VISJS", debug: false, graphDirection: "HORIZONTAL", selectedNodeId: guid, actions: _jsx(HappiGraphActions, { rawData: Object.assign({}, rawData) }), onNodeClick: (d) => { setSelectedNodeData(d); setOpened(true); } })] })), _jsxs(Tabs.Tab, Object.assign({ label: LINEAGE.VERTICAL_LINEAGE }, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && _jsx(HappiGraph, { rawData: Object.assign({}, rawData), algorithm: "ELK", debug: false, graphDirection: "VERTICAL", selectedNodeId: guid, actions: _jsx(HappiGraphActions, { rawData: Object.assign({}, rawData) }), onNodeClick: (d) => { setSelectedNodeData(d); setOpened(true); } })] })), _jsxs(Tabs.Tab, Object.assign({ label: LINEAGE.ULTIMATE_SOURCE }, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && _jsx(HappiGraph, { rawData: Object.assign({}, rawData), algorithm: "VISJS", debug: false, graphDirection: "HORIZONTAL", selectedNodeId: guid, actions: _jsx(HappiGraphActions, { rawData: Object.assign({}, rawData) }), onNodeClick: (d) => { setSelectedNodeData(d); setOpened(true); } })] })), _jsxs(Tabs.Tab, Object.assign({ label: LINEAGE.ULTIMATE_DESTINATION }, { children: [loading && _jsx("div", Object.assign({ style: { height: '100%', position: 'relative' } }, { children: _jsx(LoadingOverlay, { visible: true }) })), !loading && _jsx(HappiGraph, { rawData: Object.assign({}, rawData), algorithm: "VISJS", debug: false, graphDirection: "HORIZONTAL", selectedNodeId: guid, actions: _jsx(HappiGraphActions, { rawData: Object.assign({}, rawData) }), onNodeClick: (d) => { setSelectedNodeData(d); setOpened(true); } })] }))] }))] })));
}
