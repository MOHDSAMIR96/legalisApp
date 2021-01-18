import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions } from 'react-native';

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

  }

  render() {
    return (

         <View style={{flex:windowHeight*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:windowHeight*1, backgroundColor: "#4170f9"}}></View>
            <View style={{flex:windowHeight*7}}>
                <View style={{flex:windowHeight*3, backgroundColor: "#4170f9"}}></View>
               <View style={{flex:windowHeight*15}}>
                    <Image source={require('../images/logo.png')}  style={styles.img}/>
                    <Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Busco abogado" onPress={() => {this.props.navigation.navigate('Query')}}/>
                    <Text>  </Text>
                    {/*<Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Ya soy cliente" onPress={() => this.props.navigation.navigate('ClientRegister')}/>
                    <Text>  </Text>*/}
                    <Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Soy abogado" onPress={() => this.props.navigation.navigate('LawyerRegister')} />
                </View>

            </View>
            <View style={{flex:windowHeight*1, backgroundColor: "#4170f9"}}></View>
          </View>

    );
  }
}


const styles = StyleSheet.create({
   img: {
   height:230,
   width:230,
   marginLeft: 20,
   },
  welcome: {
    textAlign: 'center',
    margin: 0,
    color: "white",
    fontSize: 40,
  },
});

