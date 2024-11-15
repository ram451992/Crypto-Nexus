import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../../components/HeaderButton';
import { TabBarIcon } from '../../../components/TabBarIcon';
import { CryptoNexusContext, CryptoNexusContextProvider } from '@/context/CryptoNexusContext';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/src/features/authSlice';
import { Avatar, Button } from 'tamagui';
import { LogOut, User } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { YStack } from 'tamagui'

import FloatingMenu from '@/components/FloatingMenuProps';
import { useState } from 'react';

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

function ProfileButton({profilePic}) {
  console.log("profilePic here ")
  console.log(profilePic)  
  return (
    <Avatar ml={20} circular size="$4" onPress={() => router.push({ pathname: "profilepage" })}>
      {profilePic && <Avatar.Image src={profilePic} /> }
      {!profilePic && <Avatar.Image src={require("@/assets/images/profilepic.jpg")} />}
      <Avatar.Fallback bc="$blue10" />
    </Avatar>
  )
}

export default function TabLayout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const menuOptions = ['Option 1', 'Option 2', 'Option 3'];
  const profilePic = useSelector((state) => state.auth.profilePic)
  console.log("profilePic")
  console.log(profilePic)
  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    setIsMenuVisible(true);
  };

  const handleOptionPress = (option: string) => {
    console.log(`Selected option: ${option} for tab: ${activeTab}`);
    setIsMenuVisible(false);
    // Handle the option selection here
  };

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
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} a />,
            headerTitle: () => (<View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{ width: 30, height: 30 }} /><Text style={{ fontSize: 18, paddingHorizontal: 10 }}>CryptoNexus</Text></View>),
            headerTitleAlign: 'center',
            headerShadowVisible: true,
            headerTintColor: 'black',
            headerRight: () => <LogoutButton />,
            headerLeft: () => <ProfileButton profilePic={profilePic}/>,
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: 'Market',
            tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-o" color={color} />,
            headerTitle: () => (<View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{ width: 30, height: 30 }} /><Text style={{ fontSize: 18, paddingHorizontal: 10 }}>CryptoNexus</Text></View>),
            headerTitleAlign: 'center',
            headerShadowVisible: true,
            headerTintColor: 'black',
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: 'Portfolio',
            tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />,
            headerTitle: () => (<View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{ width: 30, height: 30 }} /><Text style={{ fontSize: 18, paddingHorizontal: 10 }}>CryptoNexus</Text></View>),
            headerRight: () => (
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
            ),
            headerTitleAlign: 'center',
            headerShadowVisible: true,
            headerTintColor: 'black',

          }}
        />
        <Tabs.Screen
          name="consultation"
          options={{
            title: 'Consultation',
            tabBarIcon: ({ color }) => <TabBarIcon name="medkit" color={color} />,
            headerTitle: () => (<View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{ width: 30, height: 30 }} /><Text style={{ fontSize: 18, paddingHorizontal: 10 }}>CryptoNexus</Text></View>),
            headerRight: () => (
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
            ),
            headerTitleAlign: 'center',
            headerShadowVisible: true,
            headerTintColor: 'black',

          }}
        /*listeners={{
          tabPress: () => handleTabPress('tab3'),
        }}*/
        />
      </Tabs>
      <FloatingMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        options={menuOptions}
        onOptionPress={handleOptionPress}
      />
    </CryptoNexusContextProvider>
  );
}
