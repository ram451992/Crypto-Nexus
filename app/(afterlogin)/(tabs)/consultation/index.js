import React, { useEffect, useState } from 'react';
import { Button, Card, H1, H2, Paragraph, XStack, YStack, Text, Dialog, Sheet, ScrollView, H3 } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '@/src/features/tokenBalanceSlice';
import { router } from 'expo-router';
import { updateBalanceInFirebase } from '@/src/features/tokenBalanceSlice';

const HealthConsultationPage = () => {

    const dispatch = useDispatch();

    const { tokenBalance, status, error } = useSelector((state) => state.tokenBalance);
    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);


    const handleUpdateBalance = (newBalance) => {
        setShowConfirmation(false)
        setshowSuccessPayment(true)
        dispatch(updateBalanceInFirebase(tokenBalance-30));
        setTimeout(()=>{setshowSuccessPayment(false);router.navigate("/consultation/gpt_chat")},1000)
      };

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessPayment, setshowSuccessPayment] = useState(false);

    const consultationFee = 30;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <YStack f={1} p="$4" space>
                    {/* Header 
                    <XStack jc="space-between" ai="center" mb="$4">
                        <Ionicons name="menu" size={24} color="black" />
                        <H1>Health Services</H1>
                        <Ionicons name="notifications" size={24} color="black" />
                    </XStack>
*/}
                    {/* Balance */}
                    <Card elevate bordered p="$4" mb="$4">
                        <H3 ta="center">Your Balance: {tokenBalance} Nexus Tokens</H3>
                    </Card>

                    {/* Health Consultation Card */}
                    <Card
                        elevate
                        size="$4"
                        bordered
                        animation="bouncy"
                        scale={0.9}
                        hoverStyle={{ scale: 0.925 }}
                        pressStyle={{ scale: 0.875 }}
                    >
                        <Card.Header padded>
                            <H3>Health Consultation</H3>
                        </Card.Header>
                        <Card.Footer padded>
                            <YStack space="$2" w="100%">
                                <Paragraph theme="alt2">
                                    Access professional health advice from AI doctors. Our health consultation service
                                    provides personalized guidance for your well-being.
                                </Paragraph>
                                <Paragraph theme="alt5" mt="$3" fontSize={16}>
                                    Fee per consultation: 30 Nexus Tokens
                                </Paragraph>
                                <Button
                                    fontSize={19}
                                    mt="$4"
                                    theme="active"
                                    onPress={() => setShowConfirmation(true)}
                                >
                                    Access Service
                                </Button>
                            </YStack>
                        </Card.Footer>
                    </Card>

                    {/* Footer */}
                    <YStack mt="$6" ai="center">
                        <Text color="$gray10">© 2024 Crypto Nexus Services</Text>
                        {/*<XStack space mt="$2">
                            <Text color="$blue10">Terms of Service</Text>
                            <Text color="$blue10">Privacy Policy</Text>
                        </XStack>*/}
                    </YStack>
                </YStack>
            </ScrollView>

            {/* Confirmation Dialog */}
            <Dialog
                modal
                open={showConfirmation}
                onOpenChange={(open) => {
                    setShowConfirmation(open);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay
                        key="overlay"
                        animation="quick"
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <Dialog.Content
                        bordered
                        elevate
                        key="content"
                        animation={[
                            'quick',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        space
                    >
                        <Dialog.Title fontSize={22}>Confirm Payment</Dialog.Title>
                        <Dialog.Description fontSize={15}>
                            Please confirm your payment for the Health Consultation service.
                        </Dialog.Description>
                        <YStack space="$1" >
                            <XStack jc="space-around">
                                <Text color="white">Your Balance:</Text>
                                <Text color="white">{tokenBalance} Nexus Tokens</Text>
                            </XStack>
                            <XStack jc="space-around">
                                <Text color="white">Consultation Fee:</Text>
                                <Text color="white">{consultationFee} Nexus Tokens</Text>
                            </XStack>
                            <XStack jc="space-around">
                                <Text fontWeight="bold" color="white">Remaining Balance:</Text>
                                <Text fontWeight="bold" color="white">{tokenBalance - consultationFee} Nexus Tokens</Text>
                            </XStack>
                        </YStack>
                        <XStack space="$4" jc="flex-end">
                            <Dialog.Close asChild>
                                <Button theme="alt1">Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <Button theme="active" 
                                    // Handle payment logic here
                                    onPress={() => 
                                    // Handle payment logic here
                                    {
                                        console.log('Payment confirmed');
                                        handleUpdateBalance()
                                    }
                                }>
                                    Confirm Payment
                                </Button>
                            </Dialog.Close>
                        </XStack>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>


            {/* Confirmation Dialog */}
            <Dialog
                modal
                open={showSuccessPayment}
                onOpenChange={(open) => {
                    setshowSuccessPayment(open);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay
                        key="overlay"
                        animation="quick"
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <Dialog.Content
                        bordered
                        elevate
                        key="content"
                        animation={[
                            'quick',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                        space
                    >
                        <Dialog.Title fontSize={22}>Payment Success</Dialog.Title>
                        <Dialog.Description>
                            Thanks for the payment. Redirecting to AI doctor consultation room.
                        </Dialog.Description>
                        {/*
                        <XStack space="$4" jc="flex-end">
                            <Dialog.Close asChild>
                                <Button theme="alt1">Cancel</Button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <Button theme="active" onPress={() => {
                                    // Handle payment logic here
                                    console.log('Payment confirmed');
                                    setShowConfirmation(false)
                                    setshowSuccessPayment(true)
                                    router.navigate("/consultation/gpt_chat")
                                }}>
                                    Confirm Payment
                                </Button>
                            </Dialog.Close>
                        </XStack>
                        */}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </SafeAreaView>
    );
};

export default HealthConsultationPage;