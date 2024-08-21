import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList ,StatusBar} from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, home_banner, wallet, wallet_money } from '../config/Constants';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation } from '@react-navigation/native';


const TripHistory = () => {

  const navigation = useNavigation();

  const DATA = [
    {
      title: 'Added to wallet',
      datetime: 'Dec 27, 2021 04:09 AM',
    },
    {
      title: 'Added to wallet',
      datetime: 'Dec 27, 2021 04:09 AM',
    },
    {
      title: 'Added to wallet',
      datetime: 'Dec 27, 2021 04:09 AM',
    },
    {
      title: 'Added to wallet',
      datetime: 'Dec 27, 2021 04:09 AM',
    },
    {
      title: 'Added to wallet',
      datetime: 'Dec 27, 2021 04:09 AM',
    },
    {
      title: 'Added to wallet',
      datetime: 'Dec 27, 2021 04:09 AM',
    },
    
    
  ];

  const handleBackButtonClick= () => {
    navigation.goBack()
  }   

  const count = 0;

  const renderItem = ({ item }) => (

    <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, paddingTop:15, paddingBottom:15}}>
      <View style={{ width:'15%',justifyContent:'center', alignItems:'center' }}>
        <Image style={{ height: 30, width: 30 ,}} source={wallet} />
      </View>  
      <View style={{ width:'65%', justifyContent:'center', alignItems:'flex-start'}}>
        <Text style={{ fontFamily:regular, fontSize:14, color:colors.theme_fg_two}}>{item.title}</Text>
      <View style={{ margin:2}} />
        <Text style={{ fontFamily:regular, fontSize:12, color:colors.grey}}>{item.datetime}</Text>   
      </View>
      <View style={{ width:'20%',justifyContent:'center', alignItems:'center'}}>
        <Text style={{ fontFamily:bold, fontSize:16, color:colors.grey}}>₹100</Text>
      </View>  
    </View>
    
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackButtonClick} style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
            <Icon type={Icons.Ionicons} name="chevron-back-circle-outline" color={colors.theme_fg_two} style={{ fontSize:35 }} />
          </TouchableOpacity>
          <View style={{ width:'75%',justifyContent:'center', alignItems:'flex-start' }}>
            <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:20 }}>Wallet</Text>
          </View>
        </View>
        <View style={{ margin:10 }} />
        <DropShadow
          style={{
              width: '100%',
              marginLeft:5, marginRight:5,
              shadowColor: "#000",
              paddingLeft:10, 
              paddingRight:10, 
              shadowOffset: {
                  width: 0,
                  height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
          }}
        >
          <View style={{ flexDirection:'row', paddingTop:15, paddingBottom:15}}>
            <View style={{ width:'15%',justifyContent:'center', alignItems:'flex-start' }}>
              <Image style={{ height: 30, width: 30 ,}} source={wallet_money} />
            </View>    
            <View style={{ width:'45%', justifyContent:'center', alignItems:'flex-start'}}>
              <Text style={{ fontFamily:bold, fontSize:20, color:colors.theme_fg}}>₹500</Text>
            <View style={{ margin:1 }} />
              <Text style={{ fontFamily:regular, fontSize:12, color:colors.grey}}>Your balance</Text>   
            </View>
            <TouchableOpacity style={{ width:'40%',justifyContent:'center', alignItems:'flex-end'}}>
              <Text style={{borderWidth:1, padding:8, fontFamily:bold, fontSize:12,borderColor:colors.theme_fg_two,color:colors.grey}}>+ Add Money</Text> 
            </TouchableOpacity>  
          </View>
        </DropShadow>
        <View style={{ margin:20 }} />
        <Text style={{ fontFamily:bold, fontSize:18, color:colors.theme_fg_two, padding:10}}>Wallet transactions</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
    padding:10
  },
 
});

export default TripHistory;
