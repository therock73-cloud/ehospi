import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
import {Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import HospitalCard from '../HospitalCard';
import axios from 'axios';
import {baseurl} from '../../Config/baseurl';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updateToken} from '../../Redux/actions/auth';
import {refreshTokenService} from '../../Services/auth';

const findAllHospital = baseurl + 'user/findHospital';
import HospitalList from '../../ReusableComponent/HospitalList';
const GeneralBeds = props => {
  const dispatch = useDispatch();
  const [getValue, setGetValue] = useState(null);
  const [getTokenId, setTokenId] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [jatin, setJatin] = useState([]);
  const [hospitaddddddddlList, setHospitaldddddddList] = useState([]);
  const [get1, set1] = useState([]);
  const [getInsuranceHospitalData, setInsuranceHospitalData] = useState([]);
  const [theArray, setTheArray] = useState([]);
  const [selectedHospitalCode, setSelectedHospitalCode] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [getInsuranceName, setInsuranceName] = useState([]);
  const [getDropdownValue, setDropdownValue] = useState('Self Pay');
  const [getsetKmm, setKmm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allHospital, setAllHospital] = useState([]);
  const [refreshToken, setRefreshToken] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    getHospitalService();
    getInsuranceList();
  }, []);

  // useEffect(() => {
  //   getValueFunction();
  //   getInsuranceList();
  // }, [getTokenId]);

  useEffect(() => {
    const backAction = () => {
      console.log('You can not go Back');
      props.navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const getHospitalService = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    console.log(token);
    setIsLoading(true);

    try {
      let URL = baseurl + 'user/findHospital';
      // console.log('API URL endpoint = ', URL);
      let config = {
        headers: {Authorization: `Bearer ${token}`},
      };
      let res = await axios.get(URL, config);
      console.log("kewal reso" + res.data);
      const finalResponse = {success: true, data: res.data};
      // console.log('token', token);
      // console.log(finalResponse);
      // console.log(finalResponse.data);

      if (finalResponse.success === true) {
        setHospitaldddddddList(finalResponse.data);
        setAllHospital(finalResponse.data);
      } else {
        console.log(finalResponse.message);
      }
      // return finalResponse;
    } catch (e) {
      return {
        success: false,
        data: {},
        message: 'ERROR IS HERE :' + e,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getInsuranceList = async () => {
    const token = await AsyncStorage.getItem('tokenId');

    setIsLoading(true);
    fetch(baseurl + 'user/findInsurance', {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        let p = responseJson.map(it => {
          return {insurance: it.insurance + ' (' + it.tpa + ')'};
        });
        p.unshift({insurance: 'Self Pay'});
        setInsuranceName(p);
        // console.log(responseJson);
      })
      .catch(error => {
        // console.error(error);
      })
      .finally(() => setIsLoading(false));
  };
  const insuranceSelect = item => {
    let c, m, j;
    item && (c = item.insurance.split('('));
    item && (m = c[0].trim());
    item && (j = c[1].split(')')[0]);
    let p;
    item ? (p = m) : '';
    setIsLoading(true);
    console.log(baseurl + 'user/insuranceHospital/' + m + '/' + j);
    axios
      .get(baseurl + 'user/insuranceHospital/' + m + '/' + j, {
        headers: {Authorization: `Bearer ${getTokenId}`},
      })
      .then(response => {
        setHospitaldddddddList(response.data);
        setAllHospital(response.data);
        // console.log('------------------------------');
        // console.log('response', response.data[0].data);
        // console.log('------------------------------');

      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = allHospital.filter(function (item) {
        const itemData = item.hospitalName
          ? item.hospitalName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setHospitaldddddddList(newData);
      setSearch(text);
    } else {
      setHospitaldddddddList(allHospital);
      setSearch(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: wp('70%'),
          alignSelf: 'center',
        }}
      />
    );
  };

  // console.log('hospitaddddddddlList', hospitaddddddddlList);
  // console.log('allHospital', allHospital);
  // console.log('getDropdownValue', getDropdownValue);

  return (
    <View style={styles.contnr}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{
          marginTop: hp('4.5%'),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-start',
        }}>
        <Ionicons name="md-chevron-back" size={hp('4%')} color="#249cf2" />
        {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
      </TouchableOpacity>
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#B2F3FF', '#0489D6']}
        style={{
          borderBottomLeftRadius: hp('3%'),
          borderBottomRightRadius: hp('3%'),
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            marginTop: hp('4.5%'),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <Ionicons name="md-chevron-back" size={hp('4%')} color="#249cf2" />
        </TouchableOpacity>

        <View
          style={{
            width: wp('100%'),
            height: hp('15%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: wp('2%'),
            alignItems: 'center',
          }}>
          <View style={{padding: wp('2%')}}>
            <Text style={{fontSize: hp('2.5%'), color: Colors.white}}>
              Hi, {getValue}
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: hp('3%'),
                color: Colors.white,
              }}>
              Find Your Hospital{' '}
            </Text>
          </View>
        </View>
      </LinearGradient> */}

      <Searchbar
        style={{
          width: wp('85%'),
          height: hp('7%'),
          alignSelf: 'center',

          // marginTop: -hp('3.5%'),
          borderRadius: hp('5%'),
        }}
        inputStyle={{fontSize: 12, paddingLeft: 0}}
        placeholder="Search any hospital/Nursing Home/Clinic"
        onChangeText={text => searchFilterFunction(text)}
        value={search}
      />
      {isLoading ? (
        <ActivityIndicator
          color="#bc2b78"
          size="large"
          style={{flex: 1, alignSelf: 'center', marginTop: 25}}
        />
      ) : (
        <View
          style={{
            height: hp('10%'),
            justifyContent: 'center',
            alignSelf: 'center',
            width: wp('100%'),
            alignItems: 'center',
          }}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#249cf2'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={getInsuranceName}
            maxHeight={300}
            labelField="insurance"
            valueField="insurance"
            placeholder={getDropdownValue}
            // searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              // setValue(item.insurance);
              console.log("item",item)
              //setValue((item.insurance == 'Self Pay') ? selfPay() : item.insurance )
              setValue(
                item.insurance == 'Self Pay'
                  ? getHospitalService()
                  : item.insurance
                  ? insuranceSelect(item)
                  : item.insurance,
              );
              setDropdownValue(item.insurance);
            }}
          />
          <Text style={{color: '#249cf2', fontSize: hp('1.8%')}}>
            Please Select Your Insurance
          </Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <FlatList
          data={hospitaddddddddlList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item, index}) => {
            return (
              <HospitalList
                item={item}
                type={getDropdownValue}
                currentlat={props.route.params.currentlat}
                currentlng={props.route.params.currentlng}
            />
              
            );
          }}
          // renderItem={ ItemView  => await(
          //     // return a component using that data
          //   )}
        />
      </View>
    </View>
  );
};

export default GeneralBeds;

const styles = StyleSheet.create({
  contnr: {
    // width: wp('100%'),
    // height: hp('75%'),
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: hp('2.7%'),
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    height: hp('5%'),
    borderColor: '#0489D6',
    borderWidth: wp('0.3%'),
    borderRadius: 8,
    //paddingHorizontal: 8,
    width: wp('95%'),
    // backgroundColor:'green'
  },
  icon: {
    marginRight: wp('0.5%'),
    color: '#249cf2',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'blue',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    marginHorizontal: wp('2%'),
  },
  selectedTextStyle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginHorizontal: wp('2%'),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
