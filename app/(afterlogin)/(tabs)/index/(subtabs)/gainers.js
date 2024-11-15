import { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import api from "@/utils/api"
import { CryptoNexusContext  } from "@/context/CryptoNexusContext"
import utils from "@/utils/utils"

export default Dashboard = () => {

  const { data } = useContext(CryptoNexusContext);
    const renderData = ({ item }) => {
 // const renderData = ( item ) => {
    return (
            <View style={styles.cryptoItem}>
              <Text style={styles.text}>{utils.toSentenceCase(item.name)}</Text>
              <Text style={styles.text}>{item.usd}</Text>
              <TouchableOpacity style={styles.text}>
                <Text style={[styles.greenButton,styles.greenButtonText]}>
                  {Number(item.usd_24h_change).toFixed(2)}%
                </Text>
              </TouchableOpacity>
            </View>
          );
    }
    // cryptoApi.js or within api.js


    return (<View style={{ flex: 1 }}>
    <View style={styles.cryptoItem}>
      <Text style={styles.textGrey}>Name</Text>
      <Text style={styles.textGrey}>Price</Text>
      <Text style={styles.textGrey}>Change</Text>
    </View>
        {<FlatList data={data.gainers.slice(0, 5)} renderItem={renderData} /> }
        {/*data.gainers.slice(0, 5).map((item, index)=>(renderData(item, index)))*/}
    </View>)

}

const styles = StyleSheet.create({
    cryptoItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 7,
    },
    text: {
      flex: 1,
      textAlign: 'center',
    },
    textGrey: {
      flex: 1,
      textAlign: 'center',
      color:'grey',
      fontSize:14
    },
    greenButton: {
      backgroundColor: 'green',
      padding: 8,
      borderRadius: 5,
      alignSelf:'center'   
    },
    greenButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  