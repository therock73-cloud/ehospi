import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const AddTimeSlotScreen = () => {
  const [doctorDate, setdoctorDate] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [doctorTime, setDoctorTime] = useState([]);
  const [timeSlots, setTimeSlots] = useState('');
  const [dateSlots, setDateSlots] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [HospitalID, setHospitalID] = useState();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var today = new Date();
  var GettodayDate =
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  var Get7dayagoDate =
    today.getFullYear() +
    '/' +
    (today.getMonth() + 1) +
    '/' +
    (today.getDate() + 7);
  useEffect(() => {
    DateHandler();
  }, []);
  const DateHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'authorization',
      'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDcwMTc0NTY3NDQiLCJpYXQiOjE2NzE1NTM1MzUsImV4cCI6MTY3MTcyNjMzNX0.mW2wPX77hLFFSGoo_CuH4SyPCk49OsRO63RhmqJIFPQ',
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      hospital_id: '639cc8778e0f5535a68c8bcf',
      startDate: '2022-12-18',
      endDate: '2022-12-18',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/labtest/lab_timeslot_date', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.response[0].date);
        setdoctorDate(result.response[0].date);
      })
      .catch(error => console.log('error', error));
  };

  const drTimeSlots = idTime => {
    // console.log('.....', idTime);
    // var soltsTime = idTime.item.timeslot.split(':');

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: width * 0.04,
          }}>
          {idTime.item.name === 'Morning' ? (
            <Image
              source={require('../../Assets/Images/morning.png')}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../Assets/Images/afternoon.png')}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          )}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#000',
              marginLeft: width * 0.04,
            }}>
            {'Slots ' + idTime.item.no_of_slot}
          </Text>
        </View>

        {/* {idTime.item.category_slot.length > 0 &&
              idTime.item.category_slot.map(item => {
                var soltsTime = item.timeslot.split(':');
                return (
                  <>
                    {item.status === 0 ? (
                      <View
                        style={
                          {
                            width: width * 0.23,
                            height: height * 0.05,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                            marginRight: width * 0.105,
                            backgroundColor:
                              item.timeslot === selectedRow ? '#2580D3' : '#fff',
                            borderRadius: 10,
                            borderColor: '#d6d6d6',
                            borderWidth: 1,
                          }
                          // item === selectedRow
                          //   ? styles.alphabetContainerSelected
                          //   : styles.alphabetContainer
                        }>
                        <TouchableOpacity onPress={() => selectTime(item.timeslot)}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              color:
                                item.timeslot === selectedRow ? '#fff' : '#2580D3',
                            }}>
                            {Time(soltsTime[0], soltsTime[1])}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={
                          {
                            width: width * 0.23,
                            height: height * 0.05,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                            marginRight: width * 0.105,
                            backgroundColor:
                              item.timeslot === selectedRow ? '#2580D3' : '#fff',
                            borderRadius: 10,
                            borderColor: '#d6d6d6',
                            borderWidth: 1,
                          }
                          // item === selectedRow
                          //   ? styles.alphabetContainerSelected
                          //   : styles.alphabetContainer
                        }>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#000',
                          }}>
                          {Time(soltsTime[0], soltsTime[1])}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: '500',
                            color: '#000',
                          }}>
                          Not avilable
                        </Text>
                      </View>
                    )}
                  </>
                );
              })} */}
        <FlatList
          data={idTime.item.category_slot}
          numColumns={3}
          contentContainerStyle={{
            width: width * 0.9,
            alignSelf: 'center',
          }}
          columnWrapperStyle={{
            flex: 1,
            // justifyContent: 'space-around',
          }}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            var soltsTime = item.timeslot.split(':');
            return (
              <>
                {item.status === 0 ? (
                  <View
                    style={
                      {
                        width: width * 0.23,
                        height: height * 0.05,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginRight: width * 0.105,
                        backgroundColor:
                          item.timeslot === selectedRow ? '#2580D3' : '#fff',
                        borderRadius: 10,
                        borderColor: '#d6d6d6',
                        borderWidth: 1,
                      }
                      // item === selectedRow
                      //   ? styles.alphabetContainerSelected
                      //   : styles.alphabetContainer
                    }>
                    <TouchableOpacity onPress={() => selectTime(item.timeslot)}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color:
                            item.timeslot === selectedRow ? '#fff' : '#2580D3',
                        }}>
                        {Time(soltsTime[0], soltsTime[1])}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={
                      {
                        width: width * 0.23,
                        height: height * 0.05,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginRight: width * 0.105,
                        backgroundColor:
                          item.timeslot === selectedRow ? '#2580D3' : '#fff',
                        borderRadius: 10,
                        borderColor: '#d6d6d6',
                        borderWidth: 1,
                      }
                      // item === selectedRow
                      //   ? styles.alphabetContainerSelected
                      //   : styles.alphabetContainer
                    }>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      {Time(soltsTime[0], soltsTime[1])}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      Not avilable
                    </Text>
                  </View>
                )}
              </>
            );
          }}
          // horizontal={true}
          showsVerticalScrollIndicator={false}
        />
      </>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={doctorDate}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({item}) => {
          console.log(item);
          return (
            <View
              style={{
                // id?.item?.date === selectedDate
                //   ? styles.drContainerSelected
                //   :
                marginLeft: 20,
                marginTop: 10,
                marginBottom: 10,
                padding: 2,
                borderWidth: 0,
                borderColor: '#ffffff',
              }}>
              <TouchableOpacity
                onPress={() => {
                  //   selectDate(item.date);
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: item.date === selectedDate ? '#2580D3' : '#6A6F77',
                  }}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1, 3)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: item.date === selectedDate ? '#2580D3' : '#6A6F77',
                  }}>
                  {item.date.split('-')[2]}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View
        style={{
          width: width * 0.9,
          alignSelf: 'center',
          height: 1,
          borderWidth: 0,
          backgroundColor: '#d6d6d6',
          marginBottom: '4%',
        }}
      />
      <FlatList
        data={doctorTime}
        // numColumns={3}
        contentContainerStyle={{
          width: width * 0.9,
          alignSelf: 'center',
        }}
        // columnWrapperStyle={{
        //   flex: 1,
        //   // justifyContent: 'space-around',
        // }}
        keyExtractor={item => item.id}
        renderItem={drTimeSlots}
        // horizontal={true}
        // showsVerticalScrollIndicator={false}
      />

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
        // onPress={() => {
        //   if (dateSlots != '' && timeSlots != '') {
        //     console.log({drId: drId, slotDate: dateSlots, time: timeSlots});
        //     navigation.navigate('ConsultationDetails', {
        //       drId: drId,
        //       slotDate: dateSlots,
        //       time: timeSlots,
        //       HospitalID: HospitalID,
        //     });
        //   } else {
        //     alert('Select date and time');
        //   }
        // }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '500',
            fontSize: 16,
          }}>
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTimeSlotScreen;

const styles = StyleSheet.create({});
