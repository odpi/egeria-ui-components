import React from 'react';
import { NameSuggestions } from './name-suggestions';
import { TypesSuggestions } from './types-suggestions';
import { authHeaderWithContentType, egeriaFetch, getComponent } from '@lfai/egeria-js-commons';

import { Button } from '@mantine/core';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

interface State {
  data: any;
  isLoading: boolean;
  inputBoxes: Array<any>;
  numberOfBoxes: number;
}

/**
 *
 * React component used to search the lineage database
 *
 * @since      0.1.0
 * @access     public
 *
 */
class LineageViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      inputBoxes: [],
      numberOfBoxes: 0,
    };
  }

  addMoreOptions() {
    const typeId = 'type-name-add-more-' + this.state.numberOfBoxes;
    const nameId = 'name-add-more-' + this.state.numberOfBoxes;
    const inputBoxes = this.state.inputBoxes;

    const div =
      <div className="content flex row">
        <div className="m5 flex column">
          <TypesSuggestions itemId={typeId} searchedItem={false} />
        </div>
        <div className="m5 flex column">
          <NameSuggestions itemId={nameId} searchedItem={false} />
        </div>
      </div>;

    inputBoxes.push(div);

    this.setState({
      inputBoxes: inputBoxes,
      numberOfBoxes: this.state.numberOfBoxes + 1
    }
    )
  }

  removeMoreOptions() {
    const currentInputBoxes = this.state.inputBoxes;
    currentInputBoxes.pop();
    this.setState({
      inputBoxes: currentInputBoxes,
      numberOfBoxes: this.state.numberOfBoxes - 1
    }
    )
  }

  submit() {
    const combobox: any = getComponent('#type-name-looking');
    const namebox: any = getComponent('#name-looking');

    const relatedType: any = getComponent('#type-name-related');
    const relatedName: any = getComponent('#name-related');

    const nodeType = combobox.value
    const name = namebox.value;
    const relTypeInfo = relatedType.value;
    const relNameInfo = relatedName.value;
    const body = this.getSearchBody(relNameInfo, relTypeInfo, name, nodeType);

    const url = `${process.env.REACT_APP_API_URL}/api/lineage/entities/search`;

    this.setState({
      isLoading: true
    }, () =>
      egeriaFetch(url, 'POST', authHeaderWithContentType(), { 'body': JSON.stringify(body) }).then(response => {
        return response.json();
      }).then(data => {
        this.setState({
          data: data,
          isLoading: false
        });
      }).catch(() => {
        // TODO: handle event for future generic alert implementation
        this.setState({
          isLoading: false
        });
      })
    )
  }

  private getSearchBody(relNameInfo: string, relTypeInfo: string, name: string, nodeType: string) {
    const firstRelatedNode = {
      name: relNameInfo ? relNameInfo : '',
      type: relTypeInfo ? relTypeInfo : ''
    }

    const relatedNodes = [];
    if (firstRelatedNode.type !== undefined && firstRelatedNode.type !== null && firstRelatedNode.type !== '') {
      relatedNodes.push(firstRelatedNode);
    }
    this.getRelatedNodes(relatedNodes);

    return {
      queriedNode: {
        name: name,
        type: nodeType
      },
      relatedNodes: relatedNodes
    };
  }

  private getRelatedNodes(relatedNodes: any[]) {
    for (let i = 0; i < this.state.numberOfBoxes; i++) {
      const component: any = getComponent('#type-name-add-more-' + i);
      const relatedName22: any = getComponent('#name-add-more-' + i);
      const localNodeInfo = {
        name: '',
        type: ''
      }
      if (component !== null) {
        localNodeInfo.type = component.value
      }
      if (relatedName22 !== null) {
        localNodeInfo.name = relatedName22.value
      }
      if (localNodeInfo.type !== undefined && localNodeInfo.type !== '') {
        relatedNodes.push(localNodeInfo);
      }
    }
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className={`flex-column${isLoading ? ' is-loading' : ''}`}>
        <div>
          <div className="content flex row">
            <div className="m5 flex column">
              <Button id="addMoreOptions" onClick={() => this.addMoreOptions()}>+</Button>
            </div>
            <div className="m5 flex column">
              <Button id="removeMoreOptions" onClick={() => this.removeMoreOptions()}>-</Button>
            </div>

            <div className="m5 flex column">
              {/* <Tooltip title="Select a type before entering the name of the entity">
                <IconButton>
                  <HelpIcon />
                </IconButton>
              </Tooltip> */}
            </div>
          </div>

          <div className="content flex row">
            <div className="m5 flex-column">
              <TypesSuggestions itemId="type-name-looking" searchedItem={true} />
            </div>
            <div className="m5 flex-column">
              <NameSuggestions itemId="name-looking" searchedItem={true} />
            </div>
          </div>

          <div className="content flex row">
            <div className="m5 flex-column">
              <TypesSuggestions itemId="type-name-related" searchedItem={false} />
            </div>
            <div className="m5 flex-column">
              <NameSuggestions itemId="name-related" searchedItem={false} />
            </div>
          </div>

          <div>
            {this.state.inputBoxes}
          </div>
          <div className="content flex row">

          </div>

          <div className="content flex row">

            <div className="m5" style={{ paddingTop: 32 }}>
              <Button id="submit" onClick={() => this.submit()}>Submit</Button>
            </div>
          </div>

          <div className="content flex row flex-1">
            <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
              {/* <AgGridReact className="full-height"
                          rowData={data}
                          columnDefs={columnDefs}>
              </AgGridReact> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LineageViewer;