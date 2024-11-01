import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { CryptoNexusContext, CryptoNexusContextProvider } from '@/context/CryptoNexusContext';

import { useDispatch } from 'react-redux';
import { logout } from '@/src/features/authSlice';
import { Button } from 'tamagui';
import { LogOut } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { YStack } from 'tamagui'

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');  // Redirect to the root route
  };


  
  return (
    <YStack
      pressStyle={{ opacity: 0.7 }}
      onPress={handleLogout}
      padding="$4"
    >
      <LogOut size="$11.5" color="$gray10Dark" />
    </YStack>
  )
}

export default function TabLayout() {
  console.log("here in (tabs) layout")
  return (
    <CryptoNexusContextProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} a/>,
            headerTitle:()=> (<View style={{flexDirection:'row', alignContent:'center',alignItems:'center'}}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{width:30,height:30}} /><Text style={{fontSize:18, paddingHorizontal:10}}>CryptoNexus</Text></View>),
            headerTitleAlign:'center',
            headerShadowVisible:true,
            headerTintColor: 'black',
            headerRight: () => <LogoutButton/>,
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-o" color={color} />,
            headerTitle:()=> (<View style={{flexDirection:'row', alignContent:'center',alignItems:'center'}}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{width:30,height:30}} /><Text style={{fontSize:18, paddingHorizontal:10}}>CryptoNexus</Text></View>),
            headerTitleAlign:'center',
            headerShadowVisible:true,
            headerTintColor: 'black',
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: 'Portfolio',
            tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
            headerTitle:()=> (<View style={{flexDirection:'row', alignContent:'center',alignItems:'center'}}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{width:30,height:30}} /><Text style={{fontSize:18, paddingHorizontal:10}}>CryptoNexus</Text></View>),
            headerRight: () => (
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
            ),
            headerTitleAlign:'center',
            headerShadowVisible:true,
            headerTintColor: 'black',

          }}
        />
      </Tabs>
    </CryptoNexusContextProvider>
  );
}
