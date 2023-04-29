import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BedCard from '../../ReusableComponent/BedCard';
import Colors from '../../Assets/Constants/Colors';
import Header from '../../ReusableComponent/Header';
const Favourites = (props) => {

    const Data = [
        {
            t1: `Vimhans Nayati Super`, t2: `Speciality Hospital`
        },
        {
            t1: `Dr Ram Manohar`, t2: `Lohia Hospital`
        },
    ]

    return (
        <View style={styles.contnr}>
            <Header color={Colors.black} title='Favourites' bgColor={Colors.skyblue} />
            <View style={{ height: hp('92%') }}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    data={Data}
                    renderItem={({ item }) =>
                        <BedCard
                            t1={item.t1}
                            t2={item.t2}
                            book={() => props.navigation.navigate('SetData')}
                        />
                    }
                />
            </View>
        </View>
    )
}


export default Favourites;

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
