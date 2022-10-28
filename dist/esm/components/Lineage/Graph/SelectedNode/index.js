import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { EgeriaAssetTools } from '../AssetTools';
import { EgeriaPropsTable } from '../PropsTable';
const camelCaseToSentence = (val) => {
    return val
        .replace(/([A-Z])/g, ' $1')
        .replace(/([A-Z]+\s+)/g, (c) => c.trim())
        .replace(/_/g, ' ') // replace underscores with spaces
        .replace(/^\w/, (c) => c.toUpperCase()); // uppercase first letter
};
const attributes = (items) => {
    const arr = [];
    if (items.length === 0) {
        return arr;
    }
    items.forEach((prop) => {
        const property = Object.keys(prop).pop();
        const value = prop[property];
        if (typeof value !== 'object' && value !== null) {
            arr.push({ 'key': camelCaseToSentence(property), 'value': value });
        }
    });
    return arr;
};
const getPropertiesForDisplay = (item) => {
    const displayName = item.label;
    const guid = item.id;
    const summary = item.summary;
    const description = item.description;
    const displayProperties = [
        { displayName: displayName },
        { guid: guid }
    ];
    if (summary) {
        displayProperties.push({ summary: summary });
    }
    if (description) {
        displayProperties.push({ description: description });
    }
    return attributes(displayProperties);
};
export function EgeriaSelectedNode(props) {
    const { selectedNode } = props;
    return (_jsxs(_Fragment, { children: [_jsx(EgeriaAssetTools, { selectedNode: selectedNode }), _jsx(EgeriaPropsTable, { items: getPropertiesForDisplay(selectedNode), title: "Properties" }), selectedNode.properties.length && _jsx(EgeriaPropsTable, { items: attributes(selectedNode.properties), title: "Context" })] }));
}
