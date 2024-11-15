import { Slot } from 'expo-router';
import CryptoNews from '@/components/CryptoNews';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {

    return (
        <View style={styles.container}>
            <View style={styles.componentOne}>
                <Slot  />
            </View>
            <View style={styles.componentTwo}>
                <CryptoNews style={styles.componentTwo} />
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Distribute space between components
    },
    componentOne: {
        height: 320, // Fixed height for the first component
        //backgroundColor: 'lightblue',
        justifyContent: 'center', // Center text vertically
    },
    componentTwo: {
        flex:1,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center', // Center text vertically
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});