import React, {Component, useState, useEffect, useRef}  from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {PanResponder, Animated, Dimensions, Picker, Keyboard, Linking } from 'react-native';
import { Video } from 'expo-av';
import Textarea from 'react-native-textarea';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';


    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/6);


export default function Query({navigation}){//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA

    const [subjects, setNewSubjects] = useState(['PROPIEDADES', 'HERENCIAS', 'DIVORCIOS', 'DESPIDOS', 'DEUDAS', 'OTRAS CONSULTAS']);
    const [activeSubject, setNewActiveSubject] = useState(0);
    const [activeSubjectCounter, setNewActiveSubjectCounter] = useState(0);
    const [animatePosition, setNewAnimatePosition] = useState(new Animated.Value(0));
    const [animateFontSize1, setNewAnimateFontSize1] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize2, setNewAnimateFontSize2] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize3, setNewAnimateFontSize3] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize4, setNewAnimateFontSize4] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize5, setNewAnimateFontSize5] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize6, setNewAnimateFontSize6] = useState(new Animated.Value(windowHeightPercentUnit));
    const [caseDescription, setNewCaseDescription] = useState("");
    const [userName, setNewUserName] = useState("");
    const [fetchResponse, setNewFetchResponse] = useState("");
    const [hourOfTheDay, sethourOfTheDay] = useState(0);

    const [descriptionAnimation, setDescriptionAnimation] = useState(new Animated.Value(0));
    const [nameAnimation, setNameAnimation] = useState(new Animated.Value(0));

    const [selectedValue, setSelectedValue] = useState("propiedades");

    const [lottieRecognitionPathBoolean, setLottieRecognitionPathBoolean] = useState(false);

    const [paymentTracker, setPaymentTracker] = useState(false);

    //USE REF'S
    const drunkenOwl = useRef(null);
    const voiceRecognition = useRef(null);
    const textarea = useRef(null);

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(()=>{

    drunkenOwl.current.play();
    voiceRecognition.current.play();
    let hour = new Date().getHours()
    sethourOfTheDay(hour)

    },[])

    useEffect(()=>{ //WE TRACK IF THE PAYMENT IS DONE, may be this could be recoded for more efficiency
       if(paymentTracker){//************************ IMPLEMENTAR REACT NATIVE BACKGROUND TIMER
       const trackingPaymentInterval = setInterval(()=>{

               fetch("http://patoexer.pythonanywhere.com/userByLawyers/2")
                      .then((resp)=> {return resp.json()})
                      .then((data)=> {
                      let lastAdviceUSer = data.resp[data.resp.length - 1];


                      if(lastAdviceUSer.users_name == userName){
        console.log("true")
                            dispatch({type: "USERDATA", doneAction: lastAdviceUSer});
                            navigation.navigate('QueryChat');//navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]);

                        }
                      })
                      .catch( error => console.log(error))
               },1000)
       }


        },[paymentTracker])

    useEffect(()=>{
            //HERE WE ANIMATE THE FONT ON THE SUBJECT SELECTOR
                                switch(subjects[activeSubjectCounter]){
                                    case subjects[0]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        break;
                                    case subjects[1]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[2]:
                                         Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                         Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                         Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                         break;
                                    case subjects[3]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit*5, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[4]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[5]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        break;
                                }

        },[activeSubjectCounter])

     const _panResponder = PanResponder.create({
          // Ask to be the responder:
          //onStartShouldSetPanResponder: (evt, gestureState) => true,
          //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
               //console.log(gestureState)
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded

            if(gestureState.dx<0){
                    if(subjects[activeSubjectCounter]!= "OTRAS CONSULTAS"){console.log(windowWidthPercentUnit)
                         Animated.timing(animatePosition, {toValue: animatePosition.__getValue() - windowWidthPercentUnit, duration: 500}).start()
                         setNewActiveSubjectCounter(activeSubjectCounter + 1)
                    }
                  }
            else{
                    if(subjects[activeSubjectCounter]!= "PROPIEDADES"){
                        Animated.timing(animatePosition, {toValue: animatePosition.__getValue() + windowWidthPercentUnit, duration: 500}).start()
                        setNewActiveSubjectCounter(activeSubjectCounter - 1)

                    }
                }
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled

          },

        })

  const sendDescription=()=>{

  if(selectedValue == 'otras consultas'){

      payment()
  }
  else{

      switch(0){
       case userName.length:
        Animated.sequence([
                    Animated.timing(nameAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(nameAnimation, {
                        toValue: -10,
                        duration: 50
                    }),
                    Animated.timing(nameAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(nameAnimation, {
                        toValue: 0,
                        duration: 50
                    })
                ]).start()
          break;
      case caseDescription.length:
        Animated.sequence([
                    Animated.timing(descriptionAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAnimation, {
                        toValue: -10,
                        duration: 50
                    }),
                      Animated.timing(descriptionAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAnimation, {
                        toValue: 0,
                        duration: 50
                    })
                  ]).start()
          break;
      default:
        let clientData = {
                "users_name": userName,
                "users_issue_subject": (Platform.OS==='ios')?selectedValue:subjects[activeSubjectCounter],
                "users_issue_description": caseDescription,
                "lawyer_id": 1,
                "taken": false,
                "unlocked": false
            }

            let options = {
                        method: 'POST',
                        body: JSON.stringify(clientData),
                        headers: {'Content-Type': 'application/json'}};

            if(caseDescription.length>0 || userName.length>0){
                fetch("http://patoexer.pythonanywhere.com/user/1", options)
                        .then((response)=> response.json())
                        .then((data)=> {
                            dispatch({type: "USERDATA", doneAction: data});
                            navigation.navigate('videoComponent');
                        })
                        .catch(error => {console.log(JSON.stringify(error))})
            }
      }
  }

}

    const startRecognize=()=>{

    setLottieRecognitionPathBoolean(true);
    voiceRecognition.current.reset();
    setTimeout(()=>{voiceRecognition.current.play();},100)


    }

    const payment = () => {

            let random = Math.floor(Math.random()*10000000);

            let basePath= '';
            let secretKey = '';
            let urlnotify = '';
            let options = {};
            let data = {};

            basePath= 'https://des.payku.cl/api/transaction'; //'https://app.payku.cl/api/transaction';
            secretKey = "07c81310fe1dbc717a6f77218d0be7c4"//"d7243a0609351f4e7024ad497790efce";
            urlnotify = 'https://des.payku.cl/' //'https://app.payku.cl/'
            options = {method: 'POST',
                           headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer 87933aa65bc6af7ceae8fda096054dc3'//'Bearer 4fd3f80a2a367d545d9af93ab3c01979' //token publico
                                },
                       body: JSON.stringify(data) // se envia denuevo el obj, se envia por aca y denuevo en la firma, doble seguridad
                       }
           // hay dos paginas para probar la api, que entregan token diferentes. Una es para el sandbox y la otra para transacciones reales. Intenga ocupar los token para cada fin específico
           // una vez hecho el post confirma transacción con get, poniendo en authorization del header el token público ej: Bearer 87933aa65bc6af7ceae8fda096054dc3
           // la respueta 200 trae url que es donde se inicia el proceso de pago, una vez concluye proceso y se paga efectivamente, lo que pusiste como returnurl se ejecuta luego del pago y trae al cliente allá

                JSHash(random, CONSTANTS.HashAlgorithms.sha256) // HASHING RANDOM IS NOW UNNECESARY, BUT I WILL LET LIKE THIS
                  .then(hash => {

                           let urlReturn = "http://patoexer.pythonanywhere.com/paymentOk/1/userName=" + userName + "&description=" + caseDescription + "/5000";
                           urlReturn = urlReturn.replace(/ /g, "_")
                           urlReturn = urlReturn.replace(/\n/g, "")
                           urlReturn = urlReturn.normalize("NFD").replace(/[\u0300-\u036f]/g, "")// WE PREVENT URL ERRORS NORMALIZING THE STRING

                            console.log(urlReturn.slice(-1));
                            console.log(urlReturn);
                           data = {
                                   email: "legalisproyect@gmail.com",// WE DON'T HAVE CLIENT EMAIL, SO WE LET OUR MAIL.
                                   urlreturn: urlReturn, //colocar un identificador de pago, hacer tabla de pagos, endpoint flask de tabla pagos
                                   urlnotify: urlnotify,// 'https://des.payku.cl/', // cuando el banco confirma el proceso del pago, se envía a una url los detalles de confirmacion de pago. HAy que hacer bkan con python para almacenar en base de datos
                                   order:  random,
                                   subject: 'chat ilimitado por OTRAS CONSULTAS',
                                   amount: 5000,
                                   payment: 1
                                   };

                           options.body = JSON.stringify(data)

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

                               fetch(basePath, options)
                               .then( (resp)=>{return resp.json()})
                               .then( (data)=>{
                                console.log("se setio el tracker");
                                setPaymentTracker(true)
                                Linking.openURL(data.url).catch(err => console.error("Couldn't load page", err));
                                })
                  })
                  .catch(e => console.log("error" + e));


           }

    return (

    <KeyboardAvoidingView behavior='height' style={{flex: windowHeightPercentUnit, backgroundColor: "#4170f9", paddingTop: windowHeightPercentUnit*5}}>

        <View  style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit, backgroundColor: "#4170f9"}:{ display:'none'}}>
            <Text style={[styles.welcome, {fontSize: windowHeightPercentUnit*4, padding: windowHeightPercentUnit }]}>Cuéntanos tu problema...</Text>
        </View>

        <View style={(hourOfTheDay>=24)?{flex: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}:{ display:'none'}}>
            <Text style={styles.welcome}>Estamos descanzando</Text>
        </View>

        <View style={(hourOfTheDay>=24)?{alignItems: "center", flex: windowHeightPercentUnit*5, backgroundColor: "#4170f9"}:{ display:'none'}}>
            <Text style={styles.instructions}>Los sentimos, nuestros abogados estan descanzando. Nuestra hora de atención es de 8:00 a 20:00 hrs. Por favor, vuelva más tarde. </Text>
            <LottieView
                ref={drunkenOwl}
                style={{
                width: windowWidthPercentUnit*50,
                height: windowHeightPercentUnit*50,
                backgroundColor: '#4170f9'//,
                //display:(Platform.OS === 'ios')?"flex":"none"
                }}
                source={require('../assetsLottie/the-drunken-owl.json')}
                // OR find more Lottie files @ https://lottiefiles.com/featured
                // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
            />

        </View>


        <View style={(hourOfTheDay<24)?{ flex: windowHeightPercentUnit*3, padding: windowHeightPercentUnit, backgroundColor: '#4170f9', flexDirection: 'row'}:{ display:'none'}} >

            <View style={Platform.OS!=='ios'?{display: 'none'}:{flex:1}} >
            <Text style={[styles.instructions, {color: "white", fontWeight: 'bold', textAlign: 'center', display: (selectedValue == 'otras consultas')?'flex':'none' }]}>*El item de OTRAS CONSULTAS requiere pagar por asesoría un valor de $5.000</Text>
            <Picker
                    selectedValue={selectedValue}
                    style={Platform.OS==='android'?{display: 'none'}:{ height: windowHeightPercentUnit/2, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item color='white' label="PROPIEDADES" value="propiedades" />
                    <Picker.Item color='white' label="HERENCIAS" value="herencias" />
                    <Picker.Item color='white' label="DIVORCIOS" value="divorcio" />
                    <Picker.Item color='white' label="DESPIDOS" value="despidos" />
                    <Picker.Item color='white' label="DEUDAS" value="deudas" />
                    <Picker.Item color='white' label="OTRAS CONSULTAS" value="otras consultas" />
                  </Picker>

             </View  >
            <View   {..._panResponder.panHandlers} style={Platform.OS==='android'?{width: '100%', borderRadius: 10, flexDirection: 'row', height: windowHeightPercentUnit*10, backgroundColor:"white"}:{display: 'none'}}>
                <Animated.Text style={(subjects[activeSubjectCounter]==subjects[0])?{marginLeft: '10%',position: 'relative', left: animatePosition , textAlign: 'center', fontSize: animateFontSize1 , backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%', position:'relative',left: animatePosition  , textAlign: 'center',  fontSize: animateFontSize1 , color: "#4170f9", fontWeight: "bold"}}>{subjects[0]}</Animated.Text>
                <Animated.Text style={(subjects[activeSubjectCounter]==subjects[1])?{marginLeft: '10%', position: 'relative', left: animatePosition ,textAlign: 'center', fontSize: animateFontSize2 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%', position:'relative',left: animatePosition , textAlign: 'center' , fontSize: animateFontSize2 , color: "#4170f9", fontWeight: "bold"}}>{subjects[1]}</Animated.Text>
                <Animated.Text style={(subjects[activeSubjectCounter]==subjects[2])?{ marginLeft: '10%', position: 'relative', left: animatePosition , textAlign: 'center',  fontSize: animateFontSize3 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%', position:'relative',left: animatePosition , textAlign: 'center',  fontSize: animateFontSize3 , color: "#4170f9", fontWeight: "bold"}}>{subjects[2]}</Animated.Text>
                <Animated.Text style={(subjects[activeSubjectCounter]==subjects[3])?{ marginLeft: '10%', position: 'relative',left: animatePosition , textAlign: 'center', fontSize: animateFontSize4 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%',  position:'relative', left: animatePosition ,textAlign: 'center', fontSize: animateFontSize4 , color: "#4170f9", fontWeight: "bold"}}>{subjects[3]}</Animated.Text>
                <Animated.Text style={(subjects[activeSubjectCounter]==subjects[4])?{marginLeft: '10%', position: 'relative',left: animatePosition, textAlign: 'center', fontSize: animateFontSize5 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%',  position:'relative', left: animatePosition ,textAlign: 'center', fontSize: animateFontSize5 , color: "#4170f9", fontWeight: "bold"}}>{subjects[4]}</Animated.Text>
                <Animated.Text style={(subjects[activeSubjectCounter]==subjects[5])?{marginLeft: '10%', position: 'relative',left: animatePosition , textAlign: 'center', fontSize: animateFontSize6 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%',  position:'relative',left: animatePosition , textAlign: 'center', fontSize: animateFontSize6 , color: "#4170f9", fontWeight: "bold"}}>{subjects[5]}</Animated.Text>

            </View>

        </View>

        <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit, padding: windowHeightPercentUnit , flexDirection: 'row', backgroundColor: "#4170f9"}:{ display:'none'}}>

            <View style={{flex: 2}}></View>
            <View style={[{ width: "100%", flex:1, alignItems: "center" ,flexDirection: 'column',backgroundColor: '#4170f9'}]}>
                <TouchableWithoutFeedback style={(Platform.OS === 'ios')? {display:'flex'}: {display:'none'}} onPress={() => startRecognize()}>
                    <LottieView
                                    ref={voiceRecognition}
                                    style={{
                                    width: windowWidthPercentUnit*10,
                                    height: windowHeightPercentUnit*10,
                                    backgroundColor: '#4170f9',
                                    }}
                                    source={(!lottieRecognitionPathBoolean)?require("../assetsLottie/lf30_editor_a5fkbzjs.json"):require("../assetsLottie/sound-wave.json")}
                                    // OR find more Lottie files @ https://lottiefiles.com/featured
                                    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                                />
                </TouchableWithoutFeedback>

            </View>
            <View style={{flex: 2}}></View>
        </View>

        <View style={{flex:windowHeightPercentUnit*5}} >
            <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*2, padding: windowHeightPercentUnit*2, flexDirection: 'row', backgroundColor: "#4170f9"}:{ display:'none'}}>
                <View style={{flex: 1}}></View>
                    <Animated.View style={[{ flex:windowHeightPercentUnit*2, left: nameAnimation, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                        <TextInput placeholder="NOMBRE" onChangeText={x=> setNewUserName(x)} style={{fontSize: windowHeightPercentUnit*2.5, textAlign: 'center',backgroundColor: 'white', borderRadius:10}} />
                        <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                            <Text></Text>
                        </View>
                    </Animated.View>
                <View style={{flex: 1}}></View>
            </View>
            <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*10, flexDirection: 'row', backgroundColor: "#4170f9"}:{ display:'none'}} >
                <View style={{flex: 1}}>
                </View>
                <Animated.View style={[{ width: '80%', left: descriptionAnimation, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                    <Textarea
                        ref={textarea}
                        containerStyle={{ borderRadius:10}}
                        style={{borderRadius:10, textAlignVertical: 'center', textAlign: 'center',backgroundColor: 'white', fontSize: windowHeightPercentUnit*2.5, height: '100%'}}
                        onChangeText={x=>{
                        setNewCaseDescription(x)
                        }}
                        onKeyPress={e =>{
                         if(e.nativeEvent.key === 'Enter')
                             {
                              let cutTheEnter = caseDescription.substring(0, caseDescription.length - 1);
                              textarea.current.value = cutTheEnter
                              setNewCaseDescription(cutTheEnter)
                              Keyboard.dismiss()
                              console.log(caseDescription.length)
                             }
                         }
                        }
                        maxLength={120}
                        placeholder={'¿CUAL ES TU PROBLEMA LEGAL?'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}

                      />
                </Animated.View>
                <View style={{flex: 1}}>
                </View>
            </View>


        </View>

        <View style={{flex:windowHeightPercentUnit}}>
            <TouchableOpacity
               style={(hourOfTheDay<=24)?{padding: windowHeightPercentUnit*3, paddingTop: windowHeightPercentUnit ,backgroundColor: "#747A87", color: 'white', alignItems: "center"}:{ display:'none'}}
               color="white"
               onPress={()=> {  sendDescription()
               }}
            >
                <Text style={{fontSize:windowHeightPercentUnit*4, color: "white"}}>SIGUIENTE</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>

    );
  //}
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 0,
    padding: windowHeightPercentUnit*4,
    color: "white",
    fontSize: windowHeightPercentUnit*4,

  },
  instructions: {
      color: 'white',
      backgroundColor: "#4170f9",
      borderColor: '#fff',
      fontSize:windowHeightPercentUnit*2,
      textAlign: "justify",
      padding: windowHeightPercentUnit*2

    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },


});

