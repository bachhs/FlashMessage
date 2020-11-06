import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen/AddChatScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import CallScreen from '../screens/CallScreen/CallScreen';
import { AuthContext } from './AuthProvider';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  const { logout } = useContext(AuthContext);

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0c8af9'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 20
        }
      }}
    >
      <ChatAppStack.Screen
        name='Home'
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
              icon='logout-variant'
              size={22}
              color='#ffffff'
              onPress={() => logout()}
            />
          )
        })}
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
              onPress={() => navigation.navigate('Call', route.params)
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
