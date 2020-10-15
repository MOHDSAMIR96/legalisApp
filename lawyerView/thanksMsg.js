import React, { Component } from 'react';
import { Picker, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class ThanksMsg extends Component {
    constructor(props){
    super(props)

    this.state={

    }

    }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: "#4170f9"}}>

          <Text style={styles.welcome}>Hemos Recibido tus datos!</Text>
          <View style={{flex: 4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex: 1, backgroundColor: "#4170f9"}}></View>
              <View style={{flex: 15, backgroundColor: "#4170f9"}}>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
                  <Text style={styles.instructions}>En lo pronto uno de nuestros colaboradores te contactará, luego de revisar tus antecedentes.</Text>
              </View>
              <View style={{flex: 1, backgroundColor: "#4170f9"}}></View>
          </View>

          <View style={{flex: 5, flexDirection: 'row'}}>
           <View style={{flex: 1, backgroundColor: "#4170f9"}}></View>
           <View style={{flex: 15, backgroundColor: "#4170f9"}}>
              <Text style={styles.instructions}>Gracias por elegir Legalis!</Text>
              <Text style={styles.instructions}> </Text>
              <Text style={styles.instructions}> </Text>
              <Image source={require('../images/logo.png')} style={styles.img}/>
           </View>
           <View style={{flex: 1, backgroundColor: "#4170f9"}}></View>
          </View>

      </View>



    );
  }
}

const styles = StyleSheet.create({
  instructions: {
  textAlign: 'justify',
  margin: 0,
  color: "white",
  fontSize: 30,
  zIndex:1,
  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontSize: 50,
      zIndex:1,
    },
    img: {
       height:550,
       width:550,
       position: "absolute",
       zIndex:0,

       },
});
