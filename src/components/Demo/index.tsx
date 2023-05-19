import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EgeriaAssetCatalog } from '../Assets/Catalog';
import { EgeriaAssetDetails } from '../Assets/Details';
import { EgeriaAssetDetailsPrint } from '../Assets/Details/print';
import { EgeriaGlossary } from '../Glossary';
import { EgeriaLineageGraphRouteWrapper } from '../Lineage/Graph/RouteWrapper';
import { ASSET_CATALOG_PATH, eNavigateTo, VISIBLE_COMPONENTS } from '@lfai/egeria-js-commons';
import { EgeriaApp, EgeriaLogin, EgeriaPageNotFound, RequireAuth, RequirePermissions } from '@lfai/egeria-ui-core';

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
      <Router basename={process.env.REACT_APP_ROOT_PATH}>
        <EgeriaApp single={true} main={
          <Routes>
            <Route path={'/asset-lineage/:guid/vertical-lineage'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.VERTICAL_LINEAGE}
                                  showAccessDenied={true}
                                  element={<EgeriaLineageGraphRouteWrapper />} />
            </RequireAuth>   } />

            <Route path={'/asset-lineage/:guid/end-to-end'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.END_TO_END}
                                  showAccessDenied={true}
                                  element={<EgeriaLineageGraphRouteWrapper />} />
            </RequireAuth> } />

            <Route path={'/asset-lineage/:guid/ultimate-source'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.ULTIMATE_SOURCE}
                                  showAccessDenied={true}
                                  element={<EgeriaLineageGraphRouteWrapper />} />
            </RequireAuth> } />

            <Route path={'/asset-lineage/:guid/ultimate-destination'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.ULTIMATE_DESTINATION}
                                  showAccessDenied={true}
                                  element={<EgeriaLineageGraphRouteWrapper />} />
            </RequireAuth> } />

            <Route path={'/asset-lineage/:guid/:lineageType/print'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_LINEAGE_PRINT}
                                  showAccessDenied={true}
                                  element={<EgeriaLineageGraphPrint />} />
            </RequireAuth> } />

            <Route path={'/assets/:guid/details'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_CATALOG}
                                  showAccessDenied={true}
                                  element={<EgeriaAssetDetails  />} />
            </RequireAuth> } />

            <Route path={'/assets/:guid/details/print'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.ASSETS_DETAILS_PRINT}
                                  showAccessDenied={true}
                                  element={<EgeriaAssetDetailsPrint  />} />
            </RequireAuth> } />

            <Route path={ ASSET_CATALOG_PATH } element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.ASSET_CATALOG}
                                  showAccessDenied={true}
                                  element={<EgeriaAssetCatalog  />} />
            </RequireAuth> }/>

            <Route path={'/glossary'} element={<RequireAuth>
              <RequirePermissions component={VISIBLE_COMPONENTS.GLOSSARY}
                                  showAccessDenied={true}
                                  element={<EgeriaGlossary columnMinWidth={120}/>} />
            </RequireAuth> } />

            <Route path={'/login'} element={
              <EgeriaLogin loginCallback={ () => eNavigateTo('/') }/>
            } />

            <Route path={'/*'} element={<EgeriaPageNotFound />} />
          </Routes>
        } />
      </Router>
    </div>
  );
}
