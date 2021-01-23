import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

// DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);


export class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
      language: 'java',
      notificationToken: ''
    };
    this.showAsyncStorageData = this.showAsyncStorageData.bind(this);

  }

   componentDidMount(){

    this.showAsyncStorageData(this.props.navigation)

   }

   showAsyncStorageData = async (navigation) =>{
                 try{
                     let name = AsyncStorage.getItem("lawyerSession")
                     .then((value) =>{
                     if(value!==null){

                           this.props.navigation.navigate('LawyerProfile')
                       }
                       else
                       {
                       }
                     })
                 }
                 catch(err){
                     console.log(err)
                     }
                 }


  render() {
    return (

         <View style={{flex:windowHeight*1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
            <View style={{flex:windowHeight*2}}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#4170f9'}}>
                    <Image resizeMode="cover" source={require('../images/logo.png')}  style={styles.img}/>
                </View>
            </View>
            <View style={{flex:windowHeight*1, backgroundColor: "#4170f9",alignItems: 'stretch', padding: '10%'}}>
                <Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Busco abogado" onPress={() => {this.props.navigation.navigate('Query')}}/>
                {/*<Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Ya soy cliente" onPress={() => this.props.navigation.navigate('ClientRegister')}/>
                <Text>  </Text>*/}
                <Text>  </Text>
                <Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Soy abogado" onPress={() => this.props.navigation.navigate('LawyerRegister')} />
            </View>
         </View>

    );
  }
}


const styles = StyleSheet.create({
   img: {
   height:windowHeightPercentUnit*45,
   width: '100%',

   },
  welcome: {
    textAlign: 'center',
    margin: 0,
    color: "white",
    fontSize: 40,
  },

});

