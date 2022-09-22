import React from 'react';
interface Props {
    apiUrl?: string;
    data: any;
}
interface State {
}
declare class DisplayNameCellRenderer extends React.Component<Props, State> {
    render(): JSX.Element;
}
export default DisplayNameCellRenderer;
