import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const Circle = (props) => {

    return (
        <TouchableOpacity style={{ width: hp('10%'), height: hp('10%'), backgroundColor: props.color, borderRadius: hp('5%'), alignItems: 'center', justifyContent: 'center', marginHorizontal: wp('3%') }}>
            <Text>{props.time} </Text>
            <Text>{props.formate}</Text>
        </TouchableOpacity>
    )
}


export default Circle;