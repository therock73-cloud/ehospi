import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../Assets/Constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DropShadow from "react-native-drop-shadow";
const HospitalWard = (props) => {

    return (
        <DropShadow
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            }}
        >

            <View style={{ width: wp('98%'), height: hp('25.76%'), backgroundColor: '#ece6e6', marginTop: hp('3%'), borderTopLeftRadius: hp('2%'), borderTopRightRadius: hp('2%'), borderBottomLeftRadius: hp('2%'), borderBottomRightRadius: hp('2%'), alignSelf: 'center' }}>
                <View style={{ width: wp('96%'), height: hp('6.7%'), justifyContent: 'center', paddingLeft: wp('1%'), }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), color: Colors.black }}>General Ward</Text>
                </View>
                <View style={{ width: wp('98%'), height: hp('19%'), flexDirection: 'row', backgroundColor: '#ffffff', borderBottomLeftRadius: hp('2%'), borderBottomRightRadius: hp('2%'), alignSelf: 'center' }}>
                    <View style={{ width: wp('77%'), height: hp('19%'), backgroundColor: '#ffffff', borderBottomLeftRadius: hp('2%') }}>
                        <View style={{ width: wp('77%'), height: hp('4%'), flexDirection: 'row', backgroundColor: '#ffffff' }}>
                            <View style={{ width: wp('38.5%'), height: hp('5%'), justifyContent: 'center', }}>
                                <Text style={{ marginLeft: wp('1%'), fontSize: hp('2.5%'), fontWeight: 'bold', color: Colors.black }}>Facility</Text>
                            </View>
                            <View style={{ width: wp('38.5%'), height: hp('5%'), justifyContent: 'center' }}>
                                <Text style={{ marginLeft: wp('1%'), fontSize: hp('2.5%'), fontWeight: 'bold', color: Colors.black }}>Charges</Text>
                            </View>

                        </View>
                        <View style={{ width: wp('77%'), height: hp('15%'), flexDirection: 'row', }}>
                            <View style={{ width: wp('38.5%'), height: hp('15%'), padding: wp('1%') }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%'), }}>Television</Text>
                                    {/* <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', }}>TV</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%'), }}>Linen</Text>
                                    {/* <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', }}>Geyser</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%'), }}>Attendant Couch</Text>
                                    {/* <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', }}> Drawers</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%'), }}>Fully Equiped</Text>
                                    {/* <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', }}> Drawers</Text> */}
                                </View>
                            </View>
                            {/* <View style={{ width: wp('0.5%'), height: hp('14%'), backgroundColor: Colors.white }} /> */}


                            <View style={{ width: wp('38.5%'), height: hp('15%'), padding: wp('1%'), }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%'), }}>F&B Expenses</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        {/* <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('1.8%')} /> */}
                                        <Text style={{ fontSize: hp('1.8%') }}>₹1200</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%') }}>RPO</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        {/* <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('1.8%')} /> */}
                                        <Text style={{ fontSize: hp('1.8%') }}>₹700</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                    <Text style={{ fontSize: hp('1.8%') }}>Visit Charges</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        {/* <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('1.8%')} /> */}
                                        <Text style={{ fontSize: hp('1.8%') }}>₹1500</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), }}>
                                    <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', color: Colors.black }}>Total Amount</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        {/* <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('1.8%')} /> */}
                                        <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', color: Colors.black }}>₹3400</Text>
                                    </View>
                                </View>
                            </View>

                        </View>


                    </View>
                    <View style={{ width: wp('21%'), height: hp('19%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderBottomRightRadius: hp('2%') }}>
                        <TouchableOpacity style={{ width: wp('18%'), height: hp('4%'), borderRadius: hp('1%'), backgroundColor: Colors.skyblue, alignItems: 'center', justifyContent: 'center' }} onPress={props.t1}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: Colors.black }}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </DropShadow>
    )
}



export default HospitalWard;