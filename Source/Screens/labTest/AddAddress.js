import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
// import {COLORS,SIZES} from '../Screens/constant/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../../Config/baseurl';
const AddAddress = ({navigation}) => {
  const [name, setname] = useState();
  const [flatNum, setflatNum] = useState();
  const [pincode, setpincode] = useState();
  const [locality, setlocality] = useState();
  const [city, setcity] = useState();
  const [state, setstate] = useState();
  const [mobilenum, setmobilenum] = useState();
  const [addressType, setAddressType] = useState('Home');
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

      fetch(`${baseurl}labtest/add_address`, requestOptions)
        .then(response => response.json())
        .then(result => {
          navigation.navigate('LabtestBook');
        })
        .catch(error => console.log('error', error));
    } else {
      alert(validate);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
          <Text style={{color: '#000', fontWeight: '700', fontSize: 18}}>
            Step2:Selected Address
          </Text>
          <Text
            style={{
              color: '#010204',
              fontWeight: '500',
              fontSize: 15,
              marginTop: 10,
            }}>
            A phlebotomist will visit you to collect samples
          </Text>

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
              onChangeText={text => setpincode(text)}
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
              onChangeText={text => setmobilenum(text)}
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
            <TouchableOpacity style={{backgroundColor: ''}}>
              <Text style={{color: '#2580D3', padding: 10}}>cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={AddDressHandler}
              style={{backgroundColor: '#7083DE', borderRadius: 10}}>
              <Text style={{color: '#fff', padding: 10}}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            // onPress={AddDressHandler}
            style={{
              borderWidth: 0,
              marginTop: 10,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              backgroundColor: '#7083DE',
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                color: '#fff',
                marginTop: 10,
              }}>
              Select Address
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({});
