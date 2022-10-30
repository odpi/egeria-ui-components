import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EgeriaAssetCatalog } from '../Assets/Catalog';
import { EgeriaAssetDetails } from '../Assets/Details';
import { EgeriaAssetDetailsPrint } from '../Assets/Details/print';
import { EgeriaGlossary } from '../Glossary';
import { EgeriaLineageGraphRouteWrapper } from '../Lineage/Graph/RouteWrapper';
import { ASSET_CATALOG_PATH } from '@lfai/egeria-js-commons';

import './index.scss';

console.log('API_URL', process.env.REACT_APP_API_URL);

export function Demo() {
  return (
    <div className="container">
      <Router basename={process.env.REACT_APP_ROOT_PATH}>
        <Routes>
          <Route path={'/asset-lineage/:guid/:lineageType'} element={<EgeriaLineageGraphRouteWrapper  />} />
          <Route path={'/assets/:guid/details'} element={<EgeriaAssetDetails />} />
          <Route path={'/assets/:guid/details/print'} element={<EgeriaAssetDetailsPrint />} />
          <Route path={ ASSET_CATALOG_PATH } element={<EgeriaAssetCatalog  />} />
          <Route path={'/glossary'} element={<EgeriaGlossary />} />
        </Routes>
      </Router>
    </div>
  );
}
