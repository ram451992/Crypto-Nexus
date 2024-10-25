import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CryptoNews = () => {
    const [articles, setArticles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Replace this URL with your actual API endpoint
                const response = await axios.get('https://run.mocky.io/v3/a85ae89f-67a9-40a8-abc2-af4f5c04da01');
                setArticles(response.data.articles);
                setIsLoaded(true);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const renderArticle = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.img }} style={{ width: 110, resizeMode: 'cover' }} />
            <View style={styles.cardTextContent}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[styles.body]}>
                    <Text style={styles.summary}>{item.summary}</Text>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                        <Text style={styles.source}>Source: {item.source}</Text>
                        <Text style={styles.date}>Published at: {new Date(item.published_at).toLocaleString()}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
    const Separator = () => <View style={styles.separator} />;

    return (
        <View style={{ maxHeight: '52%', margin: 5, alignContent:'center' }}>
            <Text style={styles.header}>Top News</Text>
            {isLoaded && (<FlatList
                data={articles}
                renderItem={renderArticle}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={Separator}
            />) }
            {!isLoaded && (<ActivityIndicator/>)}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 4,
        backgroundColor: '#ebe5e4'
    },
    card: {
        padding: 3,
        marginRight:105,
        flexDirection: 'row',
    },
    cardTextContent: {
        paddingLeft: 10
    },
    body: {
    },
    title: {
        fontSize: 17,
        color: '#333',
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    summary: {
        marginBottom: 4,
        fontSize: 14,
        color: '#333',
    },
    source: {
        fontSize: 12,
        color: '#888',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#c2bebe',
      },
});

export default CryptoNews;