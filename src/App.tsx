import React from 'react';
import {
  Provider as PaperProvider,
  DarkTheme
} from 'react-native-paper';
import {
  StatusBar,
} from 'react-native';
import { myTheme } from './styles';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { VideoView } from './screens/VideoView';
import { HomeScreen } from './screens/HomeView';
import { LoginView } from './screens/Login';
import { ShowListView } from './screens/ShowListView';


const materialTheme = Object.assign({}, DarkTheme, myTheme);

const RootStack = createStackNavigator(
  {
    Video: { screen: VideoView },
    Home: { screen: HomeScreen },
    Login: { screen: LoginView },
    ShowList: { screen: ShowListView },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

//const AppContainer = createAppContainer(appNavigator);

function App() {
  return (
    <PaperProvider theme={materialTheme}>
      <StatusBar
        backgroundColor="#212121"
        barStyle="light-content"
      />
      <RootStack />
    </PaperProvider >
  );
}

export {
  App
};
