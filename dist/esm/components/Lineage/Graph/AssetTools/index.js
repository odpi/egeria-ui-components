import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, SimpleGrid } from '@mantine/core';
import { lineageViewsTypesMapping } from 'egeria-js-commons';
const hasTab = (type, tabName) => {
    if (Object.keys(lineageViewsTypesMapping).includes(type)) {
        return lineageViewsTypesMapping[type].includes(tabName);
    }
    else {
        return false;
    }
};
export function EgeriaAssetTools(props) {
    const { selectedNode } = props;
    return (_jsx(_Fragment, { children: _jsxs(SimpleGrid, Object.assign({ cols: 4 }, { children: [hasTab(selectedNode.label, 'end-to-end') && _jsx(Button, Object.assign({ component: "a", target: "_blank", href: `/asset-lineage/${selectedNode.id}/end-to-end` }, { children: "end-to-end" })), hasTab(selectedNode.label, 'vertical-lineage') && _jsx(Button, Object.assign({ component: "a", target: "_blank", href: `/asset-lineage/${selectedNode.id}/vertical-lineage` }, { children: "vertical-lineage" })), hasTab(selectedNode.label, 'ultimate-source') && _jsx(Button, Object.assign({ component: "a", target: "_blank", href: `/asset-lineage/${selectedNode.id}/ultimate-source` }, { children: "ultimate-source" })), hasTab(selectedNode.label, 'ultimate-destination') && _jsx(Button, Object.assign({ component: "a", target: "_blank", href: `/asset-lineage/${selectedNode.id}/ultimate-destination` }, { children: "ultimate-destination" }))] })) }));
}
