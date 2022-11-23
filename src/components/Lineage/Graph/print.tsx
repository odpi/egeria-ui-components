import { useParams } from 'react-router-dom';

import {
  HappiGraph,
  HappiGraphActions
} from '@lfai/happi-graph';

import { Title, Center} from '@mantine/core';

import '@lfai/happi-graph/src/components/HappiGraph/happi-graph.scss';

import './index.scss';
import './print.scss';

import { useEffect, useState } from 'react';
import { getApiDataUrl } from './index';
import { authHeader, egeriaFetch } from '@lfai/egeria-js-commons';

export function EgeriaLineageGraphPrint() {
  const { guid, lineageType }: any = useParams();
  const [ isLoading, setIsLoading ] = useState(true);

  const [rawData, setRawData] = useState({nodes: [], edges: []});

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', { ...authHeader() }, {});
    const data = await res.json();

    setRawData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(getApiDataUrl(guid, lineageType));
  }, []);

  return (
    <div className="print-lineage">
      { !isLoading && <div style={{height: '100%'}}>
        <Center>
          <Title order={4}>{lineageType} view for asset with guid: {guid}</Title>
        </Center>
        <HappiGraph rawData={{...rawData}}
                    algorithm={'VISJS'}
                    debug={false}
                    printMode={true}
                    graphDirection={'HORIZONTAL'}
                    selectedNodeId={guid}
                    actions={<HappiGraphActions rawData={{...rawData}}/>}
                    onGraphRender={ () => window.print() } />
      </div> }  
    </div>
  );
}
