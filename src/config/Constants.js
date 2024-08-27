import { Dimensions } from 'react-native';

export const settings = "deliveryboy/app_setting";
export const base_url = "https://Myudia.com/";
export const api_url = "https://Myudia.com/api/";
export const img_url = "https://Myudia.com/uploads/";
export const app_name = "Foodlakh"; 

export const faq = "delivery_boy/faq";
export const privacy = "delivery_boy/privacy_policy"; 
export const check_phone_number = "delivery_boy/check_phone";
export const partner_login = "delivery_boy/login"; 
export const partner_forget_password = "delivery_boy/forget_password"; 
export const partner_reset_password = "delivery_boy/reset_password";
export const change_online_status = "delivery_boy/change_online_status";
export const dashboard = "delivery_boy/dashboard";
export const pending_order_list = "delivery_boy/get_pending_orders";
export const order_detail = "delivery_boy/get_deliveryboy_order_detail";  
export const get_order_details = "delivery_boy/get_orders";
export const wallet_histories = "delivery_boy/wallet_histories";
export const earning = "delivery_boy/earning"; 
export const withdrawal_request = "delivery_boy/withdrawal_request";
export const notification = "delivery_partner/notification";
export const get_profile = "delivery_boy/get_profile";
export const profile_update = "delivery_boy/profile_update";
export const save_profile_picture = "delivery_boy/profile_picture";
export const profile_picture_update = "delivery_boy/profile_picture_update"; 
export const withdrawal_history = "deliveryboy/withdrawal_history"; 
export const accept = "deliveryboy/accept"; 
export const reject = "deliveryboy/reject"; 
export const order_status_change = "order_status_change";
export const month_wise_earning = "deliveryboy/month_wise_earning"; 

//Size
export const screenHeight = Math.round(Dimensions.get('window').height);
export const height_40 = Math.round(40 / 100 * screenHeight);
export const height_50 = Math.round(50 / 100 * screenHeight);
export const height_60 = Math.round(60 / 100 * screenHeight);
export const height_35 = Math.round(35 / 100 * screenHeight);
export const height_20 = Math.round(20 / 100 * screenHeight);
export const height_30 = Math.round(30 / 100 * screenHeight);
export const height_17 = Math.round(17 / 100 * screenHeight);

//Path

export const home_banner = require('.././assets/img/home_banner.jpeg');
export const veg = require('.././assets/img/veg.png');
export const non_veg = require('.././assets/img/non_veg.png');
export const email = require('.././assets/img/email.png');
export const profile_img = require('.././assets/img/profile.png');
export const logo_with_name = require('.././assets/img/UDIAlogo.png');
export const wallet = require('.././assets/img/wallet.png');
export const wallet_money = require('.././assets/img/wallet_money.png');
export const biryani = require('.././assets/img/biryani.jpeg');
export const biryani_corner = require('.././assets/img/biryani_corner.jpeg');
export const edit = require('.././assets/img/edit.png');
export const splash_image = require('.././assets/img/splash_image.png');
export const restaurant = require('.././assets/img/restaurant.png');
export const visa = require('.././assets/img/visa.png');
export const paypal = require('.././assets/img/paypal.png');
export const mastro = require('.././assets/img/mastro.png');
export const dot = require('.././assets/img/dot.png');
export const arrow = require('.././assets/img/arrow.png');
export const phone_call = require('.././assets/img/phone_call.png');
export const ellipsis = require('.././assets/img/ellipsis.png');
export const tick = require('.././assets/img/tick.png');
export const map = require('.././assets/img/map.jpeg');
export const camera = require('.././assets/img/camera.png');
export const phone = require('.././assets/img/phone.png');
export const address = require('.././assets/img/address.png');
export const customer_service = require('.././assets/img/customer_service.png');
export const chat = require('.././assets/img/chat.png');
export const cancel = require('.././assets/img/cancel.png');
export const static_map = require('.././assets/img/static_map.png');
export const credit_card = require('.././assets/img/credit_card.jpeg');
export const navigation_icon = require('.././assets/img/navigation.png');
export const money_bag = require('.././assets/img/money-bag.png');
export const earning_img = require('.././assets/img/earning.png');


//Lottie
export const empty_lottie = require('.././assets/json/empty.json');
export const notification_lottie = require('.././assets/json/notification.json');
export const address_lottie = require('.././assets/json/address.json');
export const success_lottie = require('.././assets/json/success.json');
export const closed_lottie = require('.././assets/json/closed.json');
export const online_lottie = require('.././assets/json/online.json');
export const offline_lottie = require('.././assets/json/offline.json');
export const empty_wallet = require('.././assets/json/empty_wallet.json');
export const earnings_lottie = require('.././assets/json/earnings.json');
export const withdraw_lottie = require('.././assets/json/withdraw.json');
export const order_arriving = require('.././assets/json/order_arriving.json');

//Font Family
export const light  = "Metropolis-Light";
export const regular  = "CheyenneSans-Regular";
export const bold  = "Metropolis-Bold";

//Map
export const GOOGLE_KEY = "AIzaSyDRI5Lx8apUI3bX9gyZ01eyaB7A7rZn-p4";
export const LATITUDE_DELTA = 0.0150;
export const LONGITUDE_DELTA =0.0152;

//More Menu
export const menus = [
  {
    menu_name: 'Profile',
    icon: 'person',
    route:'Profile'
  },
  {
    menu_name: 'Manage Addresses',
    icon: 'pin',
    route:'AddressList'
  },
  {
    menu_name: 'Wallet',
    icon: 'wallet',
    route:'Wallet'
  },
  {
    menu_name: 'Faq',
    icon: 'help',
    route:'Faq'
  },
  {
    menu_name: 'Privacy Policy',
    icon: 'alert',
    route:'PrivacyPolicy'
  },
  {
    menu_name: 'Contact Us',
    icon: 'call',
    route:'ContactUs'
  },
  {
    menu_name: 'Logout',
    icon: 'log-out',
    route:'Logout'
  },
]

