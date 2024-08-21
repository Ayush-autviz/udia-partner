import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, TextInput,StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, } from '../config/Constants';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

const Ratings = () => {

  const navigation = useNavigation();
  const [rating, setRating] = useState();
  const [count, setCount] = useState(5);

  const handleBackButtonClick= () => {
    navigation.goBack()
  }   

  const onStarRatingPress = (rating) => {
    //this.setState({ starCount: rating });
    setCount(rating)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <View style={{ padding:10 }}>
        <View style={{ flexDirection:'row', margin:10}}>
          <TouchableOpacity onPress={handleBackButtonClick} style={{ width:'10%',justifyContent:'center', alignItems:'flex-start' }}>
              <Icon type={Icons.Ionicons} name="close-circle-outline" color={colors.grey} style={{ fontSize:30 }} />
          </TouchableOpacity>
          <View style={{ width:'80%', justifyContent:'center', alignItems:'center'}}>
            <Text style={{ fontFamily:bold, fontSize:18, color:colors.grey}}> Show your experience</Text>
          </View>
        </View>
        <View style={{ margin:20}} />
        <View style={{ alignItems:'center'}}>
          <Text style={{ color:colors.grey, fontFamily:regular, fontSize:14 }}>Meat 64 Biryani Corner</Text>
          <View style={{ margin:'2%'}} />
          <Text style={{ fontSize:10, color:colors.grey, fontFamily:regular}}>1 x Chicken Biriyani, 1 x Plain Biryani, 1 x Fried Rice</Text>
        </View>
        <View style={{ margin:'10%' }} />
        <View style={{alignItems:'center' }}>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good", "Very Good" ]}
            defaultRating={5}
            size={30}
            onFinishRating={onStarRatingPress}
          />
        </View>
        <View style={{ margin:'10%' }} />
        <View style={{ alignItems:'center', justifyContent:'center'}}>
          <Text style={{ color:colors.grey, fontFamily:regular, fontSize:14 }}>Do you have any comments</Text>
          <View style={{ margin:10 }} />
          <TextInput
            style={styles.input}
            onChangeText={text=>this.setState({value:text})}
            multiline={true}
            placeholder="Enter your comment"
            underlineColorAndroid='transparent'
          />
          <View style={{ margin:10 }} />
          <TouchableOpacity style={styles.button}>
            <Text style={{ color:colors.theme_fg_three, fontFamily:regular}}>Rate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>  
  )
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,
  },
   button: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.theme_bg,
    width: '80%',
    height:40
  },
  input: {
    width:'80%',
    height:100,
    borderColor:colors.light_grey,
    borderWidth:1,
    backgroundColor:colors.light_grey,
    borderRadius:10,
    padding:10
  },
});

export default Ratings;
