import { authHeader, egeriaFetch } from '@lfai/egeria-js-commons';
import { LoadingOverlay, Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { renderTable } from '.';

interface Props {
  guid?: any;
}

export function EgeriaAssetDetailsPrint(props: Props) {
  const [loading, setLoading] = useState(false);
  const [asset, setAsset]: [any, any] = useState(undefined);

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

    fetchData(`/api/assets/${ guid }`);
  }, [guid]);

  useEffect(() => {
    if(asset) {
      window.print();
    }
  }, [asset]);

  return <div style={{background:'#fff'}}>
    { loading && <div style={{height: '100%', position: 'relative'}}><LoadingOverlay visible/></div> }

    { !loading && asset && <>
      { renderTable('General', asset) }
      { renderTable('Properties', asset.properties) }
      { renderTable('Type', asset.type) }
      { renderTable('Origin', asset.origin) }
      { renderTable('Aditional Properties', asset.additionalProperties) }

      { !loading && asset && asset.classifications && asset.classifications.length > 0 && <>
          { asset.classifications.map((c: any, index: any) => {
            return <Paper key={index}>
              { renderTable(`Classification ${c.name}`, c) }
            </Paper>
          }) }
      </> }
    </> }
  </div>;
}
