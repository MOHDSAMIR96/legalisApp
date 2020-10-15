import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {Animated} from 'react-native';


export default class CaseChat extends React.Component {

    constructor(props){
    super(props)

    this.sendMessage = this.sendMessage.bind(this);
    this.showCaseSummary = this.showCaseSummary.bind(this);
    this.showCaseUpdate = this.showCaseUpdate.bind(this);
    this.showPhase = this.showPhase.bind(this);
    this.state = {
                data: {time: 6, title: 'Event 1', description: 'Event 1 Description'},
                animateCaseContainer: new Animated.Value(8),
                animateCaseUpdate: new Animated.Value(5),
                animateCaseSummary: new Animated.Value(5),
                registerBtnDisplayed: false,
                messages: [{key:1, value: "Hola como va mi trámite", fromUser: true},{key:2, value: "Hola el lunes sabemos de la inscripcion, a si que todo va de acuerdo al plan ok wn",fromUser: false},{key:3, value: "A pero que bien entonces me avisas",fromUser: true},{key:4, value: "si no te preocupes, saludos", fromUser: false},{key:5, value: "si no te preocupes, saludos", fromUser: true}, {key:6, value: "no me remede", fromUser: false}, {key:7, value: "sdcdskcmdscmdslcmdslcs cdsx dsxdscds csdcds cpksd cds csdpl csd cksd cpds cds cpsd cp dskc dscp", fromUser: true}],
                textoEjemplo: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains",
                timeLine: [{ succeded: true ,id: 1, phase: "Presentación demanda"}, { succeded: true, id: 2, phase: "Ratificación firma"}, {succeded: true, id: 3, phase: "Contestación"}, {succeded: false,  id: 4, phase: "Término Probatorio"}, {succeded: false, id: 5, phase: "Dictación de sentencia"}],
                phaseShowedOnTimeline: "",
                animatephaseShowedOnTimeline: new Animated.Value(0),
            }
    }


  componentDidMount(){
    //----------------------GET TO /USERS
    const url = ''
    //axios.get(url, {/*QUERY PARAMS POR URL*/})
    //.then(response => {
    //    response.data
    //})
    //.catch(e => {
    //    Alert.alert(e)
    //})

    //----------------------POST TO /MESSAGES



    //----------------------GET TO /MESSAGES
    //PROBABLEMENTE DEBE HABER UNA FUNCIONALIDAD QUE PREGUNTE AL BACKEND CADA SEGUNDO U OTRA COSA MAS EFICIENTE

  }

  sendMessage(){

  //-----------------------GET TO /MESSAGES
    Alert.alert("funciona")
  }

  showCaseSummary(){
    if(!this.state.registerBtnDisplayed){

        Animated.timing(this.state.animateCaseContainer, {toValue: 30, duration: 300}).start()
        Animated.timing(this.state.animateCaseUpdate, {toValue: 1, duration: 0}).start()
        this.setState({registerBtnDisplayed: true})
    }
    else if(this.state.registerBtnDisplayed){

    Animated.timing(this.state.animateCaseSummary, {toValue: 5, duration: 0}).start()
      Animated.timing(this.state.animateCaseContainer, {toValue: 8, duration: 300}).start()
      Animated.timing(this.state.animateCaseUpdate, {toValue: 5, duration: 300}).start()
       this.setState({registerBtnDisplayed: false})
    }

  }

    showCaseUpdate(){
        if(!this.state.registerBtnDisplayed){//--------->


           Animated.timing(this.state.animateCaseSummary, {toValue: 1, duration: 0}).start()
            Animated.timing(this.state.animateCaseContainer, {toValue: 25, duration: 300}).start()
            Animated.timing(this.state.animateCaseUpdate, {toValue: 5, duration: 300}).start()
            this.setState({registerBtnDisplayed: true})
        }
        else if(this.state.registerBtnDisplayed){


           Animated.timing(this.state.animateCaseSummary, {toValue: 5, duration: 0}).start()
           Animated.timing(this.state.animateCaseContainer, {toValue: 8, duration: 300}).start()
           Animated.timing(this.state.animateCaseUpdate, {toValue: 5, duration: 300}).start()
            this.setState({registerBtnDisplayed: false})
        }

      }

    showPhase(phase){

        this.setState({phaseShowedOnTimeline: phase})
        Animated.timing(this.state.animatephaseShowedOnTimeline, {toValue: 0, duration: 0}).start(()=>{
        Animated.timing(this.state.animatephaseShowedOnTimeline, {toValue: 1, duration: 800}).start()})
    }

  render() {
    return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white"}}>
        <Animated.View style={{flex: this.state.animateCaseContainer, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex: 2, flexDirection:"column"}}>
                <View style={{flex: 1}}></View>
            </View>
            <View style={{flex: 35}}>

                <Animated.View style={{flex: this.state.animateCaseSummary}}>
                    <Text onPress={this.showCaseSummary} style={styles.welcomeSmall}>RESUMEN CASO</Text>
                    <ScrollView style={{flex: 5}}>
                    <Text style={{fontSize: 20, color: "white", textAlign: 'justify', paddingRight:30}}>{this.state.textoEjemplo}</Text>
                    </ScrollView>
                </Animated.View>

                <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 1
                  }}
                />


                <Animated.View style={{flex: this.state.animateCaseUpdate, flexDirection:'column'}}>
                    <Text onPress={this.showCaseUpdate} style={styles.welcomeSmall}>AVANCE CASO</Text>
                    <View style={{flexDirection: "row", felx: 2}}>
                    {this.state.timeLine.map((item)=>{
                    let color= ""
                    let roundedBorder=""
                    if(item.id ==1){roundedBorder=20}else{roundedBorder=0}
                        if(item.succeded == true){color="#39E938"}else{color="white"}
                    return (
                        <View key={item.id} style={{ marginTop:10 , flex: 3,flexDirection:'row', height: 30, width: 20}}>
                            <View style={{flex: 1, backgroundColor: color, height: 10, width: 10, marginTop:8, borderTopLeftRadius: roundedBorder, borderBottomLeftRadius: roundedBorder }}>
                            </View>
                            <View style={{flex: 1, backgroundColor: color, height: 30, borderRadius:30, width: 20}}>
                                <Text className={item.phase} style={{color: color, height: 30, borderRadius:30, width: 20}} onPress={()=> this.showPhase(item.phase)} >o</Text>
                            </View>
                        </View>
                    )})}

                    </View>
                    <View style={{flex:1}}>
                        <Animated.Text style={{ opacity: this.state.animatephaseShowedOnTimeline, textAlign: 'center', color: 'white', fontSize:30, fontWeight: 'bold'}}>- {this.state.phaseShowedOnTimeline} -</Animated.Text>
                    </View>
                </Animated.View>

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
        <View style={{flex: 15, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
            <View style={{flex:1, flexDirection:'column'}}><Text> </Text></View>
            <View style={{flex:8}}><Text> </Text><TextInput style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
            <View style={{flex:3}}><Text> </Text><Icon onPress={this.sendMessage} size={50} name='send' color='#4170f9'/></View>
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
