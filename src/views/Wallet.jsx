import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList,StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { regular, bold, wallet, wallet_money, credit_card, wallet_histories, api_url, empty_wallet } from '../config/Constants';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Loader } from '../components/Loader';
import Moment from 'moment';
import LottieView from 'lottie-react-native';

const Wallet = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [wallet_list, setWalletList] = useState([]);
  const [wallet_amount, setWalletAmount] = useState(''); 
  const [count, setCount] = useState('');
  const [month_earnings, setMonthEarnings] = useState('');
  const [week_earnings, setWeekEarnings] = useState(''); 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await wallet_transactions();
    });
    return unsubscribe;
  },[]);

  const handleBackButtonClick= () => {
    navigation.goBack()
  } 

  const wallet_transactions = async() => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + wallet_histories,
      data:{ id:global.id }
    })
    .then(async response => {
      console.log(response.data.result)
      setLoading(false);
      setWalletAmount(response.data.result)
      setWalletList(response.data.result.wallets)
      setCount(response.data.result.wallets.length)
      setMonthEarnings(response.data.result.this_month_earnings)
      setWeekEarnings(response.data.result.this_week_earnings)
    })
    .catch(error => {
      setLoading(false);
      alert('Sorry something went wrong')
    });
  }  

  const renderItem = ({ item }) => (
    <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, paddingTop:15, paddingBottom:15}}>  
      <View style={{ width:'70%', justifyContent:'center', alignItems:'flex-start'}}>
        <Text style={{ fontFamily:bold, fontSize:14, color:colors.theme_fg_two}}>{item.message}</Text>
      <View style={{ margin:2}} />
        <Text style={{ fontFamily:regular, fontSize:12, color:colors.grey}}>{Moment(item.created_at).format('MMM DD, YYYY hh:mm A')}</Text>   
      </View>
      <View style={{ width:'20%',justifyContent:'center', alignItems:'flex-end'}}>
        <Text style={{ fontFamily:regular, fontSize:12, color:colors.grey}}>{global.currency}{item.amount}</Text>
      </View>
      <View style={{ width:'10%',justifyContent:'center', alignItems:'flex-end' }}>
      <Icon type={Icons.Ionicons} name="chevron-forward-outline" color={colors.theme_fg} style={{ fontSize:20 }} />
      </View>  
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <ScrollView style={{ padding:10 }} showsVerticalScrollIndicator={false}>
      <Loader visible={loading} />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackButtonClick} style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
            <Icon type={Icons.Ionicons} name="chevron-back-circle-outline" color={colors.theme_fg_two} style={{ fontSize:35 }} />
          </TouchableOpacity>
          <View style={{ width:'75%',justifyContent:'center', alignItems:'flex-start' }}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:20 }}>Wallet</Text>
          </View>
        </View>
        <View style={{ margin:10 }} />
        <View style={styles.imageView}>
          <Image style= {{ height: undefined,width: undefined,flex: 1,borderRadius:10 }} source={credit_card} />
          <View style={{ flexDirection:'row', width:'100%', padding:20, position:'absolute', top:10,}}>
            <View style={{ width:'30%', alignItems:'flex-start', justifyContent:'flex-start' }}>
              <Image style= {{ height: 70, width:70 ,tintColor:'white'}} source={wallet} />
            </View>
            <View style={{ width:'70%', alignItems:'flex-start', justifyContent:'flex-end' }}>
              <Text style={{ fontFamily:regular, fontSize:10, color:colors.theme_bg_three, letterSpacing:0.5}}>Wallet</Text> 
              <View style={{ margin:2 }} />
              <Text style={{ fontFamily:bold, fontSize:16, color:colors.theme_bg_three}}>{global.currency}{wallet_amount.wallet_amount}</Text> 
            </View>  
          </View> 
          <View style={{ margin:10 }} />
          <View style={styles.ridesFriends}>
            <View style={{ width:'50%', alignItems:'center'  }}>
              <Text style={{ color:colors.theme_bg_three, fontFamily:regular, fontSize:10 }}>This Week wallet</Text>
              <View style={{ margin:3 }} />
              <Text style={{ color:colors.theme_bg_three, fontFamily:bold, fontSize:12 }}>{global.currency}{week_earnings}</Text>
            </View>
             <View style={{ margin:20 }} />
            <View style={styles.verticleLine} />
            <View style={{ margin:20 }} />
            <View style={{ width:'50%',alignItems:'center' }}>
              <Text style={{ color:colors.theme_bg_three, fontFamily:regular, fontSize:10 }}>This Month wallet</Text>
              <View style={{ margin:3 }} />
              <Text style={{ color:colors.theme_bg_three, fontFamily:bold, fontSize:12 }}>{global.currency}{month_earnings}</Text>
            </View>
          </View> 
        </View>
        <View style={{ margin:10 }} />
        <View style={{ flexDirection:'row',}}>
          <Image style= {{ height: 20, width:20 }} source={wallet} />
           <View style={{ margin:5 }} />
          <Text style={{ fontFamily:bold, fontSize:18, color:colors.theme_fg_two}}>Wallet transactions</Text>
        </View>
        <View style={{ margin:5 }} />
        {count == 0 ?
         <View style={{marginTop:'10%'}}>
           <View style={{ height:250 }}>
             <LottieView style={{flex:1}}source={empty_wallet} autoPlay loop />
           </View>
           <Text style={{ alignSelf:'center', fontFamily:bold, fontSize:14}}>No transaction done yet.</Text>
         </View>
       :
         <FlatList
          data={wallet_list}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
       }
      </ScrollView>
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
    
  },
  imageView:{
      height:200, 
      width:'100%',
      borderRadius:40
  },
  ridesFriends: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'100%',
    padding:10,
    position:'absolute',
    top:120,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor:colors.theme_bg_three,
  },
 
});

export default Wallet;
