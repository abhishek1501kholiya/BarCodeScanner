
import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

export default class App extends React.Component {
constructor(){
  super()
  this.state={
    hasCamerPermissions:null,
    scanned:false,
    scannedData:'',
    buttonState:'normal'
  }
}
getCameraPermissions = async () =>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA)
  this.setState({
      hasCameraPermissions:status === "granted",
      buttonState:'clicked',
      scanned:false
  })
 
} 
handleBarCodeScanned = async({type,data})=>{
      this.setState({
          scanned:true,
          scannedData:data,
          buttonState:'normal'
      })
}
render(){
  const hasCameraPermissions = this.state.hasCameraPermissions
  const Scanned = this.state.scanned
  const ButtonState = this.state.buttonState
  if(ButtonState === "clicked" && hasCameraPermissions){
       return (<BarCodeScanner onBarCodeScanned={Scanned ? undefined: this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>)
  }else if(ButtonState === 'normal'){
      return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
{/*                
              <TextInput placeholder="Book Id" style={{width:150,height:35,borderWidth:1,borderColor:'black'}} onChangeText={(BookId)=>{this.setState({
                   BookId : BookId
              })}} value={this.state.BookId}></TextInput> 
               */}
               <Text style={{fontWeight:'bold', fontSize:18}}>
                   {hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permission'}
               </Text>

              <TouchableOpacity onPress={()=>{this.getCameraPermissions()}} style={{width:150,height:35,backgroundColor:'blue',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold'}}>Scan QR code</Text>
              </TouchableOpacity>

          </View>
      )
  }

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
