import {
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
const {width, height} = Dimensions.get('window');

// import {RFValue} from 'react-native-responsive-fontsize';
// import Fonts from '../Constants/Fonts';
// import Colors from '../Constants/Colors';
const DatePicker = props => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const GetDate = (event, selecteddate) => {
    const currentdate = selecteddate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentdate);
    var today = new Date(currentdate);
    var GettodayDate =
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + today.getDate()).slice(-2) +
      '/' +
      today.getFullYear();
    props.onChange(GettodayDate);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={props.Visible}
        transparent={true}
        presentationStyle="overFullScreen"
        onRequestClose={props.Close}>
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: width,
              backgroundColor: '#fff',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={props.Close}
                style={{
                  // width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  alignSelf: 'flex-end',
                  // borderRadius: width * 0.06,
                  marginVertical: '2%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    // fontFamily: Fonts.MontserratMedium,
                    color: '#000000',
                    textAlign: 'center',
                    // marginVertical: '5%',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.Close}
                style={{
                  // width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  alignSelf: 'flex-end',
                  // borderRadius: width * 0.06,
                  marginVertical: '2%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    // fontFamily: Fonts.MontserratMedium,
                    color: '#000000',
                    textAlign: 'center',
                    // marginVertical: '5%',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                // backgroundColor: '#ffffff',
                width: width,
                borderTopWidth: 1,
                borderColor: 'grey',
                alignSelf: 'center',
              }}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={props.Mode}
                display={'spinner'}
                onChange={GetDate}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
