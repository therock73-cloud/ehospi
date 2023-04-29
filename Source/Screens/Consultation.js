import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';

const Consultation = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{fontSize: 36, fontWeight: 'bold', color: Colors.lightBlue}}>
            Coming Soon....
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Consultation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wp('2%'),
    width: wp('100%'),
    height: hp('66%'),
  },
});
