import React from 'react'
import { Text, TouchableOpacity, Image, } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
const CardImages = (props) => {

    return (

        <TouchableOpacity style={{ padding: wp('6%'), justifyContent: 'space-evenly', marginTop: hp('2%'), }}>
            <Image resizeMode='cover' source={props.image}
                style={{ width: wp('90%'), height: hp('20%'), borderRadius: hp('2%') }} />
            <Text style={{ alignSelf: "flex-end", marginTop: -hp('10%'), fontWeight: 'bold', fontSize: hp('4%'), color: Colors.white }}>{props.number}</Text>
        </TouchableOpacity>
    )
}


export default CardImages;