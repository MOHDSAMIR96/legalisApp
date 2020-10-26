import React, { Component } from 'react';
import { createAppContainer, TabNavigator  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux';
import store from './redux/store.js'


//IMPORTATION OF VIEW COMPONENTS
import Query from './clientViews/query.js';
import {Home} from './clientViews/home.js';
import {QueryChat} from './clientViews/queryChat.js';
import ClientRegister from './clientViews/register.js';
import ClientProfile from './clientViews/clientProfile.js';
import CaseChat from './clientViews/caseChat.js';
import VoiceRecognition from './specialComponents/VoiceRecognition.js';
import LawyerRegister from './lawyerView/lawyerRegister.js';
import ThanksMsg from './lawyerView/thanksMsg.js';
import LawyerProfile from './lawyerView/lawyerProfile.js';
import LawyerCaseChat from './lawyerView/lawyerCaseChat.js';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


const AppNavigator = createStackNavigator(//STACKNAVIGATOR TIENE PROBLEMAS CON EL PROVIDER DE REDUX, PUES NO LO TOMA COMO UN COMPONENTE
  {
    Home: Home,
    QueryChat: QueryChat,
    Query: Query,
    ClientRegister: ClientRegister,
    ClientProfile: ClientProfile,
    CaseChat: CaseChat,
    VoiceRecognition: VoiceRecognition,

    LawyerRegister: LawyerRegister,
    ThanksMsg: ThanksMsg,
    LawyerProfile: LawyerProfile,
    LawyerCaseChat: LawyerCaseChat,
  },
  {
    initialRouteName: 'Home',
  }
);





const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return(
        <Provider store={store}>
            <AppContainer />
        </Provider>

    )
  }
}
