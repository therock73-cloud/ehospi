import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
const BedCard = (props) => {

    return (
        <View style={{ width: wp('98%'), height: hp('22%'), flexDirection: 'row', borderWidth: 0.2, marginTop: hp('2%'),borderRadius:hp('1%') }}>
            <View style={{ width: wp('15%'), height: hp('30%'), }}>
                <Image source={require('../Assets/Images/Grid.png')}
                    style={{ width: wp('10%'), height: hp('5%'), alignSelf: 'center', marginTop: hp('2%'), borderRadius: hp('1%') }} />
            </View>
            <View style={{ width: wp('60%'), height: hp('30%'), }}>
                <View style={{ height: hp('10%'), padding: wp('4%'), }}>
                    <Text style={styles.txt}>{props.t1}</Text>
                    <Text style={styles.txt}>{props.t2}</Text>
                </View>
                <View style={{ height: hp('7%'), flexDirection: 'row', justifyContent: 'space-between', padding: wp('4%'), }}>
                    <Text style={{ color: Colors.darkGray, fontSize: hp('2.5%') }}>Available <Text style={{ fontSize: hp('2.5%'), color: 'pink', }}> 96</Text></Text>
                    <Text style={{ color: Colors.darkGray, fontSize: hp('2.5%') }}>Total <Text style={{ fontSize: hp('2.5%'), color: 'pink', }}> 100</Text></Text>
                </View>
                <Text style={{ paddingLeft: wp('4%'), paddingTop: hp('1%') }}>Last update about an hour ago</Text>
            </View>
            <View style={{ width: wp('25%'), }}>
                <View style={{ height: hp('10%'), padding: wp('4%'), alignItems: 'flex-end' }}>
                    <FontAwesome5Icon name='heart' size={hp('4%')} color={Colors.lightYellow} />
                </View>
                <View style={{ height: hp('7%'), flexDirection: 'row', justifyContent: 'space-between', paddingLeft: wp('1%'), paddingTop: wp('4%'), }}>
                    <Text style={{ fontSize: hp('2.5%'), color: Colors.black }}>1650 <Text style={{ fontSize: hp('2.5%'), color: Colors.darkGray }}>/Day</Text> </Text>
                </View>
                <TouchableOpacity onPress={props.book}>
                    <Text style={{ paddingLeft: wp('4%'), paddingTop: hp('1%'), color: Colors.greenSyan }}>Book Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


export default BedCard;

const styles = StyleSheet.create({

    txt: {
        fontWeight: 'bold',
        fontSize: hp('2.7%')
    }

})
