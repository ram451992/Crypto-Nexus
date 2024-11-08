import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Input, Button, Text, YStack, XStack, styled } from 'tamagui';
import { OpenAI } from 'openai';
import getEnvVars from '../../env';
import { Trash2 } from '@tamagui/lucide-icons';
import systemPrompt from '@/src/config/systemPrompt';

import { useSelector } from 'react-redux';

const { GROQ_API_KEY } = getEnvVars();

const client = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Only use this for client-side applications
});

const defaultPrompts = [
  "I have neck pain since 2 days?",
  "How can I manage my allergy?",
  "Why is my heart beating so fast?",
  "Why do I have a bad headache?",
  "I am feeling very dizzy since morning. Why?"
];

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [typingMessage, setTypingMessage] = useState('');
  const user = useSelector((state) => state.auth.user.user.email)
  
  const sendMessage = async (customInput) => {
    const messageToSend = customInput || inputText;
    let userMessage = { role: 'user', content: messageToSend };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    let userMessageAPI = messages.length==0?{ role: 'user', content: `Hi, I am ${user}. ${messageToSend}`}:userMessage ;
    setInputText('');

    try {
      const response = await client.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...messages,
          userMessageAPI,
        ],
      });

      const aiMessageContent = response.choices[0].message.content;
      simulateTyping(aiMessageContent);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const simulateTyping = (text) => {
    setTypingMessage('');
    const words = text.split(' ');
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < words.length) {
        setTypingMessage((prev) => prev + (index > 0 ? ' ' : '') + words[index]);
        index++;
      } else {
        clearInterval(intervalId);
        setTypingMessage('');
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: text },
        ]);
      }
    }, 20); // Adjust typing speed here
  };

  return (
    <YStack f={1} padding="$4" space>
      {messages.length > 0 && (
        <Trash2 size={30} color="red" alignSelf="flex-end" onPress={() => setMessages([])} />
      )}
      {messages.length === 0 && (
        <YStack space alignItems="center" justifyContent="center">
          <Text fontSize="$5" color="$red1" fontWeight="bold" marginBottom="$2">
            Select a prompt to start:
          </Text>
          {defaultPrompts.map((prompt, index) => (
            <Button key={index} style={{ width: '70%' }} onPress={() => sendMessage(prompt)} marginBottom="$2">
              {prompt}
            </Button>
          ))}
        </YStack>
      )}

      <ScrollView style={{ flex: 1, maxWidth: "100%" }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} roleStyle={msg.role}>
            {msg.content}
          </MessageBubble>
        ))}
        {typingMessage && (
          <MessageBubble role="assistant" roleStyle="assistant">
            {typingMessage}
          </MessageBubble>
        )}
      </ScrollView>

      <XStack space>
        <Input
          flex={1}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button onPress={() => sendMessage(inputText)}>Send</Button>
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
        color: 'white',
        flexGrow: 1,
        maxWidth: '80%',
      },
      assistant: {
        backgroundColor: '$gray5',
        alignSelf: 'flex-start',
        color: 'white',
        flexGrow: 1,
        maxWidth: '80%',
      },
    },
  },
});

export default ChatScreen;