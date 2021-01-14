import React, {Component, useState, useEffect}  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {PanResponder, Animated, Dimensions } from 'react-native';
import { Video } from 'expo-av';

import { useSelector, useDispatch } from 'react-redux';


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

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(()=>{
    let hour = new Date().getHours()
    sethourOfTheDay(hour)

    },[])

    useEffect(()=>{
            //HERE WE ANIMATE THE FONT ON THE SUBJECT SELECTOR
                                switch(subjects[activeSubjectCounter]){
                                    case subjects[0]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit*3, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        break;
                                    case subjects[1]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit*3, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[2]:
                                         Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit*3, duration: 500}).start()
                                         Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                         Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                         break;
                                    case subjects[3]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit*3, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[4]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit*3, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[5]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit*3, duration: 500}).start()
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

    let clientData = {
        "users_name": userName,
        "users_issue_subject": subjects[activeSubjectCounter],
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
                    console.log(JSON.stringify(data))
                    dispatch({type: "USERDATA", doneAction: data});
                    navigation.navigate('videoComponent')
                })
                .catch(error => {console.log(JSON.stringify(error))})

    }else{console.log("llenar el formulario " + caseDescription.length + " " + userName.length)}


  }

    return (
    <View style={{flex: windowHeightPercentUnit*1, backgroundColor: "#4170f9"}}>

        <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}:{ display:'none'}}><Text style={styles.welcome}>Cuéntanos tu problema...</Text></View>

        <View style={(hourOfTheDay>=24)?{flex: windowHeightPercentUnit*2, backgroundColor: "#4170f9"}:{ display:'none'}}><Text style={styles.welcome}>Estamos descanzando</Text></View>
        <View style={(hourOfTheDay>=24)?{flex: windowHeightPercentUnit*5, backgroundColor: "#4170f9"}:{ display:'none'}}><Text style={styles.instructions}>Los sentimos, nuestros abgados estan descanzando. Nuestra hora de atención es de 8:00 a 20:00 hrs. Por favor, vuelva más tarde. </Text></View>

        <View style={(hourOfTheDay<24)?{ flex: windowHeightPercentUnit*1, flexDirection: 'row'}:{ display:'none'}} >
           <View style={{flex: 1}}></View>
           <View   {..._panResponder.panHandlers} style={{flex: 8, width: '80%', borderRadius: 10, flexDirection: 'row', backgroundColor:"white"}}>
               <Animated.Text style={(subjects[activeSubjectCounter]==subjects[0])?{marginLeft: '10%',position: 'relative', left: animatePosition , textAlign: 'center', fontSize: animateFontSize1 , backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%', position:'relative',left: animatePosition  , textAlign: 'center',  fontSize: animateFontSize1 , color: "#4170f9", fontWeight: "bold"}}>{subjects[0]}</Animated.Text>
               <Animated.Text style={(subjects[activeSubjectCounter]==subjects[1])?{marginLeft: '10%', position: 'relative', left: animatePosition ,textAlign: 'center', fontSize: animateFontSize2 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%', position:'relative',left: animatePosition , textAlign: 'center' , fontSize: animateFontSize2 , color: "#4170f9", fontWeight: "bold"}}>{subjects[1]}</Animated.Text>
               <Animated.Text style={(subjects[activeSubjectCounter]==subjects[2])?{ marginLeft: '10%', position: 'relative', left: animatePosition , textAlign: 'center',  fontSize: animateFontSize3 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%', position:'relative',left: animatePosition , textAlign: 'center',  fontSize: animateFontSize3 , color: "#4170f9", fontWeight: "bold"}}>{subjects[2]}</Animated.Text>
               <Animated.Text style={(subjects[activeSubjectCounter]==subjects[3])?{ marginLeft: '10%', position: 'relative',left: animatePosition , textAlign: 'center', fontSize: animateFontSize4 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%',  position:'relative', left: animatePosition ,textAlign: 'center', fontSize: animateFontSize4 , color: "#4170f9", fontWeight: "bold"}}>{subjects[3]}</Animated.Text>
               <Animated.Text style={(subjects[activeSubjectCounter]==subjects[4])?{marginLeft: '10%', position: 'relative',left: animatePosition, textAlign: 'center', fontSize: animateFontSize5 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%',  position:'relative', left: animatePosition ,textAlign: 'center', fontSize: animateFontSize5 , color: "#4170f9", fontWeight: "bold"}}>{subjects[4]}</Animated.Text>
               <Animated.Text style={(subjects[activeSubjectCounter]==subjects[5])?{marginLeft: '10%', position: 'relative',left: animatePosition , textAlign: 'center', fontSize: animateFontSize6 ,backgroundColor: 'white', color: "#4170f9", fontWeight: "bold"}:{ marginLeft: '10%',  position:'relative',left: animatePosition , textAlign: 'center', fontSize: animateFontSize6 , color: "#4170f9", fontWeight: "bold"}}>{subjects[5]}</Animated.Text>

           </View>
            <View style={{flex: 1}}></View>
        </View>


            <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*2, flexDirection: 'row', backgroundColor: "#4170f9"}:{ display:'none'}}>
                   <View style={{flex: 2}}></View>
                   <View style={[{ width: "100%", flex:1, flexDirection: 'column',margin: '5%', backgroundColor: "#4170f9"}]}>
                             <View style={{backgroundColor: "#747A87", borderRadius: 100, marginBottom: '40%', paddingTop:'10%'}}><Icon name='mic' color='white' /></View>
                             <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>

                               <Text>{ "ani: " +  JSON.stringify(animatePosition) + "%" } </Text>

                             </View>
                   </View>
                   <View style={{flex: 2}}></View>
            </View>

                 <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*3, flexDirection: 'row', backgroundColor: "#4170f9"}:{ display:'none'}} >
                     <View style={{flex: 1}}></View>
                       <View style={[{ flex:10, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                          <TextInput placeholder="¿CUAL ES TU PROBLEMA LEGAL?" onChangeText={x=> setNewCaseDescription(x)} multiline={false} style={{textAlign: 'center',backgroundColor: 'white', fontSize: windowHeightPercentUnit*2, height: '100%', borderRadius:10}} />

                          <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                            <Text></Text>
                          </View>
                       </View>

                     <View style={{flex: 1}}>

                     </View>
                 </View>

                <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*3, flexDirection: 'row', backgroundColor: "#4170f9"}:{ display:'none'}}>
                                     <View style={{flex: 1}}></View>
                                       <View style={[{ flex:10, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                                         <TextInput placeholder="NOMBRE" onChangeText={x=> setNewUserName(x)} style={{fontSize: windowHeightPercentUnit*2, textAlign: 'center', padding: '5%',backgroundColor: 'white', borderRadius:10, marginTop: '10%', marginBottom: '10%'}} />

                                          <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                            <Text></Text>
                                          </View>
                                       </View>

                                     <View style={{flex: 1}}>

                                      </View>
                                 </View>

                <TouchableOpacity
                        style={(hourOfTheDay<=24)?{backgroundColor: "#747A87", height: '10%', color: 'white', alignItems: "center"}:{ display:'none'}}
                        color="white"
                        onPress={()=> {  sendDescription()
                        }}
                      >
                      <Text></Text>
                        <Text style={{fontSize:windowHeightPercentUnit*4, color: "white"}}>SIGUIENTE</Text>
                      </TouchableOpacity>

     </View>
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
});

