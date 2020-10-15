import React, { Component } from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


export default class LawyerProfile extends Component {

  constructor(props){
    super(props)
    this.state={
    cases: [{materia: "CIVIL", fecha: "13-04-2020", from: 1},{materia: "CIVIL", fecha: "13-04-2020", from: 0},{materia: "CIVIL", fecha: "13-04-2020", from: 1},{materia: "CIVIL", fecha: "13-04-2020", from: 1},{materia: "CIVIL", fecha: "13-04-2020", from: 1},{materia: "CIVIL", fecha: "13-04-2020", from: 0},{materia: "CIVIL", fecha: "13-04-2020", from: 0}, {materia: "LABORAL", fecha: "16-04-2020", from: 1},{materia: "FAMILIA", fecha: "13-03-2020", from: 1},{materia: "CIVIL", fecha: "13-01-2020", from: 0}]
    }
  }

  componentDidMount(){

  //---------------GET TO /LAWYERS


  //---------------GET TO /CLIENT



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
                    <Avatar rounded size="large" icon={{name: 'user', type: 'font-awesome'}} />
                </View>
                <View style={{flex:7, flexDirection:'column'}}>
                    <Text style={styles.welcome}>Patricio Rojas</Text>
                    <Text style={styles.instructions}>   patito_feo@gmail.com</Text>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:2}}>
                       <Text style={styles.title}>MIS CAUSAS</Text>
                  </View>
              </View>

              <View style={{flex:9, flexDirection:'row'}}>

                  <ScrollView>
                                    {this.state.cases.map((item, index)=>{
                                    return <TouchableOpacity onPress={()=>{this.props.navigation.navigate('LawyerCaseChat')}} key={index}  style={styles.button}><Text style={{color: "white", fontSize: 25}}>{item.materia + '/'  + item.fecha}</Text></TouchableOpacity>
                                    })}

                                    </ScrollView>

              </View>
              <Text></Text>

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

