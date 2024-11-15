import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Button,
  Image,
  Switch,
  Avatar,
  Sheet,
  useTheme,
  Card
} from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import utils from '@/utils/utils';
import { setProfilePic } from '@/src/features/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user.user.email)
  //const [profilePic, setProfilePic] = useState('https://example.com/default-avatar.png');
  const profilePic = useSelector((state) => state.auth.profilePic)
  console.log("profilePic 22 ")
  console.log(profilePic)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  console.log(profilePic)
  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.CameraType.ImagePicker, // Updated this line
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result)
    console.log(JSON.stringify(result))
    if (!result.canceled) { // Changed from 'cancelled' to 'canceled'
      //setProfilePic(result.assets[0].uri); // Updated to use assets array
      setSheetOpen(false); // Close the Sheet after image selection
      dispatch(setProfilePic(result.assets[0].uri)); // Update Redux state
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <YStack f={1} p="$4" space>
      <Card elevate size="$4" backgroundColor="white" bordered borderColor="$blue10Light">
        <Card.Header padded>
          <XStack alignItems="center" space="$4">
            <Avatar circular size="$10" onPress={() => handleImageUpload()}>
              {profilePic && <Avatar.Image src={profilePic} />}
              {!profilePic && <Avatar.Image src={require("@/assets/images/profilepic.jpg")} />}
              <Avatar.Fallback bc="$blue10" />
            </Avatar>
            <YStack>
              <Text fontSize="$7" fontWeight="bold">{utils.toSentenceCase(user.split("@")[0])}</Text>
              <Text fontSize="$4" color="$gray10">{user}</Text>
            </YStack>
          </XStack>
        </Card.Header>

        <Card.Footer padded>
          <YStack space="$4" width="100%">
            <Text fontSize="$5" fontWeight="bold">Profile Information</Text>
            <YStack space="$2">
              <XStack justifyContent="space-between">
                <Text>Full Name</Text>
                <Text fontWeight="bold">{utils.toSentenceCase(user.split("@")[0])}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text>Email</Text>
                <Text fontWeight="bold">{user}</Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text>Phone</Text>
                <Text fontWeight="bold">+1 234 567 8900</Text>
              </XStack>
            </YStack>

            <Text fontSize="$5" fontWeight="bold" mt="$4">Settings</Text>
            <XStack justifyContent="space-between" alignItems="center">
              <Text>Enable Notifications</Text>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={toggleNotifications}
                size="$4"
                backgroundColor={notificationsEnabled ? '$green8' : '$gray5'}
                borderColor={notificationsEnabled ? '$green9' : '$gray6'}
              >
                <Switch.Thumb
                  animation="quick"
                  backgroundColor={notificationsEnabled ? '$green11' : '$gray11'}
                />
              </Switch>
            </XStack>
          </YStack>
        </Card.Footer>
      </Card>

      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[50]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={<Ionicons name="person" size={24} color={theme.color.get()} />}
            onPress={handleImageUpload}
          >
            Change Profile Picture
          </Button>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
};

export default ProfilePage;