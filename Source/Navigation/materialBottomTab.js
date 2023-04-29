import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../Screens/Home';
// class HomeScreen extends React.Component {

//   render() {

//     return (
//         <View style={styles.container}>
//           <Text>Home Screen</Text>
//         </View>
//     );
//   }
// }
class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}
class ImageScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Image Screen</Text>
      </View>
    );
  }
}
class CartScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Cart Screen</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <View>
            {/* <FontAwesome5Icon  name='home' size={25} style={[{color: tintColor}]} /> */}
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
        activeColor: '#FF04FF',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#A8A8FF'},
      },
    },
    Image: {
      screen: ImageScreen,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-images'} />
          </View>
        ),
        activeColor: '#FF04FF',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#67baf6'},
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarLabel: 'Cart',
        tabBarIcon: ({tintColor}) => (
          <View style={styles.roundshape}>
            <Icon
              style={[{color: tintColor, alignSelf: 'center'}]}
              size={25}
              name={'ios-cart'}
            />
          </View>
        ),
        activeColor: '#FF04FF',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#CFD1D2'},
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#FF04FF',
    inactiveColor: '#226557',
    barStyle: {backgroundColor: '#3BAD87'},
  },
);

export default createAppContainer(TabNavigator);
