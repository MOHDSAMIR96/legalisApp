import React, {Component, useState, useEffect }  from 'react';
import {Animated, TouchableOpacity, TouchableHighlight, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import logo1 from '../images/Avatar1.png'
import logo2 from '../images/Avatar2.png'
import logo3 from '../images/Avatar3.png'
import logo4 from '../images/Avatar4.png'
import logo5 from '../images/Avatar5.png'
import logo6 from '../images/Avatar6.png'
import logo7 from '../images/Avatar7.png'
import logo8 from '../images/Avatar8.png'
import logo9 from '../images/Avatar9.png'
import logo10 from '../images/Avatar10.png'

import { useSelector, useDispatch } from 'react-redux';

let arr = [1,2,3]

export default function ClientRegister({navigation}){

    const [avatarArr, stateNewAvatarArr] = useState([logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10]);
    const [registerBtnDisplayed, stateNewRegisterBtnDisplayed] = useState(0);
    const [flex, stateNEwFlex] = useState({registerView:0 });
    const [animateScroll, stateNewAnimateScroll] = useState(new Animated.Value(0));
    const [animateImpulse, stateNewAnimateImpulse] = useState(new Animated.Value(2));

    const [registerName, setNewRegisterName] = useState("");
    const [registerMail, setNewRegisterMail] = useState("");
    const [registerPhone, setNewRegisterPhone] = useState("");
    const [registerPassword, setNewRegisterPassword] = useState("");
    const [registerAvatar, setNewRegisterAvatar] = useState(1);
    const [registerAddress, setNewRegisterAddress] = useState("");
    const [registerCivilStatus, setNewRegisterCivilStatus] = useState("");
    const [registerNationality, setNewRegisterNationality] = useState("");
    const [registerProfession, setNewRegisterProfession] = useState("");
    const [registerRut, setNewRegisterRut] = useState("");

    const [rut, enterRut] = useState("");
    const [password, enterPassword] = useState("");

    //REDUX STATE
        const store = useSelector(state => state.userData);
        const dispatch = useDispatch();

  const register=()=>{

  let today = new Date();
  let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

  //POST TO CLIENTS/
    let clientData = {
            "clients_address": registerAddress,
             "clients_avatar": registerAvatar,
             "clients_civil_status": registerCivilStatus,
             "clients_email": registerMail,
             "clients_nationality": registerNationality,
             "clients_password": registerPassword,
             "clients_phone": parseInt(registerPhone),
             "clients_profession": registerProfession,
             "clients_rut": registerRut,
             "clients_username": store.users_name
        }

        let options = {
                    method: 'POST',
                    body: JSON.stringify(clientData),
                    headers: {'Content-Type': 'application/json'}};

    fetch("http://patoexer.pythonanywhere.com/client", options)
    .then((response)=> response.json())
    .then((data)=> {
                //POST TO CASES/
                     let dataToDispatch = {clientsResp: data, casesResp: ""};

                     let casesData = {
                                "cases_date": currentDate,
                                    "cases_description": store.users_issue_description,
                                    "cases_matter": store.users_issue_subject,
                                    "client_id": data.clients_id
                            }

                            let options2 = {
                                        method: 'POST',
                                        body: JSON.stringify(casesData),
                                        headers: {'Content-Type': 'application/json'}};

                        fetch("http://patoexer.pythonanywhere.com/case", options2)
                        .then((response)=> response.json())
                        .then((data)=> {
                                    dataToDispatch.casesResp = data;
                                    dispatch({type: "USERDATA", doneAction: dataToDispatch});
                                    navigation.navigate("ClientProfile")
                                })
                        .catch(error => {})
            })
    .catch(error => {})

  }

  const showRegisterView = ()=>{
    if(!registerBtnDisplayed){
       stateNewRegisterBtnDisplayed(1)
        Animated.timing(animateScroll, {toValue: 3, duration: 500}).start()
    }
    else if(registerBtnDisplayed){
       stateNewRegisterBtnDisplayed(0)
       Animated.timing(animateScroll, {toValue: 0, duration: 500}).start()
    }

  }
  const shineImg=()=>{
    //Alert.alert('shine')

  }

  const singInValidation = () => {

    fetch("http://patoexer.pythonanywhere.com/client/" + rut)
                            .then((response)=> response.json())
                            .then((data)=> {
                            let dataToDispatch = {clientsResp: data, casesResp: ""};

                            fetch("http://patoexer.pythonanywhere.com/case/" + data.clients_id)
                                                    .then((response)=> response.json())
                                                    .then((data)=> {
                                                                dataToDispatch.casesResp = data;
                                                                dispatch({type: "USERDATA", doneAction: dataToDispatch});
                                                                navigation.navigate("ClientProfile")
                                                            })


                            (data.clients_password==password)? navigation.navigate('ClientProfile'): console.log("not verified")

                                    })
                            .catch(error => { })
  }

    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
        <View style={{flex:1, backgroundColor: "#4170f9"}}>
            <Text style={styles.welcome}>Por favor danos tus datos</Text>

        </View>

            <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                    <View style={{flex:10, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                            <ScrollView horizontal={true}>
                                            {avatarArr.map(
                                                function(item, index){return <TouchableHighlight key={index} onPress={()=> setNewRegisterAvatar(index)}><Image  key={index} source={item} style={{width: 70, height:70}}/></TouchableHighlight>
                                            })}
                                            </ScrollView>
                    </View>
                <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                    <TextInput onChangeText={(x)=> {setNewRegisterMail(x)}} placeholder = " CORREO" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10}}/>
                </View>
              <View style={{flex:1}}></View>
            </View>


            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                   <TextInput onChangeText={x=> setNewRegisterPhone(x)} placeholder = " TÉLEFONO" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <TextInput onChangeText={x=> setNewRegisterRut(x)} placeholder = " RUT" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <TextInput onChangeText={x=> setNewRegisterProfession(x)} placeholder = " PROFESIÓN" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <TextInput onChangeText={x=> setNewRegisterNationality(x)} placeholder = " NACIONALIDAD" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <TextInput onChangeText={x=> setNewRegisterCivilStatus(x)} placeholder = " ESTADO CIVIL" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                     <TextInput onChangeText={x=> setNewRegisterAddress(x)} placeholder = " DOMICILIO" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                      <TextInput onChangeText={x=> setNewRegisterPassword(x)} placeholder = " CLAVE" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                 </View>
               <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                   <View style={{flex:4, flexDirection: 'column', backgroundColor: "#4170f9"}}>
                        <Button title="REGISTRARSE" color="#747A87" type="clear" style={{width: 100}} onPress={register}/>
                   </View>
               <View style={{flex:1}}></View>
            </View>

        <Animated.View style={{flex: animateScroll}}>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                     <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                          <TextInput onChangeText={x=> enterRut(x)} placeholder = " RUT" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                     </View>
            <View style={{flex:1}}></View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:4, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                       <TextInput onChangeText={x=> enterPassword(x)} placeholder = " CLAVE" style={{ backgroundColor: "white", height: 40, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:20, borderRadius: 10 }}/>
                  </View>
            <View style={{flex:1}}></View>
        </View>


        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
             <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:4, flexDirection: 'column', backgroundColor: "#4170f9"}}>
                    <Button title="INGRESAR" color="#747A87" type="clear" style={{width: 100}} onPress={singInValidation}/>
                </View>
             <View style={{flex:1}}></View>
        </View>

        </Animated.View>


        <View style={{flex: 2, flexDirection: 'row', backgroundColor: "#4170f9"}}>
           <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                   <View style={{flex:4, flexDirection: 'column', backgroundColor: "#4170f9"}}><Text onPress={showRegisterView} style={styles.instructions}>*Si ya tienes cuenta <Text style={{fontSize: 30}}>INGRESA!</Text></Text></View>
           <View style={{flex:1}}></View>
        </View>

      </View>



    )
}

const styles = StyleSheet.create({
  instructions: {
    color: 'white',
    backgroundColor: "#4170f9",
    borderColor: '#fff',
    fontSize:15,
    fontWeight: "bold"
  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontSize: 30,
    },
    link: {
    fontWeight: "bold",
    textDecorationLine: "underline"
    }
});
