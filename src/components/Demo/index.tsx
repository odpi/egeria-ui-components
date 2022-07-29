import { EgeriaLineage } from '../Lineage/EgeriaLineage';

import './index.scss';

export function Demo() {
  return (
    <div className="container">
      <div>
        <h1>EgeriaLineage</h1>

        <EgeriaLineage lineage="end-to-end" />
      </div>
    </div>
  );
}
