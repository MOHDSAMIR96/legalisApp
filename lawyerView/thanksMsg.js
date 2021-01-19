import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, TouchableHighlight , Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);



export default class ThanksMsg extends Component {
    constructor(props){
    super(props)

    this.state={

    }

    }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: '5%', backgroundColor: "#4170f9"}}>

        <View style={{flex: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}}>
            <Text style={styles.welcome}>Hemos Recibido tus datos!</Text>
        </View>

        <View style={{flex: windowHeightPercentUnit*3, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <Text style={styles.instructions}>En lo pronto uno de nuestros colaboradores te contactará, luego de revisar tus antecedentes. Gracias por elegir Legalis!</Text>
        </View>

        <View style={{ flex: windowHeightPercentUnit*2, alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{width: 300,height:200 , backgroundColor:"#4170f9"}}
                  source={require('../images/logo.png')}
                  resizeMode="contain"
                />
        </View>


        <View style={{flex: windowHeightPercentUnit*2, paddingTop: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}}>
            <Button color={Platform.OS === 'ios'?"white":"#747A87"} title="VOLVER AL INICIO" onPress={() => {this.props.navigation.navigate('Home')}}/>
        </View>
      </View>



    );
  }
}

const styles = StyleSheet.create({
  instructions: {
  textAlign: 'center',
  margin: 0,
  color: "white",
  fontSize: windowHeightPercentUnit*3,

  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontSize: windowHeightPercentUnit*6,
      zIndex:1,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },
    img: {
        width: windowHeightPercentUnit*10
        ,height:200
       },
});
