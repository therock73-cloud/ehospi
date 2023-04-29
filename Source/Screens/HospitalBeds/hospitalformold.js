<SafeAreaView style={{flex: 1}}>
  <KeyboardAvoidingView style={{flex: 1}}>
    <View style={{width: wp('30%'), height: hp('3%'), marginTop: hp('1%')}}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{
          width: wp('8%'),
          height: hp('4%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="md-chevron-back" size={hp('3.2%')} color="#000" />
        {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
      </TouchableOpacity>
    </View>
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        width: width * 0.95,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="md-chevron-back" size={hp('3.2%')} color="#000" />
          {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
        </TouchableOpacity>
        <Text
          style={{
            fontSize: hp('3.5%'),
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
          }}>
          Hospital Form
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: hp('2.3%'),
            fontWeight: 'normal',
            marginLeft: wp('1.5%'),
            color: '#000',
          }}>
          Patient Details
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pname}>
            <TextInput
              style={styles.inputTxt1}
              placeholder="Patient Name"
              value={patientName}
              onChangeText={text => setPatientName(text)}
            />
            <TextInput
              style={styles.inputTxt2}
              placeholder="Visitor Name"
              value={addFamilyMember}
              onChangeText={text => setAddFamilyMember(text)}
            />
          </View>
          <View style={styles.dob}>
            <DatePicker
              style={styles.inputTxt3}
              date={date} // Initial date from state
              mode="date" // The enum of date,
              placeholder="DOB"
              iconComponent={
                <FontAwesome5
                  name="calendar-alt"
                  color="#a9a9a9"
                  size={hp('3%')}
                />
              }
              format="MM-DD-YYYY"
              minDate="01-01-1900"
              maxDate="01-19-2050"
              // display='spinner'
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  alignItems: 'flex-start',
                  paddingLeft: wp('1%'),
                  fontSize: hp('1.5%'),
                },
                dateText: {fontSize: hp('1.8%'), color: 'black'},
                placeholderText: {
                  color: 'black',
                  fontSize: hp('1.5%'),
                },
              }}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              // display='scroll'
              onDateChange={date => {
                setDate(date);
              }}
              androidMode={'spinner'}
            />
            <Picker
              style={styles.inputTxt4}
              selectedValue={selectedGender}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedGender(itemValue)
              }>
              <Picker.Item
                label="Gender"
                value="Gender"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Male"
                value="Male"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Female"
                value="Female"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Other"
                value="Other"
                style={{fontSize: hp('1.8%')}}
              />
            </Picker>
          </View>
          <View style={styles.fname}>
            <TextInput
              style={styles.inputTxt5}
              placeholder="Father/Husband Name"
              value={fName}
              onChangeText={text => setFName(text)}
            />
            <TextInput
              style={styles.inputTxt5}
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <View style={styles.contact}>
            <TextInput
              style={styles.inputTxt6}
              placeholder="Mobile No."
              keyboardType="numeric"
              maxLength={10}
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
            />
            <TextInput
              style={styles.inputTxt7}
              placeholder="Email"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.india}>
            <View
              style={{
                borderRadius: hp('12%'),
              }}>
              <Picker
                style={styles.inputTxt8}
                selectedValue={nationality}
                onValueChange={(itemValue, itemIndex) =>
                  setNationality(itemValue)
                }>
                <Picker.Item
                  label="Nationality"
                  value="nationality"
                  style={{fontSize: hp('1.8%')}}
                />
                <Picker.Item
                  label="Indian"
                  value="indian"
                  style={{fontSize: hp('1.8%')}}
                />
                <Picker.Item
                  label="Other"
                  value="Other"
                  style={{fontSize: hp('1.8%')}}
                />
              </Picker>
            </View>
            <Picker
              style={styles.inputTxt9}
              selectedValue={religion}
              onValueChange={(itemValue, itemIndex) => setReligion(itemValue)}>
              <Picker.Item
                label="Religion"
                value="religion"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Hindu"
                value="hindu"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Muslim"
                value="Muslim"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Sikh"
                value="Sikh"
                style={{fontSize: hp('1.8%')}}
              />
              <Picker.Item
                label="Other"
                value="Other"
                style={{fontSize: hp('1.8%')}}
              />
            </Picker>
          </View>
          <View style={styles.income}>
            <TextInput
              style={styles.inputTxt10}
              placeholder="Monthly Income"
              keyboardType="numeric"
              value={mincome}
              onChangeText={text => setMincome(text)}
            />
            <TextInput
              style={styles.inputTxt11}
              placeholder="Occupation"
              value={occupation}
              onChangeText={text => setOccupation(text)}
            />
          </View>
          <View style={styles.alt}>
            <TextInput
              style={styles.inputTxt12}
              placeholder="Alt. Contact No."
              keyboardType="numeric"
              maxLength={10}
              value={altContactNo}
              onChangeText={text => setAltContactNo(text)}
            />
            <TextInput
              style={styles.inputTxt12}
              placeholder="Doctor Name"
              value={dName}
              onChangeText={text => setDName(text)}
            />
            {/* <View style={styles.inputTxt12}> */}
            {/* <Picker
            style={styles.inputTxt12}
            selectedValue={dName}
            onValueChange={(itemValue, itemIndex) => {
              setDName(itemValue);
              if (itemIndex !== 0) {
                setdrid(drlistData[itemIndex]._id);
              } else {
                setdrid();
              }

              console.log(itemValue, itemIndex);
            }}>
            <Picker.Item
              label="Select Dcotor"
              value={0}
              style={{fontSize: hp('1.8%')}}
            />
            {drlistData.length > 0
              ? drlistData.map(item => {
                  return (
                    <Picker.Item
                      label={item.doctor_name}
                      value={item.doctor_name}
                      // value={{id: item._id, drname: item.doctor_name}}
                      style={{fontSize: hp('1.8%')}}
                    />
                  );
                })
              : null}
          </Picker> */}
            {/* </View> */}
          </View>
          <View style={styles.upload}>
            <View
              style={{
                width: wp('47%'),
                height: hp('7%'),
                backgroundColor: '#d3d3d3',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp('2%'),
                borderRadius: hp('2%'),
              }}>
              <TextInput
                style={styles.inputTxt13}
                placeholder={
                  prescription ? prescription.name : 'prescription Upload'
                }
                value={prescription ? prescription.name : 'prescription Upload'}
                editable={false}
                onChangeText={text => setUploadP(text)}
              />
              <TouchableOpacity onPress={selectOneFile}>
                <FontAwesome5
                  name="plus-circle"
                  color="#2581d4"
                  size={hp('3%')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp('42%'),
                height: hp('7%'),
                backgroundColor: '#d3d3d3',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wp('2%'),
                borderRadius: hp('2%'),
                marginRight: wp('2.5%'),
              }}>
              <TextInput
                style={styles.inputTxt14}
                placeholder={idProof ? idProof.name : 'Upload Id Proof'}
                value={idProof ? idProof.name : 'Upload Id Proof'}
                editable={false}
                onChangeText={text => setUploadId(text)}
              />
              <TouchableOpacity onPress={uploadIdProof}>
                <FontAwesome5
                  name="plus-circle"
                  color="#2581d4"
                  size={hp('3%')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {!isSelfPay && (
            <View>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  fontWeight: 'normal',
                  marginTop: wp('1%'),
                  marginLeft: wp('2%'),
                }}>
                Insurance Claim
              </Text>
              <View style={styles.policy}>
                <View
                  style={{
                    width: wp('92%'),
                    height: hp('7%'),
                    backgroundColor: '#d3d3d3',
                    flexDirection: 'row',
                    borderRadius: hp('2%'),
                  }}>
                  <TextInput
                    style={styles.inputTxt20}
                    placeholder={
                      insuranceClaim ? insuranceClaim.name : 'Medical Insurance'
                    }
                    value={
                      insuranceClaim ? insuranceClaim.name : 'Medical Insurance'
                    }
                    editable={false}
                    onChangeText={text => setMinsurance(text)}
                  />
                  <TouchableOpacity
                    style={{
                      width: wp('12%'),
                      height: hp('7%'),
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: wp('1%'),
                    }}
                    onPress={uploadInsuranceClaim}>
                    <FontAwesome5
                      name="plus-circle"
                      color="#2581d4"
                      size={hp('3%')}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.inputTxt15}
                  placeholder="Policy No."
                  value={policyNo}
                  onChangeText={text => setPolicyNo(text)}
                />
              </View>
              <View style={styles.employer}>
                <TextInput
                  style={styles.inputTxt16}
                  placeholder="Employer Name"
                  value={empName}
                  onChangeText={text => setEmpName(text)}
                />
                <TextInput
                  style={styles.inputTxt17}
                  placeholder="Employer ID"
                  value={empId}
                  onChangeText={text => setEmpId(text)}
                />
              </View>
            </View>
          )}
          <SafeAreaView style={styles.termsCondition}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              tintColors={{true: '#2581d4', false: ''}}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={{fontSize: hp('1.8%')}}>Read the </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('TermsAndCondtions')}>
              <Text
                style={{
                  fontSize: hp('1.5%'),
                  color: '#2581d4',
                  textDecorationLine: 'underline',
                }}>
                Terms{' '}
              </Text>
            </TouchableOpacity>
            <Text>
              {' '}
              <Text>{'&'}</Text>{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('TermsAndCondtions')}>
              <Text
                style={{
                  fontSize: hp('1.5%'),
                  color: '#2581d4',
                  textDecorationLine: 'underline',
                }}>
                {' '}
                Conditions{' '}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
          {isLoading ? (
            <ActivityIndicator
              color="#bc2b78"
              size="large"
              style={{flex: 1, alignSelf: 'center'}}
            />
          ) : (
            <TouchableOpacity
              style={styles.btn}
              //onPress={userProfileData}
              onPress={() => {
                userProfileData();
              }}
              // onPress = {() =>  props.navigation.navigate('SemiPrivateRoom')}
            >
              <Text style={{color: 'white', fontSize: hp('2.5%')}}>Submit</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <View style={{bottom: 0}}>
        <Modal
          isVisible={modalVisible}
          animationIn="zoomIn"
          animationOutTiming={500}
          animationInTiming={500}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          // style={{ width: wp('90%'), }}
        >
          <View
            style={{
              width: wp('90%'),
              height: hp('25%'),
              backgroundColor: 'white',
              borderRadius: hp('1%'),
              justifyContent: 'center',
            }}>
            {/* <View style={styles.centeredView}> */}
            <View
              style={{
                width: wp('88%'),
                height: hp('10%'),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  width: wp('88%'),
                  height: hp('7%'),
                  paddingLeft: wp('2%'),
                  alignItems: 'center',
                  marginTop: hp('1%'),
                }}
                onPress={() => captureImage('photo')}>
                <FontAwesome5 name="camera" color="blue" size={hp('3%')} />
                <Text style={{marginLeft: wp('2%')}}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  width: wp('88%'),
                  height: hp('7%'),
                  paddingLeft: wp('2%'),
                  alignItems: 'center',
                  marginTop: hp('1%'),
                }}
                onPress={() => chooseFile('photo')}>
                <FontAwesome5 name="photo-video" color="blue" size={hp('3%')} />
                <Text style={{marginLeft: wp('2%')}}>
                  Photo and Video Library
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </Modal>
      </View>
      <View style={{bottom: 0}}>
        <Modal
          isVisible={payment}
          animationIn="zoomIn"
          animationOutTiming={500}
          animationInTiming={500}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setPayment(false)}
          onSwipeComplete={() => setPayment(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          // style={{ width: wp('90%'), }}
        >
          <View
            style={{
              width: wp('90%'),
              height: hp('20%'),
              backgroundColor: 'white',
              borderRadius: hp('1%'),
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp('88%'),
                height: hp('10%'),
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: wp('40%'),
                  height: hp('6%'),
                  backgroundColor: '#2581d4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: hp('1%'),
                }}>
                <Text style={{fontSize: hp('2%'), color: 'white'}}>
                  Pay at Hospital
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: wp('40%'),
                  height: hp('6%'),
                  backgroundColor: '#2581d4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: hp('1%'),
                }}>
                <Text style={{fontSize: hp('2%'), color: 'white'}}>
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{bottom: 0}}>
        <Modal
          isVisible={thankYou}
          animationIn="zoomIn"
          animationOutTiming={500}
          animationInTiming={500}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setThankYou(false)}
          onSwipeComplete={() => setThankYou(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          // style={{ width: wp('90%'), }}
        >
          <View
            style={{
              width: wp('90%'),
              height: hp('58%'),
              backgroundColor: 'white',
              borderRadius: hp('1%'),
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: wp('88%'),
                height: hp('57%'),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', marginRight: wp('2%')}}
                onPress={() => setThankYou(false)}>
                <FontAwesome5
                  name="times"
                  size={hp('2.5%')}
                  color={Colors.black}
                />
              </TouchableOpacity>
              <Image
                source={require('../../Assets/Images/Group.png')}
                style={{
                  width: hp('18%'),
                  height: hp('18%'),
                  borderRadius: hp('10%'),
                }}
              />
              <Text style={styles.modalText}>Thank You!</Text>
              <Text style={styles.modalText2}>Your Booking Successful</Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                Booking ID:{hjkhdjasdas.bookingId}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  marginBottom: 5,
                }}>
                You booked a bed in {getValue} Hospital on
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  marginBottom: 5,
                }}>
                {hjkhdjasdas.bookingDate}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  marginBottom: 5,
                }}>
                {hjkhdjasdas.bookingTime}
              </Text>
              <CustomButton
                onPress={() => props.navigation.navigate('BookingHistory')}
                title={'DONE'}
                bgColor={'#2581d4'}
                width={wp('75%')}
                height={hp('7%')}
                color={Colors.white}
                fontSize={hp('2.5%')}
                alignSelf={'center'}
                padding={hp('8%')}
                borderRadius={hp('2%')}
                marginTop={hp('1.5%')}
              />
              {/* <TouchableOpacity
                style={{marginTop: hp('1%')}}
                onPress={() => props.navigation.navigate('BookingSlot')}>
                <Text style={{alignSelf: 'center', color: Colors.blue}}>
                  <Text style={{fontWeight: 'bold'}}></Text> Edit Your
                  Appointment
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  </KeyboardAvoidingView>
</SafeAreaView>;
