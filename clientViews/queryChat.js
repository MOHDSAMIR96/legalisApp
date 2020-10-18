import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider, connect } from 'react-redux';
import store from '../redux/store.js'

import {Animated} from 'react-native';


export class QueryChat extends React.Component {

    constructor(props){
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.showCase = this.showCase.bind(this);
    this.state = {
                animate: new Animated.Value(4),
                registerBtnDisplayed: false,
                messages: [{key:1, value: "Hola como va mi trámite", fromUser: true},{key:2, value: "Hola el lunes sabemos de la inscripcion, a si que todo va de acuerdo al plan ok wn",fromUser: false},{key:3, value: "A pero que bien entonces me avisas",fromUser: true},{key:4, value: "si no te preocupes, saludos", fromUser: false},{key:5, value: "si no te preocupes, saludos", fromUser: true}, {key:6, value: "no me remede", fromUser: false}, {key:7, value: "sdcdskcmdscmdslcmdslcs cdsx dsxdscds csdcds cpksd cds csdpl csd cksd cpds cds cpsd cp dskc dscp", fromUser: true}],
                textoEjemplo: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains"
            }
    }


  componentDidMount(){
    //----------------------GET TO /USERS
    /*fetch("http://patoexer.pythonanywhere.com/user")
    .then((response)=> response.json())
            .then((data)=> {
                //this.setState({textoEjemplo: data})
            })
            .catch(error => Alert.alert(error.message))*/
    //----------------------POST TO /MESSAGES



    //----------------------GET TO /MESSAGES
    //PROBABLEMENTE DEBE HABER UNA FUNCIONALIDAD QUE PREGUNTE AL BACKEND CADA SEGUNDO U OTRA COSA MAS EFICIENTE

  }

  sendMessage(){

  //-----------------------GET TO /MESSAGES

  }

  showCase(){
    if(!this.state.registerBtnDisplayed){
       //this.setState({flex:{registerView:8}, registerBtnDisplayed: true})
       this.setState({registerBtnDisplayed: true})
        Animated.timing(this.state.animate, {toValue: 100, duration: 300}).start()
    }
    else if(this.state.registerBtnDisplayed){
       //this.setState({flex:{registerView:0}, registerBtnDisplayed: false})
       this.setState({registerBtnDisplayed: false})
       Animated.timing(this.state.animate, {toValue: 4, duration: 300}).start()
    }

  }

  render() {
    return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white"}}>
        <Animated.View style={{flex: this.state.animate, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex: 2, flexDirection:"column"}}>
                <View style={{flex: 1}}></View>
            </View>
            <View style={{flex: 35}}>
                <View style={{flex: 5}}>
                    <Text onPress={this.showCase} style={styles.welcomeSmall}>RESUMEN CASO{this.props.id}</Text>
                    <ScrollView>
                    <Text style={{fontSize: 20, color: "white", textAlign: 'justify', paddingRight:30}}>{this.state.textoEjemplo}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{flex: 1}}>

            </View>
        </Animated.View >
        <View style={{flex: 70}}>
            <ScrollView style={{flex: 5, flexDirection: 'column', height: 150, backgroundColor: "white"}}>
                {
                this.state.messages.map(
                function(item){if(item.fromUser){return <Text key={item.key} style={styles.clientStyle}> {item.value} </Text>}
                else{return <Text key={item.key} style={styles.lawyerStyle}> {item.value} </Text>}}

                )
                }
            </ScrollView>
        </View>
        <View style={{flex: 13, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
            <View style={{flex:1, flexDirection:'column'}}><Text>  </Text><Icon size={50} name='credit-card' color='gold'  onPress={() => {changerUserIdDispatcher(data.lastId.toString())} /*this.props.navigation.navigate('ClientRegister')*/}/></View>
            <View style={{flex:4}}><Text> </Text><TextInput style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
            <View style={{flex:1}}><Text> </Text><Icon onPress={this.sendMessage} size={50} name='send' color='#4170f9'/></View>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeSmall: {
      textAlign: 'left',
      margin: 0,
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold'
    },
  lawyerStyle: {
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: "#4170f9",
    color:"white",
    fontWeight: "bold",
    fontSize:18,
    marginRight:50,
    marginLeft: 10,
    marginTop: 20,
    padding:15,
    paddingRight: 5,
    textAlign: 'left'

  },
  clientStyle: {
    backgroundColor: "#E5E7E9",
    color:"black",
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    fontWeight: "bold",
    fontSize:18,
    marginRight:10,
    marginLeft: 50,
    marginTop: 20,
    padding:15,
    paddingRight: 5,
    textAlign: 'right'
    },
});


function mapStateToProps(state){
  return {id: state.userId}
}

export default connect(mapStateToProps, {})(QueryChat);