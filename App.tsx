import React, { useEffect, useRef } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from './src/components/Icons';
import * as colors from './src/assets/css/Colors';
import { img_url } from './src/config/Constants';
import * as Animatable from 'react-native-animatable';

/* Screens */
import Splash from './src/views/Splash';
import Phone from './src/views/Phone';
import Password from './src/views/Password';
import Home from './src/views/Home';
import OngoingOrders from './src/views/OngoingOrders';
import Notifications from './src/views/Notifications';
import More from './src/views/More';
import Otp from './src/views/Otp';
import ResetPassword from './src/views/ResetPassword';
import FaqCategories from './src/views/FaqCategories';
import FaqDetails from './src/views/FaqDetails';
import AboutUs from './src/views/AboutUs';
import Wallet from './src/views/Wallet';
import Faq from './src/views/Faq';
import PrivacyPolicies from './src/views/PrivacyPolicies';
import Ratings from './src/views/Ratings';
import OrderDetails from './src/views/OrderDetails';
import Profile from './src/views/Profile';
import Earnings from './src/views/Earnings';
import TripHistory from './src/views/TripHistory';
import Withdrawal from './src/views/Withdrawal';
import EarningsHistory from './src/views/EarningsHistory';
import MyOrders from './src/views/MyOrders';
import MyOrderDetails from './src/views/MyOrderDetails';
import OrderRequest from './src/views/OrderRequest';
import Register from './src/views/Register';


const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: Home },
  { route: 'OngoingOrders', label: 'OngoingOrders', type: Icons.Feather, icon: 'coffee', component: OngoingOrders },
  { route: 'Earnings', label: 'Earnings', type: Icons.Feather, icon: 'bar-chart', component: Earnings },
  { route: 'More', label: 'More', type: Icons.Feather, icon: 'more-horizontal', component: More },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? colors.theme_fg_three : colors.theme_fg} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={({ route, navigation })  => ({
                        ...TransitionPresets.SlideFromRightIOS,
                    })}>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Phone" component={Phone} options={{headerShown: false}}/>
        <Stack.Screen name="Password" component={Password} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}} />
        <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="FaqCategories" component={FaqCategories} options={{headerShown: false}}/>
        <Stack.Screen name="FaqDetails" component={FaqDetails} options={{headerShown: false}}/>
        <Stack.Screen name="Faq" component={Faq} options={{headerShown: false}}/>
        <Stack.Screen name="AboutUs" component={AboutUs} options={{headerShown: false}}/>
        <Stack.Screen name="Wallet" component={Wallet} options={{headerShown: false}}/>
        <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} options={{headerShown: false}}/>
        <Stack.Screen name="Ratings" component={Ratings} options={{headerShown: false}}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Earnings" component={Earnings} options={{headerShown: false}}/>
        <Stack.Screen name="TripHistory" component={TripHistory} options={{headerShown: false}}/>
        <Stack.Screen name="Withdrawal" component={Withdrawal} options={{headerShown: false}} />
        <Stack.Screen name="EarningsHistory" component={EarningsHistory} options={{headerShown: false}}/>
        <Stack.Screen name="MyOrders" component={MyOrders} options={{headerShown: false}}/>
        <Stack.Screen name="MyOrderDetails" component={MyOrderDetails} options={{headerShown: false}}/>
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}} />
        <Stack.Screen name="OrderRequest" component={OrderRequest} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={Register} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.theme_fg_three,
    backgroundColor: colors.theme_fg_three,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme_fg,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.theme_fg,
  }
})

export default App;