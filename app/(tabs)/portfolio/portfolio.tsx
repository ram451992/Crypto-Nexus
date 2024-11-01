import React, { useState, useEffect, useContext } from 'react';
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
import { Delete, PlusCircle } from '@tamagui/lucide-icons';
import { useSelector } from 'react-redux';
import FloatingActionButton from '@/components/FloatingActionButton';
import FloatButton from '@/components/FloatButton';
import { CryptoNexusContext } from '@/context/CryptoNexusContext';
import utils from '@/utils/utils'


const CryptoPortfolioScreen = () => {
  const { data } = useContext(CryptoNexusContext);
  const cryptoData = useSelector((state) => state.portfolio.cryptoData)
  const [totalValue, setTotalValue] = useState(0);

  const  getUsdByName = (name) =>  {
    console.log("data in this "+JSON.stringify(data))
    const result = data.all.find(item => item.name === name);
    return result ? result.usd : null; // Returns `null` if the name is not found
  }

  useEffect(() => {
    calculateTotalValue();
  }, [cryptoData]);

  const calculateTotalValue = () => {
    const total = cryptoData.reduce((sum, item) => sum + item.amount*getUsdByName(item.coin), 0);
    setTotalValue(total.toFixed(2));
  };

  const PortfolioItem = styled(XStack, {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '$2.5',
    paddingHorizontal: '$4',
  });

  return (
    <Theme name="light">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {cryptoData.length >0 && <YStack f={1} backgroundColor="$background">
            <Card bordered elevate size="$4" marginHorizontal="$4" paddingBottom="$4">
              <Text backgroundColor="$gray6Dark" fontSize="$7"  borderTopEndRadius={10} fontWeight="bold" color="white" textAlign="center" marginVertical="$1" padding="$2.5">
                Manual Portfolio
              </Text>
              <PortfolioItem>
                <Text fontSize="$4" color="$gray10Light" fontWeight="600">Asset</Text>
                <Text fontSize="$4" color="$gray10Light" >Quantity</Text>
                <Text fontSize="$4" color="$gray10Light" >Value</Text>
              </PortfolioItem>
              <ScrollView>
                {cryptoData.map((item) => (
                  <PortfolioItem key={item.id}>
                    <Text flex={1}  fontSize="$5" fontWeight="600">{utils.toSentenceCase(item.coin)}</Text>
                    <Text flex={1} textAlign='center' fontSize="$5">{item.amount}</Text>
                    <Text flex={1} textAlign='right' fontSize="$5">{utils.formatCurrency(item.amount*getUsdByName(item.coin))}</Text>
                  </PortfolioItem>
                ))}
              </ScrollView>
              <Separator paddingTop="$3" borderColor="$gray7Light" />
              <XStack
                justifyContent="space-between"
                alignItems="center"
                paddingTop="$3"
                paddingHorizontal="$4"
              >
                <Text fontSize="$6" fontWeight="bold">Total Value:</Text>
                <Text fontSize="$6" fontWeight="bold" color="$green10">{utils.formatCurrency(totalValue)}</Text>
              </XStack>
            </Card>


          </YStack>
          }
          {cryptoData.length==0 && <Text alignSelf='center' margin={100} fontSize={20}>Please add portfolio</Text>}
        </KeyboardAvoidingView>
        <FloatButton />
      </SafeAreaView>
    </Theme>
  );
};

export default CryptoPortfolioScreen;