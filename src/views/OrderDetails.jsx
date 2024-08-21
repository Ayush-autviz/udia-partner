import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Linking, Platform ,StatusBar} from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, home_banner, delivery_man, address, chat, customer_service, phone, order_detail, api_url, img_url, cancel_order, cancel, order_status_change, navigation_icon } from '../config/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import Moment from 'moment';
import axios from 'axios';
import { Loader } from '../components/Loader';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import database from '@react-native-firebase/database';

const OrderDetails = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const [order_details, setOrderDetails] = useState("");
  const [id, setID] = useState(route.params.id);
  const [loading, setLoading] = useState(false);
  const [order_items, setOrderItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [allowed_statuses, setAllowedStatuses] = useState([ "reached_restaurant","order_picked","at_point","delivered" ]);

  const handleBackButtonClick= () => {
    navigation.goBack()
  }  

  useEffect( () => {
    const onValueChange = database()
      .ref(`/orders/${global.id}`)
      .on('value', snapshot => {
        get_order_detail();
    });
  },[]);  

  const get_order_detail = async () => {
    //setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + order_detail,
      data:{order_id:id}
    })
    .then(async response => {
     setLoading(false);
       setOrderDetails(response.data.result);
       setOrderItems(response.data.result.item_list)
    })
    .catch(error => {
      setLoading(false);
      alert("Sorry something went wrong")
    });
  }

  const get_order_status_change = async(slug, id) => {
    console.log({ order_id:id, slug:slug })
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + order_status_change,
      data:{ order_id:id, slug:slug }
    })
    .then(async response => {
     // setLoading(false);
      get_order_detail();
    })
    .catch(error => {
      setLoading(false);
      alert('Something went wrong')
    });
  }

  const help = () =>{
    navigation.navigate("FaqCategories")
  }

  const call = async(number) =>{
    let phoneNumber = '';
    if (Platform.OS === 'android'){ 
      phoneNumber = await `tel:${number}`; 
    }else{
      phoneNumber = await `telprompt:${number}`; 
    }
    await Linking.openURL(phoneNumber);
  }

  const customer_location =(lat,lng) =>{
    console.log(lat,lng)
    if(lat != 0 && lng != 0){
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      var url = scheme + `${lat},${lng}`;
      if(Platform.OS === 'android'){
        Linking.openURL("google.navigation:q="+lat+" , "+lng+"&mode=d");
      }else{
        Linking.openURL('maps://app?saddr='+lat+'&daddr='+lng);
      }
    }
  }

  const restaurant_location =(lat,lng) =>{
    console.log(lat,lng)
    if(lat != 0 && lng != 0){
      var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
      var url = scheme + `${lat},${lng}`;
      if(Platform.OS === 'android'){
        Linking.openURL("google.navigation:q="+lat+" , "+lng+"&mode=d");
      }else{
        Linking.openURL('maps://app?saddr='+lat+'&daddr='+lng);
      }
    }
  }

  return (
  <SafeAreaView style={styles.container}>  
  <StatusBar backgroundColor={colors.theme_bg}/>
  <Loader visible={loading} />
    <View style={{ width:'100%', backgroundColor:colors.green}}>
      <View style={{ flexDirection:'row', padding:20 }}>
        <TouchableOpacity onPress={handleBackButtonClick} style={{ width:'10%', justifyContent:'flex-start', alignItems:'center' }}>
          <Icon type={Icons.Ionicons} name="arrow-back" color={colors.theme_fg_three} style={{ fontSize:30 }} />
        </TouchableOpacity>
        <View style={{ width:'80%', justifyContent:'flex-start', alignItems:'center'}}>
          <Text style={{ fontFamily:regular, fontSize:13, color:colors.theme_fg_three}}>ORDER FROM</Text>
          <View style={{ margin:1 }}/>
          <Text style={{ fontFamily:regular, fontSize:14, color:colors.theme_fg_three}}>{order_details.restaurant_name}</Text>
        </View>
      </View>
      <View style={{ flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'center'}}>
        <Text style={{ fontFamily:bold, fontSize:15, color:colors.theme_fg_three, letterSpacing:2}}>{order_details.status_for_deliveryboy}</Text>
      </View>
      <View style={{ margin:5 }}/>
      </View>
    <ScrollView showsVerticalScrollIndicator={false}> 
      <View style={{ padding:10}}>
        <View style={{ flexDirection:'row'}}>
          <View style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
            <Image style={{ height: 40, width: 40 }} source={{ uri: img_url + order_details.restaurant_image}} /> 
          </View>  
          <View style={{ width:'55%', justifyContent:'center', alignItems:'flex-start'}}>
            <Text style={{ fontFamily:bold, fontSize:13, color:colors.theme_fg_two}}>{order_details.restaurant_name}</Text>
            <View style={{ margin:2 }} />
            <Text style={{ fontFamily:regular, fontSize:11, color:colors.theme_fg_two}}>{order_details.manual_address}</Text> 
          </View>
          <TouchableOpacity onPress={call.bind(this,order_details.restaurant_phone_number)} style={{ width:'15%',justifyContent:'center', alignItems:'flex-end',  }}>
            <View style={{ borderWidth:1, height: 30, width: 30, borderRadius: 20, alignItems:'center', justifyContent:'center', borderColor:colors.grey   }}>
              <Image style={{ height: 15, width: 15, }} source={phone} /> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={restaurant_location.bind(this,order_details.res_lat,order_details.res_lng)} style={{ width:'15%',justifyContent:'center', alignItems:'flex-end',  }}>
            <View style={{ borderWidth:1, height: 30, width: 30, borderRadius: 20, alignItems:'center', justifyContent:'center', borderColor:colors.grey   }}>
              <Image style={{ height: 15, width: 15, }} source={navigation_icon} /> 
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ margin:10 }} /> 
        {order_items.map((item) => {
          return (
            <View style={{ flexDirection:'row', alignItems:'center', padding:5 }}>
              <Image style={{ height: 15, width: 15}} source={{ uri : img_url+item.icon }} />
              <View style={{ margin:2 }} />
              <Text style={{ fontSize:12, color:colors.grey, fontFamily:bold}}>{item.quantity} x {item.item_name}</Text>
            </View>
          );
        })}
        <View style={{ margin:5 }} />
      </View>
      <View style={{ borderWidth:5, backgroundColor:colors.light_grey, borderColor:colors.light_grey }}/>
      <View style={{ margin:5}} />
      <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, padding:10, borderBottomWidth:0.5, borderColor:colors.grey, }}>
        <View style={{ width:'15%', justifyContent:'flex-start', alignItems:'flex-start'}}>
          <View style={{ borderWidth:1, height: 30, width: 30, borderRadius: 25, alignItems:'center', justifyContent:'flex-start', borderColor:colors.grey   }}>
            <Image style={{ height: 30, width: 30,  }} source={{uri: img_url + order_details.profile_picture}} />
            <View style={{ margin:5 }} />  
          </View>  
        </View>  
        <View style={{ width:'75%', justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={{ fontFamily:bold, fontSize:13, color:colors.grey}}>{order_details.customer_name}, {order_details.phone_with_code}</Text>
        </View>
        <View style={{ width:'15%', justifyContent:'center', alignItems:'flex-start'}}>
          <TouchableOpacity onPress={call.bind(this,order_details.phone_with_code)} style={{ borderWidth:1, height: 30, width: 30, borderRadius: 20, alignItems:'center', justifyContent:'center', borderColor:colors.grey   }}>
            <Image style={{ height: 15, width: 15, }} source={phone} /> 
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin:5}} />
      <View style={{ flexDirection:'row', padding:10, }}>
        <View style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
          <Image style={{ height: 25, width: 25 }} source={address} />
          <View style={{ margin:5 }} />   
        </View>     
        <View style={{ width:'75%', justifyContent:'flex-start', alignItems:'flex-start'}}>
          <Text style={{ fontFamily:bold, fontSize:13, color:colors.theme_fg_two}}>Delivery address</Text>
          <View style={{ margin:2 }} />
          <Text style={{ fontFamily:regular, fontSize:11, color:colors.theme_fg_two}}>{order_details.address}</Text> 
        </View>
        <View>
          <TouchableOpacity onPress={customer_location.bind(this,order_details.cus_lat,order_details.cus_lng)} style={{ width:'15%', borderWidth:1, height: 30, width: 30, borderRadius: 20, alignItems:'center', justifyContent:'center', borderColor:colors.grey   }}>
            <Image style={{ height: 20, width: 20, }} source={navigation_icon} /> 
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderWidth:5, backgroundColor:colors.light_grey, borderColor:colors.light_grey }}/>
      <View style={{ margin:5}} />
      <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, padding:10, borderBottomWidth:0.5, borderColor:colors.grey, }}>
        <View style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
          <Image style={{ height: 25, width: 25 }} source={customer_service} />
          <View style={{ margin:5 }} />   
        </View>  
        <View style={{ width:'85%', justifyContent:'flex-start', alignItems:'flex-start'}}>
          <Text style={{ fontFamily:bold, fontSize:13, color:colors.theme_fg_two}}>Need help with your order?</Text>
          <View style={{ margin:2 }} />
          <Text style={{ fontFamily:regular, fontSize:12, color:colors.grey}}>{app_name} support is always available.</Text>
        </View>
      </View>
      <View style={{ margin:5}} />
      <TouchableOpacity onPress={help.bind(this)} style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, padding:10, borderBottomWidth:0.5, borderColor:colors.grey, }}>
        <View style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
          <Image style={{ height: 25, width: 25 }} source={chat} />
          <View style={{ margin:5 }} />   
        </View>  
        <View style={{ width:'85%', justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={{ fontFamily:bold, fontSize:13, color:colors.theme_fg_two}}>Chat with us</Text>
          <View style={{ margin:5 }} />  
        </View>
      </TouchableOpacity>
      <View style={{ marginTop:'40%'}}/>
      {allowed_statuses.includes(order_details.new_slug) &&
      <View style={{ width:'100%', height:60, justifyContent:'center', position:"absolute", left:0, right:0, bottom:0}}>
        <TouchableOpacity activeOpacity={1} onPress={get_order_status_change.bind(this, order_details.new_slug, id)} style={styles.button}>
          <View style={{ width:'100%', alignItems:'center', justifyContent:'center'}}>
            <Text style={{ color:colors.theme_fg_three, fontFamily:bold}}>{order_details.new_status}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
   ridesFriends: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding:10
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor:colors.theme_fg_two
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:'96%',
    backgroundColor:colors.theme_bg,
    flexDirection:'row',
    marginLeft:'2%'
  },
  
});

export default OrderDetails;
