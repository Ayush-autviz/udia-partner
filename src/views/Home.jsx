import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch, PermissionsAndroid, Platform, Alert} from 'react-native';
import * as colors from '../assets/css/Colors';
import { regular, bold, restaurant, change_online_status, api_url, dashboard, GOOGLE_KEY, LATITUDE_DELTA, LONGITUDE_DELTA, app_name, online_lottie, offline_lottie} from '../config/Constants';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { Loader } from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import FusedLocation from 'react-native-fused-location';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux'; 
import { updatePartnerLat, updatePartnerLng, updatePartnerOnlineStatus } from '../actions/PartnerRegisterActions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation'
import BackgroundService from 'react-native-background-actions';

Geolocation.setRNConfiguration({
  authorizationLevel: 'always', // Request "always" location permission
  skipPermissionRequests: false, // Prompt for permission if not granted
});

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const Home = (props) => {
  const navigation = useNavigation();
  const [switch_value, setSwitchValue] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dashboard_value, setDashboardValue] = useState(""); 
  const mapRef = useRef(null);
  const [mapRegion, setmapRegion] = useState(null);

  const getInitialLocation = async() =>{
    await Geolocation.getCurrentPosition( async(position) => {
      console.log(position.coords,"position")
                  database().ref(`/delivery_partners/${global.id}`).update({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            bearing: position.coords.heading,
          });
         
    }, error => navigation.navigate('LocationEnable'),
    {enableHighAccuracy: false, timeout: 10000 });
  }
 
 
const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            getInitialLocation();

            await sleep(delay);
        }
    });
};
 
const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 50000,
    },
};
const trackLocation = async ()=>{
  await BackgroundService.start(veryIntensiveTask, options);
  await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'});
  BackgroundService.on('expiration', () => {
    console.log('I am being closed :(');
});
}

