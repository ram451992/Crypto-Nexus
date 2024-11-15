import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '@/tamagui.config';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/src/store/store';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={config}>
          {/*<GestureHandlerRootView style={{ flex: 1 }}>*/}
            <Stack>
              <Stack.Screen name="(afterlogin)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ presentation: 'modal' }} />
            </Stack>
          {/*</GestureHandlerRootView>*/}
        </TamaguiProvider>
      </PersistGate>
    </Provider>
  );
}
