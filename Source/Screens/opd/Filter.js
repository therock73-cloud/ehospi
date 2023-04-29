import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import RangeSlider from 'rn-range-slider';
import Label from './slider/Label';
import Rail from './slider/Rail';
import RailSelected from './slider/RailSelected';
import Notch from './slider/Notch';
import Thumb from './slider/Thumb';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {max} from 'lodash';
const {width, height} = Dimensions.get('window');

const Filter = () => {
  const [isSelected, setSelection] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(50);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  console.log(low);
  console.log(high);

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Text
        style={{
          marginTop: 20,
          marginLeft: 20,
          fontSize: 20,
          fontWeight: '700',
          color: '#000',
        }}>
        Filter
      </Text>

      <View
        style={{
          flex: 1,
          marginTop: 20,
          width: width * 0.9,
          alignSelf: 'center',
        }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              color: '#000',
            }}>
            Gender
          </Text>

          <View
            style={{
              flexDirection: 'row',

              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                marginRight: width * 0.06,
              }}>
              <AntDesign name="checksquare" size={24} color="#2580D3" />

              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  fontFamily: 'Roboto-Regular',
                  marginLeft: 15,
                }}>
                Male Doctor{' '}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <AntDesign name="checksquare" size={24} color="#2580D3" />

              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  fontFamily: 'Roboto-Regular',
                  marginLeft: 15,
                }}>
                Female Doctor
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              Experiance
            </Text>
            {/* <Image source={require('../../Assets/Images/filterascending.png')} /> */}
            <View
              style={{
                backgroundColor: '#2580D3',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto-Regular',
                  paddingVertical: '4%',
                  paddingHorizontal: '8%',
                  color: '#fff',
                }}>
                10 Years
              </Text>
            </View>
          </View>
          <RangeSlider
            style={{marginTop: '5%'}}
            min={0}
            max={50}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              paddingHorizontal: '2%',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              {low} years
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              {high} years
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              Consultation Fee
            </Text>
            <View
              style={{
                backgroundColor: '#2580D3',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto-Regular',
                  paddingVertical: '4%',
                  paddingHorizontal: '8%',
                  color: '#fff',
                }}>
                2000
              </Text>
            </View>
          </View>
          <RangeSlider
            style={{marginTop: '5%'}}
            min={0}
            max={100}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              Availability
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View
              style={{
                backgroundColor: '#2580D3',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginRight: '10%',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto-Regular',
                  paddingVertical: '4%',
                  paddingHorizontal: '8%',
                  color: '#fff',
                }}>
                Availability Today
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#2580D3',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto-Regular',
                  paddingVertical: '4%',
                  paddingHorizontal: '8%',
                  color: '#fff',
                }}>
                Availability Tomorrow
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View
              style={{
                backgroundColor: '#2580D3',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                marginRight: '10%',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Roboto-Regular',
                  paddingVertical: '4%',
                  paddingHorizontal: '8%',
                  color: '#fff',
                }}>
                Availability in next 7 days
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                color: '#000',
              }}>
              Rating
            </Text>
          </View>

          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                justifyContent: 'space-between',
                width: width * 0.55,
              }}>
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="staro" size={24} color="#787878" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  color: '#787878',
                  marginLeft: '5%',
                }}>
                & Up
              </Text>
            </View>
            <Fontisto name="radio-btn-active" size={24} color="#2580D3" />
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                justifyContent: 'space-between',
                width: width * 0.55,
              }}>
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="staro" size={24} color="#787878" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  color: '#787878',
                  marginLeft: '5%',
                }}>
                & Up
              </Text>
            </View>
            <Fontisto name="radio-btn-passive" size={24} color="#2580D3" />
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                justifyContent: 'space-between',
                width: width * 0.55,
              }}>
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="star" size={24} color="#DCBB0B" />
              <AntDesign name="staro" size={24} color="#787878" />
              <AntDesign name="staro" size={24} color="#787878" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  color: '#787878',
                  marginLeft: '5%',
                }}>
                & Up
              </Text>
            </View>
            <Fontisto name="radio-btn-passive" size={24} color="#2580D3" />
          </View>
          <View
            style={{
              backgroundColor: '#7083DE',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              width: '100%',
              height: height * 0.06,
              alignSelf: 'center',
              marginVertical: 30,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Roboto-Regular',

                color: '#fff',
              }}>
              Apply
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
