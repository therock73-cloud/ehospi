import React from 'react'
import { Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import Colors from '../Assets/Constants/Colors';
import { Rating } from 'react-native-ratings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const DoctorCard = (props) => {

    return (
        <View style={{ width: wp('100%'), height: hp('15%'), flexDirection: 'row', marginTop: hp('2%'),backgroundColor:Colors.white }}>
            <View style={{ width: wp('21%'), height: hp('15%'), padding: wp('1%'), alignItems: 'center', justifyContent: 'center', }}>
                <Image source={require('../Assets/Images/Doctor3.png')}
                    style={{ width: wp('19%'), height: wp('19%'), borderRadius: hp('1%') }} />
            </View>
            <View style={{ width: wp('60%'), height: hp('15%'), }}>
                <View style={{ width: wp('60%'), height: hp('9%'), justifyContent: 'center', }}>
                    <Text style={{ marginLeft: wp('1%'), fontWeight: 'bold', fontSize: hp('2.5%') }}>{props.t1}</Text>
                    <Text style={{ marginLeft: wp('1%'), fontSize: hp('2%') }}>{props.text2}</Text>
                </View>
                <View style={{ width: wp('60%'), height: hp('6%'), flexDirection: 'row', justifyContent: 'space-between', padding: wp('2%'), }}>
                    <Text style={{ color: Colors.darkGray, fontSize: hp('2%') }}>Exp.<Text style={{ fontSize: hp('2%'), color: Colors.black }}>{props.text3}</Text></Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: Colors.darkGray, fontSize: hp('2%') }}>Fees</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: hp('2%'), marginLeft: wp('1%') }}>{props.charges}</Text>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('1%') }}>
                            
                            <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('2%')} />
                            <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>{props.charges}</Text>
                        </View> */}
                    </View>

                </View>

            </View>
            <View style={{ width: wp('19%'), height: hp('15%'), }}>
                <View style={{ width: wp('20%'), height: hp('9%'), }}>
                    {/* <Text>Rating</Text> */}
                </View>
                <View style={{ width: wp('20%'), height: hp('6%'), alignItems: 'center', justifyContent: 'center', }}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={wp('3%')}
                        onFinishRating={(rating) => {
                            Alert.alert('Star Rating: ' + JSON.stringify(rating));
                        }}
                    />
                </View>
            </View>
        </View>
    )
}


export default DoctorCard;