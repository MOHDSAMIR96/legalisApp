<<<<<<< HEAD
import React, { Component } from 'react';
import { Platform } from 'react-native'
=======
import React, {Component, useState, useEffect}  from 'react';
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6
import { createAppContainer, TabNavigator  } from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux';
import store from './redux/store.js'
import AsyncStorage from '@react-native-community/async-storage'


//IMPORTATION OF VIEW COMPONENTS
import Query from './clientViews/query.js';
import {Home} from './clientViews/home.js';
import {QueryChat} from './clientViews/queryChat.js';
import ClientRegister from './clientViews/register.js';
import ClientProfile from './clientViews/clientProfile.js';
import CaseChat from './clientViews/caseChat.js';
import VoiceRecognition from './specialComponents/VoiceRecognition.js';
import VideoComponent from './specialComponents/videoComponent.js';
import LawyerRegister from './lawyerView/lawyerRegister.js';
import ThanksMsg from './lawyerView/thanksMsg.js';
import LawyerProfile from './lawyerView/lawyerProfile.js';
import LawyerCaseChat from './lawyerView/lawyerCaseChat.js';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});


const AppNavigator = createStackNavigator(
  {
    Home: Home,
    QueryChat: QueryChat,
    Query: Query,
    ClientRegister: ClientRegister,
    ClientProfile: ClientProfile,
    CaseChat: CaseChat,
    VoiceRecognition: VoiceRecognition,
    videoComponent: VideoComponent,

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

export default function App() {

    return(
        <Provider store={store}>
            <AppContainer />
        </Provider>

    )

}
