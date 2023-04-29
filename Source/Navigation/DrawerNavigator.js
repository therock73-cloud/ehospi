import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Searchbar} from 'react-native-paper';
import {ContactStackNavigator} from '../Navigation/StackNavigation';
import TabNavigator from '../Navigation/mMbottomTab';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeaderDrawer from '../Screens/HeaderDrawer';
import CustomSidebarMenu from '../../CustomSidebarMenu';
import HomePage from '../Screens/Home';
import BookingSlot from '../Screens/BookingSlot';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
//import { DrawerActions } from '@react-navigation/routers';
import HomeScreen from '../Screens/Home';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// const headerHeight = useHeaderHeight(50);
const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };
  // const toggleDrawerwww = () => {

  //   navigationProps('Location');
  // };
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  // const {navigate} = props.navigation;
  // useEffect((navigation)=>
  //   props.navigation.navigate('Location')
  // )

  return (
    <View
      style={{
        width: wp('100%'),
        //height: hp('60%'),
        // backgroundColor: Colors.white,
        paddingHorizontal: wp('3%'),
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#0489D6',
        height: hp('8%'),
        paddingTop: hp('2%'),
      }}>
      {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#B2F3FF', '#0489D6',]} style={{ width: wp('100%'), alignItems: 'flex-start', flexDirection: "row", height: hp('8%'), paddingTop: hp('2%') }}> */}
      <TouchableOpacity onPress={toggleDrawer}>
        <FontAwesome5 name="bars" size={hp('4%')} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{padding: wp('1%'), marginLeft: wp('3%')}}
        // onPress={() => props.navigation.navigate('Location')}
      >
        {/* <FontAwesome5 name='map-marker-alt'  size={hp('2%')} /> */}
        <Text
          style={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: hp('2.5%'),
            marginLeft: wp('0.1%'),
            color: Colors.white,
          }}>
          Welcome to eHospi
        </Text>
      </TouchableOpacity>
      {/* <Image source={require('../Assets/Images/doctor.jpg')}
                      style={{ width: wp('18%'), height: wp('18%'), borderRadius: hp('5%'),marginLeft:wp('40%'),marginTop: hp('3%') }} /> */}
      {/* </LinearGradient> */}
    </View>
  );
};
function HomeScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          //headerShown: false,
          title: '', //Set Header Title
          // subtile: 'HOME 2',

          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: '#7BC0EF', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={BookingSlot}
        options={{
          // headerShown: false,
          title: 'First Page', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        options={{
          drawerLabel: 'Go To Home Page',
          // Section/Group Name
          groupName: 'Section 1',
          // activeTintColor: '#e91e63',
        }}
        name="HomePage"
        component={HomeScreenStack}
      />
      {/* <Drawer.Screen
      options={{
        drawerLabel: 'Booking Slot',
        // Section/Group Name
        groupName: 'Section 1',
        activeTintColor: '#e91e63',
      }}
      name="Contact No" component={firstScreenStack} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  contnr: {
    width: wp('100%'),
    height: hp('100%'),
  },
  view: {
    margin: 10,
  },
});
