import React, {Component, useState, useEffect, useRef}  from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {PanResponder, Animated, Dimensions, Picker } from 'react-native';
import { Video } from 'expo-av';

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

    //USE REF'S
    const drunkenOwl = useRef(null);
    const voiceRecognition = useRef(null);

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(()=>{

    drunkenOwl.current.play();
    voiceRecognition.current.play();
    let hour = new Date().getHours()
    sethourOfTheDay(hour)

    },[])

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
            "lawyer_id": 16,
            "taken": false,
            "unlocked": false
        }
        console.log(JSON.stringify(clientData))

        let options = {
                    method: 'POST',
                    body: JSON.stringify(clientData),
                    headers: {'Content-Type': 'application/json'}};

        if(caseDescription.length>0 || userName.length>0){
            fetch("http://patoexer.pythonanywhere.com/user/1", options)
                    .then((response)=> response.json())
                    .then((data)=> {
                        dispatch({type: "USERDATA", doneAction: data});
                        navigation.navigate('videoComponent')
                    })
                    .catch(error => {console.log(JSON.stringify(error))})
        }
  }

}

    const startRecognize=()=>{

    setLottieRecognitionPathBoolean(true);
    voiceRecognition.current.reset();
    setTimeout(()=>{voiceRecognition.current.play();},100)


    }





    return (

    <KeyboardAvoidingView behavior='height' style={{flex: windowHeightPercentUnit, backgroundColor: "#4170f9"}}>

        <View  style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit, backgroundColor: "#4170f9"}:{ display:'none'}}>
            <Text style={[styles.welcome, {fontSize: windowHeightPercentUnit*4, padding: windowHeightPercentUnit }]}>Cuéntanos tu problema...</Text>
        </View>

        <View style={(hourOfTheDay>=24)?{flex: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}:{ display:'none'}}>
            <Text style={styles.welcome}>Estamos descanzando</Text>
        </View>

        <View style={(hourOfTheDay>=24)?{alignItems: "center", flex: windowHeightPercentUnit*5, backgroundColor: "#4170f9"}:{ display:'none'}}>
            <Text style={styles.instructions}>Los sentimos, nuestros abgados estan descanzando. Nuestra hora de atención es de 8:00 a 20:00 hrs. Por favor, vuelva más tarde. </Text>
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
                                    backgroundColor: '#4170f9'
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
                    <TextInput placeholder="¿CUAL ES TU PROBLEMA LEGAL?" onChangeText={x=> setNewCaseDescription(x)} multiline={false} style={{textAlign: 'center',backgroundColor: 'white', fontSize: windowHeightPercentUnit*2.5, height: '90%', borderRadius:10}} />
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

