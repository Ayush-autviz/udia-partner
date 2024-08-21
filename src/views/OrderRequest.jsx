import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList,StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, api_url, order_detail, img_url, accept, reject, order_arriving } from '../config/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CountdownCircleTimer, remainingTime } from 'react-native-countdown-circle-timer';
import { Loader } from '../components/Loader';
import axios from 'axios'; 
import LottieView from 'lottie-react-native';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');

var whoosh = new Sound('uber.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

});

const OrderRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [should_repeate, setShouldRepeat] = useState(true); 
  const [delay, setDelay] = useState(2);  
  const [order_id, setOrderId] = useState(route.params.order_id);
  const [order_items, setOrderItems] = useState([]);
  const [order_details, setOrderDetails] = useState("");

  const handleBackButtonClick= () => {
    navigation.goBack()
  } 

  useEffect( () => {
    get_order_detail();
    whoosh.play();
    whoosh.setNumberOfLoops(-1);
    const _unblur = navigation.addListener('blur', async () => {
      whoosh.stop();
    });
    return _unblur;
  },[]); 

  const get_order_detail = async () => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + order_detail,
      data:{ order_id:order_id }
    })
    .then(async response => {
       setLoading(false);
      await setOrderDetails(response.data.result);
      await setOrderItems(response.data.result.item_list)
    })
    .catch(error => {
      setLoading(false);
      alert('Sorry something went wrong')
    });
  }

  const navigate = () =>{
    whoosh.stop();
   
    navigation.navigate("Home")
  }

  const order_accept = async (id) => {
  //  setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + accept,
      data:{ order_id:id, partner_id:global.id }
    })
    .then(async response => {
    setLoading(false);
    navigate();
    })
    .catch(error => {
     setLoading(false);
      alert("Sorry something went wrong")
      navigate();

    });
  }

  const order_reject = async (id) => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + reject,
      data:{ order_id:id, partner_id:global.id }
    })
    .then(async response => {
     setLoading(false);
      navigate();
    })
    .catch(error => {
      setLoading(false);
      alert("Sorry something went wrong")
    });
  }  

  return (
    <View>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <View style={{ height:250 }}>
        <LottieView style={{flex:1}} source={order_arriving} autoPlay loop />
      </View>
      <View style={{ alignItems:'center', justifyContent:'center', padding:10}}>
        <Text style={{ fontSize:20, fontFamily:bold, color:colors.theme_fg_two}}>{order_details.restaurant_name}</Text>
        <View style={{ margin:5 }} />
        <Text style={{ fontFamily:regular, fontSize:14,color:colors.theme_fg_two}}>{order_details.manual_address}</Text>
      </View>
      <View style={{ margin:10 }} />
      <View style={styles.restaurant_container}>
        <View style={{ flexDirection:'row', padding:10,}}> 
          <View style={{  width:'60%', alignItems:'flex-start', justifyContent:'flex-start'}}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:12 }}>Order Items</Text>
            <View style={{ margin:5 }} />
            {order_items.map((item) => {
              return (
                <View>
                  <View style={{ flexDirection:'row', width:'60%',}}>
                    <Image style={{ height: 15, width: 15 }} source={{ uri: img_url + item.icon }} />
                    <View style={{ margin:4 }} />
                    <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:10, letterSpacing:1 }}>{item.quantity} x {item.item_name}</Text>
                  </View> 
                  <View style={{ margin:4 }} />
                </View>
              );
            })}
          </View>
          <View style={{ width:'40%', alignItems:'flex-end', justifyContent:'flex-start'}}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:regular, fontSize:10, letterSpacing:1 }}>{global.currency}{order_details.total}</Text>
          </View>
        </View> 
        <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, borderTopWidth:1.5, borderColor:colors.light_grey, }}/>
      </View>
      <View style={{ margin:5 }} />
      <View style={{ flexDirection:'row', width:'100%', padding:10}}>
        <TouchableOpacity onPress={order_accept.bind(this, order_id)} style={{ width:'50%',margin:2, borderWidth:0.2, padding:10, borderRadius:10, borderColor:colors.red, backgroundColor:colors.red, alignItems:'center', justifyContent:'center'}}>
          <Text style={{ fontFamily:regular, fontSize:12, color:colors.theme_fg_three}}>Decline</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={order_accept.bind(this, order_id)} style={{ width:'50%',margin:2, borderWidth:0.2, padding:10, borderRadius:10, borderColor:colors.green, backgroundColor:colors.green, alignItems:'center', justifyContent:'center'}}>
          <Text style={{ fontFamily:regular, fontSize:12, color:colors.theme_fg_three}}>Accept</Text>  
        </TouchableOpacity>
      </View> 
      <Loader visible={loading} />
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,
  },
  header:{
    backgroundColor:colors.theme_bg,
    alignItems:'center',
    justifyContent:'center',
    height:'7%'
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.theme_bg
  },
  block_1: {
    backgroundColor:colors.theme_bg_three,
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    padding:10, 
  },
});

export default OrderRequest;
