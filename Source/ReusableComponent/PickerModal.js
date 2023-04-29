import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
const PickerModal = props => {
  return (
    <Modal
      animationType="slide"
      visible={props.Visible}
      transparent={true}
      onRequestClose={props.Close}>
      <TouchableOpacity
        onPressOut={props.Close}
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}>
        <TouchableWithoutFeedback>
          <View style={{position: 'absolute', bottom: 0}}>
            <TouchableOpacity
              onPress={props.Close}
              style={{
                alignSelf: 'center',
                marginBottom: '3%',
              }}>
              <AntDesign
                name="close"
                size={50}
                color="#ffffff"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <View
              style={{
                // flex: 1,
                width: width,
                height: height * 0.3,
                borderTopLeftRadius: width * 0.1,
                borderTopRightRadius: width * 0.1,
                backgroundColor: '#ffffff',
                elevation: 10,
              }}>
              <Picker
                style={{
                  width: wp('90%'),
                  height: hp('7%'),
                  backgroundColor: '#d3d3d3',
                  borderRadius: hp('2%'),
                  marginTop: wp('3%'),
                  marginRight: wp('2.8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: wp('4%'),
                }}
                // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
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
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default PickerModal;

const styles = StyleSheet.create({});
