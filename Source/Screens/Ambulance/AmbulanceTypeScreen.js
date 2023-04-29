import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import ButtonConfirm from '../../ReusableComponent/ButtonConfirm';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import DatePicker from '../../ReusableComponent/DatePicker';
import {ChangeDateMode} from '../../Config/helper';
const {width, height} = Dimensions.get('window');
const AmbulanceTypeScreen = ({navigation, route}) => {
  const [data, setdata] = useState([]);
  const [nameAmbulance, setnameAmbulance] = useState();
  const [selected, setselected] = useState(null);
  const [selectedadditional, setselectedadditional] = useState([]);
  const [additionaldata, setadditionaldata] = useState([]);
  const [Visible, setVisible] = useState(false);
  const [totalprice, settotalprice] = useState();
  const [totalprice_2, settotalprice_2] = useState();
  const [finalBookmodal, setfinalBookmodal] = useState(false);
  const [Bookmodal, setBookmodal] = useState(false);
  const [patientsdata, setpatientsdata] = useState();
  const [hospital_id, sethospital_id] = useState();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ambulance Type',
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setpatientsdata(route.params.selectedpatientdata);
      handleAmbulanceType(route.params.id);
      setnameAmbulance(route.params.name);
      // GetfamilyHandler();
      console.log(
        'route.params.selectedpatientdata',
        route.params.selectedpatientdata,
      );
    }, []),
  );
  const handleAmbulanceType = async id => {
    const token = await AsyncStorage.getItem('tokenId');
    console.log(`Basic ${token}`);
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      ambulance_id: id,
      currentlat: route.params.currentlat,
      currentlng: route.params.currentlng,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/ambulance/mobileApplication/getAmbulanceByType',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
           console.log('-------------------------------------');

        console.log(result.data);
       console.log('-------------------------------------');

        setdata(result.data);
        if (result.data.length == 1) {
          setselected(result.data[0]),
            handlegetCalculation(result.data[0].ambulance_id);
        }
      })
      .catch(error => console.log('error', error));
  };
  const handlegetAdditionalById = async id => {
    setadditionaldata();
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({ambulanceAdditionalId: id});
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/ambulance/mobileApplication/getAdditionalById',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.data);
        console.log(raw);

        // if (result.data.ambulance_additional_list.length > 0) {
        setadditionaldata(result.data);
        setVisible(true);
        // }
      })
      .catch(error => console.log('error', error));
  };
  const handlegetCalculation = async id => {
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      source: route.params.source,
      destination: route.params.destination,
      ambulancetype_id: id,
      source_lat: route.params.currentlat,
      source_long: route.params.currentlng,
      destination_lat: route.params.desclat,
      destination_long: route.params.desclng,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);

    fetch(
      'https://api.ehospi.in/ambulance/mobileApplication/calculation',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('result', result);
        settotalprice(result.totalPrice);
        // }
      })
      .catch(error => console.log('error', error));
  };
  const handlegetFinalAmount = async () => {
    const finalAmount =
      selectedadditional.length > 0 &&
      selectedadditional.reduce(
        (previousScore, currentScore, index) =>
          previousScore + currentScore.additional_medical_equipments_price,
        0,
      );

    console.log(finalAmount);
    const token = await AsyncStorage.getItem('tokenId');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      source: route.params.source,
      destination: route.params.destination,
      // ambulanceAddition_id: selected._id,
      ambulancetype_id: selected.ambulance_id,
      source_lat: route.params.currentlat,
      source_long: route.params.currentlng,
      destination_lat: route.params.desclat,
      destination_long: route.params.desclng,
      additionalAmount: finalAmount == false ? 0 : finalAmount,
      additionalList: selectedadditional,
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/ambulance/mobileApplication/finalAmount',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('Data Fetched Su', result);
        if (result.message === 'Data Fetched Successfully') {
          setBookmodal(true);
          settotalprice_2(result.totalPrice);
          sethospital_id(result.hospitalDetail._id);
        }

        // }
      })
      .catch(error => console.log('error', error));
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
        const PatientDeatil = result.response.find(item => {
          return item.relation === 'self';
        });
        setpatientsdata(PatientDeatil);
      })
      .catch(error => console.log('error', error));
  };
  const today = new Date();
  var GettodayDate =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var GettodayTime = today.getHours() + 1 + ':' + today.getMinutes();

  const handlegetFinalBooking = async (selectedDate, selectedTime) => {
    const token = await AsyncStorage.getItem('tokenId');
    const id = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: id,
      patient_details: [
        {
          hospital_id: selected.hospital_id,
          // ambulance_additional_id: selected._id,
          patient_name: patientsdata.name,
          patient_age: patientsdata.age,
          patient_gender: patientsdata.gender,
          patient_relation: patientsdata.relation,
          bookingDate: selectedDate,
          bookingTime: selectedTime,
          ambulanceother: [
            {
              source: route.params.source,
              destination: route.params.destination,
              ambulancetype_id: selected.ambulance_id,
              source_lat: route.params.currentlat,
              source_long: route.params.currentlng,
              destination_lat: route.params.desclat,
              destination_long: route.params.desclng,
              additionalAmount: totalprice_2,
              additionalList: selectedadditional,
              // ambulance_additional_id: selected._id,
            },
          ],
        },
      ],
    });
    console.log(patientsdata, raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/ambulance/mobileApplication/booking',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.message === 'Booking Created Successfully.') {
          setfinalBookmodal(true);
          setBookmodal(false);
          settotalprice_2(result.totalPrice);
        }

        // }
      })
      .catch(error => console.log('error', error));
  };

  const FindAdditional = name => {
    const Check = selectedadditional.find(item => {
      return item.additional_medical_equipments === name;
    });

    return Check === undefined ? '#fff' : '#2580D329';
  };
  const [date, setDate] = useState(new Date());
  const [dateMoadl, setDateMoadl] = useState(false);
  const [payMoadl, setpayMoadl] = useState(false);
  const [dateShow, setdateShow] = useState();
  const [timeShow, settimeShow] = useState();
  const [show, setShow] = useState(false);
  const [Mode, setMode] = useState('date');
  const GetDate = (event, selecteddate) => {
    const currentdate = selecteddate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentdate);
    var today = new Date(currentdate);
    var GettodayDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    var GettodayTime = today.getHours() + ':' + today.getMinutes();
    settimeShow(GettodayTime);
    setdateShow(GettodayDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setselected(item), handlegetCalculation(item.ambulance_id);
              }}
              style={{
                paddingHorizontal: '2%',
                paddingVertical: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor:
                  selected != undefined && selected._id === item._id
                    ? '#DCEBF8'
                    : '#fff',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.25,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: 70,
                      // backgroundColor:
                      //   selected != undefined && selected._id == item._id
                      //     ? '#fff'
                      //     : 'pink',
                      borderRadius: 70,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        resizeMode: 'contain',
                      }}
                      source={require('../../Assets/Images/ambulanceicon.png')}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#3F3D3D',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {nameAmbulance}
                  </Text>
                </View>
                <View style={{flex: 0.8}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#010204',
                        fontSize: 20,
                        fontWeight: 'bold',
                        width: '60%',
                      }}>
                      {item.vehicle_owner_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        handlegetAdditionalById(item._id);
                      }}
                      style={{
                        width: width * 0.25,
                        paddingVertical: '2%',
                        backgroundColor: '#7083DE',
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#fff', fontSize: 12}}>
                        Add Additional
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '2%',
                    }}>
                    <Text style={{color: '#6A6F77', fontSize: 18}}>
                      Min charges
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      {item.ambulance_minprice}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: '1%',
                    }}>
                    <Text style={{color: '#6A6F77', fontSize: 18}}>
                      Per Km charges
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 20,
                        fontWeight: '600',
                      }}>
                      {item.ambulance_per_km_price}
                    </Text>
                  </View>
                  {selected != undefined &&
                    selected._id === item._id &&
                    totalprice && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: '#6A6F77', fontSize: 18}}>
                          Total charges
                        </Text>
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 20,
                            fontWeight: '600',
                          }}>
                          {totalprice}
                        </Text>
                      </View>
                    )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Modal
        animationType="slide"
        visible={Visible}
        transparent={true}
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          onPressOut={() => setVisible(false)}
          style={{
            width: '100%',
            // flex: 1,
            height: height,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <TouchableWithoutFeedback>
            <View style={{position: 'absolute'}}>
              <View
                style={{
                  flex: 1,
                  width: width,
                  height: height,
                  paddingTop: Platform.OS === 'ios' ? 50 : 0,
                  backgroundColor: '#ffffff',
                  paddingBottom: '10%',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => setVisible(false)}>
                      <EvilIcons name="chevron-left" size={40} color="#000" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#000',
                      }}>
                      Pick-up
                    </Text>
                  </View>
                  <Text style={{margin: '4%', color: '#010204'}}>
                    Additional Medical Equipments/Services
                  </Text>
                  <FlatList
                    data={additionaldata}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              FindAdditional(
                                item.additional_medical_equipments,
                              ) === '#fff'
                            ) {
                              setselectedadditional(current => [
                                ...current,
                                item,
                              ]);
                            } else {
                              const Check = selectedadditional.filter(
                                itemFilter => {
                                  return (
                                    itemFilter.additional_medical_equipments !==
                                    item.additional_medical_equipments
                                  );
                                },
                              );
                              setselectedadditional(Check);
                            }
                          }}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: FindAdditional(
                              item.additional_medical_equipments,
                            ),
                            height: 40,
                            width: width * 0.9,
                            paddingHorizontal: '3%',
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {FindAdditional(
                              item.additional_medical_equipments,
                            ) !== '#fff' ? (
                              <AntDesign
                                name="checksquare"
                                size={30}
                                color="#2580D3"
                              />
                            ) : (
                              <View
                                style={{
                                  width: 26,
                                  height: 25,
                                  backgroundColor: '#979797',
                                  borderRadius: 2,
                                  marginLeft: '1%',
                                }}
                              />
                            )}
                            <Text style={{marginLeft: '10%', color: '#000'}}>
                              {item.additional_medical_equipments}
                            </Text>
                          </View>

                          <Text style={{color: '#000'}}>
                            {item.additional_medical_equipments_price}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      width: width * 0.9,
                      alignSelf: 'center',
                      justifyContent: 'space-between',
                      // position: 'absolute',
                      // bottom: '0%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(false), setselectedadditional([]);
                      }}
                      style={{
                        height: 40,
                        width: '48%',

                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#7083DE',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: '6%',
                          color: '#7083DE',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(false);
                      }}
                      style={{
                        height: 40,
                        width: '48%',
                        backgroundColor: '#7083DE',
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: '6%',
                          color: '#fff',
                        }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        visible={finalBookmodal}
        transparent={true}
        // onRequestClose={() => setfinalBookmodal(false)}
      >
        <TouchableOpacity
          // onPressOut={() => setfinalBookmodal(false)}
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
                  justifyContent: 'space-evenly',
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
                    Trip Booked!
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
                      color: '#2580D3',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    Hi {patientsdata != undefined ? patientsdata.name : null}{' '}
                    your trip is booked!
                  </Text>

                  <Text
                    style={{
                      color: '#2580D3',
                      textAlign: 'center',
                      fontSize: 16,
                      marginVertical: '5%',
                    }}>
                    Someone from Our team will call you shortly to confirm
                  </Text>
                  <Text
                    style={{
                      color: '#2580D3',
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    For any other booking related query,please contact to our
                    call center
                  </Text>
                  {/* <Text
                    style={{
                      color: '#2580D3',
                      textAlign: 'center',
                      fontWeight: '800',
                      textDecorationLine: 'underline',
                      marginVertical: '5%',
                    }}>
                    18002664242
                  </Text> */}
                  <TouchableOpacity
                    onPress={() => {
                      setfinalBookmodal(false);

                      navigation.navigate('BookingHistory');
                    }}
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
      <Modal
        animationType="slide"
        visible={dateMoadl}
        transparent={true}
        onRequestClose={() => setDateMoadl(false)}>
        <TouchableOpacity
          onPressOut={() => setDateMoadl(false)}
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
                  height: height * 0.3,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  justifyContent: 'center',
                  paddingVertical: '20%',
                }}>
                <View
                  style={{
                    // flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: '5%',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingLeft: '3%',
                      borderWidth: 1,
                      height: height * 0.06,
                      borderRadius: 10,
                      borderColor: '#9E9E9E',
                    }}>
                    {dateShow == null ? (
                      <Text
                        style={{
                          color: '#AFAFAF',
                          fontFamily: 'Poppins',
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        {ChangeDateMode(GettodayDate)}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Poppins',
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        {ChangeDateMode(dateShow)}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        showMode('date');
                      }}
                      style={{position: 'absolute', right: '2%'}}>
                      <AntDesign name="calendar" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingLeft: '3%',
                      borderWidth: 1,
                      height: height * 0.06,
                      borderRadius: 10,
                      borderColor: '#9E9E9E',
                      marginTop: '5%',
                    }}>
                    {dateShow == undefined ? (
                      <Text
                        style={{
                          color: '#AFAFAF',
                          fontFamily: 'Poppins',
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        {GettodayTime}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#000',
                          fontFamily: 'Poppins',
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        {timeShow}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        showMode('time');
                      }}
                      style={{position: 'absolute', right: '2%'}}>
                      <Ionicons name="time-outline" size={22} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: '5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setDateMoadl(false);
                      setdateShow();
                      settimeShow();
                    }}
                    style={{
                      height: 40,
                      width: '48%',
                      borderColor: '#7083DE',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: '6%',
                        color: '#7083DE',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDateMoadl(false);
                      handlegetFinalBooking(dateShow, timeShow);
                    }}
                    style={{
                      height: 40,
                      width: '48%',
                      backgroundColor: '#7083DE',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: '6%',
                        color: '#FFFFFF',
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        visible={Bookmodal}
        transparent={true}
        onRequestClose={() => setBookmodal(false)}>
        <TouchableOpacity
          onPressOut={() => setBookmodal(false)}
          style={{
            width: '100%',
            // flex: 1,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}>
          <TouchableWithoutFeedback>
            <View style={{position: 'absolute', bottom: 0}}>
              <View
                style={{
                  width: width,
                  maxHeight: height * 0.4,
                  backgroundColor: '#ffffff',
                  borderTopLeftRadius: width * 0.05,
                  borderTopRightRadius: width * 0.05,

                  paddingBottom: '20%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setBookmodal(false),
                      setDateMoadl(false),
                      setdateShow(),
                      settimeShow();
                  }}
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: '3%',
                    marginTop: '2%',
                  }}>
                  <AntDesign name="close" size={20} color="#000" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: '5%',
                    marginTop: '5%',
                    fontSize: 20,
                    fontWeight: '600',
                  }}>
                  Estimated Cost
                </Text>
                <Text
                  style={{
                    color: '#000',
                    marginLeft: '5%',
                    marginTop: '5%',
                    fontSize: 30,
                    fontWeight: '500',
                  }}>
                  ₹ {totalprice_2}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: '5%',
                  }}>
                  <TouchableOpacity
                    //disabled={selected.enableDisable === '0'}

                    onPress={() => {
                      setDateMoadl(true);
                    }}
                    style={{
                      height: 40,
                      width: '48%',
                      // borderColor:  selected.enableDisable === '0' ? '#C5C5C5' : '#7083DE',
                      borderColor: '#7083DE',

                      borderWidth: 1,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: '6%',
                        color: '#7083DE',
                      }}>
                      Book for later
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                   // disabled={selected.enableDisable === '0'}
                    onPress={() => {
                      handlegetFinalBooking(GettodayDate, GettodayTime);
                    }}
                    style={{
                      height: 40,
                      width: '48%',
                      // backgroundColor:  selected.enableDisable === '0' ? '#C5C5C5' : '#7083DE',
                       backgroundColor: '#7083DE' ,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        padding: '6%',
                        color: '#FFFFFF',
                      }}>
                      Book for now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <ButtonConfirm
        Title={'Confirm'}
        Press={() => {
          if (selected != undefined) {
            console.log(selected)
            // handlegetFinalAmount();
          } else {
            alert('Select ambulance');
          }
        }}
      />
      {show && (
        <>
          {Platform.OS === 'ios' ? (
            <DatePicker
              // Date={date}
              Mode={Mode}
              Visible={show}
              minimumDate={new Date()}
              Close={() => setShow(false)}
              onChange={text => setdateShow(text)}
            />
          ) : (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={Mode}
              minimumDate={new Date()}
              display={'default'}
              onChange={GetDate}
            />
          )}
        </>
      )}
    </View>
  );
};

export default AmbulanceTypeScreen;

const styles = StyleSheet.create({});
