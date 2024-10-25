import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Slot, withLayoutContext } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView, Text, View } from 'react-native';
import { CryptoNexusContext } from '@/context/CryptoNexusContext';
import api from '@/utils/api';
import CryptoNews from '@/components/CryptoNews';
import { ScrollView } from 'react-native-gesture-handler';

const { Navigator } = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { data, setData } = useContext(CryptoNexusContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const x = await getCryptoPrices();
        const gainers = [...x].sort((a, b) => b.usd_24h_change - a.usd_24h_change);
        const losers = [...x].sort((a, b) => a.usd_24h_change - b.usd_24h_change);
        const hot = [...x].sort((a, b) => b.usd_24h_vol - a.usd_24h_vol);
        setData({gainers,losers,hot});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [])

  const getCryptoPrices = async () => {
    const url = '/simple/price';
    const params = {
      ids: 'bitcoin,arbitrum,ethereum,manta-network,polygon-ecosystem-token,dogecoin,unifi-protocol-dao,keep3rv1,dia-data,liquity,slp,fun',
      vs_currencies: 'usd',
      include_market_cap: 'true',
      include_24hr_vol: 'true',
      include_24hr_change: 'true'
    };

    try {
      const originalObject = await api.get(url, params);
      const _d = Object.entries(originalObject).map(([key, value]) => ({
        name: key,
        ...value
      }));
      console.log('data is - ' + JSON.stringify(_d))
      return _d;
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      throw error;
    }
  };
  return (
    <>
      <Slot />
      <CryptoNews />
    </>
  );
}