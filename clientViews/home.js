import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";



export class Home extends Component {

constructor(props) {
    super(props);
  }

  render() {
    return (

         <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
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

