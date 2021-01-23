import React, {Component, useState, useEffect}  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {PanResponder, Animated} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';


export default function Query({navigation}){//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA

    const [subjects, setNewSubjects] = useState(['CONTRATOS', 'HERENCIA', 'FAMILIA', 'LABORAL', 'PREVISIONAL']);
    const [activeSubject, setNewActiveSubject] = useState("");
    const [activeSubjectCounter, setNewActiveSubjectCounter] = useState(0);
    const [animatePosition, setNewAnimatePosition] = useState(new Animated.Value(0));
    const [caseDescription, setNewCaseDescription] = useState("");
    const [userName, setNewUserName] = useState("");
    const [fetchResponse, setNewFetchResponse] = useState("");

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

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
            //Animated.timing(this.state.animatePosition, {toValue: 40, duration: 500, useNativeDriver: true, }).start()
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
                  Animated.timing(animatePosition, {toValue: animatePosition.__getValue() + 80, duration: 500, useNativeDriver: true, }).start()
                  setNewActiveSubjectCounter(activeSubjectCounter + 1)
                }
                else{
                Animated.timing(animatePosition, {toValue: animatePosition.__getValue() - 80, duration: 500, useNativeDriver: true, }).start()
                setNewActiveSubjectCounter(activeSubjectCounter - 1)
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
        "users_issue_description": caseDescription
    }

    let options = {
                method: 'POST',
                body: JSON.stringify(clientData),
                headers: {'Content-Type': 'application/json'}};

    fetch("http://patoexer.pythonanywhere.com/user", options)
        .then((response)=> response.json())
        .then((data)=> {

            dispatch({type: "USERDATA", doneAction: data});
            navigation.navigate('QueryChat')
        })
        .catch(error => {})


  }

  const handleLayout = ({nativeEvent}) =>{

    //console.log(nativeEvent.layout)

  }

    return (
    <ScrollView style={{flex: 1, backgroundColor: "#4170f9"}}>

        <View style={{flex: 2}}><Text style={styles.welcome}>¿De qué trata tu problema? </Text></View>
        <View style={{ flex: 2, flexDirection: 'row'}}>

            <View style={{position: 'absolute', zIndex: 3, flex: 1, backgroundColor: "#4170f9"}}><Icon size={60} name='skip-previous' color='white'/></View>
                <View style={{ width: "100%", flex:3, flexDirection: 'column', backgroundColor: "#4170f9"}}>


                    <View   {..._panResponder.panHandlers}>
                        <Animated.Text onLayout={handleLayout} style={{width: 1540, right: animatePosition, fontSize: 40 , color: "white", fontWeight: "bold", textAlign: "center"}}>      {subjects[activeSubjectCounter]}         {subjects[activeSubjectCounter + 1]}           {subjects[activeSubjectCounter + 2]}             {subjects[activeSubjectCounter+3]}      {subjects[activeSubjectCounter+4]}     </Animated.Text>
                    </View>

                    <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                      <Text></Text>
                    </View>
                 </View>
                 <View style={{ flex: 1, backgroundColor: "#4170f9"}}><Icon size={60} name='skip-next' color='white'/></View>
            </View>

            <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                   <View style={{flex: 2}}></View>
                   <View style={[{ width: "100%", flex:1, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                             <TouchableOpacity
                              style={{backgroundColor: "#747A87", borderRadius: 100, width: 90, height:90, paddingTop:10}}><Icon size={60} name='mic' color='white' 
                              onPress={()=>{navigation.navigate('VoiceRecognition')}}
                              />
                             </TouchableOpacity>
                             <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                               <Text> </Text>
                             </View>
                   </View>
                   <View style={{flex: 2}}></View>
            </View>

                 <View style={{flex: 3, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <View style={{flex: 1}}></View>
                       <View style={[{ flex:10, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                          <TextInput onChangeText={x=> setNewCaseDescription(x)} multiline={true} style={{backgroundColor: 'white', height: 150, borderRadius:10}} />

                          <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}ki>
                            <Text></Text>
                          </View>
                       </View>

                     <View style={{flex: 1}}></View>
                 </View>

                <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                     <View style={{flex: 1}}></View>
                                       <View style={[{ flex:10, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                                         <TextInput onChangeText={x=> setNewUserName(x)} style={{backgroundColor: 'white', borderRadius:10, marginTop: 20, marginBottom: 10}} />

                                          <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}ki>
                                            <Text></Text>
                                          </View>
                                       </View>

                                     <View style={{flex: 1}}></View>
                                 </View>

                <TouchableOpacity
                        style={{backgroundColor: "#747A87", height: 70, color: 'white', alignItems: "center"}}
                        color="white"
                        onPress={()=> {  sendDescription()
                        }}
                      >
                      <Text></Text>
                        <Text style={{fontSize:20, color: "white"}}>SIGUIENTE</Text>
                      </TouchableOpacity>

     </ScrollView>
    );
  //}
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 0,
    color: "white",
    fontSize: 35,

  },
});

