import React, { Component } from 'react';
import { Picker, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Dimensions } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LottieView from 'lottie-react-native';

// DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);



export default class ThanksMsg extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: '5%', paddingTop: windowHeightPercentUnit*5, backgroundColor: "#4170f9"}}>

        <View style={{flex: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}}>
            <Text style={styles.welcome}>¡Hemos Recibido tus datos!</Text>
        </View>

        <View style={{flex: windowHeightPercentUnit*2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <Text style={styles.instructions}>En lo pronto, uno de nuestros colaboradores te contactará, luego de revisar tus antecedentes. Gracias por elegir Legalis</Text>
        </View>

        <View style={{/*display:(Platform.OS === 'ios')?"flex":"none",*/  flex: windowHeightPercentUnit*5, alignItems: "center", justifyContent: "center" }}>
        <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              //width: 400,
              //height: 300,
              backgroundColor: '#4170f9'//,
            }}
            source={require('../assetsLottie/45140-app-update2.json')} // Problema el require no funciona en adroid
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
          />
        </View>


        <View style={{flex: windowHeightPercentUnit*1, paddingTop: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}}>
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
