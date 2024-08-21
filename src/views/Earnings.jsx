import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Dimensions ,StatusBar} from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, month_wise_earning, api_url } from '../config/Constants';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';
import { Loader } from '../components/Loader';

const Earnings = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [api_status, setApiStatus] = useState(0);

  const handleBackButtonClick= () => {
    navigation.goBack()
  }   

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
     await grt_month_wise_earning();
    });
    return unsubscribe;
  },[]);

  const grt_month_wise_earning = async() => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + month_wise_earning,
      data:{ id:global.id }
    })
    .then(async response => {
      await setLoading(false);
      await setMonth(response.data.result.x);
      await setEarnings(response.data.result.y.split(',').map(Number));
      await setApiStatus(1);

    })
    .catch(error => {
      setLoading(false);
      console.log(error);
      alert(error)
    });
  }

   const DATA = [
    {
      title: 'Order History',
      description: 'View your orders now',
      icon:'timer-outline'
    },
    {
      title: 'Earnings History',
      description: 'Your total earnings list.',
      icon:'calendar-outline'
    },
    {
      title: 'Withdrawal',
      description: 'Cash out your earnings for free anytime',
      icon:'card-outline'
    },
  ];

  const navigate = (name) =>{
    if(name == "Order History"){
      navigation.navigate("MyOrders")
    }else if(name == "Earnings History"){
      navigation.navigate("EarningsHistory")
    }else if(name == "Withdrawal"){
      navigation.navigate("Withdrawal")
    }
  }

  const data = {
    labels: month,
    datasets: [
      {
        data: earnings,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Total Earnings"] // optional
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={navigate.bind(this, item.title)} style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey,padding:10,paddingBottom:15}}>
      <View style={{ width:'10%',justifyContent:'flex-start', alignItems:'flex-start' }}>
        <Icon type={Icons.Ionicons} name={item.icon} color={colors.regular_grey} style={{ fontSize:20 }} />
      </View>  
      <View style={{ width:'70%', justifyContent:'center', alignItems:'flex-start'}}>
        <Text style={{ fontFamily:bold, fontSize:18, color:colors.theme_fg_two}}>{item.title}</Text>
        <View style={{ margin:2 }} />
        <Text style={{ fontFamily:regular, fontSize:14, color:colors.grey}}>{item.description}</Text>   
      </View>
      <View style={{ width:'20%',justifyContent:'center', alignItems:'center'}}>
        <Icon type={Icons.Ionicons} name="chevron-forward-outline" color={colors.regular_grey} style={{ fontSize:15 }} />
      </View>
    </TouchableOpacity>
    
  );

  return (
  <SafeAreaView style={styles.container}>  
  <StatusBar backgroundColor={colors.theme_bg}/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Loader visible={loading} />
    <View style={{ margin:5 }} />
      <View style={styles.header}>
        <View style={{ width:'100%', justifyContent:'center', alignItems:'center' }}>
          <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:18 }}>My Earnings</Text>
        </View>
      </View>
      <View style={{ margin:10 }} />
      {api_status == 1 &&
        <View style={{ flex: 1, justifyContent: 'center', padding: 5, backgroundColor:colors.theme_bg_three}}>
          <ScrollView horizantal={true}>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 10}
            height={220}
            yAxisLabel={global.currency} 
            chartConfig={{
              backgroundColor: colors.theme_bg_three,
              backgroundGradientFrom: '#f2b40a',
              backgroundGradientTo: '#99f7e3',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, style: { borderRadius: 16, },}} style={{ marginVertical: 8, borderRadius: 16, 
            }}
          />
          </ScrollView>
        </View>
      }
      <View style={{ margin:10 }}/>
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
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});

export default Earnings;
