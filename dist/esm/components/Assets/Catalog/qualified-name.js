import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { capitalizeFirstLetter, getIcon, parseQualifiedName } from './helpers';
import './qualified-name.scss';
/**
 *
 * React component used for displaying context info in Asset Catalog.
 *
 * @since      0.1.0
 * @access     public
 *
 */
class QualifiedName extends React.Component {
    render() {
        const { qualified } = this.props;
        const maskImage = (item) => {
            return {
                width: '21px',
                height: '21px',
                WebkitMaskImage: `url(data:image/svg+xml;utf8,${encodeURIComponent(getIcon(item.key))})`
            };
        };
        return (_jsx("div", Object.assign({ className: "qualified-name" }, { children: _jsx("ul", { children: parseQualifiedName(qualified).map((item, key) => {
                    return _jsxs("li", Object.assign({ title: capitalizeFirstLetter(item.key) }, { children: [_jsx("div", { className: "masked", style: maskImage(item) }), _jsx("div", Object.assign({ className: "label" }, { children: item.value }))] }), key);
                }) }) })));
    }
}
export default QualifiedName;
