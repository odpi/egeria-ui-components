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
import { getApiDataUrl, LINEAGE } from './index';
import { authHeader, egeriaFetch } from '@lfai/egeria-js-commons';

export function EgeriaLineageGraphPrint() {
  const { guid, lineageType }: any = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [label, setLabel] = useState<any[]>([]);
  const [group, setGroup] = useState<any[]>([]);

  const [rawData, setRawData] = useState({nodes: [], edges: []});
  const isVerticalLineage = lineageType == LINEAGE.VERTICAL_LINEAGE;

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', { ...authHeader() }, {});
    const data = await res.json();

    setRawData(data);
    setIsLoading(false);
    setLabel(data.nodes.filter((d: { [x: string]: any; }) => d['id'] == guid)[0]['label']);
    setGroup(data.nodes.filter((d: { [x: string]: any; }) => d['id'] == guid)[0]['group']);
  };

  useEffect(() => {
    fetchData(getApiDataUrl(guid, lineageType));
  }, []);

  return (
    <div className="print-lineage">
      { !isLoading && <div style={{height: '100%'}}>
        <Center>
          <Title order={4}>{lineageType} view for {group}: {label}</Title>
        </Center>
        <HappiGraph rawData={{...rawData}}
                    algorithm={(isVerticalLineage) ? 'ELK' : 'VISJS'}
                    debug={false}
                    printMode={true}
                    graphDirection={(isVerticalLineage) ? 'VERTICAL' : 'HORIZONTAL'}
                    selectedNodeId={guid}
                    actions={<HappiGraphActions rawData={{...rawData}}/>}
                    onGraphRender={ () => {
                                            document.title =
                                              String.prototype.toLowerCase.apply(
                                                lineageType + '-' + label + '-' +
                                                new Date().toLocaleString('nl-NL').replace(/-|:| /gi,''));
                                            window.print();
                                          }
                                  } />
      </div> }
    </div>
  );
}
