import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BedCard from '../../ReusableComponent/BedCard';
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponent/Header';
const DeluxeRooms = (props) => {

    const Data = [
        {
            t1: `Vimhans Nayati Super`, t2: `Speciality Hospital`
        },
        {
            t1: `Dr Ram Manohar`, t2: `Lohia Hospital`
        },
        {
            t1: `Lotus Hospital`
        },
        {
            t1: `Holy Angels Hospital`
        },
        {
            t1: `Fortis Escorts Hearts `, t2: `Okhla Road,New Delhi`
        },
        {
            t1: `Sadar Hospital`
        },

    ]

    return (
        <View style={styles.contnr}>
            <Header color={Colors.black} title='Deluxe Rooms' bgColor={Colors.skyblue} />
            <View style={{ height: hp('92%') }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    data={Data}
                    renderItem={({ item }) =>
                        <BedCard
                            t1={item.t1}
                            t2={item.t2}
                        />
                    }
                />
            </View>
        </View>
    )
}


export default DeluxeRooms;

const styles = StyleSheet.create({
    contnr: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center'

    },
    txt: {
        fontWeight: 'bold',
        fontSize: hp('2.7%')
    }

})
