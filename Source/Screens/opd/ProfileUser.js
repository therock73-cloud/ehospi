import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import {baseurl} from '../../Config/baseurl';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';

const ProfileUser = ({navigation, route}) => {
  const [profile, setProfile] = useState('');
  const [hospitalAval, setHospiatlAval] = useState([]);
  const [review, setReview] = useState([]);
  var drId = route?.params?.drId;

  useEffect(() => {
    console.log(drId);

    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      drid: drId,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/doctorprofile', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setProfile(result.data[0]);
        setReview(result.data[0].reviews);
      })
      .catch(error => console.log('error', error));
  }, []);

  const hospitalDetails = id => {
    const item = id.item;
    <Text
      style={{
        marginTop: 5,
        marginLeft: 20,
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
      }}>
      {item?.hospitalname}
    </Text>;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader Title={'Profile Doctor -details'} />
      <ScrollView>
        <View style={{backgroundColor: '#fff', height: '100%'}}>
          <View style={{marginTop: 20}}>
            {/* <Text style={{ fontSize: 20, fontWeight: "700", marginLeft: 20, color: "#000" }}>Profile</Text> */}
            <View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#2580D3',
                      fontWeight: '700',
                      fontSize: 18,
                    }}>
                    {profile?.doctor_name}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#3D3E40',
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    {profile?.speciality}{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#3D3E40',
                      fontWeight: '500',
                      fontSize: 15,
                    }}>
                    {profile?.department_name}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#3D3E40',
                      fontWeight: '500',
                      fontSize: 15,
                    }}>
                    {profile?.degree}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    Experience : {profile?.year_of_experience} Year
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    {' '}
                    Fee : ₹ {profile?.fee}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      color: '#3D3E40',
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    {profile?.hospital_name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      marginBottom: 15,
                      marginLeft: 20,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          justifyContent: 'center',
                          margin: 0,
                          borderWidth: 0,
                          marginBottom: 0,
                          marginLeft: 0,
                        }}>
                        <Image
                          source={require('../../Assets/Images/star.png')}
                          style={{
                            height: 20,
                            margin: 0,
                            borderWidth: 0,
                            width: 20,
                            marginBottom: 0,
                            padding: 10,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginLeft: 0,
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 18,
                        }}>
                        {profile?.rating}
                      </Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          marginLeft: 20,
                          color: '#3D3E40',
                          fontWeight: '500',
                          fontSize: 18,
                        }}>
                        Rating
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    margin: 0,
                    borderWidth: 0,
                    marginBottom: 20,
                    marginLeft: 0,
                  }}>
                  <Image
                    source={{uri: profile?.image}}
                    style={{
                      height: 150,
                      margin: 0,
                      borderWidth: 0,
                      width: 150,
                      marginBottom: 0,
                      padding: 10,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderWidth: 0,
                  backgroundColor: '#2580D3',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  marginTop: -20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginRight: 20,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      margin: 0,
                      borderWidth: 0,
                      marginBottom: 0,
                    }}>
                    <Image
                      source={require('../../Assets/Images/star.png')}
                      style={{
                        height: 20,
                        margin: 0,
                        borderWidth: 0,
                        width: 20,
                        marginBottom: 0,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginLeft: 0,
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: 15,
                      alignItems: 'center',
                    }}>
                    {profile?.rating} Rating
                  </Text>
                </View>

                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    color: '#fff',
                    padding: 10,
                  }}>
                  {profile?.description}{' '}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 20,
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '500',
                  }}>
                  {' '}
                  Avaliablity : {profile?.availablity}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    marginLeft: 20,
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '500',
                  }}>
                  Address :{profile?.address}
                </Text>

                {/* <Text style={{ marginTop: 20, marginLeft: 20, color: "#fff", fontSize: 20, fontWeight: "700" }}>Location</Text> */}

                <View>
                  <Text
                    style={{
                      marginTop: 20,
                      marginLeft: 20,
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: '500',
                    }}>
                    Dr also available at
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <FlatList
                      data={hospitalAval}
                      renderItem={hospitalDetails}
                      keyExtractor={item => item.id}
                    />
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      borderWidth: 0,
                      marginBottom: 0,
                      marginTop: 10,
                      padding: 10,
                    }}>
                    <Image
                      source={require('../../Assets/Images/map.png')}
                      style={{
                        height: 150,
                        margin: 0,
                        borderWidth: 0,
                        width: '100%',
                        padding: 10,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginTop: 20,
                      marginRight: 20,
                    }}>
                    <TouchableOpacity
                      style={() => navigation.navigate('Review')}>
                      <Text
                        style={{
                          textAlign: 'right',
                          color: '#fff',
                          fontSize: 20,
                          fontWeight: '700',
                        }}>
                        Review
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 20,
                        marginTop: 20,
                        backgroundColor: '#fff',
                        marginBottom: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          alignItems: 'center',
                          marginBottom: 0,
                        }}>
                        {/* <View style={{ margin: 0, borderWidth: 0, marginBottom: 0, marginLeft: 30 }}>
                                            <Image source={{ uri: review?.imageurl }}
                                                style={{ height: 100, margin: 0, borderWidth: 0, width: 80, marginBottom: 0, padding: 10, marginLeft: 10 }} />
                                        </View> */}

                        <View style={{marginLeft: 0, marginTop: 0}}>
                          <Text
                            style={{
                              marginLeft: 20,
                              color: '#000',
                              fontWeight: '700',
                              fontSize: 18,
                            }}>
                            {review?.name}
                          </Text>
                          <Text
                            style={{
                              marginLeft: 20,
                              color: '#000',
                              fontWeight: '500',
                              fontSize: 15,
                              marginTop: 5,
                            }}>
                            {review?.date}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                margin: 0,
                                borderWidth: 0,
                                marginBottom: 0,
                                marginLeft: 0,
                              }}>
                              <Image
                                source={require('../../Assets/Images/star.png')}
                                style={{
                                  height: 20,
                                  margin: 0,
                                  borderWidth: 0,
                                  width: 20,
                                  marginBottom: 0,
                                  padding: 10,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: 'center',
                                margin: 0,
                                borderWidth: 0,
                                marginBottom: 0,
                                marginLeft: 0,
                              }}>
                              <Image
                                source={require('../../Assets/Images/star.png')}
                                style={{
                                  height: 20,
                                  margin: 0,
                                  borderWidth: 0,
                                  width: 20,
                                  marginBottom: 0,
                                  padding: 10,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: 'center',
                                margin: 0,
                                borderWidth: 0,
                                marginBottom: 0,
                                marginLeft: 0,
                              }}>
                              <Image
                                source={require('../../Assets/Images/star.png')}
                                style={{
                                  height: 20,
                                  margin: 0,
                                  borderWidth: 0,
                                  width: 20,
                                  marginBottom: 0,
                                  padding: 10,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: 'center',
                                margin: 0,
                                borderWidth: 0,
                                marginBottom: 0,
                                marginLeft: 0,
                              }}>
                              <Image
                                source={require('../../Assets/Images/star.png')}
                                style={{
                                  height: 20,
                                  margin: 0,
                                  borderWidth: 0,
                                  width: 20,
                                  marginBottom: 0,
                                  padding: 10,
                                }}
                              />
                            </View>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <View>
                              <Text
                                style={{
                                  marginLeft: 0,
                                  color: '#000',
                                  fontWeight: '600',
                                  fontSize: 15,
                                  marginTop: 10,
                                }}>
                                {review?.review}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <Text
                        style={{
                          marginTop: 0,
                          marginBottom: 20,
                          marginLeft: 10,
                          color: '#000',
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        {review?.message}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUser;

const styles = StyleSheet.create({});
