import LoginScreen from "@/app/loginscreen";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Redirect, useRouter } from 'expo-router';
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  {/*useEffect(()=>{
    setTimeout(()=>router.navigate({pathname:'/dashboard'}),500)
  },[])*/}

    return <Redirect href="/loginscreen" />;
}

const styles = StyleSheet.create({
  link: {
    backgroundColor: '#585858',
    padding: 15,
    borderRadius: 10,
    color: 'black',
    borderWidth: 3
  },
  linkText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '400'
  }
})