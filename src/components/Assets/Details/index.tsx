import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { egeriaFetch, authHeader } from '@lfai/egeria-js-commons';
import { Accordion, LoadingOverlay, Table, Paper, Divider } from '@mantine/core';
import { EgeriaAssetTools } from '../../Lineage/Graph/AssetTools';

const getProperties = (object: any) => {
  if(object) {
    return Object.keys(object).map((k: any) => {
      return {
        key: k,
        value: object[k]
      }
    }).filter((k: any) => {
      return typeof k.value !== 'object';
    });
  } else {
    return [];
  }
};

const renderHTMLTable = (title: string, properties: any) => {
  return <>{ properties && properties.length > 0 && <>
    <Paper shadow="xs">
      <Table striped>
        { title && <thead>
          <tr>
            <th style={{width: '25%'}}>{ title }</th>
            <th></th>
          </tr>
        </thead> }
        <tbody>
          { properties
              .map((p: any, index: number) => {
                return (
                  <tr key={index}>
                    <td><strong>{ p.key }</strong></td>
                    <td>{ p.value }</td>
                  </tr>
                );
              }) }
        </tbody>
      </Table>
    </Paper>
    <Divider my="sm" variant="dashed" />
    </> } </>
}

const renderTable = (title: string, object: any) => {
  let properties: any = getProperties(object);

  return renderHTMLTable(title, properties);
};

interface Props {
  guid?: any;
  apiUrl?: any;
}

export function EgeriaAssetDetails(props: Props) {
  const [loading, setLoading] = useState(false);
  const [asset, setAsset]: [any, Function] = useState(undefined);

  const { apiUrl } = props;
  const { guid: guidFromParams } = useParams();
  let { guid } = props;

  if(!guid) {
    guid = guidFromParams;
  }

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', authHeader(), {});
    const data = await res.json();

    setAsset(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    fetchData(`${apiUrl}/api/assets/${ guid }`);
  }, [apiUrl, guid]);

  const selectedNode = {
    id: asset?.guid,
    label: asset?.type?.name
  };

return <>
    { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }

    { !loading && <div style={{margin:0}}>
      { asset && <EgeriaAssetTools selectedNode={selectedNode} /> }
    </div> }

    { !loading && asset && <>
      { renderTable('General', asset) }
      { renderTable('Properties', asset.properties) }
      { renderTable('Type', asset.type) }
      { renderTable('Origin', asset.origin) }
      { renderTable('Aditional Properties', asset.additionalProperties) }

      { !loading && asset && asset.classifications && asset.classifications.length > 0 && <>
        <Paper>
          <Accordion>
            { asset.classifications.map((c: any, index: any) => {
              return <Accordion.Item label={`Classification ${c.name}`} key={index}>
                      { renderTable('', c) }
                    </Accordion.Item>
            }) }
          </Accordion>
        </Paper>
      </> }
    </> }
  </>;
}
