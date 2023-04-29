import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  BackHandler,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../Config/baseurl';
import {useFocusEffect} from '@react-navigation/native';
import BackButtonHeader from '../ReusableComponent/BackButtonHeader';

const LabTest = ({navigation, route}) => {
  const [data, setdata] = useState([]);
  const [datamostUseful, setdatamostUseful] = useState([]);
  const [databodypart, setdatabodypart] = useState([]);
  const [isLoding, setisLoading] = useState(true);
  const [cartdata, setcartdata] = useState([]);
  const [UseraddressDisplay, setUsersetaddressDisplay] = useState();
  const [currentlat, setcurrentlat] = useState('');
  const [currentlng, setcurrentlng] = useState('');
  // useEffect(() => {
  //   AsyncStorage.getItem('displayAddress').then(res => {
  //     setUsersetaddressDisplay(res);
  //   });
  //   setcurrentlng(route.params.currentlng);
  //   setcurrentlat(route.params.currentlat);
  //   getmostusefulHandler();
  //   viewcartHandler();
  // }, []);
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Lab Test  ',
  //     // headerRight: () => (
  //     //   <TouchableOpacity
  //     //     style={{marginHorizontal: 16}}
  //     //     onPress={() => navigation.navigate('LabtestBook')}>
  //     //     <AntDesign name={'shoppingcart'} size={35} color={'#000000'} />
  //     //   </TouchableOpacity>
  //     // ),
  //   });
  // }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('displayAddress').then(res => {
        setUsersetaddressDisplay(res);
      });
      setcurrentlng(route.params.currentlng);
      setcurrentlat(route.params.currentlat);
      getmostusefulHandler();
      viewcartHandler();
      const backAction = () => {
        console.log('You can not go Back');
        navigation.goBack();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  const packageHandler = async text => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      srcValue: text,
      pageNo: 1,
      pageSize: 20,
      currentlat: currentlat,
      currentlng: currentlng,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);
    fetch(baseurl + 'labtest/getpackage', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status == true) {
          setdata(result.data);
          getmostusefulHandler();
        }
      })
      .catch(error => console.log('error', error));
  };
  const getmostusefulHandler = async text => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      srcValue: '',
      pageNo: 1,
      pageSize: 20,
      currentlat: currentlat,
      currentlng: currentlng,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(baseurl + 'labtest/getpackage', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status == true) {
          setdatamostUseful(result.data);
          getbodyparttestpackageHandler();
        }
      })
      .catch(error => console.log('error', error));
  };
  const getbodyparttestpackageHandler = async text => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      srcValue: '',
      currentlat: currentlat,
      currentlng: currentlng,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);
    fetch(baseurl + 'labtest/getbodyparttestpackage', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status == true) {
          setdatabodypart(result.data);
        }
      })
      .catch(error => console.log('error', error));
  };
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
        console.log('view_result', result);
        if (result.length > 0) {
          setcartdata(result[0].patient_details);
        } else {
          setcartdata([]);
        }
      })
      .catch(error => console.log('error', error));
  };
  const addcartHandler = async item => {
    if (cartdata.length == 0) {
      const id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('tokenId');
      console.log(token);
      var myHeaders = new Headers();
      myHeaders.append('authorization', `Basic ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        appuser_id: id,
        patient_details: [item],
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('https://api.ehospi.in/labtest/lab_addcart', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result', result);
          alert('Added to cart');
          viewcartHandler();
        })
        .catch(error => console.log('error', error));
    } else {
      alert('You can only add one test at one time');
    }
  };
  const ListHeader = () => {
    return (
      <Image
        source={require('../Assets/Images/banner4.jpeg')}
        style={{
          width: width * 0.96,
          height: height * 0.25,
          padding: 10,
          marginTop: 10,
          alignSelf: 'center',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <BackButtonHeader Title={'Lab Test'} />
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
            onChangeText={text => {
              if (text == '') {
                setdata([]);
              } else {
                packageHandler(text);
              }
            }}
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
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              // console.log(item.labDetail[0]);
              return (
                <TouchableOpacity
                  disabled={item.labDetail[0].enableDisable != '1'}
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
                  {item.labDetail[0].img != '' && (
                    <Image
                      source={{uri: item.labDetail[0].img}}
                      style={{
                        width: '60%',
                        height: height * 0.07,
                        marginBottom: '8%',
                        resizeMode: 'stretch',
                      }}
                    />
                  )}
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
                        {item.labOrTestStatus == 'test' ? 'Test' : 'Package'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '80%',
                      // alignSelf: 'center',

                      borderRadius: 30,

                      // paddingHorizontal: width * 0.02,
                    }}>
                    {/* <Text style={{color: '#555555'}}>{UseraddressDisplay}</Text> */}
                    <Text style={{color: '#555555'}}>{item.package_name}</Text>
                    {item.package_test_include.length > 0 &&
                      item.package_test_include.map(ite => {
                        return (
                          <Text style={{color: '#555555', marginTop: 5}}>
                            {ite.includeTest}
                          </Text>
                        );
                      })}
                  </View>
                  <TouchableOpacity
                    disabled={item.labDetail[0].enableDisable != '1'}
                    onPress={
                      () => {
                        addcartHandler(item);
                      }
                      // navigation.navigate('LabScreen', {
                      //   data: item,
                      // })
                    }
                    style={{
                      backgroundColor: '#7083DE',
                      padding: 5,
                      marginTop: 5,
                      borderRadius: 5,
                      justifyContent: 'center',
                      width: '40%',
                      alignSelf: 'flex-end',
                    }}>
                    <Text style={{textAlign: 'center', color: '#fff'}}>
                      Book
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ScrollView>
            <ListHeader />

            {datamostUseful.length > 0 &&
              datamostUseful.map((item, index) => {
                // console.log(item);
                var ddd = {
                  __v: 0,
                  _id: '643d324ed7d33047a7913be9',
                  body_part_test: 1,
                  description: ' dfaf',
                  discount_percentage: '100',
                  homeloc_extra_amt: '250',
                  hospital_id: '642be8452387cf1ac817b3c9',
                  labDetail: [
                    {
                      __v: 0,
                      _id: '642be8452387cf1ac817b3c9',
                      about_us: 'this is a demo hospital',
                      city: 'Delhi',
                      enableDisable: '1',
                      hospitalAddress: 'Delhi',
                      hospitalCode: 'M9QFBX',
                      hospitalName: 'Demo Hospital',
                      hospitalType: 'Private',
                      img: 'https://api.ehospi.in/uploads/hospital/signupHospitalImg1681118946980.png',
                      lat: '28.644800',
                      long: '77.216721',
                      phone: '+919458575556',
                      review: '0',
                      state: 'UP',
                      totalreview: '5',
                    },
                  ],
                  labOrTestStatus: 'package',
                  need_provide: '"Blood"',
                  package_name: 'test original',
                  package_test_include: [
                    {includeTest: 'amniocentesis', testPrice: 120},
                    {includeTest: 'blood typing', testPrice: 3130},
                  ],
                  status: '1',
                  subtotal_amount: '3250',
                  testLocation: [
                    {
                      id: '1',
                      testLocName: 'Home Collection',
                      testLocStatus: 'active',
                    },
                    {
                      id: '2',
                      testLocName: 'Lab Visit',
                      testLocStatus: 'active',
                    },
                  ],
                  test_preparation: 'fsafdas',
                  total_amount: '3150',
                  useful_test: 1,
                };
                return (
                  <>
                    {index == 0 ? (
                      <View
                        style={{
                          width: width * 0.9,
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                          paddingVertical: 20,
                          marginTop: 10,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: '700',
                          }}>
                          Most Useful Tests
                        </Text>
                        <Text
                          style={{
                            color: '#2580D3',
                            fontSize: 12,
                            fontWeight: '700',
                          }}>
                          View All
                        </Text>
                      </View>
                    ) : null}
                    {index <= 5 && item.labOrTestStatus == 'test' && (
                      <View
                        style={{
                          width: width * 0.9,
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                          borderBottomWidth: 1,
                          borderColor: '#0000001C',
                          paddingVertical: 20,
                          marginBottom: 10,
                          marginTop: 10,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            width: width * 0.1,
                            height: width * 0.1,
                            borderRadius: (width * 0.1) / 2,
                            alignItems: 'center',
                            justifyContent: 'center',

                            backgroundColor: '#F2F2F2',
                          }}>
                          <Image
                            source={require('../Assets/Images/blood.png')}
                            style={{
                              // width: '50%',
                              height: height * 0.04,
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            width: '80%',
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '700',
                              textTransform: 'capitalize',
                            }}>
                            {item.package_name}
                          </Text>
                          {item.package_test_include.length > 0 ? (
                            <Text
                              style={{
                                color: '#00000099',
                                marginTop: '2%',
                                fontWeight: '500',
                              }}>
                              Contains {item.package_test_include.length} tests
                            </Text>
                          ) : null}

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: '2%',
                            }}>
                            <Text> ₹{item.total_amount} onwards</Text>

                            <TouchableOpacity
                              onPress={
                                () => {
                                  addcartHandler(item);
                                }
                                // navigation.navigate('LabScreen', {
                                //   data: item,
                                // })
                              }
                              disabled={item.labDetail[0].enableDisable != '1'}
                              style={{
                                
                                backgroundColor: item.labDetail[0].enableDisable === '0' ? '#C5C5C5' : '#7083DE',
                                padding: 5,
                                borderRadius: 5,
                                justifyContent: 'center',
                                width: '40%',
                                alignSelf: 'flex-end',
                              }}>
                              <Text
                                style={{textAlign: 'center', color: '#fff'}}>
                                Book
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                );
              })}
            {databodypart.length > 0 &&
              databodypart.map((item, index) => {
                // console.log(item);
                var ggg = {
                  __v: 0,
                  _id: '643d324ed7d33047a7913be9',
                  body_part_test: 1,
                  description: ' dfaf',
                  discount_percentage: '100',
                  homeloc_extra_amt: '250',
                  hospitalDetail: [
                    {
                      __v: 0,
                      _id: '642be8452387cf1ac817b3c9',
                      about_us: 'this is a demo hospital',
                      city: 'Delhi',
                      enableDisable: '1',
                      hospitalAddress: 'Delhi',
                      hospitalCode: 'M9QFBX',
                      hospitalName: 'Demo Hospital',
                      hospitalType: 'Private',
                      img: 'https://api.ehospi.in/uploads/hospital/signupHospitalImg1681118946980.png',
                      lat: '28.644800',
                      long: '77.216721',
                      phone: '+919458575556',
                      review: '0',
                      state: 'UP',
                      totalreview: '5',
                    },
                  ],
                  hospital_id: '642be8452387cf1ac817b3c9',
                  need_provide: '"Blood"',
                  package_name: 'test original',
                  package_test_include: [
                    {includeTest: 'amniocentesis', testPrice: 120},
                    {includeTest: 'blood typing', testPrice: 3130},
                  ],
                  status: '1',
                  subtotal_amount: '3250',
                  testLocation: [
                    {
                      id: '1',
                      testLocName: 'Home Collection',
                      testLocStatus: 'active',
                    },
                    {
                      id: '2',
                      testLocName: 'Lab Visit',
                      testLocStatus: 'active',
                    },
                  ],
                  test_preparation: 'fsafdas',
                  total_amount: '3150',
                  useful_test: 1,
                };
                return (
                  <>
                    {index == 0 ? (
                      <View
                        style={{
                          width: width * 0.9,
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                          paddingVertical: 20,
                          marginTop: 10,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: '700',
                          }}>
                          Most Body Parts Test
                        </Text>
                        <Text
                          style={{
                            color: '#2580D3',
                            fontSize: 12,
                            fontWeight: '700',
                          }}>
                          View All
                        </Text>
                      </View>
                    ) : null}
                    <View
                      style={{
                        width: width * 0.9,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderColor: '#0000001C',
                        paddingVertical: 20,
                        marginBottom: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: width * 0.1,
                          height: width * 0.1,
                          borderRadius: (width * 0.1) / 2,
                          alignItems: 'center',
                          justifyContent: 'center',

                          backgroundColor: '#F2F2F2',
                        }}>
                        <Image
                          source={require('../Assets/Images/blood.png')}
                          style={{
                            // width: '50%',
                            height: height * 0.04,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: '80%',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '700',
                            textTransform: 'capitalize',
                          }}>
                          {item.package_name}
                        </Text>
                        {item.package_test_include.length > 0 ? (
                          <Text
                            style={{
                              color: '#00000099',
                              marginTop: '2%',
                              fontWeight: '500',
                            }}>
                            Contains {item.package_test_include.length} tests
                          </Text>
                        ) : null}

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '2%',
                          }}>
                          <Text> ₹{item.total_amount} onwards</Text>

                          <TouchableOpacity
                            disabled={item.hospitalDetail[0].enableDisable !== '1'}
                            style={{
                              backgroundColor: item.hospitalDetail[0].enableDisable === '0' ? '#C5C5C5' : '#7083DE',
                              padding: 5,
                              borderRadius: 5,
                              justifyContent: 'center',
                              width: '40%',
                              alignSelf: 'flex-end',
                            }}
                            onPress={() => addcartHandler(item)}
                          >
                            <Text style={{textAlign: 'center', color: '#fff'}}>
                              Book
                            </Text>
                          </TouchableOpacity>

                          {/* {
                              console.log("console.1",item.hospitalDetail.map((enable)=>{
                                console.log("console.2",enable.enableDisable)
                              }))
                            } */}
                          {/* {item.hospitalDetail.map((enable) => (
                            <TouchableOpacity
                              key={enable.id}
                              onPress={() => addcartHandler(item)}
                              style={{
                                backgroundColor: enable.enableDisable === 1 ? '#7083DE' : '#d3d3d3',
                                padding: 5,
                                borderRadius: 5,
                                justifyContent: 'center',
                                width: '40%',
                                alignSelf: 'flex-end',
                              }}
                              enabled={enable.enableDisable !== 1}
                            >
                              <Text style={{ textAlign: 'center', color: '#fff' }}>
                                Book {enable.enableDisable}
                              </Text>
                            </TouchableOpacity>
                          ))} */}
                        </View>
                      </View>
                    </View>
                  </>
                );
              })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LabTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  },
});
