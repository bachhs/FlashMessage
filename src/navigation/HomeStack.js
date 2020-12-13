import React, { useContext } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Avatar } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen/AddChatScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import CallScreen from '../screens/CallScreen/CallScreen';
import PhoneScreen from '../screens/CallScreen/PhoneScreen';
import { AuthContext } from './AuthProvider';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  const { user, logout } = useContext(AuthContext);
  const avatar = user.photoURL;

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0c8af9',
          opacity: 0.9
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 25
        }
      }}
    >
      <ChatAppStack.Screen
        name='Home'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton
              icon={() => (
                <Avatar.Image
                  size={36}
                  source={{ uri: avatar }}
                />
              )}
              size={35}
              color='yellow'
              onPress={() => navigation.navigate('Profile', user.uid)}
            />
          ),
          headerRight: () => (
            <IconButton
              icon='message-plus'
              size={22}
              color='#ffffff'
              onPress={() => navigation.navigate('AddChat')}
            />
          )
        })}
      />
      <ChatAppStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
      <ChatAppStack.Screen
        name='EditProfile'
        component={EditProfileScreen}
        options={{ headerShown: true }}
      />
      <ChatAppStack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route, navigation }) => ({
          title: route.params.thread.name,
          headerRight: () => (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <IconButton
                icon='phone'
                size={26}
                color='#ffffff'
                onPress={() =>
                  navigation.navigate('Phone', route.params)
                }
              />
              <IconButton
                icon='video'
                size={26}
                color='#ffffff'
                onPress={() =>
                  navigation.navigate('Call', route.params)
                }
              />
            </View>
          )
        })}
      />
      <ChatAppStack.Screen
        name='Call'
        component={CallScreen}
        options={{ headerShown: false }}
      />
      <ChatAppStack.Screen
        name='Phone'
        component={PhoneScreen}
        options={{ headerShown: false }}
      />
    </ChatAppStack.Navigator>
  );
}

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none'>
      <ModalStack.Screen name='ChatApp' component={ChatApp} />
      <ModalStack.Screen name='AddChat' component={AddChatScreen} />
    </ModalStack.Navigator>
  );
}
