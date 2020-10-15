import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class VoiceRecognition extends Component {
constructor(prop){
    super(prop);

}

buttonClick(){
Audio.requestPermissionsAsync()

}

  render() {
    return (
         <View>
            <Button
            onPress={this.buttonClick}
              title="Outline button"
              type="outline"
            />
          </View>
    );
  }
}


