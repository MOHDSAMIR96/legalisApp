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
       let url = "https://sandbox.flow.cl/api/payment/getStatus";
       let secretKey = "734f08c367a3dfc6aaf0cd4b505dd5201c7114b6";
       let stringToSign = "amount5000apiKey3D7F0D8C-B26D-408A-88B5-53A5DLC77890currencyCLP";

       let sign = CryptoJS.AES.encrypt(stringToSign, secretKey).toString();
       console.log(sign)


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

