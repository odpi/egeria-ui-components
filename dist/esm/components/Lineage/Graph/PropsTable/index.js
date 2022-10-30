import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, Table } from '@mantine/core';
export function EgeriaPropsTable(props) {
    const { title, items } = props;
    const rows = items.map((property, index) => (_jsxs("tr", { children: [_jsx("td", { children: property.key }), _jsx("td", { children: property.value })] }, index)));
    return (_jsx(_Fragment, { children: _jsx(Accordion, Object.assign({ defaultValue: `${0}` }, { children: _jsxs(Accordion.Item, Object.assign({ value: title }, { children: [_jsx(Accordion.Control, { children: title }), _jsx(Accordion.Panel, { children: _jsxs(Table, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Property" }), _jsx("th", { children: "Value" })] }) }), _jsx("tbody", { children: rows })] }) })] })) })) }));
}
