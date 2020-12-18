import React, {Component, useState, useEffect, useRef }  from 'react';
import {Keyboard, TouchableOpacity, Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import {Animated} from 'react-native';

import {dispatchListOfCases, dispatchSelectCase} from '../redux/dispatcher.js'


export default function LawyerCaseChat({navigation}) {

    //REDUX STATE
        const store = useSelector(state => state);
        const dispatch = useDispatch();

    //REFERENCES
        const inputRef = useRef(null);

    //REFERENCES
        const CaseSummaryTextInput = useRef(null);

    const [data, setData] = useState({time: 6, title: 'Event 1', description: 'Event 1 Description'});
    const [animateCaseContainer, setAnimateCaseContainer] = useState(new Animated.Value(8));
    const [animateCaseUpdate, setAnimateCaseUpdate] = useState(new Animated.Value(5));
    const [animateCaseSummary, setAnimateCaseSummary] = useState(new Animated.Value(5));
    const [registerBtnDisplayed, setRegisterBtnDisplayed] = useState(false);
    const [messages, enterMessage] = useState([]);
    const [stillTypingAdvisor, booleanStillTypingAdvisor] = useState(false);
    const [messageInputContent, setMessageInputContent] = useState("");
    const [returnedMessageId, setReturnedMessageId] = useState(0);



    const [caseSummary, enterCaseSummary] = useState(store.selectedCase.cases_description);
    const [timeLine, entertimeLine] = useState([ {succeded: 3},{ id: 1, phase: "Presentación demanda"}, { id: 2, phase: "Ratificación firma"}, {id: 3, phase: "Contestación"}, { id: 4, phase: "Término Probatorio"}, {id: 5, phase: "Dictación de sentencia"}]);
    const [phaseShowedOnTimeline, enterPhaseShowedOnTimeline] = useState("");
    const [animatephaseShowedOnTimeline, enteranimatephaseShowedOnTimeline] = useState(new Animated.Value(0));
    const [touchableOpacityZindex, entertouchableOpacityZindex] = useState(5);
    const [editableStatus, enterEditableStatus] = useState({color: "white", backGround: "#4170f9"});



     useEffect(()=>{ console.log("STORE ON CASE CHAT: " + JSON.stringify(store.userData))
     let url;
     if("users_id" in store.selectedCase){ url = "http://patoexer.pythonanywhere.com/message/" + store.selectedCase.users_id + "/0/" + store.userData.lawyers_id}
     else{ url = "http://patoexer.pythonanywhere.com/message/0/" + store.selectedCase.client_id + "/" + store.userData.lawyers_id;}

                 let fetchInterval = setInterval(()=>{ console.log("URL: " + url)
                                                       fetch(url)
                                                       .then((response)=> response.json())
                                                       .then((data)=>
                                                                    {
                                                                      if(messages[messages.length - 1 ]!= data[data.length - 1].messages_content){
                                                                      if(data[data.length - 1].messages_content == "typing..." && data[data.length - 1].messages_origin=="client" ){
                                                                      this.typingRef.current.style = "inline";

                                                                      }
                                                                      else{
                                                                        enterMessage([...data])
                                                                        }
                                                                     }
                                                                        })
                                                                                }, 1000);

        return ()=>{
             clearInterval(fetchInterval);
             let arrayOfCasesAndQueries = [];

                           fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.userData.lawyers_id)//WE GET ALL LAWYER'S CASES
                                 .then(response =>{return response.json()})
                                 .then((data)=>{
                                  arrayOfCasesAndQueries.push(...data.resp)

                                 fetch("http://patoexer.pythonanywhere.com/userByLawyers/5")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTHER LAWYER
                                                                     .then(response =>{return response.json()})
                                                                     .then((data)=>{
                                                                     arrayOfCasesAndQueries.push(...data.resp)
                                                                     dispatchListOfCases(arrayOfCasesAndQueries)
                                                                     })
                                                                     .catch(error => console.log(error))

                                 })
                                 .catch(error => console.log(error))
                }
               },[])


     const typing = (x) => {
                let today = new Date();
                let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
                let casesData;
                if("users_id" in store.selectedCase){
                    casesData = {
                                 "messages_date": currentDate,
                                 "messages_content": "typing...",
                                 "messages_origin": "lawyer",
                                 "client_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                                 "user_id": store.selectedCase.users_id,
                                 "lawyer_id": store.userData.lawyers_id //SE PUSO EL LAWYER FIJO MIENTRAS
                                                 }

                }
                else{
                 casesData = {
                               "messages_date": currentDate,
                               "messages_content": "typing...",
                               "messages_origin": "lawyer",
                               "client_id": store.selectedCase.client_id, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                               "user_id": 0,
                               "lawyer_id": store.userData.lawyers_id //SE PUSO EL LAWYER FIJO MIENTRAS
                             }

                }

                   let options2 = {
                                      method: 'POST',
                                      body: JSON.stringify(casesData),
                                      headers: {'Content-Type': 'application/json'}};

                    if(!stillTypingAdvisor){

                    fetch("http://patoexer.pythonanywhere.com/message/0/0/1", options2)
                       .then((response)=> { return response.json()})
                       .then((data)=> {
                       setReturnedMessageId(data.resp.messages_id)

                       })
                       .catch(error => console.log(JSON.stringify(error)))
                       booleanStillTypingAdvisor(true);
                    }
            }

  const sendMessage = () => {

   let today = new Date();
      let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
      let casesData = {
                         "messages_date": currentDate,
                         "messages_content": messageInputContent,
                         "messages_id": returnedMessageId,
                         "messages_origin": "lawyer",
                         "user_id": store.users_id,
                         "clients_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                         "lawyer_id": 1
                       }

      let options2 = {
                         method: 'PUT',
                         body: JSON.stringify(casesData),
                         headers: {'Content-Type': 'application/json'}};

       if(stillTypingAdvisor){

       fetch("http://patoexer.pythonanywhere.com/message/0/0/1", options2)
          .then((response)=> response.json())
          .then((data)=> {console.log(JSON.stringify(data))})
          inputRef.current.clear()
       }

       booleanStillTypingAdvisor(false);


    }

  const showCaseSummary=()=>{
    if(!registerBtnDisplayed){

        Animated.timing(animateCaseContainer, {toValue: 30, duration: 300}).start()
        Animated.timing(animateCaseUpdate, {toValue: 1, duration: 0}).start()
        setRegisterBtnDisplayed(true)
    }
    else if(registerBtnDisplayed){

    Animated.timing(animateCaseSummary, {toValue: 5, duration: 0}).start()
      Animated.timing(animateCaseContainer, {toValue: 8, duration: 300}).start()
      Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
      setRegisterBtnDisplayed(false)
    }

  }

    const showCaseUpdate=()=>{
        if(!registerBtnDisplayed){


           Animated.timing(animateCaseSummary, {toValue: 1, duration: 0}).start()
            Animated.timing(animateCaseContainer, {toValue: 25, duration: 300}).start()
            Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
            setRegisterBtnDisplayed(true)
        }
        else if(registerBtnDisplayed){


           Animated.timing(animateCaseSummary, {toValue: 5, duration: 0}).start()
           Animated.timing(animateCaseContainer, {toValue: 8, duration: 300}).start()
           Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
           setRegisterBtnDisplayed(false)
        }

      }

    const showPhase = (phase) => {

        enteranimatephaseShowedOnTimeline(phase.phase);
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 0, duration: 0}).start(()=>{
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 1, duration: 800}).start()})

        let newTimeLine = [...timeLine];
        newTimeLine.shift();
        newTimeLine.unshift({succeded: phase.id})
        entertimeLine(newTimeLine)

    }

    const editCaseSummary=()=>{

        entertouchableOpacityZindex(1);
        enterEditableStatus({color: "#4170f9", backGround: "white"});
        CaseSummaryTextInput.current.focus() //arreglar
        Animated.timing(animateCaseContainer, {toValue: 100, duration: 300}).start()
    }

    const TextInputEnterKeyPressed=(e)=>{
        if (e.nativeEvent.key == "Enter"){
                enterEditableStatus({color: "white", backGround: "#4170f9"});
                entertouchableOpacityZindex(5);
                Animated.timing(animateCaseContainer, {toValue: 30, duration: 300}).start();
                Keyboard.dismiss();
                //fetch() PUT TO DE DB

                let putMethodData= {
                cases_description: caseSummary,
                cases_id: store.selectedCase.cases_id
                }

                let options = {
                                method: 'PUT',
                                body: JSON.stringify(putMethodData),
                                headers: {'Content-Type': 'application/json'}
                                };


                fetch("http://patoexer.pythonanywhere.com/case/" + store.selectedCase.client_id, options)
                .then((response)=>{ return response.json();})
                .then( data => {
                    console.log("data modified " + JSON.stringify(data))
                    enterCaseSummary(data.modifiedFields[0].cases_description)
                    console.log("case sumary " + caseSummary)
                })
                .catch(error => console.log(JSON.stringify(error)))
           }
    }

    return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white"}}>
        <Animated.View style={{flex: animateCaseContainer, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex: 2, flexDirection:"column"}}>
                <View style={{flex: 1}}></View>
            </View>
            <View style={{flex: 35}}>
                <Animated.View style={{flex: animateCaseSummary}}>
                    <Text onPress={showCaseSummary} style={styles.welcomeSmall}>RESUMEN CASO</Text>
                    <ScrollView style={{flex: 5}}>
                    <TouchableOpacity  onPress={editCaseSummary} style={{opacity:0, zIndex: touchableOpacityZindex, backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute'}}></TouchableOpacity >
                    <TextInput onChangeText={(caseSummaryData) => enterCaseSummary(caseSummaryData)} onKeyPress={TextInputEnterKeyPressed} ref={CaseSummaryTextInput} defaultValue={caseSummary} multiline={true} style={{zIndex: 3, fontSize: 20, color: editableStatus.color, backgroundColor: editableStatus.backGround, textAlign: 'justify', paddingRight:30}}/>

                    </ScrollView>
                </Animated.View>
                <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1
                  }}
                />


                <Animated.View style={{flex: animateCaseUpdate}}>
                    <Text onPress={showCaseUpdate} style={styles.welcomeSmall}>AVANCE CASO</Text>
                                        <View style={{flexDirection: "row", felx: 2}}>
                                        {timeLine.map((item)=>{

                                        let color= "";
                                        let roundedBorder="";
                                        let itemSucceded = timeLine[0].succeded;

                                        (item.id == 1)?roundedBorder=20:roundedBorder=0;
                                        (item.id <= itemSucceded)?color="#39E938":color="white";
                                           if(item.hasOwnProperty("id")){
                                            return (
                                                <View key={item.id} style={{ marginTop:10 , flex: 3,flexDirection:'row', height: 30, width: 20}}>
                                                    <View style={{flex: 1, backgroundColor: color, height: 10, width: 10, marginTop:8, borderTopLeftRadius: roundedBorder, borderBottomLeftRadius: roundedBorder }}>
                                                    </View>
                                                    <View style={{flex: 1, backgroundColor: color, height: 30, borderRadius:30, width: 20}}>
                                                        <Text className={item.phase} style={{color: color, height: 30, borderRadius:30, width: 20}} onPress={()=> showPhase(item)} >o</Text>
                                                    </View>
                                                </View>
                                                    )
                                                }
                                            })
                                        }

                                        </View>
                                        <View style={{flex:1}}>
                                            <Animated.Text style={{ opacity: animatephaseShowedOnTimeline, textAlign: 'center', color: 'white', fontSize:30, fontWeight: 'bold'}}>- {phaseShowedOnTimeline} -</Animated.Text>
                                        </View>
                </Animated.View>

            </View>
            <View style={{flex: 1}}>
            </View>
        </Animated.View >

        <View style={{flex: 70}}>
            <ScrollView style={{flex: 5, flexDirection: 'column', height: 150, backgroundColor: "white"}}>
                {
                messages.map((item, index)=>{
                if(item.messages_origin=="client" || item.messages_origin=="user"){return <Animated.Text key={index} style={styles.lawyerStyle}> {item.messages_content} </Animated.Text>}
                else if(item.messages_origin=="lawyer"){return <Animated.Text key={index} style={styles.clientStyle}> {item.messages_content} </Animated.Text>}}

                )
                }
            </ScrollView>
        </View>
        <View style={{flex: 15, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
            <View style={{flex:1, flexDirection:'column'}}><Text> </Text></View>
            <View style={{flex:8}}><Text> </Text><TextInput ref={inputRef} onChangeText={x=> {setMessageInputContent(x); typing(x)}} style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
            <View style={{flex:3}}><Text> </Text><Icon onPress={sendMessage} size={50} name='send' color='#4170f9'/></View>
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
