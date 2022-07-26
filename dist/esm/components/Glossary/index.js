import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Grid, LoadingOverlay, Paper, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ListDetails } from 'tabler-icons-react';
import { glossaries } from 'egeria-js-commons';
export function EgeriaGlossary() {
    const [glossariesData, setGlossariesData] = useState([]);
    const [glossaryCategoriesData, setGlossaryCategoriesData] = useState([]);
    const [glossaryTermsData, setGlossaryTermsData] = useState([]);
    useEffect(() => {
        glossaries.getAll().then((response) => response.json()).then((data) => {
            setGlossariesData(data.map((d) => {
                return {
                    displayName: d.displayName,
                    status: d.status
                };
            }));
        });
        glossaries.getGlossaryCategories().then((response) => response.json()).then((data) => {
            setGlossaryCategoriesData(data.map((d) => {
                return {
                    displayName: d.displayName,
                    status: d.status
                };
            }));
        });
        glossaries.getGlossaryTerms().then((response) => response.json()).then((data) => {
            setGlossaryTermsData(data.map((d) => {
                return {
                    displayName: d.displayName,
                    status: d.status
                };
            }));
        });
    }, []);
    const glossaryRows = glossariesData.map((element, index) => (_jsxs("tr", { children: [_jsx("td", { children: element.displayName }), _jsx("td", { children: element.status }), _jsx("td", { children: _jsx(ActionIcon, { children: _jsx(ListDetails, {}) }) })] }, index)));
    const glossaryCateogriesRows = glossaryCategoriesData.map((element, index) => (_jsxs("tr", { children: [_jsx("td", { children: element.displayName }), _jsx("td", { children: element.status }), _jsx("td", { children: _jsx(ActionIcon, { children: _jsx(ListDetails, {}) }) })] }, index)));
    const glossaryTermsRows = glossaryTermsData.map((element, index) => (_jsxs("tr", { children: [_jsx("td", {}), _jsx("td", {}), _jsx("td", {})] }, index)));
    return (_jsxs(Grid, Object.assign({ grow: true, gutter: "xs", style: { height: '100%' } }, { children: [_jsx(Grid.Col, Object.assign({ span: 4 }, { children: _jsxs(Paper, Object.assign({ shadow: "xs", style: { height: '100%', position: 'relative' } }, { children: [_jsx(LoadingOverlay, { visible: !(glossariesData.length > 0) }), _jsxs(Table, Object.assign({ striped: true, highlightOnHover: true }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Glossary" }), _jsx("th", { children: "Status" }), _jsx("th", {})] }) }), _jsx("tbody", { children: glossaryRows })] }))] })) })), _jsx(Grid.Col, Object.assign({ span: 4 }, { children: _jsxs(Paper, Object.assign({ shadow: "xs", style: { height: '100%', position: 'relative' } }, { children: [_jsx(LoadingOverlay, { visible: !(glossaryCategoriesData.length > 0) }), _jsxs(Table, Object.assign({ striped: true, highlightOnHover: true }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Category" }), _jsx("th", { children: "Status" }), _jsx("th", {})] }) }), _jsx("tbody", { children: glossaryCateogriesRows })] }))] })) })), _jsx(Grid.Col, Object.assign({ span: 4 }, { children: _jsxs(Paper, Object.assign({ shadow: "xs", style: { height: '100%', position: 'relative' } }, { children: [_jsx(LoadingOverlay, { visible: !(glossaryTermsData.length > 0) }), _jsxs(Table, Object.assign({ striped: true, highlightOnHover: true }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Glossary term" }), _jsx("th", { children: "Status" }), _jsx("th", {})] }) }), _jsx("tbody", { children: glossaryTermsRows })] }))] })) }))] })));
}
