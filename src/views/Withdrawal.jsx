import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList,StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, home_banner, wallet, wallet_money, withdrawal_request, api_url, withdrawal_history, withdraw_lottie } from '../config/Constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Loader } from '../components/Loader';
import Moment from 'moment';
import LottieView from 'lottie-react-native';
import DialogInput from 'react-native-dialog-input';

const Withdrawal = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [withdrawal_list, setWithdrawalList] = useState([]);
  const [wallet_amount, setWalletAmount] = useState(''); 
  const [count, setCount] = useState(0);
  const [dialog_visible, setIDialogVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await get_withdrawal_history();
    });
    return unsubscribe;
  },[]);

  const handleBackButtonClick= () => {
    navigation.goBack()
  } 

  const withdrawal_limit = () => {
    if(wallet_amount > 0){
      setIDialogVisible(true);
      //this.withdrawalrequest();
    }else{
      alert("Your balance is low.");
    }
  }

  const withdrawal_transaction = async(val) => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + withdrawal_request,
      data:{ delivery_boy_id:global.id, amount:val }
    })
    .then(async response => {
      setLoading(false);
      get_withdrawal_history();
    })
    .catch(error => {
      setLoading(false);
      alert('Sorry something went wrong')
    });
  }

  const showDialog = (val) =>{
    setIDialogVisible(false);
  }

  const sendInput = async(val) =>{
    console.log(val)
    if(val == "" || val == 0 || val == undefined){
      await setIDialogVisible(false);
      alert("Please enter withdrawal amount.")
    }else if(val > wallet_amount){
      await setIDialogVisible(false);
      alert("Your request amount is high.")
    }else{
      await setIDialogVisible(false);
      await withdrawal_transaction(val);
    }
  }

  const get_withdrawal_history = async() => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + withdrawal_history,
      data:{ id:global.id }
    })
    .then(async response => {
      setLoading(false);
      setWalletAmount(response.data.result.wallet_amount);
      setWithdrawalList(response.data.result.withdraw);
      console.log(response.data.result.withdraw,'withdraw')
      setCount(response.data.result.withdraw.length);
    })
    .catch(error => {
      setLoading(false);
      alert('Sorry something went wrong')
    });
  }  

  const renderItem = ({ item }) => (

    <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, paddingTop:15, paddingBottom:15}}>
      <View style={{ width:'15%',justifyContent:'center', alignItems:'center' }}>
        <Image style={{ height: 30, width: 30 ,}} source={wallet} />
      </View>  
      <View style={{ width:'65%', justifyContent:'center', alignItems:'flex-start'}}>
        <Text style={{ fontFamily:regular, fontSize:14, color:colors.theme_fg_two}}>{item.message}</Text>
      <View style={{ margin:2}} />
        <Text style={{ fontFamily:regular, fontSize:12, color:colors.grey}}>{Moment(item.created_at).format('MMM DD, YYYY hh:mm A')}</Text>   
      </View>
      <View style={{ width:'20%',justifyContent:'center', alignItems:'center'}}>
        <Text style={{ fontFamily:bold, fontSize:16, color:colors.grey}}>{global.currency}{item.amount}</Text>
      </View>  
    </View>
    
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Loader visible={loading} />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackButtonClick} style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
            <Icon type={Icons.Ionicons} name="chevron-back-circle-outline" color={colors.theme_fg_two} style={{ fontSize:35 }} />
          </TouchableOpacity>
          <View style={{ width:'75%',justifyContent:'center', alignItems:'flex-start' }}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:20 }}>Withdrawal</Text>
          </View>
        </View>
        <View style={{ margin:10 }} />
        <View style={{ width:'96%', flexDirection:'row', backgroundColor:colors.primary_blue, marginLeft:'2%', marginRight:'2%', borderRadius:10, padding:10, paddingTop:20, paddingBottom:20}}>
          <View style={{ width:'25%', backgroundColor:colors.secondary_blue, borderWidth:1, borderColor:'#1a53ad', borderRadius:50, alignItems:'center', justifyContent:'center'}}>
            <Image style={{ height: 35, width: 35 ,tintColor:'white'}} source={wallet} />
          </View>
          <View style={{ width:'75%', paddingLeft:10, paddingRight:10}}>
            <Text style={{ color:colors.theme_fg_three, fontFamily:regular, fontSize:12}}>Current Balance</Text>
            <View style={{ margin:2 }} />
            <Text style={{ color:colors.theme_fg_three, fontFamily:bold, fontSize:35}}>{global.currency}{wallet_amount}</Text>
          </View>
        </View>
        <View style={{ margin:10 }} />
        <Text style={{ fontFamily:bold, fontSize:18, color:colors.theme_fg_two, padding:10}}>Withdrawal transactions</Text>
        {count == 0 ?
          <View style={{marginTop:'10%'}}>
            <View style={{ height:250 }}>
              <LottieView style={{flex:1}} source={withdraw_lottie} autoPlay loop />
            </View>
            <Text style={{ alignSelf:'center', fontFamily:bold, fontSize:14}}>No withdrawal request sent yet.</Text>
          </View>
          :
          <FlatList
            data={withdrawal_list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
       }
      </ScrollView>
      {wallet_amount != 0 &&
        <View style={{ left:0, right:0, bottom:0,alignItems:'center', height:50, position:'absolute', justifyContent:'center'}}>
          <TouchableOpacity activeOpacity={1} onPress={withdrawal_limit} style={styles.button}>
            <View style={{ width:'100%', alignItems:'center', justifyContent:'center'}}>
              <Text style={{ color:colors.theme_fg_three, fontFamily:bold}}>Withdrawal</Text>
            </View>
          </TouchableOpacity>
        </View>
      }
      <DialogInput isDialogVisible={dialog_visible}
        title="Withdrawal Request"
        message="Enter your amount"
        hintInput ="amount"
        textInputProps={{ keyboardType: "phone-pad" }}
        submitInput={ (inputText) => {sendInput(inputText)} }
        closeDialog={ () => {showDialog(false)}}>
      </DialogInput>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,

  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'row',
    shadowColor: '#ccc',
    padding:10
  },
  button: {
    padding:10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.theme_bg,
    width:'94%',
    marginLeft:'3%',
    marginRight:'3%',
  },
});

export default Withdrawal;
