import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, Linking, ImageBackground, StatusBar, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assetst/Constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const FollowNext = (props) => {

    const [checked, setChecked] = useState(false);

    const Follow = () => {
        setChecked(!checked);
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Colors.lightPurples} />
                <View style={{ width: wp('100%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: wp('96%'), height: hp('7%'), flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: hp('0.3%'), }}>
                        <View style={{ width: wp('80%'), alignSelf: 'center', height: hp('7%'), marginLeft: hp('2%'), }}></View>
                        <TouchableOpacity style={{ width: wp('12%'), height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginRight: hp('1%'), }}>
                            <AntDesign name='close' color='black' size={hp('2.8%')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: wp('100%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                    <Text style={{ color: 'black', fontSize: hp('3%'), marginLeft: hp('0.3%'), fontWeight: 'normal', }}>Send daily set of likes</Text>
                    <Text style={{ color: Colors.primaryGray, fontSize: hp('1.8%'), marginLeft: hp('0.3%'), fontWeight: 'normal', }}>Uncheck the selected profiles of you are not interested</Text>
                </View>

                <View style={{ width: wp('100%'), height: hp('23%'), justifyContent: 'center', marginTop: hp('2%') }}>
                    <View style={{ width: wp('96%'), height: hp('22%'), flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center', alignItems: 'center' }}>
                        <View style={{ width: wp('28%'), height: hp('20%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/girl1.png')} style={{ width: hp('12%'), height: hp('12%'), borderRadius: hp('6%') }} />
                            <TouchableOpacity onPress={Follow}>
                                {!checked ?
                                    <MaterialIcons name='check-circle' color={Colors.lightPurples} size={hp('3%')} style={{ marginTop: hp('-2%') }} /> :
                                    <Image source={require('../Assetst/Images/circle.png')} style={{ width: wp('5.5%'), height: wp('5.5%'), borderRadius: hp('1.5%'), marginTop: hp('-2%') }} />}
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                        </View>

                        <View style={{ width: wp('28%'), height: hp('20%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/5.png')} style={{ width: hp('12%'), height: hp('12%'), borderRadius: hp('6%') }} />
                            <TouchableOpacity onPress={Follow}>
                                {!checked ?
                                    <MaterialIcons name='check-circle' color={Colors.lightPurples} size={hp('3%')} style={{ marginTop: hp('-2%') }} /> :
                                    <Image source={require('../Assetst/Images/circle.png')} style={{ width: wp('5.5%'), height: wp('5.5%'), borderRadius: hp('1.5%'), marginTop: hp('-2%') }} />}
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                        </View>

                        <View style={{ width: wp('28%'), height: hp('20%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/2.png')} style={{ width: hp('12%'), height: hp('12%'), borderRadius: hp('6%') }} />
                            <TouchableOpacity onPress={Follow}>
                                {!checked ?
                                    <MaterialIcons name='check-circle' color={Colors.lightPurples} size={hp('3%')} style={{ marginTop: hp('-2%') }} /> :
                                    <Image source={require('../Assetst/Images/circle.png')} style={{ width: wp('5.5%'), height: wp('5.5%'), borderRadius: hp('1.5%'), marginTop: hp('-2%') }} />}
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                        </View>

                    </View>
                </View>

                <View style={{ width: wp('100%'), height: hp('23%'), justifyContent: 'center', marginTop: hp('2%') }}>
                    <View style={{ width: wp('96%'), height: hp('22%'), flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center', alignItems: 'center' }}>
                        <View style={{ width: wp('28%'), height: hp('20%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/girl1.png')} style={{ width: hp('12%'), height: hp('12%'), borderRadius: hp('6%') }} />
                            <TouchableOpacity onPress={Follow}>
                                {!checked ?
                                    <MaterialIcons name='check-circle' color={Colors.lightPurples} size={hp('3%')} style={{ marginTop: hp('-2%') }} /> :
                                    <Image source={require('../Assetst/Images/circle.png')} style={{ width: wp('5.5%'), height: wp('5.5%'), borderRadius: hp('1.5%'), marginTop: hp('-2%') }} />}
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                        </View>

                        <View style={{ width: wp('28%'), height: hp('20%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/5.png')} style={{ width: hp('12%'), height: hp('12%'), borderRadius: hp('6%') }} />
                            <TouchableOpacity onPress={Follow}>
                                {!checked ?
                                    <MaterialIcons name='check-circle' color={Colors.lightPurples} size={hp('3%')} style={{ marginTop: hp('-2%') }} /> :
                                    <Image source={require('../Assetst/Images/circle.png')} style={{ width: wp('5.5%'), height: wp('5.5%'), borderRadius: hp('1.5%'), marginTop: hp('-2%') }} />}
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                        </View>

                        <View style={{ width: wp('28%'), height: hp('20%'), justifyContent: 'center', marginLeft: hp('1%'), alignItems: 'center' }}>
                            <Image source={require('../Assetst/Images/2.png')} style={{ width: hp('12%'), height: hp('12%'), borderRadius: hp('6%') }} />
                            <TouchableOpacity onPress={Follow}>
                                {!checked ?
                                    <MaterialIcons name='check-circle' color={Colors.lightPurples} size={hp('3%')} style={{ marginTop: hp('-2%') }} /> :
                                    <Image source={require('../Assetst/Images/circle.png')} style={{ width: wp('5.5%'), height: wp('5.5%'), borderRadius: hp('1.5%'), marginTop: hp('-2%') }} />}
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: hp('2%'), fontWeight: 'normal', marginTop: hp('0.8%') }}>Julie</Text>
                        </View>

                    </View>
                </View>

                <TouchableOpacity style={{ width: wp('85%'), height: hp('7%'), backgroundColor: Colors.lightPurples, alignSelf: 'center', marginTop: hp('19%'), justifyContent: 'center', alignItems: 'center', borderRadius: hp('4%') }} onPress={() => props.navigation.navigate('BottomTabNavigation')}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: "white" }}>Follow & Next</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    container: {
        width: wp('100%'),
        height: hp('100%'),

        backgroundColor: Colors.primaryColor8
    },

})

export default FollowNext;