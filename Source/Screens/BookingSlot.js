import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  BackHandler,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponent/Button';
// import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import {ChangeDateMode} from '../Config/helper';
const Calender = ({navigation, route}) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFormate, setSelectedFormate] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment()
  .format('DD-MM-YYYY hh:mm A').split(' ')[0]);
  const [data, setdata] = useState('');

  const today = moment().format('DD-MM-YYYY');
  useEffect(() => {
    // setSelectedDate(moment().format('YYYY-MM-DD'));
    setdata({
      data: route.params.data,
      hospitalName: route.params.hospitalName,
      hospitalCode: route.params.hospitalCode,
      hospitalAddress: route.params.hospitalAddress,
      hospital_id: route.params.hospital_id,
      selfPay: route.params.selfPay,
    });
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
  }, []);
  const renderItem = ({item}) => {
    const backgroundColor =
      item.id === selectedId ? Colors.circleColor : Colors.lightblueC;
    const color = item.id === selectedId ? 'white' : 'black';

    var startTime = moment(`${item.time} ${item.formate}`, 'hh:mm a');
    var endTime = moment(moment().format('hh:mm A'), 'hh:mm a');
     if(selectedDate == item.date){
      console.log(true);
     }else{
      console.log(false);
     }
    if (startTime.toString() > endTime.toString() || selectedDate != item.date) {
      return (
        <Item
          item={item}
          onPress={() => {
            setSelectedId(item.id);
            setSelectedTime(item.time);
            setSelectedFormate(item.formate);
          }}
          backgroundColor={{backgroundColor}}
          textColor={{color: '#fff'}}
        />
      );
    } else {
      return (
        <Item
          item={item}
          onPress={() => {}}
          backgroundColor={{backgroundColor: 'lightgrey'}}
          textColor={{color: '#000000'}}
        />
      );
    } //  returns false.  if date ignored I expect TRUE
  };
  const Data1 = [
    {
      id: 1,
      time: `07:00`,
      formate: `AM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    
    },
    {
      id: 2,
      time: `08:00`,
      formate: `AM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 3,
      time: `09:00`,
      formate: `AM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 4,
      time: `10:00`,
      formate: `AM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 5,
      time: `11:00`,
      formate: `AM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
  ];
  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text
        style={{
          fontWeight: 'bold',
          color: Colors.white,
          fontSize: hp('1.7%'),
          ...textColor,
        }}>
        {item.time}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: Colors.white,
          fontSize: hp('1.7%'),
          ...textColor,
        }}>
        {item.formate}
      </Text>
    </TouchableOpacity>
  );
  const Data2 = [
    {
      id: 6,
      time: `12:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 7,
      time: `01:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 8,
      time: `02:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 9,
      time: `03:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 10,
      time: `04:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
  ];
  const Data3 = [
    {
      id: 12,
      time: `05:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 13,
      time: `06:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 14,
      time: `07:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 15,
      time: `08:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
  ];
  const Data4 = [
    {
      id: 16,
      time: `09:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 17,
      time: `10:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 18,
      time: `11:00`,
      formate: `PM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
    {
      id: 19,
      time: `12:00`,
      formate: `AM`,
      date:moment()
      .format('DD-MM-YYYY hh:mm A').split(' ')[0]
    },
  ];
  const TimeNowone = moment()
  .format('YYYY-MM-DD hh:mm A').split(' ')[0];
  // const tt = TimeNowo;
  
  
  const TimeNow = moment()
    .format('YYYY-MM-DD hh:mm A')
    .split(' ')[1]
    .split(':')[0];
  const TimeNowFormat = moment().format('YYYY-MM-DD hh:mm A').split(' ')[2];

  const DoubleFunc = () => {
    // userBookingData();
    if (selectedDate != '' && selectedTime != '') {
      navigation.navigate('SemiPrivateRoom', {
        data: data.data,
        hospitalName: data.hospitalName,
        hospitalCode: data.hospitalCode,
        hospitalAddress: data.hospitalAddress,
        hospital_id: data.hospital_id,
        selfPay: data.selfPay,
        date: selectedDate,
        timing: selectedTime,
        formate: selectedFormate,
      });
    } else {
      alert('Select date and time');
    }
  };
  const yesterday = moment().subtract(1, 'day');
  const disablePastDt = date => {
    return date.isAfter(yesterday);
  };
  console.log(TimeNow);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: wp('30%'), height: hp('4%')}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: wp('8%'),
            height: hp('4%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="md-chevron-back" size={hp('3.8%')} color="#2581d4" />
          {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
        </TouchableOpacity>
      </View>

      <DatePicker
        // options={{
        //   backgroundColor: '#ffffff',
        //   textHeaderColor: '#0489D6',
        //   textDefaultColor: '#000000',
        //   selectedTextColor: '#fff',
        //   mainColor: '#0489D6',
        //   textSecondaryColor: '#0489D6',
        //   borderColor: '#0489D6',
        // }}
        iconComponent={
          <FontAwesome5 name="calendar-alt" color="#a9a9a9" size={hp('3%')} />
        }
        mode="date" // The enum of date,
        format="DD-MM-YYYY"
        minDate={moment(today, 'DD-MM-YYYY').format('DD-MM-YYYY')}
        maxDate={moment(today, 'DD-MM-YYYY')
          .add(30, 'days')
          .format('DD-MM-YYYY')}
        date={selectedDate}
        minuteInterval={30}
        isValidDate={disablePastDt}
        // minDate={moment().toDate()}
        style={{
          width: wp('90%'),
          alignSelf: 'center',
          height: hp('7%'),
          backgroundColor: '#d3d3d3',
          borderRadius: wp('2%'),
          marginTop: wp('3%'),
          marginRight: wp('2.8%'),
          justifyContent: 'center',
          alignItems: 'center',
          padding: wp('4%'),
        }}
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
        // androidMode={'spinner'}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => {
          console.log('date', date);
          setSelectedDate(date);
        }}
      />
      {/* <DatePicker
          options={{
            backgroundColor: '#ffffff',
            textHeaderColor: '#0489D6',
            textDefaultColor: '#000000',
            selectedTextColor: '#fff',
            mainColor: '#0489D6',
            textSecondaryColor: '#0489D6',
            borderColor: '#0489D6',
          }}
          minimumDate={moment(today, 'YYYY/MM/DD').format('YYYY/MM/DD')}
          maximumDate={moment(today, 'YYYY/MM/DD')
            .add(30, 'days')
            .format('YYYY/MM/DD')}
          selected={selectedDate}
          mode="calendar"
          minuteInterval={30}
          isValidDate={disablePastDt}
          // minDate={moment().toDate()}
          style={{borderRadius: 10}}
          // onSelectedChange={(date) =>
          //     setSelectedDate((prev) => ({
          //       ...prev,
          //       from: date,
          //     }))
          //     }
          onSelectedChange={date => {
            setSelectedDate(date);
          }}
        /> */}

      <View style={styles.lowerContainer}>
        <Text
          style={{padding: wp('3%'), fontWeight: 'bold', fontSize: hp('2.5%')}}>
          Available Time
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: wp('100%'), marginTop: hp('1%')}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Assets/Images/morning.png')}
                style={{width: 40, height: 40}}
                resizeMode="contain"
              />
              <Text
                style={{
                  padding: wp('3%'),
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                }}>
                Morning Slot
              </Text>
            </View>

            <FlatList
              // horizontal={true}
              numColumns={3}
              // showsHorizontalScrollIndicator={false}
              data={Data1}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </View>

          <View style={{width: wp('100%'), marginTop: hp('1%')}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Assets/Images/afternoon.png')}
                style={{width: 40, height: 40}}
                resizeMode="contain"
              />
              <Text
                style={{
                  padding: wp('3%'),
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                }}>
                Afternoon Slot
              </Text>
            </View>

            <FlatList
              // horizontal={true}
              numColumns={3}
              // showsHorizontalScrollIndicator={false}
              data={Data2}
              renderItem={renderItem}
              keyExtractor={Item => Item.id}
              extraData={selectedId}
            />
          </View>

          <View style={{width: wp('100%'), marginTop: hp('1%')}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Assets/Images/evening.png')}
                style={{width: 40, height: 40}}
                resizeMode="contain"
              />
              <Text
                style={{
                  padding: wp('3%'),
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                }}>
                Evening Slot
              </Text>
            </View>

            <FlatList
              // horizontal={true}
              numColumns={3}
              // showsHorizontalScrollIndicator={false}
              data={Data3}
              renderItem={renderItem}
              keyExtractor={Item => Item.id}
              extraData={selectedId}
            />
          </View>

          <View style={{width: wp('100%'), marginTop: hp('1%')}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Assets/Images/night.png')}
                style={{width: 40, height: 40}}
                resizeMode="contain"
              />
              <Text
                style={{
                  padding: wp('3%'),
                  fontWeight: 'bold',
                  fontSize: hp('2.5%'),
                }}>
                Night Slot
              </Text>
            </View>

            <FlatList
              // horizontal={true}
              numColumns={3}
              // showsHorizontalScrollIndicator={false}
              data={Data4}
              renderItem={renderItem}
              keyExtractor={Item => Item.id}
              extraData={selectedId}
            />
          </View>
        </ScrollView>
        <CustomButton
          // onPress={() => props.navigation.goBack('SemiPrivateRooms')}
          onPress={() => {
            // saveDate();
            DoubleFunc();
          }}
          //  onPress={()=>{userBookingData()}}
          title={'Confirm'}
          bgColor={Colors.circleColor}
          width={wp('85%')}
          height={hp('7%')}
          color={Colors.white}
          fontSize={hp('2.5%')}
          alignSelf={'center'}
          marginTop={hp('1%')}
          borderRadius={hp('1%')}
          style={{marginBottom: Platform.OS === 'ios' ? 50 : 0}}
        />
      </View>
    </SafeAreaView>
  );
};
export default Calender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    // marginVertical: 8,
    height: hp('5%'),
    width: hp('12%'),
    // borderRadius: hp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: wp('3%'),
    marginBottom: wp('3%'),
  },
  title: {
    fontSize: 32,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  upperContainer: {
    height: hp('45%'),
    //backgroundColor: 'pink'
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: hp('5%'),
    borderTopRightRadius: hp('5%'),
    marginTop: hp('2.3%'),
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.circleColor,
  },
  centeredView: {
    flex: 1,

    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: hp('2%'),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  modalText2: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
  },
});
