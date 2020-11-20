import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen/AddChatScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import CallScreen from '../screens/CallScreen/CallScreen';
import { AuthContext } from './AuthProvider';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  const { user, logout } = useContext(AuthContext);

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
        name='Chats'
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon='message-plus'
              size={22}
              color='#ffffff'
              onPress={() => navigation.navigate('AddChat')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon='account-circle'
              size={35}
              color='yellow'
              onPress={() => logout()}
            />
          ),

        })}
      />
      <ChatAppStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ChatAppStack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route, navigation }) => ({
          title: route.params.thread.name,
          headerRight: () => (
            <IconButton
              icon='message-plus'
              size={22}
              color='#ffffff'
              onPress={() =>
                navigation.navigate('Call', route.params)
              }
            />
          )
        })}
      />
      <ChatAppStack.Screen
        name='Call'
        component={CallScreen}
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
