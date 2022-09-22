import { jsx as _jsx } from "react/jsx-runtime";
import { Anchor } from '@mantine/core';
import React from 'react';
import { itemName } from './helpers';
class DisplayNameCellRenderer extends React.Component {
    render() {
        const { apiUrl, data } = this.props;
        return _jsx(Anchor, Object.assign({ href: `${apiUrl || ''}/assets/${data.guid}/details`, target: "_blank" }, { children: itemName(data) }));
    }
}
export default DisplayNameCellRenderer;
