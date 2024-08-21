import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Linking,StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { regular, veg, order_detail, api_url, img_url, bold, cancel } from '../config/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import Moment from 'moment';
import axios from 'axios';
import { Loader } from '../components/Loader';

const MyOrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [id, setId] = useState(route.params.id);
  const [order_details, setOrderDetails] = useState('');
  const [order_detailsitems, setOrderDetailsItems] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [allowed_statuses, setAllowedStatuses] = useState([ "restaurant_rejected","cancelled_by_customer","cancelled_by_restaurant","cancelled_by_deliveryboy" ]);

  const handleBackButtonClick= () => {
    navigation.goBack()
  } 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await get_order_detail();
    });
    return unsubscribe;
  },[]);

  const get_order_detail = async() => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + order_detail,
      data:{ order_id:id }
    })
    .then(async response => {
      setLoading(false);
      setOrderDetails(response.data.result);
      setOrderDetailsItems(response.data.result.item_list);
    })
    .catch(error => {
      setLoading(false);
      alert('Something went wrong')
    });
  }

  const call_customer = async(number) =>{
    let phoneNumber = '';
    if (Platform.OS === 'android'){ 
      phoneNumber = await `tel:${number}`; 
    }else{
      phoneNumber = await `telprompt:${number}`; 
    }
    await Linking.openURL(phoneNumber);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        <Loader visible={loading} />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackButtonClick} style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
            <Icon type={Icons.Ionicons} name="chevron-back-circle-outline" color={colors.theme_fg_two} style={{ fontSize:35 }} />
          </TouchableOpacity>
          <View style={{ width:'75%',justifyContent:'center', alignItems:'flex-start' }}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:20 }}>Order Summery</Text>
          </View>
        </View>
        <View style={{ margin:10 }} />
        <Text style={{ color:colors.theme_fg_two, fontFamily:regular, fontSize:16, letterSpacing:1 }}>{order_details.customer_name}</Text>
        <View style={{ margin:1 }} />
        <Text style={{ color:colors.grey, fontFamily:regular, fontSize:10, }}>{order_details.address}</Text>
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row',backgroundColor:colors.theme_bg_three, borderBottomWidth:0.5, borderColor:colors.grey}}>
          <View style={{ width:'50%', justifyContent:'center', alignItems:'flex-start', paddingBottom:10,}}>
            <Text style={{ fontFamily:regular, fontSize:16, color:colors.theme_fg_two}}>Your Order</Text>
          </View>
        </View>
        {order_detailsitems.map((item) => {
          return (
            <View style={{ backgroundColor:colors.theme_bg_three, paddingBottom:10, paddingTop:10, borderBottomWidth:0.5, borderColor:colors.grey,flexDirection:'row' }}>
              <View style={{ width:'50%'}}>
                <View style={{ flexDirection:'row', alignItems:'center', }}>
                  <Image style={{ height: 15, width: 15}} source={veg} />
                  <View style={{ margin:4 }} />
                  <Text style={{ fontSize:12, color:colors.theme_fg_two, fontFamily:regular}}>{item.item_name}</Text>
                </View>
                <View style={{ flexDirection:'row', alignItems:'center', marginTop:10 }}>
                  <View style={{ borderWidth:0.5,width:15,height:15, alignItems:'center', justifyContent:'center', borderColor:colors.green, backgroundColor:colors.light_green }}>
                    <Text style={{fontFamily:regular, fontSize:8, color:colors.theme_fg_two}}>{item.quantity}</Text>  
                  </View>
                  <View style={{ margin:5 }} />
                  <Text style={{ fontSize:12, color:colors.theme_fg_two, fontFamily:regular}}>X</Text>
                  <View style={{ margin:5 }} />
                  <Text style={{ fontSize:12, color:colors.theme_fg_two, fontFamily:regular}}>{global.currency}{item.price_per_item}</Text>
                </View>
              </View>
              <View style={{ width:'50%', alignItems:'flex-end',justifyContent:'center',}}>
                <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>{global.currency}{item.total}</Text>
              </View>
            </View>
          );
        })}
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row', justifyContent:'center', }}>
          <View style={{ width:'50%',alignItems:'flex-start'}}>
            <Text style={{ fontSize:14, color:colors.theme_fg_two, fontFamily:regular}}>Item Total</Text>
          </View>
          <View style={{ width:'50%',alignItems:'flex-end'}}>
            <Text style={{ fontSize:14, color:colors.theme_fg_two, fontFamily:regular}}>{global.currency}{order_details.sub_total}</Text>
          </View>
        </View>
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row', justifyContent:'center', }}>
          <View style={{ width:'50%',alignItems:'flex-start'}}>
            <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Taxes</Text>
          </View>
          <View style={{ width:'50%',alignItems:'flex-end'}}>
            <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}> {global.currency}{order_details.tax}</Text>
          </View>
        </View>
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row', justifyContent:'center', }}>
          <View style={{ width:'50%',alignItems:'flex-start'}}>
            <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Discount</Text>
          </View>
          <View style={{ width:'50%',alignItems:'flex-end'}}>
            <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}> {global.currency}{order_details.discount}</Text>
          </View>
        </View>
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row', justifyContent:'center', }}>
          <View style={{ width:'50%',alignItems:'flex-start'}}>
            <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Delivery Charge</Text>
          </View>
          <View style={{ width:'50%',alignItems:'flex-end'}}>
            <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}> {global.currency}{order_details.delivery_charge}</Text>
          </View>
        </View>
        <View style={{ margin:5 }} />
        <View style={{ backgroundColor:colors.theme_bg_three, borderBottomWidth:0.5, borderColor:colors.grey,flexDirection:'row',}}/>
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row', justifyContent:'center', }}>
          <View style={{ width:'50%',alignItems:'flex-start'}}>
            <Text style={{ fontSize:14, color:colors.theme_fg_two, fontFamily:regular}}>Grand Total</Text>
          </View>
          <View style={{ width:'50%',alignItems:'flex-end'}}>
            <Text style={{ fontSize:14, color:colors.theme_fg_two, fontFamily:regular}}> {global.currency}{order_details.total}</Text>
          </View>
        </View>
        <View style={{position:'absolute', top:'35%', left:'25%'}}>
          {allowed_statuses.includes(order_details.slug) &&
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Image style={{ height:125, width:160 }} source={cancel}/>
            </View>
          }
        </View>
        <View style={{ margin:5 }} />
        <View style={{ backgroundColor:colors.theme_bg_three, borderBottomWidth:0.5, borderColor:colors.grey,flexDirection:'row',}}/>        
        <View style={{ margin:10 }} />
        <Text style={{ color:colors.theme_fg_two, fontFamily:regular, fontSize:18 }}>Order details <Text style={{fontFamily:bold, fontSize:14, color:colors.theme_bg}}>[{order_details.status}]</Text></Text>
        <View style={{ margin:5 }} />
        <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, borderBottomWidth:0.5, borderColor:colors.grey}}/>
        <View style={{ margin:5 }} />
        <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Order Number</Text>
        <View style={{ margin:1 }} />
        <Text style={{ fontSize:14, color:colors.grey, fontFamily:regular}}>#{order_details.id}</Text>
        <View style={{ margin:10 }} />
        <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Payment</Text>
        <View style={{ margin:1 }} />
        <Text style={{ fontSize:14, color:colors.grey, fontFamily:regular}}>{order_details.payment_name}</Text>
        <View style={{ margin:10 }} />
        <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Date</Text>
        <View style={{ margin:1 }} />
        <Text style={{ fontSize:14, color:colors.grey, fontFamily:regular}}>{Moment(order_details.created_at).format('MMM DD, YYYY hh:mm A')}</Text>
        <View style={{ margin:10 }} />
        <Text style={{ fontSize:12, color:colors.grey, fontFamily:regular}}>Phone number</Text>
        <View style={{ margin:1 }} />
        <Text style={{ fontSize:14, color:colors.grey, fontFamily:regular}}>{order_details.phone_with_code}</Text>
        <View style={{ margin:10 }} />
        <TouchableOpacity onPress={call_customer.bind(this,order_details.phone_with_code)} style={{ backgroundColor:colors.theme_bg_three, borderBottomWidth:0.5, borderColor:colors.grey,borderTopWidth:0.5, padding:15,alignItems:'center', justifyContent:'center',}}>
           <Text style={{ fontFamily:regular, fontSize:13, color:colors.red, }}>Call {order_details.customer_name} ({order_details.phone_with_code})</Text>
        </TouchableOpacity>
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
});

export default MyOrderDetails;
