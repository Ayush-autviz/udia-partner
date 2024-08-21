import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, SafeAreaView, Text, ScrollView, TouchableOpacity, FlatList,StatusBar } from 'react-native';
import * as colors from '../assets/css/Colors';
import { light, regular, bold, empty_lottie, get_orders, api_url, img_url, cancel, pending_order_list } from '../config/Constants';
import DropShadow from 'react-native-drop-shadow'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Loader } from '../components/Loader';
import Moment from 'moment';

const OngoingOrders = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [order_list, setOrderList] = useState([]);
  const [count, setCount] = useState([]);

  const order_details = (id) => {
    navigation.navigate("OrderDetails",{id:id});
  }

  useEffect( () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      get_orders();
    });
    return unsubscribe;
  },[]);  

  const get_orders = async() => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + pending_order_list,
      data:{ delivery_boy_id:global.id }
    })
    .then(async response => {
      setLoading(false);
      setOrderList(response.data.result)   
      setCount(response.data.result.length)
    })
    .catch(error => {
      setLoading(false);
      console.log(error)
    });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={order_details.bind(this,item.id)} style={{ borderWidth:1, borderRadius:10, borderColor:colors.light_grey, marginBottom:20}} activeOpacity={1}>
      <View
          style={{backgroundColor:colors.theme_bg_three,elevation:3,borderRadius:10,}}>
          <View style={{ flexDirection:'row', backgroundColor:colors.light_grey, padding:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
            <View style={{ width:'20%'}}>
              <Image style={{ height: 50, width: 50, borderRadius:10}} source={{ uri : img_url + item.profile_picture}} />
            </View>
            <View style={{ width:'60%', justifyContent:'center', alignItems:'flex-start'}}>
              <Text style={{ fontFamily:bold, fontSize:12, color:colors.theme_fg_two}}>{item.customer_name} #{item.id}</Text>
              <View style={{ margin:1 }} />
              <Text style={{ fontFamily:regular, fontSize:10, color:colors.grey}}>{item.google_address }</Text>
            </View>
            <View style={{ width:'20%', alignItems:'flex-end', justifyContent:'center'}}>
              <View style={{ width:'100%', alignItems:'center', justifyContent:'center', backgroundColor:colors.theme_bg_three, padding:5, borderRadius:10}}>
                <Text style={{ fontFamily:bold, fontSize:10, color:colors.theme_fg_two}}>{item.status}</Text>
              </View>
            </View>
          </View>
          <View style={{  padding:10, borderBottomWidth:0.5, borderColor:colors.grey }}>
            <View style={{ flexDirection:'row', width:'100%', justifyContent:'flex-start'}}>
                {item.item_list.map((row, index) => (
                  <View style={{ flexDirection:'row', alignItems:'center', margin:3}}>
                    <Image style={{ height: 15, width: 15}} source={{ uri : img_url + row.icon }} />
                    <View style={{ margin:2 }} />
                    <Text style={{ fontSize:10, color:colors.grey, fontFamily:bold}}>{row.quantity} x {row.item_name}</Text>
                  </View>
                ))}
            </View>
            
          </View>
          <View style={{ flexDirection:'row',  padding:10 }}>
            <View style={{ alignItems:'flex-start', width:'50%'}}>
              <Text style={{ fontSize:10, color:colors.grey, fontFamily:regular}}>{Moment(item.created_at).format('DD MMM-YYYY hh:mm')}</Text>
            </View>
            <View style={{ alignItems:'flex-end', width:'50%'}}>
              <Text style={{ fontSize:12, color:colors.theme_fg_two, fontFamily:bold}}>{global.currency}{item.total}</Text>
            </View>
          </View>
          {item.slug == "cancelled_by_customer" && "cancelled_by_partner" && "cancelled_by_restaurant" &&
            <View style={{position:'absolute', alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
                <Image style={{ height: 50, width:65 }} source={cancel}/>
            </View>
          } 
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding:10}}>
       <Loader visible={loading} />
        <View style={styles.header}>
          <View style={{ width:'100%', justifyContent:'center', alignItems:'center' }}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:18 }}>My Orders</Text>
          </View>
        </View>
        <View style={{ margin:10 }} />
        
        {count == 0 ?
          <View style={{marginTop:'30%'}}>
            <View style={{ height:250 }}>
              <LottieView style={{flex:1}} source={empty_lottie} autoPlay loop />
            </View>
            <Text style={{ alignSelf:'center', fontFamily:bold}}>Sorry no data found</Text>
          </View>
        :
          <FlatList
            data={order_list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        }
        
        <View style={{ margin:50 }} />
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  searchBarContainer:{
    borderColor:colors.light_grey, 
    borderRadius:10,
    borderWidth:2, 
    height:45
  },
  textFieldcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  textFieldIcon: {
    paddingLeft:10,
    paddingRight:5,
    fontSize:20, 
    color:colors.theme_fg
  },
  textField: {
    flex: 1,
    padding: 5,
    borderRadius: 10,
    height: 45,
    fontFamily:regular
  },
});

export default OngoingOrders;
