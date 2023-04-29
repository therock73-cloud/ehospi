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
import Colors from '../../Assets/Constants/Colors';
import {WebView} from 'react-native-webview';

const TermsAndCondition = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Terms And Condition',
    });
  }, [navigation]);
  return (
    <WebView source={{uri: 'https://easywellness.in/terms-of-use'}} />

    // <SafeAreaView>
    //     <ScrollView>
    //         <View style={styles.container}>
    //             <Text style={{ fontSize:38,fontWeight: 'bold',  color: Colors.lightBlue }}>Coming Soon......</Text>
    //         </View>
    //     </ScrollView >
    // </SafeAreaView>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wp('2%'),
    width: wp('100%'),
    height: hp('66%'),
  },
});
