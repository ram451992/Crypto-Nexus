import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Stack,
  Text,
  Input,
  Button,
  XStack,
  YStack,
  ScrollView,
  Separator,
  styled,
  Theme,
  Card
} from 'tamagui';
import { Delete, MinusCircle, Plus, RemoveFormatting } from '@tamagui/lucide-icons';

import { useSelector, useDispatch } from 'react-redux';
import { updateCryptoData } from '@/src/features/portfolioSlice'
import utils from '@/utils/utils'

const CryptoPortfolioScreen = () => {
  const cryptoData = useSelector((state) => state.portfolio.cryptoData);
  const dispatch = useDispatch();

  const [coin, setCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    calculateTotalValue();
  }, [cryptoData]);

  const addPortfolioItem = () => {
    if (coin && amount) {
      const newItem = {
        id: Date.now().toString(),
        coin: coin,
        amount: parseFloat(amount),
      };
      dispatch(updateCryptoData([...cryptoData, newItem]));

      setCoin('');
      setAmount('');
    } else {
      Alert.alert('Error', 'Please enter both coin and amount');
    }
  };

  const removePortfolioItem = (id) => {
    dispatch(updateCryptoData(cryptoData.filter(item => item.id !== id)));
    //setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  const calculateTotalValue = () => {
    const total = cryptoData.reduce((sum, item) => sum + item.value, 0);
    setTotalValue(total.toFixed(2));
  };

  const PortfolioItem = styled(XStack, {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '$3',
    paddingHorizontal: '$4',
  });

  return (
    <Theme name="light">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <YStack f={1} backgroundColor="$background">
            <Text fontSize="$8" fontWeight="bold" textAlign="center" marginVertical="$4">
              Manage Manual Crypto Portfolio
            </Text>
            <Card bordered elevate size="$4" padding="$4" marginHorizontal="$4" marginVertical="$4" backgroundColor="$gray7Dark">
            <XStack>
              <Input
                flex={1}
                placeholder="Coin (e.g., BTC)"
                value={coin}
                onChangeText={setCoin}
                marginRight="$2"
              />
              <Input
                flex={1}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                marginRight="$2"
              />
              <Button
                icon={<Plus size="$1" />}
                circular
                onPress={addPortfolioItem}
              />
            </XStack>
            </Card>
            <Card bordered elevate size="$4" padding="$4" marginHorizontal="$4">
              <ScrollView >
                {cryptoData.map((item) => (
                  <>
                    <PortfolioItem key={item.id}>
                      <Text fontSize="$5" fontWeight="600">{utils.toSentenceCase(item.coin)}</Text>
                      <Text fontSize="$5">{item.amount}</Text>
                      <Button
                        icon={<MinusCircle size="$1" color="$red10" />}
                        unstyled
                        onPress={() => removePortfolioItem(item.id)}
                      />
                    </PortfolioItem>
                    <Separator paddingTop="$3" borderColor="$gray7Light" />
                  </>
                ))}
              </ScrollView>
            </Card>

          </YStack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Theme>
  );
};

export default CryptoPortfolioScreen;