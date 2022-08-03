import { EgeriaLineageGraph } from '../Lineage/Graph';


import { mockData } from "../Lineage/Graph/mockData";
import './index.scss';

const rawData = {
  ...mockData
};

export function Demo() {
  return (
    <div className="container">
      <EgeriaLineageGraph lineageType="end-to-end"
                          rawData={rawData}
                          selectedNodeId="term@68e36496-7167-4af7-abdd-a0cd36e24084:6662c0f2.e1b1ec6c.66k78i6du.uchsna1.rn2epa.rfn2fjqf7h4qvmt5lflm8" />
    </div>
  );
}
