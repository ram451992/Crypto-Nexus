import { Stack } from "expo-router";
import { CryptoNexusContext, CryptoNexusContextProvider } from '../context/CryptoNexusContext';
import { Image, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function RootLayout() {
  return (
    <CryptoNexusContextProvider>
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }}
        />
        <Stack.Screen name="loginscreen" />
        <Stack.Screen name="dashboard" options={{
          headerTitle:()=> (<View style={{flexDirection:'row', alignContent:'center',alignItems:'center'}}><Image source={require('@/assets/images/cryptonexus-logo.png')} style={{width:30,height:30}} /><Text style={{fontSize:18, paddingHorizontal:10}}>CryptoNexus</Text></View>),
          //headerLeft:()=> (<Image source={require('@/assets/images/cryptonexus-logo.png')} style={{width:30,height:30}} />),
          headerRight:()=> (<Image source={require('@/assets/images/settings.png')} style={{width:30,height:30}} />),
          headerTitleAlign:'center',
          headerShadowVisible:true,
          headerTintColor: Colors.DarkBlue,
    headerStyle: {
      backgroundColor: "#dee0e3"
    },
        }} />
      </Stack>
    </CryptoNexusContextProvider>
  );
}
