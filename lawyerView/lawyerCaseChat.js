import React, {Component, useState, useEffect, useRef }  from 'react';
import {Keyboard, TouchableOpacity, Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import {Animated, TouchableHighlight, KeyboardAvoidingView, Linking, Dimensions} from 'react-native';
import CountDown from 'react-native-countdown-component'; // DOCUMENTATION ON https://github.com/talalmajali/react-native-countdown-component
import { ModalPortal, Modal, ModalContent } from 'react-native-modals';

import {dispatchListOfCases, dispatchSelectCase} from '../redux/dispatcher.js'
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);


export default function LawyerCaseChat({navigation}) {

    //REDUX STATE
        const store = useSelector(state => state);
        const dispatch = useDispatch();

    //REFERENCES
        const inputRef = useRef(null);
        const CaseSummaryTextInput = useRef(null);
        const typingRef = useRef(null);
        const timerRef = useRef(null);

    const [data, setData] = useState({time: 6, title: 'Event 1', description: 'Event 1 Description'});
    const [animateCaseContainer, setAnimateCaseContainer] = useState(new Animated.Value(5));
    const [animateCaseUpdate, setAnimateCaseUpdate] = useState(new Animated.Value(5));
    const [animateCaseSummary, setAnimateCaseSummary] = useState(new Animated.Value(5));
    const [registerBtnDisplayed, setRegisterBtnDisplayed] = useState(false);
    const [messages, enterMessage] = useState([]);
    const [stillTypingAdvisor, booleanStillTypingAdvisor] = useState(false);
    const [messageInputContent, setMessageInputContent] = useState("");
    const [returnedMessageId, setReturnedMessageId] = useState(0);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [startCountDown, InitCountDown] = useState(false);

    const [caseSummary, enterCaseSummary] = ("users_id" in store.selectedCase)?useState(store.selectedCase.users_issue_description):useState(store.selectedCase.cases_description);
    const [timeLine, entertimeLine] = useState([ {succeded: 3},{ id: 1, phase: "Presentación demanda"}, { id: 2, phase: "Ratificación firma"}, {id: 3, phase: "Contestación"}, { id: 4, phase: "Término Probatorio"}, {id: 5, phase: "Dictación de sentencia"}]);
    const [phaseShowedOnTimeline, enterPhaseShowedOnTimeline] = useState("");
    const [animatephaseShowedOnTimeline, enteranimatephaseShowedOnTimeline] = useState(new Animated.Value(0));
    const [touchableOpacityZindex, entertouchableOpacityZindex] = useState(5);
    const [editableStatus, enterEditableStatus] = useState({color: "white", backGround: "#4170f9"});



     useEffect(()=>{
     let url;
     if("users_id" in store.selectedCase){ url = "http://patoexer.pythonanywhere.com/message/" + store.selectedCase.users_id + "/0/" + store.userData.lawyers_id}
     else{ url = "http://patoexer.pythonanywhere.com/message/0/" + store.selectedCase.client_id + "/" + store.userData.lawyers_id;}

                 let fetchInterval = setInterval(()=>{ console.log(JSON.stringify(store.selectedCase.users_issue_description))
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

                                                       fetch('http://patoexer.pythonanywhere.com/user/' + store.selectedCase.users_id)
                                                       .then((resp)=>{return resp.json()})
                                                       .then((data) => {
                                                        (data.unlocked === true)? setUnlocked(true): setUnlocked(false)
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


<<<<<<< HEAD
        Animated.timing(this.state.animateCaseContainer, {toValue: 30, duration: 300, useNativeDriver: true, }).start()
        Animated.timing(this.state.animateCaseUpdate, {toValue: 1, duration: 0, useNativeDriver: true, }).start()
        this.setState({registerBtnDisplayed: true})
=======
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6
    }

<<<<<<< HEAD
    Animated.timing(this.state.animateCaseSummary, {toValue: 5, duration: 0, useNativeDriver: true, }).start()
      Animated.timing(this.state.animateCaseContainer, {toValue: 8, duration: 300, useNativeDriver: true, }).start()
      Animated.timing(this.state.animateCaseUpdate, {toValue: 5, duration: 300, useNativeDriver: true, }).start()
       this.setState({registerBtnDisplayed: false})
=======
  const showCaseSummary=()=>{
    if(!registerBtnDisplayed){

        Animated.timing(animateCaseContainer, {toValue: 40, duration: 500}).start()
        //Animated.timing(animateCaseUpdate, {toValue: 1, duration: 0}).start()
        setRegisterBtnDisplayed(true)
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6
    }
    else if(registerBtnDisplayed){

    //Animated.timing(animateCaseSummary, {toValue: 1, duration: 0}).start()
      Animated.timing(animateCaseContainer, {toValue: 5, duration: 500}).start()
      //Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
      setRegisterBtnDisplayed(false)
    }

  }

    const showCaseUpdate=()=>{
       /* if(!registerBtnDisplayed){

<<<<<<< HEAD
           Animated.timing(this.state.animateCaseSummary, {toValue: 1, duration: 0, useNativeDriver: true, }).start()
            Animated.timing(this.state.animateCaseContainer, {toValue: 25, duration: 300, useNativeDriver: true, }).start()
            Animated.timing(this.state.animateCaseUpdate, {toValue: 5, duration: 300, useNativeDriver: true, }).start()
            this.setState({registerBtnDisplayed: true})
=======
           //Animated.timing(animateCaseSummary, {toValue: 1, duration: 0}).start()
            Animated.timing(animateCaseContainer, {toValue: 10, duration: 500}).start()
           // Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
            setRegisterBtnDisplayed(true)
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6
        }
        else if(registerBtnDisplayed){


<<<<<<< HEAD
           Animated.timing(this.state.animateCaseSummary, {toValue: 5, duration: 0, useNativeDriver: true, }).start()
           Animated.timing(this.state.animateCaseContainer, {toValue: 8, duration: 300, useNativeDriver: true, }).start()
           Animated.timing(this.state.animateCaseUpdate, {toValue: 5, duration: 300, useNativeDriver: true, }).start()
            this.setState({registerBtnDisplayed: false})
        }

      }

    showPhase(phase){
         console.log("hola" + phase.id)
        this.setState({phaseShowedOnTimeline: phase.phase})
        Animated.timing(this.state.animatephaseShowedOnTimeline, {toValue: 0, duration: 0}).start(()=>{
        Animated.timing(this.state.animatephaseShowedOnTimeline, {toValue: 1, duration: 800, useNativeDriver: true, }).start()})
=======
           //Animated.timing(animateCaseSummary, {toValue: 5, duration: 0}).start()
           Animated.timing(animateCaseContainer, {toValue: 1, duration: 500}).start()
           //Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
           setRegisterBtnDisplayed(false)
        }*/

      }

    const showPhase = (phase) => {
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6

        enteranimatephaseShowedOnTimeline(phase.phase);
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 0, duration: 0}).start(()=>{
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 1, duration: 800}).start()})

        let newTimeLine = [...timeLine];
        newTimeLine.shift();
        newTimeLine.unshift({succeded: phase.id})
        entertimeLine(newTimeLine)

    }

    const editCaseSummary=()=>{

<<<<<<< HEAD
        this.setState({touchableOpacityZindex: 1})
        this.setState({editableStatus: {color: "#4170f9", backGround: "white"}})
        this.CaseSummaryTextInput.current.focus()
        Animated.timing(this.state.animateCaseContainer, {toValue: 100, duration: 300, useNativeDriver: true, }).start()
=======
        entertouchableOpacityZindex(1);
        enterEditableStatus({color: "#4170f9", backGround: "white"});
        CaseSummaryTextInput.current.focus() //arreglar
        Animated.timing(animateCaseContainer, {toValue: 100, duration: 300}).start()
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6
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

<<<<<<< HEAD
                this.setState({editableStatus: {color: "white", backGround: "#4170f9"}})
                this.setState({touchableOpacityZindex: 5})
                Animated.timing(this.state.animateCaseContainer, {toValue: 30, duration: 300, useNativeDriver: true, }).start()
                Keyboard.dismiss()
                //fetch() POST TO DE DB

=======
                let options = {
                                method: 'PUT',
                                body: JSON.stringify(putMethodData),
                                headers: {'Content-Type': 'application/json'}
                                };


                fetch("http://patoexer.pythonanywhere.com/case/" + store.selectedCase.client_id, options)
                .then((response)=>{ return response.json();})
                .then( data => {
                    console.log("data modified ************************************: " + JSON.stringify(data))
                    enterCaseSummary(data.modifiedFields[0].cases_description)
                    console.log("case sumary " + caseSummary)
                })
                .catch(error => console.log(JSON.stringify(error)))
>>>>>>> 97095b680fd39d29c379330b7eb20dc1afa521b6
           }
    }

    const payment = () => {

       // hay dos paginas para probar la api, que entregan token diferentes. Una es para el sandbox y la otra para transacciones reales. Intenga ocupar los token para cada fin específico
       // una vez hecho el post confirma transacción con get, poniendo en authorization del header el token público ej: Bearer 87933aa65bc6af7ceae8fda096054dc3
       // la respueta 200 trae url que es donde se inicia el proceso de pago, una vez concluye proceso y se paga efectivamente, lo que pusiste como returnurl se ejecuta luego del pago y trae al cliente allá
           const basePath = encodeURIComponent('/api/transaction');//"https://des.payku.cl/api/transaction";
           const secretKey = "07c81310fe1dbc717a6f77218d0be7c4";// token privado

            let spending = parseInt(store.userData.lawyers_spending) + 350;

           const data = {
               email: store.userData.lawyers_email,// el correo del pagador
               urlreturn: 'http://patoexer.pythonanywhere.com/paymentOk/' + store.selectedCase.users_id + "/" + store.userData.lawyers_rut + "/" + spending, // colocar un identificador de pago, hacer tabla de pagos, endpoint flask de tabla pagos
               urlnotify: 'https://des.payku.cl/', // cuando el banco confirma el proceso del pago, se envía a una url los detalles de confirmacion de pago. HAy que hacer bkan con python para almacenar en base de datos
               order:  "unicofdc" + store.selectedCase.users_id,
               subject: 'desbloqueo chat abogado',
               amount: 1000,
               payment: 1
           };

           const orderedData = {};
           Object.keys(data).sort().forEach(function(key) {
             orderedData[key] = data[key];
           });

           const arrayConcat = new URLSearchParams(orderedData).toString(); //obj se tranforma en url string

           const concat = basePath + "&" + arrayConcat;

           let sign;

           JSHmac(concat, "79c5481cffd3ecbd0c8ade5e5b5fc2c6", CONSTANTS.HmacAlgorithms.HmacSHA256)
             .then(hash =>{return sign = hash})//adonde dejo esto?
             .catch(e => console.log(e));

           const options = {method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': 'Bearer 87933aa65bc6af7ceae8fda096054dc3' //token publico
                                },
                                body: JSON.stringify(data) // se envia denuevo el obj, se envia por aca y denuevo en la firma, doble seguridad
                              }
            console.log(JSON.stringify(options))
           fetch("https://des.payku.cl/api/transaction", options)
           .then( (resp)=>{return resp.json()})
           .then( (data)=>{
            console.log(JSON.stringify(data))
            Linking.openURL(data.url).catch(err => console.error("Couldn't load page", err));
            })

       }

    const sendRejectionReason=(title)=>{

            let rejectionReasonData = {
                                         "rejectionReazon": title

                                       }

                      let options2 = {
                                         method: 'PUT',
                                         body: JSON.stringify(rejectionReasonData),
                                         headers: {'Content-Type': 'application/json'}};

                       fetch("http://patoexer.pythonanywhere.com/user/" + store.selectedCase.users_id, options2)
                          .then((response)=> { return response.json()})
                          .then((data)=> {
                          console.log(JSON.stringify(data))
                          navigation.navigate('Home');
                          })
                          .catch(error => console.log("errorrr"))
    }

    return (
    <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={windowHeightPercentUnit*5} >
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white"}}>

            <Animated.View style={{ flex: animateCaseContainer, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                <View style={{flex: windowHeightPercentUnit, flexDirection:"column"}}>
                    <View style={{flex: windowHeightPercentUnit}}></View>
                </View>
                <View  style={{flex: windowHeightPercentUnit*10}}>
                    <View style={{flex: windowHeightPercentUnit}}>
                        <Text onPress={showCaseSummary}  style={styles.welcomeSmall}>
                        RESUMEN CASO
                        </Text>
                         <ScrollView style={{flex: windowHeightPercentUnit}}>
                            <TouchableOpacity  onPress={editCaseSummary} style={{opacity:0, zIndex: touchableOpacityZindex, backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute'}}></TouchableOpacity >
                            <TextInput onChangeText={(caseSummaryData) => enterCaseSummary(caseSummaryData)} onKeyPress={TextInputEnterKeyPressed} ref={CaseSummaryTextInput} defaultValue={caseSummary} multiline={true} style={{zIndex: 3, fontSize: 20, color: editableStatus.color, backgroundColor: editableStatus.backGround, textAlign: 'justify', paddingRight:30, paddingTop: windowHeightPercentUnit*3}}/>
                         </ScrollView>
                    </View>
                </View>
                <View style={{flex: windowHeightPercentUnit}}>
                </View>
            </Animated.View >

            <View style={{flex: windowHeightPercentUnit*10}}>
                <ScrollView style={{flex: windowHeightPercentUnit*5, flexDirection: 'column', height: 150, backgroundColor: "white"}}>
                    {
                      messages.map(
                        function(item, index)
                        {
                            let style;
                            let color;
                            let align;
                            let initialValue = 0;
                            if(item.messages_origin=="lawyer"){
                                style = styles.lawyerStyle;
                                color = 'white';
                                align = 'left';
                            }else if(item.messages_origin=="user"){style = styles.clientStyle; color = 'black'; align = 'right';}
                            return <TouchableHighlight style={style}><Text key={index} style={{fontWeight: "bold", textAlign: align , fontSize: windowHeightPercentUnit*3, color:color}}>{item.messages_content}</Text></TouchableHighlight>
                        }

                                    )
                    }
                </ScrollView>
            </View>

            <CountDown
                until={20}
                onFinish={() => ("users_id" in store.selectedCase && unlocked===false)?setModalVisibility(true):setModalVisibility(false)}
                style={("users_id" in store.selectedCase && unlocked===false)?{marginRight: '60%', borderTopLeftRadius: 10, borderTopRightRadius: 10,  backgroundColor: "#4170f9"}:{display: "none"}}
                size={20}
                timeToShow={['M','S']}
                digitStyle={{marginRight: 0, height: windowHeightPercentUnit*5, padding: 0 , backgroundColor: '#4170f9', borderColor: '#4170f9'}}
                digitTxtStyle={{color: 'white'}}
                timeLabelStyle={{color: '#4170f9', fontWeight: 'bold'}}
                separatorStyle={{color: 'white'}}
                timeLabels={{m: null, s: null}}
                showSeparator={true}
                />


            <View style={{ marginBottom: windowHeightPercentUnit*5, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text>
                    </Text><Icon size={50} name='credit-card' color='gold'  onPress={() => { payment() }}/>
                </View>
                <View style={{flex:4}}>
                    <Text>
                    </Text>
                    <TextInput ref={inputRef} onChangeText={x=> {setMessageInputContent(x); typing(x)}} style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/>
                </View>
                <View style={{flex:1}}>
                    <Text>
                    </Text>
                    <Icon onPress={sendMessage} size={50} name='send' color='#4170f9'/>
                 </View>
            </View>

            <ModalPortal />
                <Modal
                  visible={modalVisibility}
                  onTouchOutside={() => {
                        }}
                    >
                    <ModalContent>
                        <Text style={styles.modalStyle}>Se acabó el tiempo! ¿Te interesa tomar este caso?</Text>

                        <Text style={styles.modalStyle}></Text>
                        <Button color={Platform.OS === 'ios'?"#4170f9":"#4170f9"} title="No es un caso real" onPress={()=>sendRejectionReason("No es un caso real")} />
                        <Text> </Text>
                        <Button color={Platform.OS === 'ios'?"#4170f9":"#4170f9"} title="No requiere gestión alguna" onPress={()=>sendRejectionReason("No requiere gestión alguna")} />
                        <Text> </Text>
                        <Button color={Platform.OS === 'ios'?"#4170f9":"#4170f9"} title="No piensa contratar abogado en lo pronto" onPress={()=>sendRejectionReason("No piensa contratar abogado en lo pronto")} />
                        <Text> </Text>
                        <Button color={Platform.OS === 'ios'?"#4170f9":"#4170f9"} title="No tiene capacidad de pago" onPress={()=>sendRejectionReason("No tiene capacidad de pago")} />
                        <Text> </Text>
                        <Button color={Platform.OS === 'ios'?"#4170f9":"#4170f9"} title="Quien consulta no toma la desición de contratar" onPress={()=>sendRejectionReason("Quien consulta no toma la desición de contratar")} />
                        <Text> </Text>
                        <Text style={styles.modalStyle}>Quiero desbloquear el chat para tener este cliente</Text>
                        <Icon size={50} name='credit-card' color='gold'  onPress={() => { payment() }}/>
                    </ModalContent>
                </Modal>
         </View>
    </KeyboardAvoidingView>


    );
}

const styles = StyleSheet.create({
  welcomeSmall: {
      textAlign: 'left',
      margin: 0,
      color: 'white',
      fontSize: windowHeightPercentUnit*4,
      fontWeight: 'bold'
    },
  lawyerStyle: {
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: "#4170f9",
    fontSize: windowHeightPercentUnit*2,
    marginRight:50,
    marginLeft: 10,
    marginTop: 20,
    padding:15,
    paddingRight: 5,
  },
  clientStyle: {
    backgroundColor: "#E5E7E9",
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    marginRight:10,
    marginLeft: 50,
    marginTop: 20,
    padding:15,
    paddingRight: 5,
    },
  modalStyle:{
    color:"black",
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    fontSize:windowHeightPercentUnit*3,
    textAlign: 'center',
    },
});