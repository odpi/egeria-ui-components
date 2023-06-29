import { JWTInterface, token } from '@lfai/egeria-js-commons';
import { Avatar, List, Paper, Text, Title } from '@mantine/core';

export function EgeriaProfile() {
  const decodedToken: JWTInterface | null = token.decodedObject();

  return (<>
     { decodedToken && <><Paper radius='md' withBorder p='lg' mb='md'>
      <Avatar size={120} radius={120} mx='auto' />

      <Text ta='center' fz='lg' weight={500} mt='md'>
        { decodedToken?.sub }
      </Text>
    </Paper>

    <Paper radius='md' withBorder p='lg' mb='md'>
      <Title order={2}>Scopes</Title>

      <List ml='md'>
        { decodedToken?.scope.map((component: any, index: number) => {
          return <List.Item key={index}><Text>{component}</Text></List.Item>
        }) }
      </List>
    </Paper>

    <Paper radius='md' withBorder p='lg' mb='md'>
      <Title order={2}>Visible components</Title>

      <List ml='md'>
        { decodedToken?.visibleComponents.map((component: any, index: number) => {
          return <List.Item key={index}><Text>{component}</Text></List.Item>
        }) }
      </List>
    </Paper></> }
  </>);
}
