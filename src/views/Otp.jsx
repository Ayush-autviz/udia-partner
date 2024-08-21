import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, TextInput, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { app_name, regular, bold } from '../config/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';

const Otp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp_value, setOtpValue] = useState(route.params.data);
  const [type, setType] = useState(route.params.type);
  const [phone_with_code_value, setPhoneWithCodeValue] = useState(route.params.phone_with_code);
  const [phone_number_value, setPhoneNumber] = useState(route.params.phone_number);
  const [id, setid] = useState(route.params.id); 
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const handleBackButtonClick= () => {
    navigation.goBack()
  }   
  console.log(otp_value)

  useEffect(() => {
   if(global.mode !== 'DEMO'){
      setTimeout(() => {
        check_otp(otp_value);
      }, 1000)
    }
    setTimeout(() => inputRef.current.focus(), 100)
  },[]);

  const check_otp = async(code) => {
    if (code != otp_value) {
      alert('Please enter valid OTP')
    }else if (type == 2){
      navigation.navigate("register", {
        phone_with_code_value: phone_with_code_value,
        phone_number_value: phone_number_value,
      });
    }else{
      navigation.navigate("ResetPassword", { id:id, from:"password" })
    }
  }
//alert(JSON.stringify(route.params.data))
return(
  <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={colors.theme_bg}/>
    <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
      <View>
        <TouchableOpacity onPress={handleBackButtonClick} style={{ width:100 , justifyContent:'center', alignItems:'flex-start' }}>
          <Icon type={Icons.Ionicons} name="chevron-back-circle-outline" color={colors.theme_fg_two} style={{ fontSize:35 }} />
        </TouchableOpacity>
        <View style={{ margin:20 }}/>
        <Text style={{ fontSize:20, color:colors.theme_fg_two, fontFamily:bold}}>Enter OTP</Text>
        <View style={{ margin:2 }}/>
        <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular }}>Enter the 4 digit code that was sent to your phone number</Text>
        <View style={{ margin:10 }}/>
        <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '25%', height: 50,alignItems: 'center', justifyContent: 'center', backgroundColor: colors.theme_bg_three }}>
            <Icon type={Icons.MaterialIcons} name="dialpad" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
        </View>
        <View style={{ width: '75%',height: 50, alignItems: 'flex-start', paddingLeft: 10, justifyContent: 'center', backgroundColor: colors.text_container_bg }}>
          <TextInput
              ref={inputRef}
              secureTextEntry={false}
              placeholder="OTP"
              keyboardType='numeric'
              placeholderTextColor={colors.grey}
              style={styles.textinput}
              onChangeText={TextInputValue =>
                  setValue(TextInputValue)}
          />
        </View>
        <View style={{ margin: 30 }} />
        <TouchableOpacity onPress={check_otp.bind(this, value)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.theme_fg_two, fontSize: 16, color: colors.theme_fg_three, fontFamily: bold }}>Next</Text>
        </TouchableOpacity>
    </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textinput: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: regular,
    height: 45,
    backgroundColor: colors.text_container_bg,
    width: '100%',
},
});

export default Otp;