useEffect(() => {
  
  try {
    trackLocation();
  } catch (error) {
    console.log(error);
  }
 
}, []);


  const ref_variable = async() =>{
    await setTimeout(() => {
      mapRef.current.focus();
    }, 200);
  }

  useEffect(() => {
    const onValueChange = database()
    .ref(`/delivery_partners/${global.id}`)
    .on('value', snapshot => {
      console.log("data",snapshot.val())
      if(snapshot.val().on_stat == 1 && snapshot.val().o_stat == 1){
        sync(snapshot.val().o_id);
      }
    });
    if(props.partner_online_status == 1){
      setSwitchValue(true);
    }else{
      setSwitchValue(false);
    }
   // sync(2);
   //sync(109);

   call_dashboard();
  const unsubscribe = navigation.addListener('focus', async () => {
    //await get_location();
    await call_dashboard();
    });
    return unsubscribe;
  },[]);

  


  useEffect(() => {
    // const configureBackgroundGeolocation = async () => {
    //   const hasLocationPermission = async () => {
    //     if (Platform.OS === 'android') {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    //           title: 'Location Access Required',
    //           message: 'This app needs to access your location for tracking.'
    //         }
    //       );

    //       const backgroundGranted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, {
    //           title: 'Background Location Access Required',
    //           message: 'This app needs to access your location in the background for tracking.'
    //         }
    //       );

    //       console.log('Foreground Location Permission:', granted);
    //       console.log('Background Location Permission:', backgroundGranted);

    //       return (
    //         granted === PermissionsAndroid.RESULTS.GRANTED &&
    //         backgroundGranted === PermissionsAndroid.RESULTS.GRANTED
    //       );
    //     } else {
    //       return true; // iOS permissions are handled by the OS automatically
    //     }
    //   };

    //   const locationPermissionGranted = await hasLocationPermission();

    //   if (!locationPermissionGranted) {
    //     Alert.alert('Permission Denied', 'Location permission is required for tracking.');
    //     return;
    //   }

    //   if (props.partner_online_status !== 1) {
    //     console.log('Partner is offline. Background geolocation will not start.');
    //     return;
    //   }

    //   BackgroundGeolocation.configure({
    //     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //     stationaryRadius: 50,
    //     distanceFilter: 50,
    //     notificationTitle: '',
    //     notificationText: '',
    //     notificationIconColor: null,
    //     notificationIconLarge: null,
    //     notificationIconSmall: null,
    //     debug: true, // Enable debug notifications
    //     startOnBoot: true,
    //     stopOnTerminate: false,
    //     locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    //     interval: 5000,
    //     fastestInterval: 5000,
    //     activitiesInterval: 10000,
    //     stopOnStillActivity: false,
    //   });

    //   BackgroundGeolocation.on('location', (location) => {
    //     console.log('Location update received:', location);

    //     BackgroundGeolocation.startTask(taskKey => {
    //       database().ref(`/delivery_partners/${global.id}`).update({
    //         lat: location.latitude,
    //         lng: location.longitude,
    //         bearing: location.heading,
    //       });
    //       BackgroundGeolocation.endTask(taskKey);
    //     });
    //   });

    //   BackgroundGeolocation.on('error', (error) => {
    //     console.log('[ERROR] BackgroundGeolocation error:', error);
    //   });

    //   BackgroundGeolocation.on('start', (location) => {
    //     console.log('Location background update received:', location);
    //     console.log('[INFO] BackgroundGeolocation service has been started');
    //   });

    //   BackgroundGeolocation.on('stop', () => {
    //     console.log('[INFO] BackgroundGeolocation service has been stopped');
    //   });

    //   BackgroundGeolocation.on('authorization', (status) => {
    //     console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
    //     if (status !== BackgroundGeolocation.AUTHORIZED) {
    //       setTimeout(() => {
    //         Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
    //           { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
    //           { text: 'No', style: 'cancel' }
    //         ]);
    //       }, 1000);
    //     }
    //   });

    //   BackgroundGeolocation.on('background', (location) => {
    //     console.log('Location background update received:', location);
    //     console.log('[INFO] App is in background');
    //   });

    //   BackgroundGeolocation.on('foreground', () => {
    //     console.log('[INFO] App is in foreground');
    //   });

    //   BackgroundGeolocation.start();
    // };

    // configureBackgroundGeolocation();
  }, [props.partner_online_status]);

  const sync = (order_id) =>{
    navigation.navigate("OrderRequest",{order_id:order_id});
  }

  // const get_location = async() =>{
  //   if(Platform.OS === "android"){
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
  //           title: 'Location Access Required',
  //           message: app_name+' needs to Access your location for tracking'
  //           }
  //       );
  //       if (granted) {
  //         FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
   
  //         // Get location once.
  //         const location = await FusedLocation.getFusedLocation();
  //         await props.updatePartnerLat(location.latitude);
  //         await props.updatePartnerLng(location.longitude);
   
  //         // Set options.
  //         FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
  //         FusedLocation.setLocationInterval(5000);
  //         FusedLocation.setFastestLocationInterval(5000);
  //         FusedLocation.setSmallestDisplacement(10);
   
         
  //         // Keep getting updated location.
  //         FusedLocation.startLocationUpdates();
   
  //         // Place listeners.
  //         const subscription = FusedLocation.on('fusedLocation', location => {
          
  //            let region = {
  //               latitude:       location.latitude,
  //               longitude:      location.longitude,
  //               latitudeDelta:  LATITUDE_DELTA,
  //               longitudeDelta: LONGITUDE_DELTA
  //             }

  //             let marker = {
  //               latitude:       location.latitude,
  //               longitude:      location.longitude,
  //             }

  //             let lat =  location.latitude;
  //             let lng =  location.longitude;

  //             database().ref('/delivery_partners/'+global.id).update({
  //               lat: lat,
  //               lng: lng,
  //               bearing : location.bearing
  //             });

  //         });
  //       }
  //     }else{
  //       database().ref('/delivery_partners/'+global.id).update({
  //           lat: 9.9081015593355,
  //           lng:  78.090738002211,
  //           bearing : 90
  //         });
  //     }
  // }

  

  // const get_location = async () => {
  //   const hasLocationPermission = async () => {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
  //           title: 'Location Access Required',
  //           message: 'This app needs to access your location for tracking.'
  //         }
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } else {
  //       // iOS permissions are handled by the OS automatically
  //       return true;
  //     }
  //   };
  
  //   const locationPermissionGranted = await hasLocationPermission();

  //   console.log(locationPermissionGranted,"location acces");
  
  //   if (locationPermissionGranted) {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  
  //         // Update the location in the state and Firebase
  //         props.updatePartnerLat(latitude);
  //         props.updatePartnerLng(longitude);
  
  //         database().ref(`/delivery_partners/${global.id}`).update({
  //           lat: latitude,
  //           lng: longitude,
  //           bearing: position.coords.heading,
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //         Alert.alert('Error', 'Unable to get location. Please try again.');
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         timeout: 15000,
  //         maximumAge: 10000,
  //       }
  //     );
  
  //     // Start watching the location
  //     Geolocation.watchPosition(
  //       (position) => {
  //         console.log(position,"position");
  //         const { latitude, longitude } = position.coords;
  
  //         let region = {
  //           latitude,
  //           longitude,
  //           latitudeDelta: LATITUDE_DELTA,
  //           longitudeDelta: LONGITUDE_DELTA,
  //         };
  
  //         let marker = {
  //           latitude,
  //           longitude,
  //         };
  
  //         database().ref(`/delivery_partners/${global.id}`).update({
  //           lat: latitude,
  //           lng: longitude,
  //           bearing: position.coords.heading,
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //        // Alert.alert('Error', 'Unable to get location updates. Please try again.');
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         distanceFilter: 10,
  //         interval: 10000,
  //         fastestInterval: 10000,
  //       }
  //     );
  //   } else {
  //     Alert.alert('Permission Denied', 'Location permission is required for tracking.');
  //   }
  // };

  const toggleSwitch = async(value) => {
    if(value){
      await setSwitchValue(value);  
      await online_status(1);
      await saveData(1);
    }else{
      await setSwitchValue( value );  
      await online_status(0);
      await saveData(0);
    }  
  }

  const online_status = async (status) => {
    console.log({ id: global.id, online_status : status })
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + change_online_status,
      data:{ id: global.id, online_status : status }
    })
    .then(async response => {
      setLoading(false);
    })
    .catch(error => {
      alert('Sorry something went wrong')
      setLoading(false);
    });
  }

  const saveData = async(status) =>{
    try{
        await AsyncStorage.setItem('online_status', status.toString());
        await props.updatePartnerOnlineStatus(status);
        
      }catch (e) {
    }
  }

  const call_dashboard = async() =>{
    console.log(":hiiiiii")
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + dashboard,
      data:{ delivery_boy_id:global.id }
    })
    .then(async response => {
      setLoading(false);
      console.log(response.data.result,"result");
      setDashboardValue(response.data.result);
    })
    .catch(error => {
      setLoading(false);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Loader visible={loading} />
        <View style={styles.header}>
          <TouchableOpacity style={{ width:'100%',justifyContent:'center', alignItems:'center' }}>
            <Switch
              trackColor={{ false: "#767577", true: colors.theme_bg }}
              thumbColor={switch_value ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={switch_value}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, padding:10, alignItems:'center', justifyContent:'center'}}>
          <View style={{ borderWidth:1, borderColor:colors.regular_grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Pending</Text>  
            <View style={{ margin:2 }} />
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({dashboard_value.pending})</Text> 
          </View>  
          <View style={{margin:5}}/>
          <View style={{ borderWidth:1, borderColor:colors.regular_grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Picked Up</Text>
            <View style={{ margin:2 }} />  
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({dashboard_value.picked_up})</Text> 
          </View> 
          <View style={{margin:5}}/>
          <View style={{ borderWidth:1, borderColor:colors.regular_grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Completed</Text>  
            <View style={{ margin:2 }} />
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({dashboard_value.completed})</Text> 
          </View> 
        </View>
        <View style={styles.imageView}>
          <Image style= {{ height: undefined,width: undefined,flex: 1,borderRadius:10 }} source={restaurant} />
        </View>
        {props.partner_online_status == 1 ?
          <View>
            <View style={{ margin:'15%' }}>
              <View style={{ height:150 }}>
                <LottieView style={{flex:1}}source={online_lottie} autoPlay loop />
              </View>
            </View>
            <Text style={{ alignSelf:'center', fontFamily:bold, justifyContent:'center', color:colors.green, fontSize:16}}>Be ready, will receive your delivery orders.</Text>
          </View>
          :
          <View>
            <View style={{ margin:'15%' }}>
              <View style={{ height:150 }}>
                <LottieView style={{flex:1}}source={offline_lottie} autoPlay loop />
              </View>
            </View>
            <Text style={{ alignSelf:'center', fontFamily:bold, justifyContent:'center', color:colors.theme_fg_four, fontSize:12}}>Make online to receive your delivery orders.</Text>
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
  header: {
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'row',
    shadowColor: '#ccc',
    padding:10
  },
  imageView:{
    width:'100%',
    height:180,
    padding:10,

  },
   
});

function mapStateToProps(state){
  return{
    partner_lat : state.partner_register.partner_lat,
    partner_lng : state.partner_register.partner_lng,
    partner_online_status : state.partner_register.partner_online_status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updatePartnerLat: (data) => dispatch(updatePartnerLat(data)),
  updatePartnerLng: (data) => dispatch(updatePartnerLng(data)),
  updatePartnerOnlineStatus: (data) => dispatch(updatePartnerOnlineStatus(data)), 

});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
