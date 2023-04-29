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
import {Searchbar} from 'react-native-paper';
import {blue200} from 'react-native-paper/lib/typescript/styles/colors';
import axios from 'axios';
import {date} from 'yup';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButtonHeader from '../../ReusableComponent/BackButtonHeader';
const {width, height} = Dimensions.get('window');

// onPress={()=>{this.onPress(user)} }

// onPress(user){
//     this.props.navigator.push({
//         id: 'DetailPage'
//     });
// }
// onPress(user) {
//     this.props.navigation.navigate(
//       'DetailPage',
//       { user },
//     );
//   }

const TimeSlots = ({navigation, route}) => {
  const [doctorDate, setdoctorDate] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [doctorTime, setDoctorTime] = useState([]);
  const [timeSlots, setTimeSlots] = useState('');
  const [dateSlots, setDateSlots] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [HospitalID, setHospitalID] = useState();

  const drId = route?.params?.drId;
  const enableDisable = route.params.enableDisable;
  var currentDateSlots;
  var selectTimeSlots;
  var currentDate = moment().format('DD/MM/YYYY');
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
  console.log('<<<<<Date>>>>>>>>', drId);
  var today = new Date();
  var GettodayDate =
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

  var days = 7; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  var day = last.getDate();
  var month = last.getMonth() + 1;
  var year = last.getFullYear();

  var Get7dayagoDate = year + '/' + month + '/' + day;
useEffect(()=>{
    
},[])
  useEffect(() => {
    const DoctoDatata = () => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        Drid: drId,
        startDate: GettodayDate,
        endDate: Get7dayagoDate,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      console.log(raw);
      fetch(
        'https://api.ehospi.in/user/bookanappointmentdayslot',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setHospitalID(result.response[0].HospitalID);
          setdoctorDate(result.response[0]?.date);
          setSelectedDate(result.response[0]?.date[0].date);
          setDoctorDetails(result.response);
        })
        .catch(error => console.log('error', error));
    };
    DoctoDatata();

    const TimeSLotdatata = () => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        Drid: drId,
        selectedDate: GettodayDate,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(
        'https://api.ehospi.in/user/bookanappointmenttimeslot',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log('time', result);
          setDoctorTime(result.response);
          selectDate(moment()
      .format('YYYY-MM-DD hh:mm A').split(' ')[0])
          // console.log('time', result);
        })
        .catch(error => console.log('error', error));
    };
    TimeSLotdatata();
  }, []);

  const selectDate = BookingDate => {
    // setdoctorDate(BookingDate)
    // selecDateSlots=BookingDates
    setDateSlots(BookingDate);
    setSelectedDate(BookingDate);
    currentDateSlots = BookingDate;
    // console.log('date slots >>>>>>>>>>>>>>>>>>>>>>>>>>>>', dateSlots);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      Drid: drId,
      selectedDate: BookingDate,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/user/bookanappointmenttimeslot',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('time', result);
        setDoctorTime(result.response);
        // console.log('time', result);
      })
      .catch(error => console.log('error', error));
    // time slots api
    // axios
    //   .post('https://api.ehospi.in/user/bookanappointmenttimeslot', {
    //     Drid: drId,
    //     selectedDate: '2022-12-11',
    //   })
    //   .then(res => {
    //     console.log('time', res?.data?.response);

    //     setDoctorTime(res?.data?.response?.slots_time[0]?.time_interval);
    //     console.log('time', res?.data?.response);
    //   })
    //   .catch(err => {});
  };

  const selectTime = BookingTime => {
    setTimeSlots(BookingTime);
    setSelectedRow(BookingTime);
    // console.log('time sdsd', timeSlots);
    selectTimeSlots = BookingTime;
    // console.log('selected time', selectTimeSlots);
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Time Slots',
    });
  }, [navigation]);
  const Time = (hour, minutes) => {
    // Getting current hour from Date object.

    var TimeType, fullTime;
    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 11) {
      TimeType = 'AM';
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = 'PM';
    }

    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour == 0) {
      hour = 12;
    }

    // Getting the current minutes from date object.

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = minutes.toString();
    }
    if (hour < 10) {
      hour =
        hour.toString().length == 1 ? '0' + hour.toString() : hour.toString();
    }
    fullTime =
      hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
    return fullTime;
  };

  const [selecteddates, setselecteddates] = useState();

  const Dateset = newDate => {
    const date = newDate || new Date();
    const DateFinal =
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    setselecteddates(
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    );
  };
  const getPreviousDate = () => {
    const currentDayInMilli = new Date(selecteddates).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const previousDate = new Date(previousDayInMilli);

    Dateset(previousDate);
  };

  const getNextDate = () => {
    const currentDayInMilli = new Date(selecteddates).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const nextDate = new Date(nextDayInMilli);
    console.log(nextDate);
    Dateset(nextDate);
  };

  const DrDate = id => {
    // for (var i = 0; i >= 7; i++) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '3%',
          marginHorizontal: width * 0.03,
          // styles.drContainer
        }}>
        <TouchableOpacity
          onPress={() => {
            selectDate(id?.item?.date);
            //console.log(id?.item?.date)
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: id?.item?.date === selectedDate ? '#2580D3' : '#6A6F77',
            }}>
            {id?.item?.name.charAt(0).toUpperCase() +
              id?.item?.name.slice(1, 3)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              color: id?.item?.date === selectedDate ? '#2580D3' : '#6A6F77',
            }}>
            {id?.item?.date.split('-')[2]}
          </Text>
        </TouchableOpacity>
      </View>
    );
    // }
  };
  console.log('HospitalID', HospitalID);
  const drTimeSlots = idTime => {
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
          ) : idTime.item.name === 'Afternoon' ? (
            <Image
              source={require('../../Assets/Images/afternoon.png')}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../Assets/Images/evening.png')}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
          )}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#000',
              // marginLeft: width * 0.04,
            }}>
            {'Slots ' + idTime.item.no_of_slot}
          </Text>
        </View>

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
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => {
            // console.log('.....', item);

            var soltsTime = item.timeslot.split(':');
            var time = Time(soltsTime[0], soltsTime[1]);
            var startTime = moment(`${time}`, 'hh:mm A');
            var endTime = moment(moment().format('hh:mm A'), 'hh:mm A');
            if (
              moment(item.date).format('YYYY-MM-DD') >
              moment().format('YYYY-MM-DD')
            ) {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => selectTime(item.timeslot)}
                    style={{
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
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color:
                          item.timeslot === selectedRow ? '#fff' : '#2580D3',
                      }}>
                      {/* {item.timeslot} */}
                      {Time(soltsTime[0], soltsTime[1])}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            } else {
              return startTime.toString() > endTime.toString() ? (
                <>
                  <TouchableOpacity
                    onPress={() => selectTime(item.timeslot)}
                    style={{
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
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color:
                          item.timeslot === selectedRow ? '#fff' : '#2580D3',
                      }}>
                      {/* {item.timeslot} */}
                      {Time(soltsTime[0], soltsTime[1])}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    style={{
                      width: width * 0.23,
                      height: height * 0.05,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                      marginRight: width * 0.105,
                      // backgroundColor:
                      //   item.timeslot === selectedRow ? '#2580D3' : '#fff',
                      borderRadius: 10,
                      borderColor: '#d6d6d6',
                      borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        // color: item.timeslot === selectedRow ? '#fff' : '#2580D3',
                      }}>
                      {/* {item.timeslot} */}
                      {Time(soltsTime[0], soltsTime[1])}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }
          }}
          // horizontal={true}
          showsVerticalScrollIndicator={false}
        />
      </>
    );
  };
  console.log(selectedRow);
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonHeader Title={'Time Slots'} />
      <View style={{backgroundColor: '#fff', flex: 1}}>
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
                uri: doctorDetails[0]?.image,
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
              {doctorDetails[0]?.DrName}
            </Text>
            <Text
              style={{
                color: '#999a9c',
                fontWeight: '400',
                fontSize: 14,
              }}>
              {doctorDetails[0]?.DrSpecialization}
            </Text>
            <Text
              style={{
                color: '#999a9c',
                fontWeight: '400',
                fontSize: 14,
              }}>
              {doctorDetails[0]?.drexperience} year Experience
            </Text>
            <Text
              style={{
                color: '#999a9c',
                fontWeight: '400',
                fontSize: 14,
              }}>
              {doctorDetails[0]?.Hostpitalname}
            </Text>

            <Text style={{color: '#2580D3', fontWeight: '400', fontSize: 14}}>
              ₹ {doctorDetails[0]?.fee}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            textAlign: 'center',
            color: '#000',
            marginTop: '5%',
          }}>
          {monthNames[today.getMonth()] + ' ' + today.getFullYear()}
        </Text>
        {/* <DrDate /> */}
        <View
          style={{
            marginVertical: 10,
            width: width * 0.9,

            alignSelf: 'center',
          }}>
          <FlatList
            data={doctorDate}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            renderItem={DrDate}
          />
        </View>

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
          keyExtractor={(item, index) => index.toString()}
          renderItem={drTimeSlots}
          // horizontal={true}
          // showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          disabled={enableDisable === '0'}
          style={{
            borderRadius: 10,
            height: height * 0.06,
            width: width * 0.9,
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: 20,
           backgroundColor: enableDisable === '0' ? '#C5C5C5' : '#7083DE',

          }}
          onPress={() => {
            if (selectedDate != '' && timeSlots != '') {
              console.log({drId: drId, slotDate: dateSlots, time: timeSlots});
              navigation.navigate('ConsultationDetails', {
                drId: drId,
                slotDate: selectedDate,
                time: timeSlots,
                HospitalID: HospitalID,
              });
            } else {
              alert('Select date and time');
            }
          }}>
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
    </SafeAreaView>
  );
};

export default TimeSlots;

const styles = StyleSheet.create({
  alphabetContainer: {
    flexDirection: 'row-reverse',
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    borderColor: '#d6d6d6',
    borderWidth: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  alphabetContainerSelected: {
    flexDirection: 'row-reverse',
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#2580D3',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    borderColor: '#d6d6d6',
    borderWidth: 2,
    // backgroundColor: '#0BBF64',
    justifyContent: 'space-between',
  },
  drContainer: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 2,
    borderWidth: 0,
    borderColor: '#ffffff',
  },
  drContainerSelected: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: '#2580D3',
  },
});
