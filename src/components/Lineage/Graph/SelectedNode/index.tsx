
import { EgeriaAssetTools } from '../AssetTools';
import { EgeriaPropsTable } from '../PropsTable';

interface Props {
  selectedNode: any;
}

const camelCaseToSentence = (val: any) => {
  return val
      .replace(/([A-Z])/g, ' $1')
      .replace(/([A-Z]+\s+)/g, (c: any) => c.trim())
      .replace(/_/g, ' ')                             // replace underscores with spaces
      .replace(/^\w/, (c: any) => c.toUpperCase());   // uppercase first letter
};

const attributes = (items: any) => {
  const arr: any = [];

  if (items.length === 0) {
    return arr;
  }

  items.forEach((prop: any) => {
    const property: any = Object.keys(prop).pop();
    const value = prop[property];

      if (typeof value !== 'object' && value !== null) {
        arr.push({ 'key': camelCaseToSentence(property), 'value': value });
      }
    }
  );

  return arr;
};

const getPropertiesForDisplay = (item: any) => {
  let displayName = item.label;
  let guid = item.id;
  let summary = item.summary;
  let description = item.description;

  let displayProperties: any = [
    { displayName: displayName },
    { guid: guid }
  ];

  if (summary) {
    displayProperties.push({summary: summary});
  }

  if (description) {
    displayProperties.push({description: description});
  }

  return attributes(displayProperties);
}

export function EgeriaSelectedNode(props: Props) {
  const { selectedNode } = props;

  return (<>
    <EgeriaAssetTools selectedNode={selectedNode} />

    <EgeriaPropsTable items={getPropertiesForDisplay(selectedNode)} title="Properties" />

    { selectedNode.properties.length && <EgeriaPropsTable items={attributes(selectedNode.properties)} title="Context" /> }
  </>);
}
