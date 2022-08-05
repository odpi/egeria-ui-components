import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EgeriaLineageGraphRouteWrapper } from '../Lineage/Graph/RouteWrapper';

import './index.scss';

export function Demo() {
  return (
    <div className="container">
      <Router basename={process.env.REACT_APP_ROOT_PATH}>
        <Routes>
          <Route path={`/asset-lineage/:guid/:lineageType`} element={<EgeriaLineageGraphRouteWrapper apiUrl={'http://localhost:9000'} />} />
        </Routes>
      </Router>
    </div>
  );
}
