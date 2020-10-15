import React, { Component } from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {Animated} from 'react-native';

let arr = [1,2,3]
export default class LawyerRegister extends Component {
    constructor(props){
    super(props)
    this.register = this.register.bind(this);
    this.showRegisterView = this.showRegisterView.bind(this);


    this.state={
        registerBtnDisplayed: false,
        flex:{registerView:0 },
        animate: new Animated.Value(0),
    }

    }

  register(){ //POST TO /CLIENT

    Alert.alert('registrado ql')
    this.props.navigation.navigate('ThanksMsg')
  }

  showRegisterView(){
    if(!this.state.registerBtnDisplayed){
       this.setState({registerBtnDisplayed: true})
        Animated.timing(this.state.animate, {toValue: 3, duration: 500}).start()
    }
    else if(this.state.registerBtnDisplayed){
       this.setState({ registerBtnDisplayed: false})
       Animated.timing(this.state.animate, {toValue: 0, duration: 500}).start()
    }

  }

//this.state.flex.registerView fila64
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
        <View style={{flex:3, backgroundColor: "#4170f9"}}>
            <Text style={styles.welcome}>Bienvendio a la red Legalis!</Text>
            <Text> </Text>
            <Text style={styles.welcome} onPress={this.shineImg}>Danos tus datos y te contactaremos en lo pronto</Text>
        </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                    <View style={{flex:5, flexDirection: 'row', backgroundColor: "#4170f9"}}>

                    </View>
                <View style={{flex:1}}></View>
            </View>


            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                  <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                      <TextInput placeholder = " NOMBRE" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1 , fontSize:20, borderRadius: 10}}/>
                  </View>
               <View style={{flex:1}}></View>
            </View>



            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                    <TextInput placeholder = " MAIL" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10}}/>
                </View>
              <View style={{flex:1}}></View>
            </View>


            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                   <TextInput placeholder = " TÉLEFONO" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                </View>
              <View style={{flex:1}}></View>
            </View>



            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                      <TextInput placeholder = " CLAVE" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
               <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                   <View style={{flex:4, flexDirection: 'column', backgroundColor: "#4170f9"}}>
                        <Button title="REGISTRARSE" color="#747A87" type="clear" style={{width: 100}} onPress={this.register}/>
                   </View>
               <View style={{flex:1}}></View>
            </View>

        <Animated.View style={{flex: this.state.animate}}>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                     <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                          <TextInput placeholder = " NOMBRE" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                     </View>
            <View style={{flex:1}}></View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                       <TextInput placeholder = " CLAVE" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                  </View>
            <View style={{flex:1}}></View>
        </View>


        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
             <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:4, flexDirection: 'column', backgroundColor: "#4170f9"}}>
                    <Button title="INGRESAR" color="#747A87" type="clear" style={{width: 100}} onPress={() => this.props.navigation.navigate('LawyerProfile')}/>
                </View>
             <View style={{flex:1}}></View>
        </View>

        </Animated.View>


        <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
           <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                   <View style={{flex:4, flexDirection: 'column', backgroundColor: "#4170f9"}}><Text onPress={this.showRegisterView} style={styles.instructions}>*Si ya tienes cuenta <Text style={{fontSize: 30}}>INGRESA!</Text></Text></View>
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
    fontWeight: "bold"
  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontSize: 30,
    },
    link: {
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline"
    }
});
