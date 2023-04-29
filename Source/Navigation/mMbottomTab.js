import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {Icons} from '../ReusableComponent/Icons';
import Colors from '../Assets/Constants/Colors';
import ColorScreen from '../Screens/ColorScreen';
import * as Animatable from 'react-native-animatable';
import Home from '../Screens/Home';
import DoctorCard from '../Screens/Files';
import Search from '../Screens/Search';
import Accounts from '../Screens/Accounts';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: ColorScreen,
    component: Home,
    color: Colors.primary,
    alphaClr: Colors.primaryAlpha,
  },
  {
    route: 'Search',
    label: 'Search',
    type: Icons.Feather,
    icon: 'search',
    component: ColorScreen,
    component: Search,
    color: Colors.green,
    alphaClr: Colors.greenAlpha,
  },
  {
    route: 'Add',
    label: 'Files',
    type: Icons.Feather,
    icon: 'file',
    component: ColorScreen,
    component: DoctorCard,
    color: Colors.red,
    alphaClr: Colors.redAlpha,
  },
  {
    route: 'Account',
    label: 'Account',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
    component: ColorScreen,
    component: Accounts,
    color: Colors.purple,
    alphaClr: Colors.purpleAlpha,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: item.color, borderRadius: 16},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : item.alphaClr},
          ]}>
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: Colors.white,
                  paddingHorizontal: 8,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});
