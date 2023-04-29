import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../../Config/baseurl';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const LabScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Lab Test',
    });
  }, [navigation]);
  const [data, setdata] = useState([]);
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    setdata([route.params.data]);
    viewcartHandler();
  }, []);
  const viewcartHandler = async () => {
    const id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('tokenId');
    console.log(token);
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/lab_viewcart', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('view_result', result);
        if (result.length > 0) {
          setcartdata(result);
        } else {
          setcartdata([]);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            width: width * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Searchbar
            style={{
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 30,
              width: width * 0.76,

              // paddingHorizontal: width * 0.02,
            }}
            placeholder="Search"
            // onChangeText={onChangeSearch}
            // value={searchQuery}
          />
          <TouchableOpacity
            style={{
              marginHorizontal: 16,
              alignSelf: 'center',
              // position: 'relative',
              // top: -20,
            }}
            onPress={() => navigation.navigate('LabtestBook')}>
            <AntDesign name={'shoppingcart'} size={35} color={'#000000'} />
            <View
              style={{
                width: width * 0.06,
                height: width * 0.06,
                borderRadius: (width * 0.06) / 2,
                backgroundColor: 'red',
                position: 'absolute',
                right: -5,
                top: -5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 14}}>
                {cartdata.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LabdetailScreen', {
                    id: item.hospital_id,
                  })
                }
                style={{
                  ...styles.shadowProp,
                  width: width * 0.9,
                  alignSelf: 'center',
                  //   flexDirection: 'row',
                  //   alignItems: 'center',
                  marginTop: index == 0 ? height * 0.04 : 0,
                  marginBottom: height * 0.04,
                  padding: '5%',
                  backgroundColor: '#ffffff',
                }}>
                <Image
                  source={require('../../Assets/Images/lalpath.png')}
                  resizeMode="contain"
                  style={{
                    width: '60%',
                    height: height * 0.07,
                    marginBottom: '8%',
                  }}
                />
                <Text
                  style={{
                    color: '#2580D3',
                    fontSize: 16,
                    fontWeight: '700',
                    marginRight: '8%',
                  }}>
                  {item.labDetail[0].hospitalName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '2%',
                  }}>
                  <Text style={{color: '#000', fontSize: 14}}>
                    {item.labDetail[0].hospitalAddress +
                      ', ' +
                      item.labDetail[0].city}
                  </Text>
                  <View
                    style={
                      {
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // justifyContent: 'space-between',
                      }
                    }>
                    <Text style={{color: '#000', fontSize: 14}}>
                      ₹{item.total_amount}
                    </Text>
                    <Text style={{color: '#000', fontSize: 14, marginTop: 8}}>
                      Test
                    </Text>
                  </View>
                </View>
                <TextInput
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 30,
                    // paddingHorizontal: width * 0.02,
                  }}
                  placeholder="Enter your City"
                  placeholderTextColor={'lightgrey'}
                />
                {/* <Searchbar
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                    borderRadius: 30,
                    // paddingHorizontal: width * 0.02,
                  }}
                  placeholder="Enter your City"
                  // onChangeText={onChangeSearch}
                  // value={searchQuery}
                /> */}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LabScreen;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  },
});
