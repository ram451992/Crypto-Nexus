import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#33322e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="portfolio" 
        options={{ 
          title: 'Home'
        }} 
      />
      <Stack.Screen 
        name="portfolio_add" 
        options={{ 
          title: 'Details',
          headerShown:true,
          backgroundColor:"green"
        }} 
      />
    </Stack>
  );
}