import React, {Component, useState, useEffect, useRef }  from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RNPickerSelect from 'react-native-picker-select'; // DOCUMENTATION https://www.npmjs.com/package/react-native-picker-select

import { useSelector, useDispatch } from 'react-redux';
import {dispatchListOfCases, dispatchSelectCase} from '../redux/dispatcher.js'
import {Animated, Dimensions} from 'react-native';

import CheckBox from '@react-native-community/checkbox'; //DOCS:  https://github.com/react-native-checkbox/react-native-checkbox

let arr = [1,2,3]
    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);


export default function LawyerRegister({navigation}) {

    //REDUX STATE
   const store = useSelector(state => state.userData);
   const dispatch = useDispatch();

   const [registerBtnDisplayed, setRegisterBtnDisplayed] = useState(false);
   const [flex, setFlex] = useState(0);// flex:{registerView:0 }
   const [animate, setAnimate] = useState(new Animated.Value(0));
   const [letEnterBoolean, setLetEnterBoolean] = useState(false);
   const [account, setAccount] = useState("");

   const [registerName, setNewRegisterName] = useState("");
   const [registerMail, setNewRegisterMail] = useState("");
   const [registerPhone, setNewRegisterPhone] = useState("");
   const [registerPassword, setNewRegisterPassword] = useState("");
   const [toggleCheckBox, setToggleCheckBox] = useState(false)
   const [registerRut, setNewRegisterRut] = useState("");

   const [registerField, setNewRegisterField] = useState("");
   const [registerBank, setNewRegisterBank] = useState("");
   const [registerAccountType, setNewRegisterAccountType] = useState("");
   const [registerAccount, setNewRegisterAccount] = useState("");

   const [rut, enterRut] = useState("");
   const [password, enterPassword] = useState("");


   useEffect(()=>{// ONLY IF THE USERDATA ARRIVES TO THE STORE THE NAVIGATOR IS UPDATED


       if( letEnterBoolean ){

            let arrayOfCasesAndQueries = [];

                           fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.lawyers_id)//WE GET ALL LAWYER'S CASES
                                 .then(response =>{return response.json()})
                                 .then((data)=>{
                                  arrayOfCasesAndQueries.push(...data.resp)

                                 fetch("http://patoexer.pythonanywhere.com/userByLawyers/5")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTRHER LAWYER
                                                                     .then(response =>{return response.json()})
                                                                     .then((data)=>{
                                                                     arrayOfCasesAndQueries.push(...data.resp)

                                                                     dispatchListOfCases(arrayOfCasesAndQueries)
                                                                     navigation.navigate('LawyerProfile')
                                                                     })
                                                                     .catch(error => console.log(error))

                                 })
                                 .catch(error => console.log(error))

         }
   },[letEnterBoolean])

  const register =()=>{

      setLetEnterBoolean(false)

      let today = new Date();
      let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

      //POST TO CLIENTS/

      fetch("http://patoexer.pythonanywhere.com/lawyer/" + registerRut)
      .then(response =>{return response.json()})
      .then((data)=>{

        if(data.lawyers_rut!=registerRut){

                let lawyerData = {
                        "lawyers_name": registerName,
                         "lawyers_password": registerPassword,
                         "lawyers_email": registerMail,
                         "lawyers_rut": registerRut,
                         "lawyers_phone": registerPhone,
                         "lawyers_field": registerField,
                         "lawyers_title": " ",
                         "lawyers_file_speciality": " " ,
                         "lawyers_bank": registerBank,
                         "lawyers_account": registerAccountType,
                         "lawyers_bank_number": registerAccount
                    }

                    let options = {
                                method: 'POST',
                                body: JSON.stringify(lawyerData),
                                headers: {'Content-Type': 'application/json'}};

                fetch("http://patoexer.pythonanywhere.com/lawyer/1", options)
                            .then((response)=>{ return response.json()})
                            .then((data)=> {
                                console.log("JSON.stringify(data)")
                                navigation.navigate('ThanksMsg')
                            })
                            .catch(error => {console.log(error)})

        } else{
                   console.log("YA ESTAS REGISTRADO!!")
        }

      })
      .catch((error) => console.log(error))

  }

  const showRegisterView = () => {
    if(!registerBtnDisplayed){
       setRegisterBtnDisplayed(true)//this.setState({registerBtnDisplayed: true})
        Animated.timing(animate, {toValue: 3, duration: 500}).start()
    }
    else if(registerBtnDisplayed){
       setRegisterBtnDisplayed(false)//this.setState({ registerBtnDisplayed: false})
       Animated.timing(animate, {toValue: 0, duration: 500}).start()
    }

  }


    const RegisterRutificator = (e) => {
                let targetValue = e;
                let falseCase;

                let split = targetValue.split("");

                split.includes("-")? split.splice(split.indexOf("-"),1): falseCase= null;
                split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
                split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;

                (split.length>=2)?split[split.length-1] = "-" + split[split.length-1]:falseCase= null;

                split.length >5 ? split[split.length-4] = "." + split[split.length-4]: falseCase= null;
                split.length >7 ? split[split.length-7] = "." + split[split.length-7]: falseCase= null;

                console.log(split.join(""))
                setNewRegisterRut(split.join(""));
      }

    const LoginRutificator = (e) => {
                  let targetValue = e;
                  let falseCase;

                  let split = targetValue.split("");

                  split.includes("-")? split.splice(split.indexOf("-"),1): falseCase= null;
                  split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
                  split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;

                  (split.length>=2)?split[split.length-1] = "-" + split[split.length-1]:falseCase= null;

                  split.length >5 ? split[split.length-4] = "." + split[split.length-4]: falseCase= null;
                  split.length >7 ? split[split.length-7] = "." + split[split.length-7]: falseCase= null;
                  enterRut(split.join(""));
        }

    const singInValidation = () => {

        fetch("http://patoexer.pythonanywhere.com/lawyer/" + rut)
                                .then((response)=> {return response.json()})
                                .then((data)=> {

                                    let dataToDispatch = {...data}
                                    dispatch({type: "USERDATA", doneAction: dataToDispatch});

                                    if(dataToDispatch.lawyers_password==password){
                                    setLetEnterBoolean(true)
                                    } else{console.log("not verified")}
                                })
                                .catch(error => { console.log(error)})
      }


    return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-100} style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: "#4170f9"}}>

        <View style={{flex:2, backgroundColor: "#4170f9"}}>
            <Text style={styles.welcome}>Bienvendio a la red Legalis! Por favor ingresa tus datos</Text>
        </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                  <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                      <TextInput onChangeText={x=> setNewRegisterName(x)} placeholder = "Nombre Completo" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1 , fontSize:windowHeightPercentUnit*3, textAlign:'center', borderRadius: 10}}/>
                  </View>
               <View style={{flex:1}}></View>
            </View>




            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                    <TextInput onChangeText={x=> setNewRegisterMail(x)} placeholder = "Correo" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center'}}/>
                </View>
              <View style={{flex:1}}></View>
            </View>


            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                   <TextInput onChangeText={x=> setNewRegisterPhone(x)} placeholder = "Teléfono" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center' }}/>
                </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                          <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                            <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                               <TextInput value={registerRut} onChangeText={x=> RegisterRutificator(x)} placeholder = "Rut" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center' }}/>
                          </View>
              <View style={{flex:1}}></View>
            </View>


            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                            <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                               <TextInput onChangeText={x=> setNewRegisterField(x)} placeholder = " Especialidad Legal" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center' }}/>
                            </View>
                <View style={{flex:1}}></View>
            </View>


                        {/*<View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <RNPickerSelect
                        onValueChange={(value) => setAccount(value)}
                        items={[
                            { label: 'Cuenta Corriente', value: 'cuenta corriente' },
                            { label: 'Cuenta Vista', value: 'cuenta vista' },

                        ]}
                    /></View>*/}

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                                        <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                           <TextInput onChangeText={x=> setNewRegisterBank(x)} placeholder = "Banco" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center' }}/>
                                      </View>
               <View style={{flex:1}}></View>
            </View>



            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
              <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                                        <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                                           <TextInput onChangeText={x=> setNewRegisterAccount(x)} placeholder = "Número de Cuenta" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center' }}/>
                                        </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                      <TextInput  secureTextEntry={(!toggleCheckBox)?true:false} onChangeText={x=> setNewRegisterPassword(x)} placeholder = "Clave" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center' }}/>
                 </View>
               <View style={{flex:1}}>
                {(Platform.OS !== 'ios')?<CheckBox

                                                             tintColors={{true:"#27F900", false: "white" }}
                                                             disabled={false}
                                                             value={toggleCheckBox}
                                                             onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                           />: console.log("checbox not suported on this device")}
               </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
               <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                   <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
                        <Button title="REGISTRARSE" color={Platform.OS === 'ios'?"white":"#747A87"} type="clear" style={{width: 100}} onPress={register}/>
                   </View>
               <View style={{flex:1}}></View>
            </View>


        <Animated.View style={{flex: animate}}>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                     <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                          <TextInput value={rut} onChangeText={x=> LoginRutificator(x)} placeholder = "Rut" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center', marginTop: windowHeightPercentUnit }}/>
                     </View>
            <View style={{flex:1}}></View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
            <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                 <View style={{flex:windowWidthPercentUnit*1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                       <TextInput  secureTextEntry={true} onChangeText={x=> enterPassword(x)} placeholder = "Clave" style={{ backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*3, borderRadius: 10, textAlign:'center', marginTop: windowHeightPercentUnit }}/>
                  </View>
            <View style={{flex:1}}></View>
        </View>


        <View style={{flex: 1, flexDirection: 'row',marginTop: windowHeightPercentUnit, backgroundColor: "#4170f9"}}>
             <View style={{flex:1, backgroundColor: "#4170f9"}}></View>
                <View style={{flex:windowWidthPercentUnit, flexDirection: 'column', backgroundColor: "#4170f9"}}>
                    <Button title="INGRESAR" color={Platform.OS === 'ios'?"white":"#747A87"} type="clear" style={{width: '100%'}} onPress={singInValidation}/>
                </View>
             <View style={{flex:1}}></View>
        </View>

        </Animated.View>


        <View style={{flex: 1, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                   <View style={{ marginTop: windowWidthPercentUnit, flex:windowWidthPercentUnit*6, flexDirection: 'column', backgroundColor: "#4170f9"}}><Text onPress={showRegisterView} style={[styles.instructions, {textAlign: 'center'}]}>*Si ya tienes cuenta <Text style={{fontSize: windowHeightPercentUnit*4}}>INGRESA!</Text></Text></View>
        </View>

      </View>

</KeyboardAvoidingView>

    );

}

const styles = StyleSheet.create({
  instructions: {
    color: 'white',
    backgroundColor: "#4170f9",
    marginBottom: 0,
    borderColor: '#fff',
    fontSize:windowHeightPercentUnit*3,
    fontWeight: "bold"
  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontSize: windowHeightPercentUnit*4,
    },
    link: {
    fontWeight: "bold",
    fontSize: windowHeightPercentUnit*3,
    textDecorationLine: "underline"
    }
});
