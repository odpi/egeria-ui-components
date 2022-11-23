import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EgeriaAssetCatalog } from '../Assets/Catalog';
import { EgeriaAssetDetails } from '../Assets/Details';
import { EgeriaAssetDetailsPrint } from '../Assets/Details/print';
import { EgeriaGlossary } from '../Glossary';
import { EgeriaLineageGraphRouteWrapper } from '../Lineage/Graph/RouteWrapper';
import { ASSET_CATALOG_PATH, goHome } from '@lfai/egeria-js-commons';
import { EgeriaApp, EgeriaLogin } from '@lfai/egeria-ui-core';

import './index.scss';
import { EgeriaLineageGraphPrint } from '../Lineage/Graph/print';

console.log('API_URL', process.env.REACT_APP_API_URL);

export function Demo() {
  const queryParams = window.location.search
                        .replace('?', '')
                        .split('&')
                        .map((k) => {
                          const data = k.split('=');
                          return {
                            [data[0]]: data[1]
                          };
                        });
                        
  const fullscreen = queryParams.filter((o) => Object.keys(o).includes('fullscreen')).length > 0;

  return (
    <div className={fullscreen ? 'custom-full' : 'container'}>
      <EgeriaApp single={true} main={
        <Router basename={process.env.REACT_APP_ROOT_PATH}>
          <Routes>
            <Route path={'/asset-lineage/:guid/:lineageType'} element={<EgeriaLineageGraphRouteWrapper  />} />
            <Route path={'/asset-lineage/:guid/:lineageType/print'} element={<EgeriaLineageGraphPrint />} />
            <Route path={'/assets/:guid/details'} element={<EgeriaAssetDetails />} />
            <Route path={'/assets/:guid/details/print'} element={<EgeriaAssetDetailsPrint />} />
            <Route path={ ASSET_CATALOG_PATH } element={<EgeriaAssetCatalog  />} />
            <Route path={'/glossary'} element={<EgeriaGlossary columnMinWidth={120}/>} />

            <Route path={'/login'} element={<EgeriaLogin loginCallback={ goHome }/>} />
          </Routes>
        </Router> } />
    </div>
  );
}
