import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, Table } from '@mantine/core';
export function EgeriaPropsTable(props) {
    const { title, items } = props;
    const rows = items.map((property, index) => (_jsxs("tr", { children: [_jsx("td", { children: property.key }), _jsx("td", { children: property.value })] }, index)));
    return (_jsx(_Fragment, { children: _jsx(Accordion, Object.assign({ initialItem: 0 }, { children: _jsx(Accordion.Item, Object.assign({ label: title }, { children: _jsxs(Table, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Property" }), _jsx("th", { children: "Value" })] }) }), _jsx("tbody", { children: rows })] }) })) })) }));
}
