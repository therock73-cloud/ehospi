import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  FlatList,
  Alert,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {blue200} from 'react-native-paper/lib/typescript/styles/colors';
import {Fab} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';

import {json} from 'stream/consumers';
import axios from 'axios';
import {Value} from 'react-native-reanimated';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import {baseurl} from '../../Config/baseurl';
import DoctorContainer from '../../ReusableComponent/DoctorContainer';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChangeDateMode} from '../../Config/helper';
const ConsultaionDetails = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [confVisibale, setConfVisible] = useState(false);
  const [details, setFamily] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relation, setRelation] = useState('');
  const [bookingId, setBokingId] = useState('');
  const [confrimData, setConfrimData] = useState([]);
  const [drProfile, setDrProfile] = useState();
  const [user_id, setUserId] = useState('');
  var currentDate = moment().format('DD/MM/YYYY');
  const [currentTime, setCureentTime] = useState('');
  const [dob, setDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [familyList, setFamilyList] = useState([]);
  const [delList, setDelList] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [date, setdate] = useState();

  const [bgColor, setBgcolor] = useState('#f5f5f5');
  const [detailsSelected, setdetailsSelected] = useState([]);
  const [gettokenId, setTokenID] = useState();
  const [profiledata, setprofiledata] = useState();
  const [bookingdetaildata, setbookingdetaildata] = useState([]);
  useEffect(() => {
    var time = moment().utcOffset('+05:30').format(' hh:mm:ss a');
    setCureentTime(time);
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Consultation Details',
    });
  }, [navigation]);
  // var details=[{name:'kk',age:'25',gender:'male'},{name:'kk',age:'25',gender:'male'}];
  //var details=[];

  const drId = route?.params?.drId;
  const time = route?.params?.time;
  // const date = route?.params?.slotDate;
  const HospitalID = route?.params?.HospitalID;
  console.log('drIs', drId);
  console.log('time', time);
  console.log('HospitalID...', HospitalID);

  useEffect(() => {
    setdate(route?.params?.slotDate);
    AsyncStorage.getItem('user_id').then(res => {
      setUserId(res);
      axios
        .post('https://api.ehospi.in/user/family-list', {
          user_id: res,
        })
        .then(res => {
          //details=res?.data?.response
          setFamily(res?.data?.response);
          // console.log('LLLLLLLLLL>>>>>', res?.data);
          // console.log('FAMILY_LIST' + JSON.stringify(res?.data?.response));
        });
      axios
        .post('https://api.ehospi.in/user/doctorprofile', {
          drid: drId,
        })
        .then(res => {
          setDrProfile(res?.data?.data[0]);
          console.log('Profile data', res?.data.data[0].department_name);
        })
        .catch(error => {
          console.log('Error doctor profile=' + JSON.stringify(error));
        });
    });
    // console.log('calling>>>> UUUUUUU');
    // AsyncStorage.getItem('addfamily123').then(res => {
    //    setFamily(JSON.parse(res));
    //  details=JSON.parse(res)
    // console.log("familydatadetails>>>>",details);
    // console.log("familydatajson>>>>",JSON.parse(res));
    //
    //})

    // console.log('calling>>>>');
    //famliyDataCall();
  }, []);

  const deleteBookingAppoinment = delid => {
    console.log('id>>>><<<', delList);
    axios
      .post(baseurl + 'user/family-delete', {
        id: delid,
      })
      .then(res => {
        console.log('delete sucessfully', res?.data);
        famliyDataCall();
        //Alert.alert(res?.data?.message)
      });
  };

  const ConfrimAppoinment = () => {
    console.log('data>>>>' + date, time);
    axios
      .post('https://api.ehospi.in//user/confirmappointment', {
        drId: drId,
        user_id: user_id,
        booking_date: date,
        booking_time: time,
        hospital_id: HospitalID,
        family: [detailsSelected],
      })
      .then(res => {
        // Alert.alert(res?.data?.message)
        console.log('status>,<', res?.data?.message);
        getBookinDetails();
        setBokingId(res?.data?.bookingId);
        setdetailsSelected(res?.data?.responseData);
        console.log('ret family>,<', res?.data?.responseData);
        //Alert.alert("show confirm dialog");
        showConfrimDialog();
        // navigation.navigate("Active", {
        // })
      })
      .catch(err => {
        // Alert.alert(err);
        console.log('Error.....>>>>>>>>>>', err);
      });
  };
  // console.log('bjkbvkjvkjk', detailsSelected);
  const famliyDataCall = () => {
    axios
      .post('https://api.ehospi.in/user/family-list', {
        user_id: user_id,
      })
      .then(res => {
        //details=res?.data?.response
        setFamily(res?.data?.response);
        console.log('LLLLLLLLLL>>>>>', res?.data);
        console.log('FAMILY_LIST' + JSON.stringify(res?.data?.response));
      });
  };
  const doneData = () => {
    // AsyncStorage.setItem('addfamily123', JSON.stringify([]));
    setConfVisible(false);
    navigation.navigate('BookingHistory');
  };

  const checkValidation = () => {
    if (name == '') {
      ToastAndroid.show('Please Enter Name', ToastAndroid.SHORT);
      //Alert.alert("please enter name");
      return;
    }

    if (age == '') {
      ToastAndroid.show('Please Enter Age', ToastAndroid.SHORT);
      //Alert.alert("please enter age");
      return;
    }

    // if (gender == '') {
    //     //Alert.alert("please enter gender");
    //     ToastAndroid.show("Please Enter Gender", ToastAndroid.SHORT);
    //     return;
    // }

    // if (relation == '') {
    //     ToastAndroid.show("Please Enter Relation", ToastAndroid.SHORT);
    //     // Alert.alert("please enter relation");
    //     return;
    // }

    addDetails();
  };

  const addDetails = () => {
    //"", "{ name: 'shubham', age: '25', gender: 'M' }"
    //
    //Alert.alert(JSON.stringify(details));

    // checkValidation();

    /*
        AsyncStorage.getItem('addfamily123').then(res => {
            console.log("Name", name);
            console.log("Age", age);
            console.log("Gender", gender);
            console.log("relative", relation);
            console.log("Response", res);
            newdata = [];
            if (JSON.parse(res) != null) {
                newdata = JSON.parse(res);
            }

            newdata.push({ name: name, age: age, gender: gender, relation: relation });
            setFamily(newdata);
            //details=JSON.parse(res)
            AsyncStorage.setItem("addfamily123", JSON.stringify(newdata));
            console.log("familydatadetails>>>>", newdata);
            //console.log("familydatajson>>>>",JSON.parse(res));
            //
        })
        // familyData(details);
        */
    axios
      .post('https://api.ehospi.in/user/family-create', {
        user_id: user_id,
        name: name,
        age: age,
        gender: gender,
        relation: relation,
      })
      .then(res => {
        famliyDataCall();
        //console.log("FAMILY_LIST"+JSON.stringify(res));
      });

    setConfVisible(false);

    setVisible(false);
  };

  const selectFamilyListItem = item => {
    ///////////
    //Alert.alert(JSON.stringify(item));
    setSelectedRow(item?.id);
    //Alert.alert(item?.name);
    setName(item?.name);
    setAge(item?.age);
    setGender(item?.gender);
    setRelation(item?.relation);
    //"id": "636e6e5e47ef606531e68f26", "name": "GEndertest", "relation": "uncle", "user_id": "706839393130303335333733"
    setdetailsSelected({
      name: item?.name,
      age: item?.age,
      gender: item?.gender,
      relation: item?.relation,
      id: item?.id,
      user_id: item?.user_id,
    });

    console.log('name>>>>>>>>>>>.' + item?.name);
    //setBgcolor('#f5f5f5');
    console.log('I m touched;;;' + selectedRow);
    setDelList(item);
    console.log('list id' + item + '===' + selectedRow);
  };

  const showDialog = () => {
    navigation.navigate('AddFamilyMember', {
      add: true,
    });
    // setName('');
    // setAge('');
    // setGender('');
    // setRelation('');
    // setVisible(true);
  };

  const showConfrimDialog = () => {
    setConfVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
  const selectedData = item => {
    //const item = id;
    // Alert.alert("ABC");
    // console.log('Selected data >>>', item?.item);
    //var index=0;
    const fullyear = new Date().getFullYear();
    const age = fullyear - Number(item?.item?.age.split('/')[2]);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width * 0.9,
          alignSelf: 'center',
          marginVertical: '5%',
        }}>
        <View style={{width: width * 0.3}}>
          <Image
            source={{
              uri: item?.item?.image,
            }}
            defaultSource={{
              uri: 'https://www.namg.net/wp-content/uploads/2017/09/doctor-icon.png',
            }}
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
            {item?.item?.name}
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: '300',
              fontSize: 14,
            }}>
            {item?.item?.relation}
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
              {item?.item?.gender}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const getBookinDetails = async () => {
    const token = await AsyncStorage.getItem('tokenId');

    const userid = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: userid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/findBookings', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('result', userid);
        const p = result.length - 1;
        console.log('sdfghj', result[p]);
        console.log(result[p].booking_id);
        setbookingdetaildata(result[p]);
      })
      .catch(error => console.log('error', error));
    // axios
    //   .get(baseurl + 'user/findBookings/', {
    //     headers: {Authorization: `Bearer ${token}`},
    //   })
    //   .then(response => {
    //     const p = response.data.length - 1;
    //     console.log('sdfghj', response.data[p]);
    //     console.log(response.data[p].bookingId);
    //     setjkhjkdhsjks(response.data[p]);
    //   });
  };
  ////////End model data////
  const familyData = item => {
    //const item = id;
    console.log('<<<SSSS', item?.item);
    //var index=0;
    const fullyear = new Date().getFullYear();
    const age = fullyear - Number(item?.item?.age.split('-')[2]);
    return (
      <View
        style={{
          width: width * 0.9,
          borderColor: 'grey',
          alignSelf: 'center',
          backgroundColor: item?.item?.id === selectedRow ? '#0BBF64' : '#fff',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            selectFamilyListItem(item?.item);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            width: width * 0.9,
            alignSelf: 'center',
            marginVertical: '5%',
            // backgroundColor: item?.item?.id === selectedRow ? '#0BBF64' : '#fff',
          }}>
          <View
            style={{
              width: width * 0.7,

              marginLeft: '4%',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
                fontSize: 16,
              }}>
              {item?.item?.name}
            </Text>
            <Text
              style={{
                color: '#000',
                fontWeight: '300',
                fontSize: 14,
              }}>
              {item?.item?.relation}
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
                {item?.item?.gender}
              </Text>
            </View>
          </View>

          {/* {item?.item?.relation == 'self' ? null : (
            <TouchableOpacity
              onPress={() => deleteBookingAppoinment(item?.item?.id)}
              style={{marginLeft: '5%'}}>
              <Image
                source={require('../../Assets/Images/delete.png')}
                style={{
                  height: 25,

                  width: 25,
                }}
              />
            </TouchableOpacity>
          )} */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonHeader Title={'Consultation Details'} />

      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          {/* <Text style={{ fontSize: 20, fontWeight: "700", marginLeft: 20, color: "#000" }}>Consultaion Details</Text> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.9,
              alignSelf: 'center',
              marginVertical: '5%',
            }}>
            <View style={{width: width * 0.3}}>
              <Image
                source={{
                  uri: drProfile?.image,
                }}
                style={{
                  width: width * 0.25,
                  height: width * 0.25,
                  borderRadius: (width * 0.25) / 2,
                  backgroundColor: '#d6d6d6',
                }}
              />
            </View>

            <View style={{width: width * 0.55}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {drProfile?.doctor_name}
              </Text>
              <Text
                style={{
                  color: '#999a9c',
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                {drProfile?.speciality}
              </Text>
              <Text
                style={{
                  color: '#999a9c',
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                {drProfile?.year_of_experience} year experiance
              </Text>
              <Text
                style={{
                  color: '#999a9c',
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                {drProfile != undefined
                  ? drProfile?.hospitalDetail[0].hospitalName
                  : null}
              </Text>
              <Text
                style={{
                  color: '#2580D3',
                  fontWeight: '400',
                  fontSize: 14,
                }}>
                ₹ {drProfile?.fee}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: '#d6d6d6',
              marginTop: 10,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/calender.png')}
                style={{
                  height: 20,
                  margin: 0,
                  borderWidth: 0,
                  width: 20,
                  marginBottom: 0,
                  padding: 0,
                }}
              />
              <Text style={{textAlign: 'center', marginLeft: width * 0.02}}>
                {date != undefined && ChangeDateMode(date)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/Images/watch.png')}
                style={{
                  height: 20,
                  margin: 0,
                  borderWidth: 0,
                  width: 20,
                  marginBottom: 0,
                  padding: 0,
                }}
              />
              <Text style={{textAlign: 'center', marginLeft: width * 0.02}}>
                {time}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: '#000',
              marginLeft: '10%',
              marginTop: '5%',
            }}>
            Appoinment For ?
          </Text>

          <FlatList
            data={details}
            renderItem={familyData}
            keyExtractor={itemdata => itemdata}

            //extraData={familyData}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: width * 0.6,
              marginLeft: '10%',
              marginTop: 20,
            }}>
            <AntDesign name="plus" size={30} color="#2580D3" />

            <TouchableOpacity
              onPress={() => {
                // showDialog()
                navigation.navigate('AddFamilyMember', {
                  add: true,
                });
              }}
              style={{marginLeft: '5%'}}>
              <Text
                style={{
                  color: '#2580D3',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Add Family Member
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: height * 0.06,
                width: width * 0.9,
                alignSelf: 'center',
                justifyContent: 'center',
                marginVertical: 20,
                backgroundColor: '#7083DE',
              }}
              onPress={() => {
                if (name != '' && age != '') {
                  Alert.alert(
                    'Are you sure you want to book this doctor appointment?',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => ConfrimAppoinment()},
                    ],
                  );
                } else {
                  alert('Select patient');
                }

                //
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                CONFIRM
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            transparent
            visible={visible}
            style={{backgroundColor: '#000', justifyContent: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: '#000',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: wp('94%'),
                  height: hp('90%'),
                  paddingLeft: wp('1%'),
                  paddingRight: wp('1%'),
                  paddingTop: hp('5%'),
                  paddingBottom: hp('5%'),
                  backgroundColor: '#f7f7f7',
                  borderTopLeftRadius: hp('2%'),
                  borderTopRightRadius: hp('2%'),
                }}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginRight: 20,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
                <Text style={styles.header}>Enter Details</Text>

                {/* <Text style={styles.textbox}>Enter Name</Text> */}

                <View
                  style={{
                    borderWidth: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    borderRadius: 15,
                  }}>
                  <TextInput
                    style={{
                      marginLeft: 10,
                      width: '100%',
                      outline: 'none',
                      marginRight: 10,
                    }}
                    value={name}
                    onChangeText={name => setName(name)}
                    placeholder="Enter name*"
                  />
                </View>
                {/* <View style={{ borderWidth: 1, marginLeft: 20, marginRight: 20, borderRadius: 15, marginTop: 10, marginBottom: 0 }}>
                                <TextInput
                                    style={{ marginLeft: 10, width: '100%', outline: 'none', marginRight: 10, }}
                                    value={age}
                                    onChangeText={(age)=>setAge(age)}
                                    placeholder="Enter Age*"
                                />
                            </View> */}

                <View style={{marginLeft: 20, width: '100%'}}>
                  <DatePicker
                    style={styles.inputTxt3}
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
                  <Picker
                    style={styles.inputTxt4}
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
                    <Picker.Item
                      label="Male"
                      value="Male"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Female"
                      value="Female"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Other"
                      value="Other"
                      style={{fontSize: hp('1.8%')}}
                    />
                  </Picker>

                  <Picker
                    style={styles.inputTxt4}
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
                    <Picker.Item
                      label="Father"
                      value="Father"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Mother"
                      value="Mother"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Brother"
                      value="brother"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Sister"
                      value="sister"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Son"
                      value="son"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Uncle"
                      value="uncle"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Aunty"
                      value="aunty"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Husband"
                      value="Husband"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Wife"
                      value="Wife"
                      style={{fontSize: hp('1.8%')}}
                    />
                    <Picker.Item
                      label="Other"
                      value="other"
                      style={{fontSize: hp('1.8%')}}
                    />
                  </Picker>
                </View>

                <View style={{marginTop: 20}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={checkValidation}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      Add Member
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* // Confrim modal */}

          <Modal
            animationType="slide"
            visible={confVisibale}
            transparent={true}
            // onRequestClose={() => setConfVisible(false)}
          >
            <TouchableOpacity
              // onPressOut={() => setConfVisible(false)}
              style={{
                width: '100%',
                // flex: 1,
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}>
              <TouchableWithoutFeedback>
                <View style={{position: 'absolute'}}>
                  <View
                    style={{
                      width: width * 0.9,
                      height: height * 0.6,
                      backgroundColor: '#ffffff',
                      borderRadius: 10,
                      justifyContent: 'space-between',
                      paddingVertical: '20%',
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <AntDesign name="checkcircle" size={50} color="#37C837" />
                      <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          fontSize: 20,
                          fontWeight: '600',
                          marginTop: '10%',
                        }}>
                        Thank You!
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          textAlign: 'center',
                          fontSize: 14,
                          fontWeight: '600',
                          marginVertical: 8,
                          marginHorizontal: 20,
                        }}>
                        Thakns You! You've successfully booked your appointment
                        with Dr. {drProfile?.doctor_name} for {date} at {time}{' '}
                        with booking id {bookingdetaildata.booking_id} . We hope
                        our app made the process quick and easy for you"
                      </Text>
                    </View>

                    <View
                      style={{
                        width: width * 0.74,
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 14,
                          marginBottom: 5,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        Booking ID:{bookingdetaildata.booking_id}
                      </Text>
                      {/* <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        marginBottom: 5,
                      }}>
                      You booked a bed in {drProfile?.doctor_name} Hospital on
                    </Text> */}

                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          marginBottom: 5,
                        }}>
                        Booking Date:{' '}
                        {bookingdetaildata.length > 0 &&
                          ChangeDateMode(bookingdetaildata.booking_date)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          marginBottom: 5,
                        }}>
                        Booking Time: {bookingdetaildata.booking_time}
                      </Text>
                      <TouchableOpacity
                        onPress={doneData}
                        style={{
                          height: 40,
                          width: width * 0.4,
                          backgroundColor: '#7083DE',
                          borderRadius: 10,
                          marginTop: '10%',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            padding: '6%',
                            color: '#FFFFFF',
                          }}>
                          OK
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsultaionDetails;

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },
  textbox: {
    marginLeft: 20,
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    paddingBottom: 20,
  },
  header: {
    marginLeft: 20,
    color: '#7083DE',
    fontWeight: '700',
    fontSize: 22,
    paddingBottom: 40,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#7083DE',
    marginLeft: 20,
    marginRight: 20,
  },
  dob: {
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt1: {
    width: wp('42%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    // marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt2: {
    width: wp('42%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt3: {
    width: wp('80%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt4: {
    width: wp('80%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: hp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  alphabetContainer: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: '#ffffff',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  alphabetContainerSelected: {
    flexDirection: 'row',
    marginTop: 0,
    backgroundColor: '#d5d5d5',
    backgroundColor: '#0BBF64',
    justifyContent: 'space-between',
  },
});
