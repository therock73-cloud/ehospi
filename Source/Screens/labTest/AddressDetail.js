import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
// import {COLORS,SIZES} from '../Screens/constant/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../../Config/baseurl';
import {useFocusEffect} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';
const {width, height} = Dimensions.get('window');

const AddressDetails = ({navigation}) => {
  const [addressmodal, setaddressmodal] = useState(true);
  const [show, setshow] = useState();

  const [addressdata, setaddressdata] = useState([]);
  const [name, setname] = useState();
  const [flatNum, setflatNum] = useState();
  const [pincode, setpincode] = useState();
  const [locality, setlocality] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [mobilenum, setmobilenum] = useState();
  const [addressType, setAddressType] = useState('Home');
  useFocusEffect(
    React.useCallback(() => {
      GetAddressHandler();
    }, []),
  );
  const Valdation = () => {
    if (name == undefined) {
      return 'Enter name';
    } else if (flatNum == undefined) {
      return 'Enter flat number';
    } else if (pincode == undefined || pincode.length != 6) {
      return 'Enter pincode';
    } else if (locality == undefined) {
      return 'Enter locality';
    } else if (city == undefined) {
      return 'Enter city';
    } else if (state == undefined) {
      return 'Enter state';
    } else if (mobilenum == undefined || mobilenum.length != 10) {
      return 'Enter mobile number';
    } else {
      return true;
    }
  };

  const AddDressHandler = async () => {
    const validate = Valdation();
    if (validate == true) {
      const token = await AsyncStorage.getItem('tokenId');
      const userid = await AsyncStorage.getItem('user_id');

      var myHeaders = new Headers();
      myHeaders.append('authorization', `Basic ${token}`);
      myHeaders.append('Content-Type', 'application/json');
      console.log(token);
      var raw = JSON.stringify({
        families_add_id: show,

        user_id: userid,
        name: name,
        flat_building_name: flatNum,
        pincode: pincode,
        locality: locality,
        city: city,
        state: state,
        mobile_number: mobilenum,
        home_office_other: addressType,
        status: '1',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      let EndPoint = show == undefined ? 'add_address' : 'edit_address';
      fetch(`${baseurl}labtest/${EndPoint}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          GetAddressHandler();
          setshow();
          setname();
          setflatNum();
          setpincode();
          setlocality();
          setcity();
          setstate();
          setmobilenum();
          setAddressType('Home');
          setaddressmodal(true);
        })
        .catch(error => console.log('error', error));
    } else {
      alert(validate);
    }
  };
  const DeleteAddressHandler = async id => {
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      families_add_id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/delete_address', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        GetAddressHandler();
      })
      .catch(error => console.log('error', error));
  };
  const GetAddressHandler = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    const userid = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      user_id: userid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/view_address', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        if (result.length > 0) {
          setaddressdata(result);
        } else {
          setaddressdata([]);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 40}} />
      <BackButtonHeader Title={'Address Detail'} />

      <ScrollView>
        <View style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
          {addressmodal ? (
            <FlatList
              data={addressdata}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: width * 0.95,
                      paddingHorizontal: '3%',
                      alignSelf: 'center',
                      marginBottom: '4%',
                      borderBottomWidth: 1,
                      paddingBottom: '4%',
                      borderColor: 'lightgrey',
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontSize: 16,
                              marginVertical: '2%',
                            }}>
                            {item.home_office_other}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              marginRight: 20,
                              paddingHorizontal: 10,
                            }}
                            onPress={() => {
                              setaddressmodal(false);
                              setshow(item._id);
                              setname(item.name);
                              setflatNum(item.flat_building_name);
                              setpincode(item.pincode);
                              setlocality(item.locality);
                              setcity(item.city);
                              setstate(item.state);
                              setmobilenum(item.mobile_number);
                              setAddressType(item.home_office_other);
                            }}>
                            <Text>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              Alert.alert(
                                `Are you sure you want to delete: ${
                                  item.flat_building_name +
                                  ', ' +
                                  item.locality +
                                  ', ' +
                                  item.city +
                                  ', ' +
                                  item.state +
                                  ', ' +
                                  item.pincode
                                } `,
                                '',
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'OK',
                                    onPress: () =>
                                      DeleteAddressHandler(item._id),
                                  },
                                ],
                              );
                            }}
                            style={{
                              borderWidth: 1,
                              borderColor: 'red',
                              paddingHorizontal: 10,
                            }}>
                            <Text style={{color: 'red'}}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          marginVertical: '3%',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          marginVertical: '2%',
                          width: '60%',
                        }}>
                        {item.flat_building_name +
                          ', ' +
                          item.locality +
                          ', ' +
                          item.city +
                          ', ' +
                          item.state +
                          ', ' +
                          item.pincode}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          marginVertical: '2%',
                        }}>
                        {item.mobile_number}
                      </Text>
                    </View>
                  </View>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setaddressmodal(false);

                      // navigation.navigate('AddAddress');
                    }}
                    style={{
                      alignSelf: 'flex-end',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 20,
                      marginRight: 20,
                    }}>
                    <AntDesign name="plus" size={20} color="#2580D3" />

                    <Text
                      style={{
                        color: '#2580D3',
                        fontSize: 15,
                        marginLeft: width * 0.02,
                      }}>
                      ADD NEW ADDRESS
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <>
              <View style={{marginTop: 30}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="Name"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                  }}
                  value={name}
                  onChangeText={text => setname(text)}
                />
              </View>

              <View style={{marginTop: 10}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="Flat Number, Buillding Name Street*"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                  }}
                  value={flatNum}
                  onChangeText={text => setflatNum(text)}
                />
              </View>

              <View style={{marginTop: 10}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="Pincode*"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                  }}
                  value={pincode}
                  onChangeText={text => {
                    if (text.length < 7) {
                      setpincode(text);
                    } else {
                      alert('Can not add more than 6 digit');
                    }
                  }}
                />
              </View>

              <View style={{marginTop: 10}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="Locality*"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                  }}
                  value={locality}
                  onChangeText={text => setlocality(text)}
                />
              </View>

              <View style={{marginTop: 10}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="City*"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                  }}
                  value={city}
                  onChangeText={text => setcity(text)}
                />
              </View>

              <View style={{marginTop: 10}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="State*"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                  }}
                  value={state}
                  onChangeText={text => setstate(text)}
                />
              </View>

              <View style={{marginTop: 10}}>
                {/* <Text style={{ marginTop: 30, color: "#000", marginTop: 10, fontSize: 18 }}>Name</Text> */}
                <TextInput
                  placeholder="10 Digit Mobile Number*"
                  style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#fff',
                    height: 50,
                    borderBottomColor: '#000',
                    color: '#000',
                  }}
                  keyboardType="phone-pad"
                  value={mobilenum}
                  onChangeText={text => {
                    if (text.length < 11) {
                      setmobilenum(text);
                    } else {
                      alert('Can not add more than 10 digit');
                    }
                  }}
                />
              </View>

              <View
                style={{
                  borderWidth: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setAddressType('Home')}
                  style={{
                    borderWidth: 1,
                    // borderColor: addressType == "Home" ? COLORS.mainColor : COLORS.primaryFontColor,
                    borderColor: addressType == 'Home' ? '#000' : '#d6d6d6',

                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 20,
                    marginRight: 20,
                  }}>
                  <Text
                    style={{
                      color: addressType == 'Home' ? '#000' : '#d6d6d6',
                      fontWeight: '500',
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAddressType('Office')}
                  style={{
                    borderWidth: 1,
                    borderColor: addressType == 'Office' ? '#000' : '#d6d6d6',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: addressType == 'Office' ? '#000000' : '#d6d6d6',
                      fontWeight: '500',
                    }}>
                    Office
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAddressType('Other')}
                  style={{
                    borderWidth: 1,
                    // borderColor: addressType == "Other" ? COLORS.mainColor : COLORS.primaryFontColor,
                    borderColor: addressType == 'Other' ? '#000000' : '#d6d6d6',

                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{
                      color: addressType == 'Other' ? '#000' : '#d6d6d6',
                      fontWeight: '500',
                    }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  style={{backgroundColor: ''}}
                  onPress={() => {
                    setaddressmodal(true);

                    setshow();

                    setname();
                    setflatNum();
                    setpincode();
                    setlocality();
                    setcity();
                    setstate();
                    setmobilenum();
                    setAddressType('Home');
                    // navigation.navigate('AddAddress');
                  }}>
                  <Text style={{color: '#2580D3', padding: 10}}>cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={AddDressHandler}
                  style={{backgroundColor: '#7083DE', borderRadius: 10}}>
                  <Text style={{color: '#fff', padding: 10}}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressDetails;

const styles = StyleSheet.create({});
