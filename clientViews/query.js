import React, { Component } from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {PanResponder, Animated} from 'react-native';


/*<Button title="SIGUIENTE" color="#747A87" type="clear" onPress={()=> {  this.sendDescription()
                                                                                                  this.props.navigation.navigate('ChatConsulta')}
                                                                                                  }/>*/


export default class Query extends React.Component {//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA
constructor(props){
    super(props)

    this.state = {
    caseDescription: "",
    userName: "",
    animatePosition: new Animated.Value(0),
    subjects: ['CONTRATOS', 'HERENCIA', 'FAMILIA', 'LABORAL', 'PREVISIONAL'],
    activeSubject: "",
    activeSubjectCounter: 0,
    fetchResponse: ""
    };
    //REACT REFERENCES
    this.element = React.createRef();



     this._panResponder = PanResponder.create({
          // Ask to be the responder:
          //onStartShouldSetPanResponder: (evt, gestureState) => true,
          //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
            //Animated.timing(this.state.animatePosition, {toValue: 40, duration: 500}).start()
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
                  Animated.timing(this.state.animatePosition, {toValue: this.state.animatePosition.__getValue() + 80, duration: 500}).start()
                    this.setState({activeSubjectCounter: this.state.activeSubjectCounter +1})
                }
                else{
                Animated.timing(this.state.animatePosition, {toValue: this.state.animatePosition.__getValue() - 80, duration: 500}).start()
                this.setState({activeSubjectCounter: this.state.activeSubjectCounter -1})
                }
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled

          },

        })


}

  sendDescription(){Alert.alert(this.state.subjects[this.state.activeSubjectCounter])

    let clientData = {
        "users_name": this.state.userName,
        "users_issue_subject": this.state.subjects[this.state.activeSubjectCounter],
        "users_issue_description": this.state.caseDescription
    }
    let options = {
                method: 'POST',
                body: JSON.stringify(clientData),
                headers: {'Content-Type': 'application/json'}};

    fetch("http://patoexer.pythonanywhere.com/user", options)
        .then((response)=> response.json())
        .then((data)=> {Alert.alert(this.state.activeSubject)

        })
        .catch(error => console.log(error))


  }

  handleLayout({nativeEvent}){

    //console.log(nativeEvent.layout)

  }

  componentDidMount(){

  }

  render() {
    return (
    <View style={{flex: 1, backgroundColor: "#4170f9"}}>

        <View style={{flex: 2}}><Text style={styles.welcome}>¿De qué trata tu problema? {this.state.fetchResponse}</Text></View>
        <View style={{ flex: 2, flexDirection: 'row'}}>

            <View style={{position: 'absolute', zIndex: 3, flex: 1, backgroundColor: "#4170f9"}}><Icon size={60} name='skip-previous' color='white'/></View>
                <View style={{ width: "100%", flex:3, flexDirection: 'column', backgroundColor: "#4170f9"}}>


                    <View   {...this._panResponder.panHandlers}>
                        <Animated.Text onLayout={this.handleLayout} style={{width: 1540,fontSize: 40 ,right: this.state.animatePosition, color: "white", fontWeight: "bold", textAlign: "center"}}>      {this.state.subjects[this.state.activeSubjectCounter]}         {this.state.subjects[this.state.activeSubjectCounter + 1]}           {this.state.subjects[this.state.activeSubjectCounter + 2]}             {this.state.subjects[this.state.activeSubjectCounter+3]}      {this.state.subjects[this.state.activeSubjectCounter+4]}     </Animated.Text>
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
                             <View style={{backgroundColor: "#747A87", borderRadius: 100, width: 90, height:90, paddingTop:10}}><Icon size={60} name='mic' color='white' /></View>
                             <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                               <Text> </Text>
                             </View>
                   </View>
                   <View style={{flex: 2}}></View>
            </View>

                 <View style={{flex: 3, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <View style={{flex: 1}}></View>
                       <View style={[{ flex:10, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                          <TextInput multiline={true}  onChangeText={x=>this.setState({caseDescription: x})} style={{backgroundColor: 'white', height: 150, borderRadius:10}} />

                          <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}ki>
                            <Text></Text>
                          </View>
                       </View>

                     <View style={{flex: 1}}></View>
                 </View>

                <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                     <View style={{flex: 1}}></View>
                                       <View style={[{ flex:10, flexDirection: 'column', backgroundColor: "#4170f9"}]}>
                                         <TextInput onChangeText={x=>this.setState({userName: x})} style={{backgroundColor: 'white', borderRadius:10, marginTop: 20, marginBottom: 10}} />

                                          <View style={{flex:1, flexDirection: 'row', backgroundColor: "#4170f9"}}ki>
                                            <Text></Text>
                                          </View>
                                       </View>

                                     <View style={{flex: 1}}></View>
                                 </View>

                <TouchableOpacity
                        style={{backgroundColor: "#747A87", height: 70, color: 'white', alignItems: "center"}}
                        color="white"
                        onPress={()=> {  this.sendDescription()
                        this.props.navigation.navigate('QueryChat')}}
                      >
                      <Text></Text>
                        <Text style={{fontSize:20, color: "white"}}>SIGUIENTE</Text>
                      </TouchableOpacity>

     </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 0,
    color: "white",
    fontSize: 35,

  },
});
