import React, {Component, useState, useEffect}  from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {Animated} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';


export function QueryChat({navigation}) {

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    //FUNCTIONAL COMPONENT STATE
    const [registerBtnDisplayed, setNewRegisterBtnDisplayed] = useState(0);
    const [animate, setNewanimate] = useState(new Animated.Value(4));
    const [textoEjemplo, setNewTextoEjemplo] = useState(store.users_issue_description);
    const [messageInputContent, setMessageInputContent] = useState("");
    const [message, enterMessage] = useState([]);

     useEffect(()=>{

       let intervalQuery = setInterval(()=>{
       fetch("http://patoexer.pythonanywhere.com/message/" + store.users_id)
                                   .then((response)=> response.json())
                                   .then((data)=> {
                                    console.log("message[message.length - 1 ]: " + message[message.length - 1 ])
                                    console.log("data[data.length - 1].messages_content: " + data[data.length - 1].messages_content)
                                   if(message[message.length - 1 ]!= data[data.length - 1].messages_content){
                                         enterMessage([...data])
                                         }
                                   })

       },1000)

      return ()=>{

          clearInterval(intervalQuery);

          let options = {
                      method: 'DELETE',
                      headers: {'Content-Type': 'application/json'}};

          fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id, options)
              .then((response)=> response.json())
              .then((data)=> {
              })
              .catch(error => {})

            }// return en useffect es como componentWillUnmunt

      }, []);
//-----------------------------
   const enterNewMessage = () =>{

   let today = new Date();
   let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
   let casesData = {
                      "messages_date": currentDate,
                      "messages_content": messageInputContent,
                      "user_id": store.users_id
                    }

   let options2 = {
                      method: 'POST',
                      body: JSON.stringify(casesData),
                      headers: {'Content-Type': 'application/json'}};

   fetch("http://patoexer.pythonanywhere.com/message/1", options2)
   .then((response)=> response.json())
   .then((data)=> {console.log(JSON.stringify(data))})

   }
//------------------------------------------
   const payment = () => {

   let options = {
                         method: 'DELETE',
                         headers: {'Content-Type': 'application/json'}};

             fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id, options)
                 .then((response)=> response.json())
                 .then((data)=> {

                     console.log("user borrado")
                     navigation.navigate('ClientRegister')
                 })
                 .catch(error => {})
   }

   let showCase =() => {

   dispatch({type: "USERID", doneAction: 43})
    if(registerBtnDisplayed == 0){
       //this.setState({flex:{registerView:8}, registerBtnDisplayed: true})
       setNewRegisterBtnDisplayed(1)
        Animated.timing(animate, {toValue: 100, duration: 300}).start()
    }
    else if(registerBtnDisplayed == 1){
       //this.setState({flex:{registerView:0}, registerBtnDisplayed: false})
       setNewRegisterBtnDisplayed(0)
       Animated.timing(animate, {toValue: 4, duration: 300}).start()
    }

  }

    return (

    <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white"}}>
        <Animated.View style={{ flex: animate, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex: 2, flexDirection:"column"}}>
                <View style={{flex: 1}}></View>
            </View>
            <View style={{flex: 35}}>
                <View style={{flex: 5}}>
                    <Text onPress={showCase} style={styles.welcomeSmall}>RESUMEN CASO</Text>
                    <ScrollView>
                    <Text style={{fontSize: 20, color: "white", textAlign: 'justify', paddingRight:30}}>{textoEjemplo}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{flex: 1}}>

            </View>
        </Animated.View >
        <View style={{flex: 70}}>
            <ScrollView style={{flex: 5, flexDirection: 'column', height: 150, backgroundColor: "white"}}>
                {
                  message.map(
                    function(item, index)
                    {
                        return <Text key={index} style={styles.lawyerStyle}> {item.messages_content} </Text>
                    }

                                )
                }
            </ScrollView>
        </View>
        <View style={{flex: 13, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
            <View style={{flex:1, flexDirection:'column'}}><Text>  </Text><Icon size={50} name='credit-card' color='gold'  onPress={() => { payment() }}/></View>
            <View style={{flex:4}}><Text> </Text><TextInput onChangeText={x=> setMessageInputContent(x)} style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
            <View style={{flex:1}}><Text> </Text><Icon onPress={enterNewMessage} size={50} name='send' color='#4170f9'/></View>
        </View>
     </View>

    );

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

