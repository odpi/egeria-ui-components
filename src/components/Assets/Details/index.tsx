import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { egeriaFetch, authHeader, VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';
import { Accordion, LoadingOverlay, Table, Paper, Divider, Button, SimpleGrid, Text } from '@mantine/core';
import { EgeriaAssetTools } from '../../Lineage/Graph/AssetTools';
import { ArticleOff, Printer } from 'tabler-icons-react';
import { RequirePermissions } from '@lfai/egeria-ui-core';

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
            <th style={{width: '30%'}}>{ title }</th>
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

export const renderTable = (title: string, object: any) => {
  const properties: any = getProperties(object);

  return renderHTMLTable(title, properties);
};

interface Props {
  guid?: any;
}

export function EgeriaAssetDetails(props: Props) {
  const [loading, setLoading] = useState(true);
  const [asset, setAsset]: [any, any] = useState(undefined);

  const { guid: guidFromParams } = useParams();
  let { guid } = props;

  if(!guid) {
    guid = guidFromParams;
  }

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', authHeader(), {});

    if(res) {
      const data = await res.json();

      setAsset(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    fetchData(`/api/assets/${ guid }`);
  }, [guid]);

  const selectedNode = {
    id: asset?.guid,
    label: asset?.type?.name
  };

  return <>
    { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }

    { !loading && !asset && <div style={{display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <ArticleOff size={48} strokeWidth={2} />

      <Text>Data can&apos;t be loaded or it wasn&apos;t provided.</Text>
    </div> }

    { !loading && <div style={{margin:0}}>
      { asset && <>
        <EgeriaAssetTools selectedNode={selectedNode} />

        <Divider my="sm" variant="dashed" />

        <RequirePermissions component={VISIBLE_COMPONENTS.ASSETS_DETAILS_PRINT} element={<SimpleGrid cols={4}>
          <Button leftIcon={<Printer size={20} />}
                  color="gray"
                  component="a"
                  target="_blank"
                  href={`/assets/${guid}/details/print`}>
            Print
          </Button>

          <Divider my="sm" variant="dashed" />
        </SimpleGrid>} />
      </> }
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
              return <Accordion.Item value={c.name} key={index}>
                <Accordion.Control>{ `Classification ${c.name}` }</Accordion.Control>
                <Accordion.Panel>
                  { renderTable('', c) }
                </Accordion.Panel>
              </Accordion.Item>
            }) }
          </Accordion>
        </Paper>
      </> }
    </> }
  </>;
}
