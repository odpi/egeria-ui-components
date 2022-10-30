import { Accordion, Table } from '@mantine/core';

interface Props {
  title: string;
  items: any;
}

export function EgeriaPropsTable(props: Props) {
  const { title, items } = props;

  const rows = items.map((property: any, index: any) => (
    <tr key={index}>
      <td>{property.key}</td>
      <td>{property.value}</td>
    </tr>
  ));

  return (<>
    <Accordion defaultValue={`${0}`}>
      <Accordion.Item value={title}>
        <Accordion.Control>{title}</Accordion.Control>
        <Accordion.Panel>
          <Table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </>);
}
