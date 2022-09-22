import React from 'react';
import './qualified-name.scss';
interface Props {
    qualified: string;
}
interface State {
}
/**
 *
 * React component used for displaying context info in Asset Catalog.
 *
 * @since      0.1.0
 * @access     public
 *
 */
declare class QualifiedName extends React.Component<Props, State> {
    render(): JSX.Element;
}
export default QualifiedName;
