import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
const {width, height} = Dimensions.get('window');

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../../Config/baseurl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonConfirm from '../../ReusableComponent/ButtonConfirm';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PickerModal from '../../ReusableComponent/PickerModal';
import {Getgenderdata, Getrelationdata} from '../../Services/auth';
import Icon, {Icons} from '../../ReusableComponent/Icons';
const AddFamilyMember = ({navigation, route}) => {
  const [patientsmodal, setpatientsmodal] = useState(false);
  const [patientsdata, setpatientsdata] = useState([]);
  const [patientsselect, setpatientsselect] = useState();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [addnewpatients, setaddnewpatients] = useState(false);
  const [genderModal, setgenderModal] = useState(false);
  const [relationModal, setrelationModal] = useState(false);
  const [relationdata, setrelationdata] = useState([]);
  const [genderdata, setgenderdata] = useState([]);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Family Member',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setaddnewpatients(true);
          }}
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 20,
          }}>
          <AntDesign name="plus" size={20} color="#2580D3" />

          <Text
            style={{
              color: '#2580D3',
              fontSize: 15,
              marginLeft: width * 0.02,
            }}>
            Member
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (route.params.add == true) {
      setaddnewpatients(true);
    }
    GetfamilyHandler();
    getgender();
    getrelation();
  }, []);
  const getgender = async () => {
    try {
      let res = await Getgenderdata();
      setgenderdata(res.data);
      console.log(res);
    } catch (e) {}
  };
  const getrelation = async () => {
    try {
      let res = await Getrelationdata();
      setrelationdata(res.data);
      console.log(res);
    } catch (e) {}
  };
  const GetfamilyHandler = async () => {
    const userid = await AsyncStorage.getItem('user_id');
    var myHeaders = new Headers();
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

    fetch('https://api.ehospi.in/user/family-list', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setpatientsdata(result.response);
      })
      .catch(error => console.log('error', error));
  };
  const Validation = () => {
    if (name == '') {
      return 'Enter your name';
    } else if (age == '') {
      return 'Enter your age';
    } else if (gender == '') {
      return 'Enter your gender';
    } else if (relation == '') {
      return 'Enter your relation';
    } else {
      return true;
    }
  };
  const addDetails = async () => {
    const validate = Validation();
    if (validate == true) {
      const userid = await AsyncStorage.getItem('user_id');

      axios
        .post('https://api.ehospi.in/user/family-create', {
          user_id: userid,
          name: name,
          age: age,
          gender: gender,
          relation: relation,
        })
        .then(res => {
          setGender('');
          setName('');
          setRelation('');
          setid('');
          setAge('');
          setaddnewpatients(false);
          GetfamilyHandler();
          //console.log("FAMILY_LIST"+JSON.stringify(res));
        });
    } else {
      alert(validate);
    }
  };
  const editDetails = async () => {
    if (name != '' && age != '' && gender != '' && relation != '') {
      const userid = await AsyncStorage.getItem('user_id');
      console.log({
        id: id,
        user_id: userid,
        name: name,
        age: age,
        gender: gender,
        relation: relation,
      });
      axios
        .post('https://api.ehospi.in/user/family-update', {
          id: id,
          user_id: userid,
          name: name,
          age: age,
          gender: gender,
          relation: relation,
        })
        .then(res => {
          setGender('');
          setName('');
          setRelation('');
          setid('');
          setAge('');

          setaddnewpatients(false);
          setedit(false);
          GetfamilyHandler();
          //console.log("FAMILY_LIST"+JSON.stringify(res));
        });
    } else {
      alert('Enter all detail');
    }
  };
  const deletememberHandler = delid => {
    axios
      .post(baseurl + 'user/family-delete', {
        id: delid,
      })
      .then(res => {
        // console.log('delete sucessfully', res?.data);
        GetfamilyHandler();
        //Alert.alert(res?.data?.message)
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,

          // borderTopLeftRadius: width * 0.1,
          // borderTopRightRadius: width * 0.1,
          backgroundColor: '#ffffff',
          //   paddingBottom: '5%',
          // paddingHorizontal: '5%',
        }}>
        {addnewpatients == false ? (
          <>
            <FlatList
              data={patientsdata}
              renderItem={({item, index}) => {
                const fullyear = new Date().getFullYear();
                const age = fullyear - Number(item.age.split('-')[2]);
                return (
                  <TouchableOpacity
                    // onPress={() => {
                    //   if (
                    //     patientsselect != undefined &&
                    //     patientsselect.id == item.id
                    //   ) {
                    //     setpatientsselect();
                    //   } else {
                    //     setpatientsselect(item);
                    //   }
                    // }}
                    style={{
                      width: width * 0.95,
                      paddingHorizontal: '3%',
                      alignSelf: 'center',
                      marginTop: index == 0 ? '4%' : 0,
                      marginBottom: '4%',
                      borderBottomWidth: 1,
                      paddingBottom: '4%',
                      borderColor: 'lightgrey',

                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{width: width * 0.3}}>
                      <Image
                        source={{
                          uri: item.imageUrl,
                        }}
                        // defaultSource={{
                        //   uri: 'https://www.namg.net/wp-content/uploads/2017/09/doctor-icon.png',
                        // }}
                        style={{
                          width: width * 0.25,
                          height: width * 0.25,
                          borderRadius: (width * 0.25) / 2,
                          backgroundColor: '#d6d6d6',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: width * 0.45,

                        marginLeft: '4%',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 16,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '300',
                          fontSize: 14,
                        }}>
                        {item.relation}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#B0B2B5',
                          }}>
                          {age}{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#B0B2B5',
                          }}>
                          {item.gender}
                        </Text>
                      </View>
                    </View>
                    {item.relation == 'self' ? null : (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => {
                            setGender(item.gender);
                            setName(item.name);
                            setRelation(item.relation);
                            setid(item.id);
                            setAge(item.age);
                            setaddnewpatients(true);
                            setedit(true);
                          }}
                          style={{marginLeft: '5%'}}>
                          <Icon
                            type={Icons.Feather}
                            name={'edit'}
                            color={'#090909'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              `Are you sure you want to delete: ${item.name} of Family member?`,
                              '',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => deletememberHandler(item.id),
                                },
                              ],
                            );

                            // deletememberHandler(item.id);
                          }}
                          style={{marginLeft: '5%', marginTop: 20}}>
                          <Image
                            source={require('../../Assets/Images/delete.png')}
                            style={{
                              height: 25,

                              width: 25,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            {/* <ButtonConfirm
              Title={'Select Patients'}
              Press={() => setpatientsmodal(false)}
            /> */}
          </>
        ) : (
          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <TextInput
              style={{
                width: '100%',
                paddingLeft: 10,
                marginTop: wp('3%'),
                height: hp('7%'),
                outline: 'none',

                backgroundColor: '#d3d3d3',
                color: '#000',
              }}
              value={name}
              onChangeText={name => setName(name)}
              placeholder="Enter name*"
            />
            <View style={{}}>
              <DatePicker
                style={{
                  width: wp('90%'),
                  height: hp('7%'),
                  backgroundColor: '#d3d3d3',

                  marginTop: wp('3%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: wp('4%'),
                }}
                // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 ,padding:10}}
                date={age} // Initial date from state
                mode="date" // The enum of date,
                placeholder="DOB"
                iconComponent={
                  <FontAwesome5
                    name="calendar-alt"
                    color="#a9a9a9"
                    size={hp('3%')}
                  />
                }
                format="MM-DD-YYYY"
                minDate="01-01-1900"
                maxDate="01-19-2050"
                // display='spinner'
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    paddingLeft: wp('1%'),
                    fontSize: hp('1.5%'),
                  },
                  dateText: {fontSize: hp('1.8%'), color: 'black'},
                  placeholderText: {
                    color: 'black',
                    fontSize: hp('1.5%'),
                  },
                }}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                // display='scroll'
                onDateChange={age => {
                  setAge(age);
                }}
                androidMode={'spinner'}
              />
              {Platform.OS === 'ios' ? (
                <>
                  <TouchableOpacity
                    onPress={() => setgenderModal(true)}
                    style={{
                      width: wp('90%'),
                      height: hp('7%'),
                      backgroundColor: '#d3d3d3',

                      marginTop: wp('3%'),

                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontSize: 16, color: '#000'}}>
                      {gender == '' ? 'Select Gender' : gender}
                    </Text>
                    <FontAwesome5
                      name="caret-down"
                      color="#a9a9a9"
                      size={hp('3%')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setrelationModal(true)}
                    style={{
                      width: wp('90%'),
                      height: hp('7%'),
                      backgroundColor: '#d3d3d3',

                      marginTop: wp('3%'),

                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontSize: 16, color: '#000'}}>
                      {relation == '' ? 'Select relation' : relation}
                    </Text>
                    <FontAwesome5
                      name="caret-down"
                      color="#a9a9a9"
                      size={hp('3%')}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Picker
                    style={{
                      width: wp('90%'),
                      height: hp('7%'),
                      backgroundColor: '#d3d3d3',
                      borderRadius: hp('2%'),
                      marginTop: wp('3%'),
                      marginRight: wp('2.8%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: wp('4%'),
                    }}
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)
                    }>
                    <Picker.Item
                      label="Gender"
                      value="Gender"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {genderdata.length > 0 &&
                      genderdata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                  <Picker
                    style={{
                      width: wp('90%'),
                      height: hp('7%'),
                      backgroundColor: '#d3d3d3',
                      borderRadius: hp('2%'),
                      marginTop: wp('3%'),
                      marginRight: wp('2.8%'),
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: wp('4%'),
                    }}
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={relation}
                    onValueChange={(itemValue, itemIndex) =>
                      setRelation(itemValue)
                    }>
                    <Picker.Item
                      label="Select Relation"
                      value=""
                      style={{fontSize: hp('1.8%')}}
                    />
                    {relationdata.length > 0 &&
                      relationdata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.9,
                alignSelf: 'center',
                position: 'absolute',
                bottom: height * 0.05,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setaddnewpatients(false);
                }}
                style={{
                  width: '48%',
                  alignSelf: 'center',

                  height: height * 0.06,
                  borderRadius: 10,
                  justifyContent: 'center',
                  borderColor: '#7083DE',
                  borderWidth: 1,
                }}>
                <Text style={{textAlign: 'center', color: '#7083DE'}}>
                  {'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (edit == true) {
                    editDetails();
                  } else {
                    addDetails();
                  }
                }}
                style={{
                  width: '48%',
                  alignSelf: 'center',
                  backgroundColor: '#7083DE',
                  height: height * 0.06,
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center', color: '#fff'}}>
                  {edit ? 'Edit Member' : 'Add Member'}
                </Text>
              </TouchableOpacity>
              {/* <ButtonConfirm Title={'Add Member'} Press={() => addDetails()} /> */}
            </View>
          </View>
        )}

        <Modal
          animationType="slide"
          visible={genderModal}
          transparent={true}
          onRequestClose={() => setgenderModal(false)}>
          <TouchableOpacity
            onPressOut={() => setgenderModal(false)}
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', bottom: 0}}>
                <TouchableOpacity
                  onPress={() => setgenderModal(false)}
                  style={{
                    alignSelf: 'center',
                    marginBottom: '3%',
                  }}>
                  <AntDesign
                    name="close"
                    size={50}
                    color="#000"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    // flex: 1,
                    width: width,
                    height: height * 0.3,

                    borderTopLeftRadius: width * 0.1,
                    borderTopRightRadius: width * 0.1,
                    backgroundColor: '#ffffff',
                    elevation: 10,
                  }}>
                  <Picker
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => {
                      setGender(itemValue);
                      // setgenderModal(false);
                    }}>
                    <Picker.Item
                      label="Gender"
                      value="Gender"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {genderdata.length > 0 &&
                      genderdata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          visible={relationModal}
          transparent={true}
          onRequestClose={() => setrelationModal(false)}>
          <TouchableOpacity
            onPressOut={() => setrelationModal(false)}
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', bottom: 0}}>
                <TouchableOpacity
                  onPress={() => setrelationModal(false)}
                  style={{
                    alignSelf: 'center',
                    marginBottom: '3%',
                  }}>
                  <AntDesign
                    name="close"
                    size={50}
                    color="#000"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    // flex: 1,
                    width: width,
                    height: height * 0.3,

                    borderTopLeftRadius: width * 0.1,
                    borderTopRightRadius: width * 0.1,
                    backgroundColor: '#ffffff',
                    elevation: 10,
                  }}>
                  <Picker
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={relation}
                    onValueChange={(itemValue, itemIndex) => {
                      setRelation(itemValue);
                      // setrelationModal(false);
                    }}>
                    <Picker.Item
                      label="Select Relation"
                      value=""
                      style={{fontSize: hp('1.8%')}}
                    />
                    {relationdata.length > 0 &&
                      relationdata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AddFamilyMember;

const styles = StyleSheet.create({});
