import React, { useContext, useState } from 'react';
import { Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from "@/utils/utils";
import { CryptoNexusContext } from '@/context/CryptoNexusContext';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package

export default function Home() {
  const { data } = useContext(CryptoNexusContext);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data.gainers];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data.gainers, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const renderData = ({ item }) => {
    return (
      <View style={styles.cryptoItem}>
        <Text style={styles.text}>{utils.toSentenceCase(item.name)}</Text>
        <Text style={styles.text}>{item.usd}</Text>
        <TouchableOpacity style={styles.text}>
          <Text style={[item.usd_24h_change > 0 ? styles.greenButton : styles.redButton, styles.greenButtonText]}>
            {Number(item.usd_24h_change).toFixed(2)}%
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderColumnHeader = (title, key) => {
    const isActive = sortConfig.key === key;
    const direction = sortConfig.direction;

    return (
      <TouchableOpacity 
        style={[styles.columnHeader, isActive && styles.activeColumnHeader]} 
        onPress={() => requestSort(key)}
      >
        <Text style={[styles.textGrey, isActive && styles.activeText]}>{title}</Text>
        {isActive && (
          <Ionicons 
            name={direction === 'ascending' ? 'arrow-up' : 'arrow-down'} 
            size={16} 
            color={isActive ? '#007AFF' : 'grey'}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Marketi' }} />
      <View style={{ flex: 1 }}>
        <View style={styles.cryptoItem}>
          {renderColumnHeader('Name', 'name')}
          {renderColumnHeader('Price', 'usd')}
          {renderColumnHeader('Changes', 'usd_24h_change')}
        </View>
        <FlatList data={sortedData} renderItem={renderData} />
      </View>
    </>
  );
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
    textAlign: 'center',
    color: 'grey',
    fontSize: 16,
  },
  greenButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center'
  },
  greenButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  redButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center'
  },
  redButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:"center",
    backgroundColor:'#33322e',
    padding:10
    
  },
  activeColumnHeader: {
    backgroundColor:'#33322e'
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
