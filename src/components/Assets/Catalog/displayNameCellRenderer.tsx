import { Anchor } from '@mantine/core';
import React from 'react';
import { itemName } from './helpers';

interface Props {
  apiUrl?: string;
  data: any;
}

interface State {
}

class DisplayNameCellRenderer extends React.Component<Props, State> {
  render() {
    const { apiUrl, data } = this.props;

    return <Anchor href={`${apiUrl || ''}/assets/${data.guid}/details`} target="_blank">
      { itemName(data) }
    </Anchor>;
  }
}

export default DisplayNameCellRenderer;
