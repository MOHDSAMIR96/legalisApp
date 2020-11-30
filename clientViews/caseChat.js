import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import React, {Component, useState, useEffect, useRef }  from 'react';


import {Animated} from 'react-native';


export default function CaseChat() {


    //REDUX STATE
     const store = useSelector(state => state);
     const selectedCase = useSelector(state => state.selectedCase);
     const dispatch = useDispatch();

    // COMPONEN STATE
     const [data, setData]= useState({time: 6, title: 'Event 1', description: 'Event 1 Description'});
     const [animateCaseContainer, setAnimateCaseContainer] = useState(new Animated.Value(8));
     const [animateCaseUpdate, setAnimateCaseUpdate]=useState(new Animated.Value(5));
     const [animateCaseSummary, setAnimateCaseSummary]=useState(new Animated.Value(5));
     const [registerBtnDisplayed, setRegisterBtnDisplayed] = useState(false);
     const [messages, setMessages]= useState([])
     const [caseBrief, setCaseBrief]= useState(selectedCase.cases_description)//store.userData.casesResp[store.userData.selectedCase].cases_description)
     const [timeLine, setTimeLine]= useState([{ succeded: true ,id: 1, phase: "Presentación demanda"}, { succeded: true, id: 2, phase: "Ratificación firma"}, {succeded: true, id: 3, phase: "Contestación"}, {succeded: false,  id: 4, phase: "Término Probatorio"}, {succeded: false, id: 5, phase: "Dictación de sentencia"}]);
     const [phaseShowedOnTimeline, setPhaseShowedOnTimeline]= useState("");
     const [animatephaseShowedOnTimeline, setAnimatephaseShowedOnTimeline]= useState(new Animated.Value(0));


    useEffect(()=>{

    console.log(JSON.stringify("selectedCase: " + JSON.stringify(selectedCase)))

    }, [])
  const sendMessage = () => {

  //-----------------------GET TO /MESSAGES
    Alert.alert("funciona")
  }

  const showCaseSummary = () => {
    if(!registerBtnDisplayed){

        Animated.timing(animateCaseContainer, {toValue: 30, duration: 300}).start()
        Animated.timing(animateCaseUpdate, {toValue: 1, duration: 0}).start()
        setRegisterBtnDisplayed(true);

    }
    else if(registerBtnDisplayed){
      Animated.timing(animateCaseSummary, {toValue: 5, duration: 0}).start()
      Animated.timing(animateCaseContainer, {toValue: 8, duration: 300}).start()
      Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
      setRegisterBtnDisplayed(false);
    }

  }

  const showCaseUpdate = () => {
        if(!registerBtnDisplayed){//--------->


           Animated.timing(animateCaseSummary, {toValue: 1, duration: 0}).start()
            Animated.timing(animateCaseContainer, {toValue: 25, duration: 300}).start()
            Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
            setRegisterBtnDisplayed(true);
        }
        else if(registerBtnDisplayed){


           Animated.timing(animateCaseSummary, {toValue: 5, duration: 0}).start()
           Animated.timing(animateCaseContainer, {toValue: 8, duration: 300}).start()
           Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300}).start()
           setRegisterBtnDisplayed(false);
        }

      }

    const showPhase = (phase) => {

        setPhaseShowedOnTimeline(phase)
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 0, duration: 0}).start(()=>{
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 1, duration: 800}).start()})
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
                            <Text style={{fontSize: 20, color: "white", textAlign: 'justify', paddingRight:30}}>{caseBrief}</Text>
                            </ScrollView>
                        </Animated.View>

                        <View
                          style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                          }}
                        />


                        <Animated.View style={{flex: animateCaseUpdate, flexDirection:'column'}}>
                            <Text onPress={showCaseUpdate} style={styles.welcomeSmall}>AVANCE CASO</Text>
                            <View style={{flexDirection: "row", felx: 2}}>
                            {timeLine.map((item)=>{
                            let color= ""
                            let roundedBorder=""
                            if(item.id ==1){roundedBorder=20}else{roundedBorder=0}
                                if(item.succeded == true){color="#39E938"}else{color="white"}
                            return (
                                <View key={item.id} style={{ marginTop:10 , flex: 3,flexDirection:'row', height: 30, width: 20}}>
                                    <View style={{flex: 1, backgroundColor: color, height: 10, width: 10, marginTop:8, borderTopLeftRadius: roundedBorder, borderBottomLeftRadius: roundedBorder }}>
                                    </View>
                                    <View style={{flex: 1, backgroundColor: color, height: 30, borderRadius:30, width: 20}}>
                                        <Text className={item.phase} style={{color: color, height: 30, borderRadius:30, width: 20}} onPress={()=> showPhase(item.phase)} >o</Text>
                                    </View>
                                </View>
                            )})}

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
                        messages.map(
                        function(item){if(item.fromUser){return <Text key={item.key} style={styles.clientStyle}> {item.value} </Text>}
                        else{return <Text key={item.key} style={styles.lawyerStyle}> {item.value} </Text>}}

                        )
                        }
                    </ScrollView>
                </View>
                <View style={{flex: 15, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
                    <View style={{flex:1, flexDirection:'column'}}><Text> </Text></View>
                    <View style={{flex:8}}><Text> </Text><TextInput style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
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
