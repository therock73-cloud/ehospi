import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Colors from '../Assets/Constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const HospitalCard = (props) => {

    return (
        <View style={{ width: wp('100%'), height: hp('15%'), marginTop: hp('1.5%'), backgroundColor: Colors.white }}>
            <View style={{ height: hp('9%'), padding: wp('2%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View >
                    <Text style={{ fontSize: hp('2.6%'), color: Colors.black, fontWeight: 'bold' }}>{props.hospital}</Text>
                    <Text style={{ fontSize: hp('1.6%'), color: Colors.lightGray, }}>{props.speciality}</Text>
                </View>
                <TouchableOpacity style={{ width: wp('22%'), height: hp('4.8%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#7BC0EF', borderRadius: hp('1%'), marginRight: hp('1%') }} onPress={props.onPress}>
                    <Text style={{ color: Colors.white, fontWeight: '800', fontSize: hp('1.6%') }}>View & Book</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: hp('6%'), width: wp('100%'), flexDirection: 'row', }}>
                <View style={{ height: hp('6%'), width: wp('65%'), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                    <Text style={{ fontSize: hp('1.5%'), fontWeight: '600', marginLeft: wp('1%') }}>Availability of Beds:</Text>
                    <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: '#7BC0EF', borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{props.t1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: Colors.lightGreen, borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('1%') }}>
                        <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{props.t2}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: hp('6%'), width: wp('35%'), padding: wp('1%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>

                    <Text style={{ fontSize: hp('1.3%'), marginLeft: wp('1%'), color: Colors.black }}>{props.t3}</Text>
                </View>
            </View>
        </View>
    )
}


export default HospitalCard;