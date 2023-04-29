import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
const MarginGrid = (props) => {

    return (
        <View style={{ width: wp('100%'), height: hp('6%'), flexDirection: 'row', marginTop: hp('1%'), }}>
            <View style={{ width: wp('45%'), height: hp('6%'), flexDirection: 'row', alignItems: 'center', paddingLeft: wp('4%') }}>
                <TouchableOpacity >
                    <FontAwesome5 name={props.name1} color={Colors.darkGray} size={hp('2%')} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('1.8%'), color: Colors.darkGray, marginLeft: wp('7%'), }}>{props.t1} </Text>

            </View>
            <View style={{ width: wp('55%'), height: hp('6%'), flexDirection: 'row', alignItems: 'center', paddingLeft: wp('8%'), }}>
                <TouchableOpacity >
                    <FontAwesome5 name={props.name2} color={Colors.darkGray} size={hp('2%')} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('1.8%'), color: Colors.darkGray, marginLeft: wp('7%'), }}>{props.t2} </Text>

            </View>
        </View>
    )
}


export default MarginGrid;