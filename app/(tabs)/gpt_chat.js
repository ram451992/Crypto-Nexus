import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Input, Button, Text, YStack, XStack, styled } from 'tamagui';
import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: "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",
  dangerouslyAllowBrowser: true // Only use this for client-side applications
});

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { role: 'user', content: inputText };
    setMessages([...messages, userMessage]);
    setInputText('');

    try {
      const response = await client.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages: [...messages, userMessage],
      });

      const aiMessage = { role: 'assistant', content: response.choices[0].message.content };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <YStack f={1} padding="$4" space>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} roleStyle={msg.role}>
            {msg.content}
          </MessageBubble>
        ))}
      </ScrollView>
      <XStack space>
        <Input
          flex={1}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button onPress={sendMessage}>Send</Button>
      </XStack>
    </YStack>
  );
};

const MessageBubble = styled(Text, {
    padding: '$2',
    borderRadius: '$2',
    marginBottom: '$2',
    variants: {
      roleStyle: {
        user: {
          backgroundColor: '$blue4Dark',
          alignSelf: 'flex-end',
          color:'white',
          flexGrow: 1,          // Allows it to grow
          maxWidth: '80%',      // Limits it to 3/4 of the screen width
        },
        assistant: {
          backgroundColor: '$gray5',
          alignSelf: 'flex-start',
          color:'white',
          flexGrow: 1,          // Allows it to grow
          maxWidth: '80%',      // Limits it to 3/4 of the screen width
        },
      },
    },
  });
  

export default ChatScreen;