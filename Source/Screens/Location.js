import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, SectionList } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import Header from '../ReusableComponent/Header';



const Location = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.contr}>
                <Header color={Colors.black} title='Search any city or locality' bgColor={Colors.skyblue} onPress={() => props.navigation.goBack('Home')} />
                <View style={{ width: wp('100%'), height: hp('7%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', color: Colors.blue, fontSize: hp('2%') }}>use current location</Text>
                    <FontAwesome5Icon name='location-arrow' size={hp('2.5%')} color={Colors.black} />
                </View>
                <View style={{ width: wp('100%'), height: hp('9%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', color: Colors.blue, fontSize: hp('2%') }}>Search in entire Noida</Text>
                </View>

                <TextInput
                    placeholder='Top Localities in Noida'
                    placeholderTextColor={Colors.darkGray}
                    style={styles.inputCome}
                    keyboardType='number-pad'

                />
                <View style={{ width: wp('100%'), height: hp('8%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Sector 18</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('8%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Sector 19</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('8%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Sector 20</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('8%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Sector 30</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('8%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Sector 50</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('8%'), borderBottomWidth: 0.3, borderColor: Colors.black, padding: wp('2%'), justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Sector 51</Text>
                </View>



            </View>
        </SafeAreaView>
    )
}
export default Location;

const styles = StyleSheet.create({
    contr: {
        width: wp('100%'),
        height: hp('100%')
    },
    inputCome: {
        width: wp('100%'),
        height: hp('7%'),
        fontSize: hp('2.2%'),

        alignSelf: 'center',

        paddingLeft: wp('2%'),
        backgroundColor: Colors.verylightGray
    },



})