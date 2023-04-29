import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  BackHandler,
  StatusBar,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import baseurl from '../../Config/baseurl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RangeSlider from 'rn-range-slider';
import Label from './slider/Label';
import Rail from './slider/Rail';
import RailSelected from './slider/RailSelected';
import Notch from './slider/Notch';
import Thumb from './slider/Thumb';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
const {width, height} = Dimensions.get('window');
import AcitvityLoading from '../../ReusableComponent/AcitvityLoading';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import DoctorContainer from '../../ReusableComponent/DoctorContainer';
const ListDoctar = ({navigation, route}) => {
  const [doctorList, setDoctorList] = useState([]);
  const [getTokenId, setTokenId] = useState();
  const [modalshow, setmodalshow] = useState(false);
  const [search, setSearch] = useState('');

  const [doctorListmain, setDoctorListmain] = useState([]);

  const [departmenttype, setdepartmenttype] = useState('');
  const [srcByDoctorName, setsrcByDoctorName] = useState('');
  const [gender, setgender] = useState('');
  const [experiance, setexperiance] = useState('');
  const [fees, setfees] = useState('');
  const [avilability, setavilability] = useState('');
  const [rating, setrating] = useState('');

  const [isloading, setisloading] = useState(false);
  const [filterloading, setfilterloading] = useState(false);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(50);
  const [lowfees, setLowfees] = useState(100);
  const [highfees, setHighfees] = useState(500000);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
    setfilterloading(!filterloading);

    // ExperienceFilterHandler(low, high);
  }, []);
  const handleValueChangefees = useCallback((low, high) => {
    setLowfees(low);
    setHighfees(high);
  }, []);

  useEffect(() => {
    if (departmenttype != '') {
      Handlerdata();
    }
  }, [departmenttype]);

  useEffect(() => {
    //  console.log(55555, route.params?.item);
    if (route.params.type == 'Department') {
      console.log(route.params.data);

      setdepartmenttype(route.params.data);
    } else {
      Handlerdata();
    }
  }, []);
  const Handlerdata = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', 'Bearer ' + token);
    var raw = JSON.stringify({
      srcByDepartment: departmenttype,
      srcByDoctorName: srcByDoctorName,
      gender: gender,
      experiance: `${low}-${high}`,
      consultationFee: `${lowfees}-${highfees}`,
      availability: avilability,
      rating: rating,
    });
    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/searchDoctorList', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setDoctorList(result.data);
        setDoctorListmain(result.data);
        console.log('setDoctorList', result.data);
        // console.log('data>>>>>', token);
      })
      .catch(error => console.log('error', error));
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = doctorListmain.filter(function (item) {
        const itemData = item.doctor_name
          ? item.doctor_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDoctorList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setDoctorList(doctorListmain);
      setSearch(text);
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Pediatrican',
    });
  }, [navigation]);
  const DayName = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  console.log('doctorList', doctorList);
  return isloading == true ? (
    <AcitvityLoading />
  ) : (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
          <BackButtonHeader Title={'Doctor'} />

          <View style={{flex: 1, marginTop: 10, paddingHorizontal: '5%'}}>
            <Searchbar
              style={{
                width: '100%',
                alignSelf: 'center',
                borderRadius: 30,
              }}
              placeholder="Search"
              onChangeText={text => searchFilterFunction(text)}
              value={search}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: '4%',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                // onPress={() => navigation.navigate('Filter')}
                onPress={() => setmodalshow(true)}>
                <Ionicons name="options" size={25} color="#000" />

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#000',
                    marginLeft: 5,
                  }}>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>
            {doctorList.length > 0 ? (
              <FlatList
                data={doctorList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
                    <DoctorContainer
                      DrId={item._id}
                      image={item.image}
                      degree={item.degree}
                      department_name={item.department_name}
                      drName={item.doctor_name}
                      specalist={item.speciality}
                      experiance={item.year_of_experience}
                      hospital_name={item.hospitalDetail[0].hospitalName}
                      fee={item.fee}
                      total_review={item.total_review}
                      total_star={item.total_star}
                      // Button={true}
                      enableDisable={item.enableDisable}
                    />
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'grey'}}>Data Not found</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
      {modalshow == true ? (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              // top: height * 0.25
            }}>
            <View
              style={{
                width: width,
                height: height,
                paddingTop: StatusBar.currentHeight + 50,
                // borderTopLeftRadius: width * 0.1,
                // borderTopRightRadius: width * 0.1,
                backgroundColor: '#ffffff',
                // elevation: 10,
              }}>
              <ScrollView>
                <View style={{width: '100%', height: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: '5%',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#000',
                      }}>
                      Filter
                    </Text>
                    <TouchableOpacity
                      onPress={() => setmodalshow(false)}
                      style={{}}>
                      <AntDesign name="closecircle" size={30} color="#000000" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 20,
                      width: width * 0.9,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Medium',
                        color: '#000',
                      }}>
                      Gender
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',

                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          alignItems: 'center',
                          marginRight: width * 0.06,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            if (gender == 'Female' || gender == '') {
                              setgender('Male');
                            } else {
                              setgender('');
                            }
                          }}>
                          {gender == 'Male' ? (
                            <Fontisto
                              name="checkbox-active"
                              size={24}
                              color="#2580D3"
                            />
                          ) : (
                            <Fontisto
                              name="checkbox-passive"
                              size={24}
                              color="#2580D3"
                            />
                          )}
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 14,
                            fontFamily: 'Roboto-Regular',
                            marginLeft: 15,
                          }}>
                          Male Doctor{' '}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            if (gender == 'Male' || gender == '') {
                              setgender('Female');
                            } else {
                              setgender('');
                            }
                          }}>
                          {gender == 'Female' ? (
                            <Fontisto
                              name="checkbox-active"
                              size={24}
                              color="#2580D3"
                            />
                          ) : (
                            <Fontisto
                              name="checkbox-passive"
                              size={24}
                              color="#2580D3"
                            />
                          )}
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 14,
                            fontFamily: 'Roboto-Regular',
                            marginLeft: 15,
                          }}>
                          Female Doctor
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          color: '#000',
                        }}>
                        Experiance
                      </Text>
                      {/* <Image source={require('../../Assets/Images/filterascending.png')} /> */}
                      <View
                        style={{
                          backgroundColor: '#2580D3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Roboto-Regular',
                            paddingVertical: '4%',
                            paddingHorizontal: '8%',
                            color: '#fff',
                          }}>
                          10 Years
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <RangeSlider
                        style={{marginTop: '5%'}}
                        min={0}
                        max={50}
                        step={1}
                        floatingLabel
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        renderLabel={renderLabel}
                        renderNotch={renderNotch}
                        onValueChanged={handleValueChange}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 15,
                          paddingHorizontal: '2%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#000',
                          }}>
                          {low} years
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#000',
                          }}>
                          {high} years
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          color: '#000',
                        }}>
                        Consultation Fee
                      </Text>
                      <View
                        style={{
                          backgroundColor: '#2580D3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Roboto-Regular',
                            paddingVertical: '4%',
                            paddingHorizontal: '8%',
                            color: '#fff',
                          }}>
                          {highfees - lowfees}
                        </Text>
                      </View>
                    </View>
                    <RangeSlider
                      style={{marginTop: '5%'}}
                      min={100}
                      max={5000}
                      step={1}
                      floatingLabel
                      renderThumb={renderThumb}
                      renderRail={renderRail}
                      renderRailSelected={renderRailSelected}
                      renderLabel={renderLabel}
                      renderNotch={renderNotch}
                      onValueChanged={handleValueChangefees}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 15,
                        paddingHorizontal: '2%',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          color: '#000',
                        }}>
                        {lowfees}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          color: '#000',
                        }}>
                        {highfees}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          color: '#000',
                        }}>
                        Availability
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setavilability(DayName[moment().day() - 1]);
                        }}
                        style={{
                          backgroundColor: '#2580D3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          marginRight: '10%',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Roboto-Regular',
                            paddingVertical: '4%',
                            paddingHorizontal: '8%',
                            color: '#fff',
                          }}>
                          Availability Today
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setavilability(
                            DayName[moment().add(1, 'days').day() - 1],
                          );
                        }}
                        style={{
                          backgroundColor: '#2580D3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Roboto-Regular',
                            paddingVertical: '4%',
                            paddingHorizontal: '8%',
                            color: '#fff',
                          }}>
                          Availability Tomorrow
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          setavilability(
                            DayName[moment().add(7, 'days').day() - 1],
                          );
                        }}
                        style={{
                          backgroundColor: '#2580D3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          marginRight: '10%',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Roboto-Regular',
                            paddingVertical: '4%',
                            paddingHorizontal: '8%',
                            color: '#fff',
                          }}>
                          Availability in next 7 days
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          color: '#000',
                        }}>
                        Rating
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          justifyContent: 'space-between',
                          width: width * 0.55,
                        }}>
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#787878',
                            marginLeft: '5%',
                          }}>
                          & Up
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (rating != '5') {
                            setrating('5');
                          } else {
                            setrating('');
                          }
                        }}>
                        <Fontisto
                          name={
                            rating != '5'
                              ? 'radio-btn-passive'
                              : 'radio-btn-active'
                          }
                          size={24}
                          color="#2580D3"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          justifyContent: 'space-between',
                          width: width * 0.55,
                        }}>
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="staro" size={24} color="#787878" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#787878',
                            marginLeft: '5%',
                          }}>
                          & Up
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (rating != '4') {
                            setrating('4');
                          } else {
                            setrating('');
                          }
                        }}>
                        <Fontisto
                          name={
                            rating != '4'
                              ? 'radio-btn-passive'
                              : 'radio-btn-active'
                          }
                          size={24}
                          color="#2580D3"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          justifyContent: 'space-between',
                          width: width * 0.55,
                        }}>
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="staro" size={24} color="#787878" />
                        <AntDesign name="staro" size={24} color="#787878" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#787878',
                            marginLeft: '5%',
                          }}>
                          & Up
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (rating != '3') {
                            setrating('3');
                          } else {
                            setrating('');
                          }
                        }}>
                        <Fontisto
                          name={
                            rating != '3'
                              ? 'radio-btn-passive'
                              : 'radio-btn-active'
                          }
                          size={24}
                          color="#2580D3"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          justifyContent: 'space-between',
                          width: width * 0.55,
                        }}>
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="star" size={24} color="#DCBB0B" />
                        <AntDesign name="staro" size={24} color="#787878" />
                        <AntDesign name="staro" size={24} color="#787878" />
                        <AntDesign name="staro" size={24} color="#787878" />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#787878',
                            marginLeft: '5%',
                          }}>
                          & Up
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          if (rating != '2') {
                            setrating('2');
                          } else {
                            setrating('');
                          }
                        }}>
                        <Fontisto
                          name={
                            rating != '2'
                              ? 'radio-btn-passive'
                              : 'radio-btn-active'
                          }
                          size={24}
                          color="#2580D3"
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setmodalshow(false), Handlerdata();
                      }}
                      style={{
                        backgroundColor: '#7083DE',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        width: '100%',
                        height: height * 0.06,
                        alignSelf: 'center',
                        marginVertical: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: 'Roboto-Regular',

                          color: '#fff',
                        }}>
                        Apply
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};

export default ListDoctar;

const styles = StyleSheet.create({});
