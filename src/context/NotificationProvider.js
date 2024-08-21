import React, { createContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  useEffect(() => {
    // Request notification permission (iOS only)
    async function requestPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        try {
            await messaging().registerDeviceForRemoteMessages()
            const token = await messaging().getToken();
            console.log("TOKEN MESSAGE",token) 
            global.fcm_token = token; 
        } catch (error) {
            console.log("TOKEN error",error)  
        }
    
      }
    }

    if (Platform.OS === 'ios') {
        console.log("hi");
      requestPermission();
    }

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // IOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      // (optional) default: true
      // - Specified if permissions (ios) and token (android and ios) will requested or not,
      // - if not, you must call PushNotificationsHandler.requestPermissions() later
      requestPermissions: true,
    });

    // Listen for foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "taxi_booking", // (required for Android)
        /* iOS and Android properties */
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
      });
    });

    // Listen for notification interactions while the app is in the foreground
    const unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened by notification while in foreground:', remoteMessage);
      // Handle notification interaction
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: Platform.OS === 'android' ? "taxi_booking" : undefined, // (required for Android)
        /* iOS and Android properties */
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
      });
    });

    // Check if the app was opened by a notification from a closed state
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened by notification from closed state:', remoteMessage);
        // Handle notification interaction
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: Platform.OS === 'android' ? "taxi_booking" : undefined, // (required for Android)
          /* iOS and Android properties */
          title: remoteMessage.notification.title, // (optional)
          message: remoteMessage.notification.body, // (required)
        });
      }
    });

    // Clean up the listeners on unmount
    return () => {
      unsubscribeForeground();
      unsubscribeNotificationOpenedApp();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };