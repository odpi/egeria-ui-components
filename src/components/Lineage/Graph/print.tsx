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
import { getApiDataUrl} from './index';
import { authHeader, egeriaFetch, getFormattedDate, LINEAGE_TYPES} from '@lfai/egeria-js-commons';

export function EgeriaLineageGraphPrint() {
  const { guid, lineageType, includeProcess }: any = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [label, setLabel] = useState<any[]>([]);
  const [group, setGroup] = useState<any[]>([]);

  const [rawData, setRawData] = useState({nodes: [], edges: []});
  const isVerticalLineage = lineageType == LINEAGE_TYPES.VERTICAL_LINEAGE;

  const fetchData = async (uri: string) => {
    const res = await egeriaFetch(uri, 'GET', { ...authHeader() }, {});
    if (res) {
      const data = await res.json();
      setRawData(data);
      setIsLoading(false);
      setLabel(data.nodes.filter((d: { [x: string]: any; }) => d['id'] == guid)[0]['label']);
      setGroup(data.nodes.filter((d: { [x: string]: any; }) => d['id'] == guid)[0]['group']);
   }
  };


  useEffect(() => {
    fetchData(getApiDataUrl(guid, lineageType, includeProcess));
  }, []);

  return (
    <div className="print-lineage">
      { !isLoading && <div className="print-alignment">
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
                    onGraphRender={ () =>
                                    {
                                      const { day, month, year, hour, minutes, seconds } = getFormattedDate(new Date());
                                      document.title =
                                      String.prototype.toLowerCase.apply(
                                        `${lineageType}_${label}_${day}-${month}-${year}_${hour}-${minutes}-${seconds}`);
                                      window.print();
                                    }
                                  } />
      </div> }
    </div>
  );
}
