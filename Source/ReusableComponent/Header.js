import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const Header = (props) => {

    return (
        <View
            style={{
                width: wp('100%'),
                height: hp('8%'),
                backgroundColor: props.bgColor,
                paddingHorizontal: wp('4%'),
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <TouchableOpacity onPress={props.onPress}>
                <FontAwesome5 style={{fontSize: hp('2.5%')}} name='angle-left' color={props.color} size={hp('4%')} />
            </TouchableOpacity>
            <Text style={{ fontSize: hp('2%'), color: props.color, marginLeft: wp('5%') }}>{props.title}</Text>
        </View>
    )
}


export default Header;
