import React, { Component } from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export default class ClientProfile extends Component {

  constructor(props){
    super(props)
    this.state={
    incomingData: ""
    }
  }

  componentDidMount(){

  //---------------GET TO /CLIENTS
  fetch('https://swapi.dev/api/people/1/')
  .then(response => {return response.json();})
  .then(data => { this.setState({incomingData: data}) })

  //---------------GET TO /CASES

  }

  render() {
    return (


          <View style={{flex:1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
              <View style={{flex:1}}></View>
              <View style={{flex:2, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column'}}>
                   <Text> </Text>
                </View>
                <View style={{flex:2, flexDirection:'column'}}>
                    <Image rounded style={{width: 80, height: 80}} source={require('../images/Avatar9.png')}  />
                </View>
                <View style={{flex:7, flexDirection:'column'}}>
                    <Text style={styles.welcome}>  Patricio Rojas</Text>
                    <Text style={styles.instructions}>   patito_feo@gmail.com</Text>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1}}></View>
                  <View style={{flex:20}}>
                       <Text style={styles.title}>MIS CAUSAS</Text>
                  </View>
              </View>

              <View style={{flex:6, flexDirection:'row'}}>

                  <ScrollView>
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CaseChat')}}  style={styles.button}><Text style={{color: "white", fontSize: 25}}>{this.state.incomingData.name}</Text></TouchableOpacity>
                  </ScrollView>

              </View>

              <View style={{flex:2, flexDirection: 'row'}}>
                <View style={{flex:5}}></View>
                <View style={{flex:2}}><Text></Text><Button onPress={()=>{this.props.navigation.navigate('Query')}} title="NUEVA CONSULTA" color="blue" type="clear" style={{width: 100, borderRadius: '100%'}}/></View>
                <View style={{flex:1}}></View>
              </View>

           </View>
    );
  }
}


const styles = StyleSheet.create({
  instructions: {
    color: 'white',
    backgroundColor: "#4170f9",
    marginBottom: 0,
    borderColor: '#fff',
    fontSize:15,

  },
  title: {
      color: 'white',
      backgroundColor: "#4170f9",
      marginBottom: 0,
      borderColor: '#fff',
      fontSize:40,
      textAlign: 'center',
      margin:0,
      padding:0,
      fontWeight: 'bold'
  },
  welcome: {
      margin: 0,
      color: "white",
      fontSize: 30,

    },
    button: {
        alignItems: "center",
        backgroundColor: "#747A87",
        color: "red",
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
      },
});

