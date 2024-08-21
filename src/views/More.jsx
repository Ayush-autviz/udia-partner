import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Modal, StatusBar, Alert } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { app_name, light, regular, bold, home_banner, profile_img, change_online_status, api_url, img_url } from '../config/Constants';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Loader } from '../components/Loader';
import { connect } from 'react-redux';
import { updatePartnerProfilePicture, reset, updatePartnerOnlineStatus } from '../actions/PartnerRegisterActions';
import Dialog from "react-native-dialog";

const More = (props) => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dialog_visible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  }

  const closeDialog = () => {
    setDialogVisible(false);
  }

  const handleCancel = () => {
    setDialogVisible(false)
  }
  const next = async (name) => {
    if (name == 'Notifications') {
      await navigation.navigate("Notifications")
    } else if (name == 'Help Center') {
      await navigation.navigate("FaqCategories")
    } else if (name == 'Wallet') {
      await navigation.navigate("Wallet")
    } else if (name == 'Privacy Policy') {
      await navigation.navigate("PrivacyPolicies")
    } else if (name == 'About Us') {
      await navigation.navigate("AboutUs")
    } else if (name == 'Logout') {
      await showDialog();
    } else if (name == 'Help') {
      await showSnackbar('Not Active')
    }
  }

  const online_status = async () => {
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + change_online_status,
      data: { id: global.id, online_status: 0 }
    })
      .then(async response => {
        await props.updatePartnerOnlineStatus(0);
        setLoading(false);
        await props.reset();
        await AsyncStorage.clear();
        await setVisible(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Phone" }],
          })
        );
      })
      .catch(error => {
        setLoading(false);
      });
  }


  const handleLogout = async () => {
    await setShowModal(false);
    online_status();
  };

  const DATA = [
    {
      title: 'Notifications',
      icon: 'notifications-outline'
    },
    {
      title: 'Wallet',
      icon: 'wallet-outline'
    },
    {
      title: 'Help Center',
      icon: 'help-outline'
    },
    {
      title: 'Privacy Policy',
      icon: 'alert-circle-outline'
    }, {
      title: 'About Us',
      icon: 'information-outline'
    },
    {
      title: 'Logout',
      icon: 'log-out-outline'
    },

  ];

  const profile = () => {
    navigation.navigate("Profile")
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1} onPress={next.bind(this, item.title)}>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.light_grey, paddingTop: 15, paddingBottom: 15 }}>
        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Icon type={Icons.Ionicons} name={item.icon} color={colors.theme_fg_two} style={{ fontSize: 20 }} />
        </View>
        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontFamily: regular, fontSize: 16, color: colors.theme_fg_two }}>{item.title}</Text>
        </View>
        <View style={{ width: '5%', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Icon type={Icons.Ionicons} name="chevron-forward-outline" color={colors.theme_fg_two} style={{ fontSize: 15 }} />
        </View>
      </View>
      {/* <Modal animationType='slide' visible={showModal}>
        <View style={{margin: 20, backgroundColor: colors.theme_bg_three, borderRadius: 20, paddingTop: 35, paddingBottom: 10, alignItems: "center", justifyContent:'center', shadowColor: "#000", 
        shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>

            <Text style={{textAlign:'center', color:colors.theme_fg_two, fontSize:18, fontFamily:regular}}>Need to logout?</Text>
            <View style={{ margin:10, borderBottomWidth: 0.5, borderColor:colors.theme_fg_two, width:'100%'}}/>
             <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', width:'100%'}}>
              <TouchableOpacity onPress={handleLogout} style={{ width:'50%',  alignItems:'center', justifyContent:'center'}}>
                <Text style={{ textAlign:'center', color:colors.theme_fg_two, fontSize:14, fontFamily:regular}} >YES</Text>
              </TouchableOpacity>
              <View style={{ borderWidth:0.5, height:50 }}/>
              <TouchableOpacity onPress={handleCancel} style={{ width:'48%',  alignItems:'center', justifyContent:'center'}}>
                <Text style={{ textAlign:'center', color:colors.theme_fg_two, fontSize:14, fontFamily:regular}} >NO</Text>
              </TouchableOpacity>
            </View>

        
        </View>
      </Modal> */}
      <Dialog.Container visible={dialog_visible}>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Description>
          Do you want to logout?
        </Dialog.Description>
        <Dialog.Button label="Yes" onPress={handleLogout} />
        <Dialog.Button label="No" onPress={handleCancel} />
      </Dialog.Container>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg} />
      <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        <Loader visible={loading} />
        <View style={styles.header}>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ color: colors.theme_fg_two, fontFamily: bold, fontSize: 20 }}>Settings</Text>
          </View>
        </View>
        <View style={{ margin: 10 }} />
        {/* <Dialog.Container contentStyle={{backgroundColor:colors.theme_bg_three}} visible={visible}>
          <Dialog.Title style={{fontFamily: bold, color:colors.theme_fg_two, fontSize:18}}>Confirm Logout</Dialog.Title>
          <Dialog.Description style={{fontFamily: regular, color:colors.theme_fg_two, fontSize:16}}>
            Do you want to logout?
          </Dialog.Description>
          <Dialog.Button style={{color:colors.theme_fg_two, fontSize:14, fontFamily:regular}} label="Yes" onPress={handleLogout} />
          <Dialog.Button style={{color:colors.theme_fg_two, fontSize:14, fontFamily:regular}} label="No" onPress={handleCancel} />
        </Dialog.Container> */}
        <TouchableOpacity activeOpacity={1} onPress={profile}>
          <View style={{backgroundColor:colors.theme_bg_three,padding:5,elevation:3,borderRadius:10,margin:5}}
          >
            <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Image style={{ height: 50, width: 50,borderRadius:50 }} source={{ uri: img_url + props.partner_profile_picture }} />
              </View>
              <View style={{ width: '75%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontFamily: bold, fontSize: 18, color: colors.theme_fg_two }}>{props.partner_name}</Text>
                <View style={{ margin: 2 }} />
                <Text style={{ fontFamily: regular, fontSize: 12, color: colors.grey }}>Edit Profile</Text>
              </View>
              <View style={{ width: '5%', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Icon type={Icons.Ionicons} name="chevron-forward-outline" color={colors.theme_fg_two} style={{ fontSize: 15, color: colors.grey }} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ margin: 10 }} />
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
    backgroundColor: colors.theme_bg_three,

  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#ccc',
  },
});

function mapStateToProps(state) {
  return {
    partner_profile_picture: state.partner_register.partner_profile_picture,
    partner_name: state.partner_register.partner_name,
  };
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset()),
  updatePartnerOnlineStatus: (data) => dispatch(updatePartnerOnlineStatus(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(More);

