/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => ChatScreen);