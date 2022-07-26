import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tabs } from '@mantine/core';
import { useState } from 'react';
var LINEAGE;
(function (LINEAGE) {
    LINEAGE["END_TO_END"] = "end-to-end";
    LINEAGE["VERTICAL_LINEAGE"] = "vertical-lineage";
    LINEAGE["ULTIMATE_SOURCE"] = "ultimate-source";
    LINEAGE["ULTIMATE_DESTINATION"] = "ultimate-destination";
})(LINEAGE || (LINEAGE = {}));
export function EgeriaLineage(props) {
    const { lineage } = props;
    const indexOfLineage = Object.values(LINEAGE).indexOf(lineage);
    const [activeTab, setActiveTab] = useState(indexOfLineage);
    return (_jsx(_Fragment, { children: _jsxs(Tabs, Object.assign({ grow: true, active: activeTab, onTabChange: (tabIndex) => { setActiveTab(tabIndex); } }, { children: [_jsx(Tabs.Tab, { label: LINEAGE.END_TO_END }), _jsx(Tabs.Tab, { label: LINEAGE.VERTICAL_LINEAGE, disabled: true }), _jsx(Tabs.Tab, { label: LINEAGE.ULTIMATE_SOURCE }), _jsx(Tabs.Tab, { label: LINEAGE.ULTIMATE_DESTINATION })] })) }));
}
