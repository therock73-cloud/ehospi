import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';

const ActiveAppoinment = ({navigation, route}) => {
  const [active, setActive] = useState([]);
  const [user_id, setUserId] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      callBookings();
    }, []),
  );
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
  // useEffect(() => {
  //   console.log('user Id ', user_id);

  //   AsyncStorage.getItem('user_id').then(res => {
  //     setUserId(res);
  //     console.log('bookinmg', user_id);
  //     callBookings(res);
  //   });
  // }, []);

  const callBookings = async () => {
    const id = await AsyncStorage.getItem('user_id');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      user_id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/appoinmentslist', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.response);

        const Finaldata = result.response.data.filter(item => {
          return item.status === 'active';
        });
        console.log(Finaldata);

        setActive(Finaldata);
      })
      .catch(error => console.log('error', error));
  };
  const deleteAppoinment = id => {
    axios
      .post('https://api.ehospi.in/user/cancelAppoinment', {
        id: id,
      })
      .then(res => {
        console.log('check', res.data);
        // Alert.alert(res?.data?.message);
        callBookings();
      })
      .catch(err => {
        Alert.alert(err?.data);
      });
  };

  const goBack = () => {
    navigation.navigate('DrawerNavigator');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f7f7f7',
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 20,
          }}>
          <View
            style={{
              padding: 5,
              marginLeft: 10,
              width: 100,
              marginLeft: 10,
              borderBottomWidth: 2,
              borderBottomColor: '#0D9AD8',
            }}>
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

        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={active}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              console.log(item);
              return (
                <>
                  {/* {item.status !== 'cancelled' ? ( */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginLeft: 10,
                      borderColor: '#AAFAAD',
                      justifyContent: 'space-between',
                      backgroundColor: '#fff',
                      padding: 15,
                    }}>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100 / 2,
                        backgroundColor: '#D6EDD7',
                      }}>
                      <Text
                        style={{
                          color: '#2DCC34',
                          textAlign: 'center',
                          marginTop: 30,
                          fontSize: 15,
                          fontWeight: '700',
                        }}>
                        {item.date}
                      </Text>
                    </View>

                    <View style={{marginLeft: 20}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        {item.time}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: '#d6d6d6',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '500',
                          color: '#0D9AD8',
                        }}>
                        {item.specialist}
                      </Text>
                    </View>

                    <View style={{marginRight: 10}}>
                      <TouchableOpacity
                        onPress={() => deleteAppoinment(item.id)}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#000',
                          }}>
                          X
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL('tel:' + item.phone);
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            margin: 0,
                            borderWidth: 0,
                            marginBottom: 0,
                            marginLeft: 0,
                            marginRight: 10,
                            marginTop: 20,
                          }}>
                          <Image
                            source={require('../../Assets/Images/call.png')}
                            style={{
                              height: 25,
                              margin: 0,
                              borderWidth: 0,
                              width: 25,
                              marginBottom: 0,
                              padding: 10,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* ) : null} */}
                </>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActiveAppoinment;

const styles = StyleSheet.create({});
