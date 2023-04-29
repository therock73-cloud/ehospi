import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PastAppoinment = ({navigation}) => {
  const [past, setpast] = useState([]);
  const [user_id, setUserId] = useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerNavigator')}>
          <AntDesign name="arrowleft" size={30} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    console.log('user Id ', user_id);

    AsyncStorage.getItem('user_id').then(res => {
      setUserId(res);
      console.log('bookinmg', user_id);
      callBookings(res);
    });
  }, []);

  callBookings = res => {
    axios
      .post('https://api.ehospi.in/user/appoinmentslist', {
        user_id: res,
      })
      .then(res => {
        setpast(res?.data?.response?.data);
        // console.log('active details', res?.data?.response?.data);
      })
      .catch(error => {});
  };
  const pastData = id => {
    if (id?.item?.status == 'past') {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginLeft: 10,
              borderColor: '#AAFAAD',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                backgroundColor: '#D6EDD7',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: '#2DCC34',
                  textAlign: 'center',
                  marginTop: 25,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                {id?.item?.date}
              </Text>
            </View>

            <View style={{marginLeft: 0, marginRight: 10}}>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#000'}}>
                {id?.item?.time}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#d6d6d6'}}>
                {id?.item?.name}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', color: '#0D9AD8'}}>
                {id?.item?.specialist}
              </Text>
            </View>

            <View style={{marginRight: 10}}>
              {/* <Text style={{ fontSize: 20, fontWeight: "700", color: "#000" }}> X </Text> */}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 5,
              backgroundColor: '#d6d6d6',
              marginTop: 10,
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: '#f7f7f7', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
        <View style={{padding: 5, marginLeft: 10, width: 100, marginLeft: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Active')}>
            <Text
              style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
              Active
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 5,
            width: 100,
            textAlign: 'center',
            marginLeft: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#0D9AD8',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('past')}>
            <Text
              style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
              Past
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 5,
            marginRight: 10,
            width: 100,
            textAlign: 'center',
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('cancle')}>
            <Text
              style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{borderWidth: 0, height: '100%', width: '100%'}}>
        <FlatList
          data={past}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={pastData}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 5,
          backgroundColor: '#d6d6d6',
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default PastAppoinment;

const styles = StyleSheet.create({});
