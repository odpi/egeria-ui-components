import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { egeriaFetch, authHeader } from 'egeria-js-commons';
import { LoadingOverlay, Table } from '@mantine/core';

const getProperties = (object: any, key: string) => {
  if(object && object[key]) {
    return Object.keys(object[key]);
  } else {
    return [];
  }
};

const renderTable = (column: string, object: any, key: string) => {
  return (<Table striped>
    <thead>
      <tr>
        <th>{ column }</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      { object &&
        object[key] &&
        getProperties(object, key)
          .map((p: any, index: number) => {
            return (
              <tr key={index}>
                <td><strong>{ p }</strong></td>
                <td>{ object[key][p] }</td>
              </tr>
            );
          })
      }
    </tbody>
  </Table>);
};

interface Props {
  guid?: any;
  apiUrl?: any;
}

export function EgeriaAssetDetails(props: Props) {
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState(undefined);

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

  return <>
    { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }
    { !loading && <>
      { renderTable('Properties', asset, 'properties') }
      { renderTable('Type', asset, 'type') }
      { renderTable('Origin', asset, 'origin') }
    </> }
  </>;
}
