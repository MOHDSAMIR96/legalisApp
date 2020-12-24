import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CryptoJS from "react-native-crypto-js";



export class Home extends Component {

constructor(props) {
    super(props);

    this.prueba = this.prueba.bind(this);
  }

  prueba(){

      var AES = require("react-native-crypto-js").AES;
      var SHA256 = require("react-native-crypto-js").SHA256;

      //let ciphertext = CryptoJS.SHA256("meesage");
      console.log(CryptoJS)

      const requestPath = encodeURIComponent('/api/transaction');

      //ARRANGING THE PARAMETERS
      const data = {
        email: 'gnpiedrabuena@defensa-ciudadana.com',
        urlreturn: 'https://you_website/url_return',
        urlnotify: 'https://you_website/url_notify',
        order:  11,
        subject: 'pago de prueba',
        amount: 5000,
        payment: 1
      };

      const orderedData = {};
      Object.keys(data).sort().forEach(function(key) {
        orderedData[key] = data[key];
      });

      //TURN PARAMS ON URL FORMAT
      const arrayConcat = new URLSearchParams(orderedData).toString();

      //CONCATENATING PARAMETERS WITH ENDPOINT
      const concat = requestPath + "&" + arrayConcat;

      // SIGN
      //const sign = CryptoJS.HmacSHA256(concat, "d7243a0609351f4e7024ad497790efce").toString();

      //console.log(sign)



  }


  render() {
    return (

         <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}><Text onPress={this.prueba}>hola</Text>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
            <View style={{flex:7}}>
                <View style={{flex:3, backgroundColor: "#4170f9"}}></View>
               <View style={{flex:15}}>
                    <Image source={require('../images/logo.png')}  style={styles.img}/>
                    <Button color="#747A87" title="Busco abogado" onPress={() => {this.props.navigation.navigate('Query')}}/>
                    <Text>  </Text>
                    <Button color="#747A87" title="Ya soy cliente" onPress={() => this.props.navigation.navigate('ClientRegister')}/>
                    <Text>  </Text>
                    <Button color="#747A87" title="Soy abogado" onPress={() => this.props.navigation.navigate('LawyerRegister')} />
                </View>

            </View>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
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

