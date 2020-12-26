import React, {Component, useState, useEffect, useRef }  from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { CommonActions } from '@react-navigation/native';
import store from '../redux/store.js';
import {Animated} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component'; // DOCUMENTATION ON https://github.com/talalmajali/react-native-countdown-component
import { ModalPortal, Modal, ModalContent } from 'react-native-modals';

//IMPORTATION OF VIEW COMPONENTS
import Query from './query.js';
import {Home} from './home.js';
import ClientRegister from './register.js';
import ClientProfile from './clientProfile.js';
import CaseChat from './caseChat.js';




export function QueryChat({navigation}) {

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    //FUNCTIONAL COMPONENT STATE
    const [registerBtnDisplayed, setNewRegisterBtnDisplayed] = useState(0);
    const [animate, setNewanimate] = useState(new Animated.Value(4));
    const [messageAnimation, setMessageAnimation] = useState(new Animated.Value(0));
    const [textoEjemplo, setNewTextoEjemplo] = useState(store.users_issue_description);
    const [messageInputContent, setMessageInputContent] = useState("");
    const [message, enterMessage] = useState([]);
    const [returnedMessageId, setReturnedMessageId] = useState(0);
    const [stillTypingAdvisor, booleanStillTypingAdvisor] = useState(false);
    const [startCountDown, InitCountDown] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);


    //REFERENCES
    const inputRef = useRef(null);
    const typingRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(()=>{
    Animated.timing(messageAnimation,{toValue: 350,duration: 1000}).start();
    },[message])

     useEffect(()=>{



                      let fetchInterval = setInterval(()=>{

                                         fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id)
                                         .then((response)=> { return response.json()})
                                         .then((data)=>{

                                             if(data.taken){
                                             InitCountDown(true)
                                             }

                                         })
                                         .catch((error)=>{})

                                         fetch("http://patoexer.pythonanywhere.com/message/" + store.users_id  + "/0/" + store.lawyer_id)
                                         .then((response)=> response.json())
                                         .then((data)=>
                                                       {
                                                       if(message[message.length - 1 ]!= data[data.length - 1].messages_content){
                                                             if(data[data.length - 1].messages_content == "typing..." && data[data.length - 1].messages_origin=="lawyer" ){
                                                             this.typingRef.current.style = "inline";
                                                             Animated.timing(messageAnimation,{toValue: 350,duration: 500}).start();

                                                             }
                                                             else{
                                                                enterMessage([...data])
                                                                Animated.timing(messageAnimation,{toValue: 350,duration: 500}).start();
                                                             }
                                                             }
                                                       })
                                       }, 1000);
      // return en useffect es como componentWillUnmunt
      return ()=>{
          clearInterval(fetchInterval);
          let options = {
                      method: 'DELETE',
                      headers: {'Content-Type': 'application/json'}};

          fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id, options)
              .then((response)=> response.json())
              .then((data)=> {

                let options = {
                                      method: 'DELETE',
                                      headers: {'Content-Type': 'application/json'}};

                          fetch("http://patoexer.pythonanywhere.com/message/" + store.users_id, options)
                              .then((response)=> response.json())
                              .then((data)=> {
                              })
                              .catch(error => {})
              })
              .catch(error => {})

            }

      }, []);

   const typing = (x) => {
       let today = new Date();
       let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

       let casesData = {
                             "messages_date": currentDate,
                             "messages_content": "typing...",
                             "messages_origin": "user",
                             "clients_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                             "user_id": store.users_id,
                             "lawyer_id": 1 //SE PUSO EL LAWYER FIJO MIENTRAS
                           }

          let options2 = {
                             method: 'POST',
                             body: JSON.stringify(casesData),
                             headers: {'Content-Type': 'application/json'}};

           if(!stillTypingAdvisor){

           fetch("http://patoexer.pythonanywhere.com/message/1/0/0", options2)
              .then((response)=> { return response.json()})
              .then((data)=> {
              setReturnedMessageId(data.resp.messages_id)
              console.log(JSON.stringify(data))
              })
              .catch(error => console.log(JSON.stringify(error)))
              booleanStillTypingAdvisor(true);
           }
   }

   const enterNewMessage = () =>{

   let today = new Date();
   let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
   let casesData = {
                      "messages_date": currentDate,
                      "messages_content": messageInputContent,
                      "messages_id": returnedMessageId,
                      "messages_origin": "user",
                      "user_id": store.users_id,
                      "clients_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                      "lawyer_id": 1
                    }

   let options2 = {
                      method: 'PUT',
                      body: JSON.stringify(casesData),
                      headers: {'Content-Type': 'application/json'}};

    if(stillTypingAdvisor){

    fetch("http://patoexer.pythonanywhere.com/message/1/0/0", options2)
       .then((response)=> response.json())
       .then((data)=> {console.log(JSON.stringify(data))})
       inputRef.current.clear()
    }

    booleanStillTypingAdvisor(false);


   }

   const payment = () => {

   let options = {
                         method: 'DELETE',
                         headers: {'Content-Type': 'application/json'}};

             fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id, options)
                 .then((response)=> response.json())
                 .then((data)=> {
                    return navigation.reset([NavigationActions.navigate({routeName: 'ClientRegister'})]);
                 })
                 .catch(error => {})
   }

   const showCase =() => {

   dispatch({type: "USERID", doneAction: 43})
    if(registerBtnDisplayed == 0){
       //this.setState({flex:{registerView:8}, registerBtnDisplayed: true})
       setNewRegisterBtnDisplayed(1)
        Animated.timing(animate, {toValue: 100, duration: 300}).start()
    }
    else if(registerBtnDisplayed == 1){

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
                    <Text onPress={showCase} style={styles.welcomeSmall}>RESUMEN CASO </Text>
                    <ScrollView>

                    <Text style={{fontSize: 20, color: "white", textAlign: 'justify', paddingRight:30}}>{textoEjemplo}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{flex: 20}}>
            </View>
        </Animated.View >
        <View style={{flex: 70}}>
        <Text ref={typingRef} style={{display: 'none'}}>El abogado esta escribiendo...</Text>
            <ScrollView style={{flex: 5, flexDirection: 'column', height: 150, backgroundColor: "white"}}>
                {
                  message.map(
                    function(item, index)
                    {
                        let style;
                        let initialValue = 0;
                        if(item.messages_origin=="lawyer"){
                            style = styles.lawyerStyle;
                        }else if(item.messages_origin=="user"){style = styles.clientStyle;}
                        return <Animated.Text key={index} style={[style, {width: messageAnimation}]}> {item.messages_content} </Animated.Text>
                    }

                                )
                }
            </ScrollView>
        </View>
        <CountDown
            until={420}
            onFinish={() => setModalVisibility(true)}
            style={(startCountDown)?{marginRight: 320, backgroundColor: "#4170f9"}:{display: "none"}}//{{marginRight: 320, backgroundColor: "#4170f9"}}
            size={20}
            timeToShow={['M','S']}
            digitStyle={{marginRight: 0, padding: 0 , backgroundColor: '#4170f9', borderColor: '#4170f9'}}
            digitTxtStyle={{color: 'white'}}
            timeLabelStyle={{color: '#4170f9', fontWeight: 'bold'}}
            separatorStyle={{color: 'white'}}
            timeLabels={{m: null, s: null}}
            showSeparator={true}


                                                                                  />
        <View style={{flex: 13, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>

            <View style={{flex:1, flexDirection:'column'}}><Text>  </Text><Icon size={50} name='credit-card' color='gold'  onPress={() => { payment() }}/></View>
            <View style={{flex:4}}><Text> </Text><TextInput ref={inputRef} onChangeText={x=> {setMessageInputContent(x); typing(x)}} style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
            <View style={{flex:1}}><Text> </Text><Icon onPress={enterNewMessage} size={50} name='send' color='#4170f9'/></View>
        </View>

        <ModalPortal />
                <Modal
                    visible={modalVisibility}
                    onTouchOutside={() => {

                    }}
                  >
                    <ModalContent>
                      <Text style={styles.modalStyle}>Se ha acabado el tiempo!</Text>
                      <Text> </Text>
                      <Text style={styles.modalStyle}>Si su caso le interesó a su abogado, éste debloqueará el chat ilimitado</Text>
                      <Text> </Text>
                        <Text style={styles.modalStyle}>Por favor espere unos minutos, no salga de la aplicación</Text>
                    </ModalContent>
                  </Modal>
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
    textAlign: 'right',
    },
    modalStyle:{
           color:"black",
           borderWidth:1,
           borderColor: 'white',
           borderRadius: 10,
           fontSize:25,
           textAlign: 'center',
        },
});

