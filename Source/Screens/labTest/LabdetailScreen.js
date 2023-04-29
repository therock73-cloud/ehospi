import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseurl} from '../../Config/baseurl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';
const {width, height} = Dimensions.get('window');

const LabdetailScreen = ({navigation, route}) => {
  const [data, setdata] = useState();
  const [cartdata, setcartdata] = useState([]);
  const [labdata, setlabdata] = useState([]);
  const [isLoding, setisLoading] = useState(true);
  const [labdatasearch, setlabdatasearch] = useState([]);
  const [search, setSearch] = useState();

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Lab Test',
  //     // headerRight: () => (
  //     //   <TouchableOpacity
  //     //     style={{marginHorizontal: 16}}
  //     //     onPress={() => navigation.navigate('LabtestBook')}>
  //     //     <AntDesign name={'shoppingcart'} size={35} color={'#000000'} />
  //     //   </TouchableOpacity>
  //     // ),
  //   });
  // }, [navigation]);
  // useEffect(() => {
  //   Handler(route.params.id);
  //   viewcartHandler();

  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      Handler(route.params.id);
      viewcartHandler();

      // return () => {
      //   // Once the Screen gets blur Remove Event Listener
      //   setcartdata();
      // };
    }, []),
  );
  const Handler = async id => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      hospital_id: id,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);
    fetch(baseurl + 'labtest/getHospitalIdAbout', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.hospitalName);
        setdata(result);
        labHandler(route.params.id);
      })
      .catch(error => console.log('error', error));
  };
  const labHandler = async id => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      hospital_id: id,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);
    fetch(baseurl + 'labtest/getLabByHospitalId', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);

        setlabdata(result);
        setisLoading(false);
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
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      console.log(labdata);
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = labdata.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.package_name
          ? item.package_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setlabdatasearch(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setlabdatasearch([]);
      setSearch(text);
    }
  };

  return isLoding ? null : (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
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
              searchFilterFunction(text);
            }}
            // value={search}
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
        {labdatasearch.length > 0 ? (
          <FlatList
            data={labdatasearch}
            renderItem={({item, index}) => {
              return (
                <View
                  // onPress={() => navigation.navigate('LabdetailScreen')}
                  style={{
                    borderColor: '#C4C4C4',
                    borderWidth: 1,
                    width: width * 0.9,
                    alignSelf: 'center',
                    //   flexDirection: 'row',
                    //   alignItems: 'center',
                    marginTop: index == 0 ? height * 0.04 : 0,
                    marginBottom: height * 0.04,
                    paddingHorizontal: '4%',
                    paddingVertical: '6%',
                    backgroundColor: '#ffffff',
                  }}>
                  <Text
                    style={{
                      color: '#737373',
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    {item.package_name}
                  </Text>
                  <Text
                    style={{
                      color: '#737373',
                      fontSize: 14,
                      marginVertical: '3%',
                      fontWeight: '300',
                    }}>
                    {/* {`(HBV Qual.)`} */}
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 14, marginBottom: '3%'}}>
                    ₹{item.total_amount}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={
                        () => addcartHandler(item)
                        // navigation.navigate('LabtestBook', {
                        //   dataCart: item,
                        // })
                      }
                      style={{
                        width: '45%',
                        backgroundColor: '#7083DE',
                        height: height * 0.04,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontSize: 12,
                        }}>
                        ADD TO CART
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      // onPress={() => navigation.navigate('LabtestBook')}
                      style={{
                        width: '30%',
                        borderColor: '#37C837',
                        borderWidth: 1,
                        height: height * 0.04,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#37C837',
                          fontSize: 12,
                        }}>
                        {item.discount_percentage}% Off
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            data={labdata}
            ListHeaderComponent={() => {
              return (
                <>
                  {data == undefined ? null : (
                    <View
                      style={{
                        width: width * 0.9,
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('LabdetailScreen')}
                        style={{
                          ...styles.shadowProp,
                          width: width * 0.9,
                          alignSelf: 'center',
                          //   flexDirection: 'row',
                          //   alignItems: 'center',
                          marginVertical: height * 0.04,
                          paddingHorizontal: '5%',
                          paddingVertical: '10%',
                          backgroundColor: '#ffffff',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: data.img}}
                          resizeMode="stretch"
                          style={{width: '60%', height: height * 0.07}}
                        />
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '700',

                            width: '90%',
                            textAlign: 'center',
                            paddingTop: '15%',
                          }}>
                          {data.hospitalName}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#737373',
                          fontSize: 14,
                          fontWeight: '400',
                          alignSelf: 'center',
                        }}>
                        {data.about_us}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                          justifyContent: 'space-between',
                          width: width * 0.6,
                          paddingVertical: '4%',
                        }}>
                        <AntDesign
                          name={data.review >= 1 ? 'star' : 'staro'}
                          size={20}
                          color={data.review >= 1 ? '#DCBB0B' : '#787878'}
                        />
                        <AntDesign
                          name={data.review >= 2 ? 'star' : 'staro'}
                          size={20}
                          color={data.review >= 2 ? '#DCBB0B' : '#787878'}
                        />
                        <AntDesign
                          name={data.review >= 3 ? 'star' : 'staro'}
                          size={20}
                          color={data.review >= 3 ? '#DCBB0B' : '#787878'}
                        />
                        <AntDesign
                          name={data.review >= 4 ? 'star' : 'staro'}
                          size={20}
                          color={data.review >= 4 ? '#DCBB0B' : '#787878'}
                        />
                        <AntDesign
                          name={data.review >= 5 ? 'star' : 'staro'}
                          size={20}
                          color={data.review >= 5 ? '#DCBB0B' : '#787878'}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto-Medium',
                            color: '#787878',
                            marginLeft: '5%',
                          }}>
                          Reviews
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          paddingBottom: '4%',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Roboto-Medium',
                            color: '#737373',
                          }}>
                          Address:{' '}
                        </Text>
                        <Text
                          style={{
                            width: '85%',
                            fontSize: 14,
                            fontFamily: 'Roboto-Medium',
                            color: '#787878',
                          }}>
                          {data.hospitalAddress +
                            ', ' +
                            data.city +
                            ', ' +
                            data.state}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto-Medium',
                          paddingBottom: '6%',
                          color: '#000',
                        }}>
                        Tests
                      </Text>
                    </View>
                  )}
                </>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  // onPress={() => navigation.navigate('LabdetailScreen')}
                  style={{
                    borderColor: '#C4C4C4',
                    borderWidth: 1,
                    width: width * 0.9,
                    alignSelf: 'center',
                    //   flexDirection: 'row',
                    //   alignItems: 'center',
                    //   marginTop: index == 0 ? height * 0.04 : 0,
                    marginBottom: height * 0.04,
                    paddingHorizontal: '4%',
                    paddingVertical: '6%',
                    backgroundColor: '#ffffff',
                  }}>
                  <Text
                    style={{
                      color: '#737373',
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    {item.package_name}
                  </Text>
                  <Text
                    style={{
                      color: '#737373',
                      fontSize: 14,
                      marginVertical: '3%',
                      fontWeight: '300',
                    }}>
                    {/* {`(HBV Qual.)`} */}
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 14, marginBottom: '3%'}}>
                    ₹{item.total_amount}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={
                        () => addcartHandler(item)
                        // navigation.navigate('LabtestBook', {
                        //   dataCart: item,
                        // })
                      }
                      style={{
                        width: '45%',
                        backgroundColor: '#7083DE',
                        height: height * 0.04,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontSize: 12,
                        }}>
                        ADD TO CART
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      // onPress={() => navigation.navigate('LabtestBook')}
                      style={{
                        width: '30%',
                        borderColor: '#37C837',
                        borderWidth: 1,
                        height: height * 0.04,
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#37C837',
                          fontSize: 12,
                        }}>
                        ₹{item.discount_percentage} Off
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LabdetailScreen;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
  },
});
