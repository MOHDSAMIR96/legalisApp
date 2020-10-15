import React, { Component } from 'react';
import {Animated, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import logo1 from '../images/Avatar1.png'
import logo2 from '../images/Avatar2.png'
import logo3 from '../images/Avatar3.png'
import logo4 from '../images/Avatar4.png'
import logo5 from '../images/Avatar5.png'
import logo6 from '../images/Avatar6.png'
import logo7 from '../images/Avatar7.png'
import logo8 from '../images/Avatar8.png'
import logo9 from '../images/Avatar9.png'
import logo10 from '../images/Avatar10.png'

let arr = [1,2,3]
export default class ClientRegister extends Component {
    constructor(props){
    super(props)
    this.register = this.register.bind(this);
    this.showRegisterView = this.showRegisterView.bind(this);
    this.shineImg = this.shineImg.bind(this);

    this.state={
        avatarArr: [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10],
        registerBtnDisplayed: false,
        flex:{registerView:0 },
        animateScroll: new Animated.Value(0),
        animateImpulse: new Animated.Value(2),
         }
    }

  componentDidMount(){
  //Animated.timing(this.state.animateImpulse, {toValue: 30, duration: 100}).start()


  }

  register(){ //POST TO /CLIENT

    Alert.alert('registrado ql')
  }

  showRegisterView(){
    if(!this.state.registerBtnDisplayed){
       this.setState({registerBtnDisplayed: true})
        Animated.timing(this.state.animateScroll, {toValue: 3, duration: 500}).start()
    }
    else if(this.state.registerBtnDisplayed){
       this.setState({ registerBtnDisplayed: false})
       Animated.timing(this.state.animateScroll, {toValue: 0, duration: 500}).start()
    }

  }
  shineImg(){
    Alert.alert('shine')

  }

//this.state.flex.registerView fila64
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
        <View style={{flex:3, backgroundColor: "#4170f9"}}>
            <Text style={styles.welcome}>Ya eres cliente, ya eres usuario!</Text>
            <Text style={styles.welcome} onPress={this.shineImg}>Por favor danos tus datos</Text>
        </View>

            <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                    <View style={{flex:5, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                            <ScrollView horizontal={true}>
                                            {this.state.avatarArr.map(
                                                function(item, index){return <TouchableOpacity onPress={()=>Alert.alert('index')}><Image  key={index} source={item} style={{width: 70, height:70}}/></TouchableOpacity>
                                            })}
                                            </ScrollView>
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

        <Animated.View style={{flex: this.state.animateScroll}}>

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
                    <Button title="INGRESAR" color="#747A87" type="clear" style={{width: 100}} onPress={() => this.props.navigation.navigate('ClientProfile')}/>
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
    textDecorationLine: "underline"
    }
});
