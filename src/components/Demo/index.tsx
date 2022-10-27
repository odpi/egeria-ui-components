import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EgeriaAssetCatalog } from '../Assets/Catalog';
import { EgeriaAssetDetails } from '../Assets/Details';
import { EgeriaAssetDetailsPrint } from '../Assets/Details/print';
import { EgeriaGlossary } from '../Glossary';
import { EgeriaLineageGraphRouteWrapper } from '../Lineage/Graph/RouteWrapper';

import './index.scss';

export function Demo() {
  return (
    <div className="container">
      <Router basename={process.env.REACT_APP_ROOT_PATH}>
        <Routes>
          <Route path={`/asset-lineage/:guid/:lineageType`} element={<EgeriaLineageGraphRouteWrapper apiUrl={'http://localhost:9000'} />} />
          <Route path={'/assets/:guid/details'} element={<EgeriaAssetDetails apiUrl={'http://localhost:9000'}/>} />
          <Route path={'/assets/:guid/details/print'} element={<EgeriaAssetDetailsPrint apiUrl={'http://localhost:9000'}/>} />
          <Route path={'/assets/catalog'} element={<EgeriaAssetCatalog apiUrl={'http://localhost:9000'} />} />
          <Route path={'/glossary'} element={<EgeriaGlossary />} />
        </Routes>
      </Router>
    </div>
  );
}
