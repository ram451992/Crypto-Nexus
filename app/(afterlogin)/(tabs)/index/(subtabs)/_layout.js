import { SafeAreaView, Text, View } from 'react-native';
import React, { useContext, useEffect, useRef  } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { withLayoutContext } from 'expo-router';

import { CryptoNexusContext } from '@/context/CryptoNexusContext';
import api from '@/utils/api';

const { Navigator } = createMaterialTopTabNavigator();

const TopTabs = withLayoutContext(Navigator);

const _layout = () => {
    const colorScheme = useColorScheme();
    const refreshIntervalRef = useRef(null);

    const { data, setData } = useContext(CryptoNexusContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const all = await getCryptoPrices();
                const gainers = [...all].sort((a, b) => b.usd_24h_change - a.usd_24h_change);
                const losers = [...all].sort((a, b) => a.usd_24h_change - b.usd_24h_change);
                const hot = [...all].sort((a, b) => b.usd_24h_vol - a.usd_24h_vol);
                setData({ all, gainers, losers, hot });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

        // Set up interval for periodic refresh (e.g., every 2 minutes)
        refreshIntervalRef.current = setInterval(fetchData, 2 * 60 * 1000);
        // Clean up interval on component unmount
        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };

    }, [])
    const tracker = [
        'bitcoin',
        'arbitrum',
        'ethereum',
        'manta-network',
        'polygon-ecosystem-token',
        'dogecoin',
        'unifi-protocol-dao',
        'keep3rv1',
        'dia-data',
        'liquity',
        'slp',
        'fun',
        "hooked-protocol",
        "litecoin",
        "dash",
        "fantom",
        "reef",
        "ethereum-classic",
        "polkadot",
        "kusama",
        "theta-token",
        "republic-protocol",
        "filecoin",
        "balancer",
        "zilliqa",
        "prosper",
        "certik",
        "ardor",
        "lumia",
        "turbo",
        "unifi-protocol-dao",
        "audius",
        "chainlink",
        "mantra-dao",
        "beta-finance",
        "vite",
        "cream",
        "burger-swap",
        "raydium"
    ]
    const getCryptoPrices = async () => {
        const url = '/simple/price';
        const params = {
            ids: tracker.join(","),
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
        <TopTabs screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            tabBarIndicatorStyle: { backgroundColor: Colors[colorScheme ?? 'light'].tint },
        }} >
            <TopTabs.Screen name='gainers' options={{ title: "Top Gainers", tabBarLabel: "Top Gainers" }} />
            <TopTabs.Screen name='losers' options={{ title: "Top Losers" }} />
            <TopTabs.Screen name='hot' options={{ title: "Hot(24H Vol)" }} />
        </TopTabs>
    )
}

export default _layout