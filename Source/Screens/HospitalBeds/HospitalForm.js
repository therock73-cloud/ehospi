import {
  LogBox,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Dimensions,
  // Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
//import { Calendar } from 'react-native-calendario';
// import { Checkbox } from 'react-native-paper';
import CustomButton from '../../ReusableComponent/Button';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {validForm} from '../../utils/validator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {baseurl} from '../../Config/baseurl';
import axios from 'axios';
// import RNFetchBlob from 'rn-fetch-blob';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

const userHospitalFormReg = baseurl + 'user/bookBed/';

const HospitalForm = ({props, route, navigation}) => {
  const [drlistData, setdrlistData] = useState([]);
  const [hospital_id, sethospital_id] = useState();
  const [drid, setdrid] = useState();
  const [patientName, setPatientName] = useState('');
  const [addFamilyMember, setAddFamilyMember] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [fName, setFName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nationality, setNationality] = useState('');
  const [religion, setReligion] = useState('');
  const [mincome, setMincome] = useState('');
  const [occupation, setOccupation] = useState('');
  const [altContactNo, setAltContactNo] = useState('');
  const [dName, setDName] = useState('');
  const [uploadP, setUploadP] = useState('');
  const [uploadId, setUploadId] = useState('');
  const [minsurance, setMinsurance] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [empName, setEmpName] = useState('');
  const [empId, setEmpId] = useState('');
  const [getHospitalCode, setHospitalCode] = useState('');
  const [getValue, setGetValue] = useState('');
  const [date, setDate] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  // CheckBox
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [singleFile, setSingleFile] = useState('');
  const [filePath, setFilePath] = useState({});
  const [gettotalCharges, settotalCharges] = useState('');
  const [getDate, setGetDate] = useState('');
  const [getTime, setGetTime] = useState('');
  const [getFormate, setGetFormate] = useState('');
  const [getWard, setWard] = useState('');
  const [thankYou, setThankYou] = useState(false);
  const [payment, setPayment] = useState(false);
  const [hjkhdjasdas, setjkhjkdhsjks] = useState('');
  const [getTokenId, setTokenId] = useState('');
  const [isSelfPay, setIsSelfPay] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [insuranceClaim, setInsuranceClaim] = useState(null);
  const [idProof, setIdProof] = useState(null);

  const [nationalitydata, setnationalitydata] = useState([]);
  const [genderdata, setgenderdata] = useState([]);
  const [religiondata, setreligiondata] = useState([]);
  const [relationdata, setrelationdata] = useState([]);

  const [prescriptionmodal, setprescriptionmodal] = useState(false);
  const [idproofmodal, setidproofmodal] = useState(false);
  const [medicalinsurancemodal, setmedicalinsurancemodal] = useState(false);

  const [prescriptiontype, setprescriptiontype] = useState();
  const [idprooftype, setidprooftype] = useState();
  const [medicalinsurancetype, setmedicalinsurancetype] = useState();
  const validForm = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const reg = /^[0-9]*$/;
    const rule = /^[a-zA-Z ]{2,40}$/;
    const pattern = /[1-9]/g;
    const dn = /[A-Za-z]$/;
    const DOB_REGEX =
      /^((0[0-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01]))-((20[012]\d|19\d\d)|(1\d|2[0123]))$/;
    console.log(reg.test(mobileNumber));
    if (rule.test(patientName) == '') {
      return 'Enter Valid Patient Name';
    } else if (rule.test(addFamilyMember) == '') {
      return 'Enter Valid Visitor Name';
    } else if (DOB_REGEX.test(date) == '') {
      return 'Select Your Date of Birth';
    } else if (selectedGender == '') {
      return 'Select Your Gender';
    } else if (rule.test(fName) == '') {
      return 'Enter Your Valid Fathers/Husband Name';
    } else if (address == '') {
      return 'Enter Your Valid Address';
    } else if (
      reg.test(mobileNumber) == false ||
      mobileNumber == '' ||
      mobileNumber.length != 10
    ) {
      return 'Enter Your Valid Mobile No.';
    } else if (emailRegex.test(email) == '') {
      return 'Enter Your Valid Email';
    } else if (nationality == '') {
      return 'Select Your Nationality';
    } else if (religion == '') {
      return 'Select Your Religion';
    } else if (pattern.test(mincome) == '') {
      return 'Enter Your Monthly Income Correctly';
    } else if (rule.test(occupation) == '') {
      return 'Enter your Occupation';
    } else if (
      reg.test(altContactNo) == false ||
      altContactNo == '' ||
      altContactNo.length != 10
    ) {
      return 'Enter correct Alt.Contact No.';
    } else if (dn.test(dName) == '') {
      return 'Enter Doctor Name';
    } else if (!isSelfPay && policyNo == '') {
      return 'Enter Your PolicyNo.';
    } else if (!isSelfPay && rule.test(empName) == '') {
      return 'Enter Employer Name';
    } else if (!isSelfPay && empId == '') {
      return 'Enter Employer Id';
    } else if (toggleCheckBox === false) {
      return 'Click on Checkbox to Confirm then Submit';
    } else if (!isSelfPay && !insuranceClaim) {
      return 'Upload Insurance Claim';
    } else {
      return 1;
    }
    // } else if (!prescription) {
    //   return 'Upload Prescription';
    // } else if (!idProof) {
    //   return 'Upload ID Proof';
    // }
  };

  // console.log('get booking Details========' + getTokenId);
  const [dataroute, setdataroute] = useState();

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'componentWillReceiveProps',
    ]);
    // setdataroute({
    // amenities: route.params.amenities,  //np need
    // bedName: route.params.bedName,
    // amenitiesCharges: route.params.amenitiesCharges,  //np need
    // bedCharges: route.params.bedCharges,  //np need
    // facilitiesCharges: route.params.facilitiesCharges,  //np need
    // totalCharges: route.params.totalCharges,
    // hospitalCode: route.params.hospitalCode,
    // hospitalAddress: route.params.hospitalAddress,  //np need
    // hospitalName: route.params.hospitalName,
    // date: route.params.date,
    // timing: route.params.timing,
    // formate: route.params.formate,
    // selfPay: route.params.selfPay,
    // hospital_id: route.params.hospital_id,
    // });

    setIsSelfPay(route.params.selfPay);
    sethospital_id(route.params.hospital_id);
    setWard(route.params.bedName);
    setGetValue(route.params.hospitalName);
    setHospitalCode(route.params.hospitalCode);
    settotalCharges(route.params.totalCharges);
    setGetDate(route.params.date);
    setGetTime(route.params.timing);
    setGetFormate(route.params.formate);

    Doctorlist(route.params.hospital_id);
    // GetBookBedData();
    // getBookinDetails();
    Getnationalitydata();
    Getgenderdata();
    Getreligiondata();
    Getrelationdata();
  }, []);
  console.log(
    getDate.split('-')[2] +
      '/' +
      getDate.split('-')[1] +
      '/' +
      getDate.split('-')[0],
  );
  // var hhhh = {
  //   amenities: ['Amenity2,Amenity3,Amenity4'],
  //   amenitiesCharges: 99,
  //   bedCharges: 1200,
  //   bedName: 'Bed 1',
  //   date: '2023/02/24',
  //   facilitiesCharges: 500,
  //   formate: 'AM',
  //   hospitalAddress: '62d8fa7a0a4ad7fb85dae102',
  //   hospitalCode: 'VIZNG1',
  //   hospitalName: 'JP Hospital',
  //   selfPay: true,
  //   timing: '09:00',
  //   totalCharges: 1799,
  // };
  const Getnationalitydata = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(baseurl + 'user/getNationality', requestOptions)
      .then(response => response.json())
      .then(result => {
        setnationalitydata(result);
      })
      .catch(error => console.log('error', error));
  };
  const Getgenderdata = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(baseurl + 'user/getGender', requestOptions)
      .then(response => response.json())
      .then(result => {
        setgenderdata(result);
      })
      .catch(error => console.log('error', error));
  };
  const Getreligiondata = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(baseurl + 'user/getReligion', requestOptions)
      .then(response => response.json())
      .then(result => {
        setreligiondata(result);
      })
      .catch(error => console.log('error', error));
  };
  const Getrelationdata = async () => {
    const token = await AsyncStorage.getItem('tokenId');
    var myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(baseurl + 'user/getRelation', requestOptions)
      .then(response => response.json())
      .then(result => {
        setrelationdata(result);
      })
      .catch(error => console.log('error', error));
  };
  const normalizePath = async path => {
    const prefix = 'file://';
    if (path.startWith(prefix)) {
      path = path.substring(prefix.length);
      try {
        path = decodeURI(path);
      } catch (e) {}
    }
    return path;
  };

  const uploadInsuranceClaim = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res);
      setInsuranceClaim({
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      setmedicalinsurancetype('pdf');
      setmedicalinsurancemodal(false);

      // const path = await normalizePath(res.uri);
      // console.log(path);
      // const result = await RNFetchBlob.fs.readFile(path, 'base64');
      // setSingleFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const ChoosePhotoFromGaleryinsurance = async () => {
    const Images = ImagePicker.openPicker({
      width: wp('100%'),
      height: hp('80%'),
      quality: 1, 
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        setInsuranceClaim({
          uri: Platform.OS === 'android' ? image.path : `file://${image.path}`,
          name: `${Date.now()}.jpg`,
          type: image.mime,
        });
        setmedicalinsurancetype('image');
        setmedicalinsurancemodal(false);
        // this.bs.current.snapTo(1);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const uploadIdProof = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res);
      setIdProof({
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      setidprooftype('pdf');
      setidproofmodal(false);

      // const path = await normalizePath(res.uri);
      // console.log(path);
      // const result = await RNFetchBlob.fs.readFile(path, 'base64');
      // setSingleFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const ChoosePhotoFromGaleryidproof = async () => {
    const Images = ImagePicker.openPicker({
      width: wp('100%'),
      height: hp('80%'),
      quality: 1, 
      cropping: true,
      includeBase64: false,
    })
      .then(image => {
        console.log({
          uri: Platform.OS === 'android' ? image.path : `file://${image.path}`,

          name: `${Date.now()}.jpg`,
          type: image.mime,
        });
        setIdProof({
          uri: Platform.OS === 'android' ? image.path : `file://${image.path}`,

          name: `${Date.now()}.jpg`,
          type: image.mime,
        });
        setidprooftype('image');
        setidproofmodal(false);

        // this.bs.current.snapTo(1);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const selectOneFileprescription = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log('scacasc', res);
      setPrescription({
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });
      setprescriptiontype('pdf');
      setprescriptionmodal(false);

      // const path = await normalizePath(res.uri);
      // console.log(path);
      // const result = await RNFetchBlob.fs.readFile(path, 'base64');
      // setSingleFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('Back to Hospital Form');
      } else {
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const ChoosePhotoFromGaleryprescription = async () => {
    const Images = ImagePicker.openPicker({
      width: wp('100%'),
      height: hp('80%'),
      cropping: true,
      includeBase64: false,
      quality: 1, 
    })
      .then(image => {
        console.log(image);
        setPrescription({
          uri: Platform.OS === 'android' ? image.path : `file://${image.path}`,
          name: `${Date.now()}.jpg`,
          type: image.mime,
        });
        setprescriptiontype('image');
        setprescriptionmodal(false);

        // this.bs.current.snapTo(1);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const GetBookBedData = async () => {
    AsyncStorage.getItem('Ward').then(value => setWard(value));
    AsyncStorage.getItem('Hname').then(hname => setGetValue(hname));
    AsyncStorage.getItem('Hcode').then(code => {
      setHospitalCode(code);
    });
    AsyncStorage.getItem('TotalCharges').then(value => settotalCharges(value));
    AsyncStorage.getItem('date').then(value => setGetDate(value));
    AsyncStorage.getItem('timing').then(
      value => setGetTime(value),
      // console.log('getTime======',getTime)
    );
    AsyncStorage.getItem('formate').then(formate => setGetFormate(formate));
    await AsyncStorage.getItem('tokenId').then(token =>
      //   setGetValue(Hname),
      setTokenId(token),
    );
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  const getBookinDetails = async () => {
    const token = await AsyncStorage.getItem('tokenId');

    const userid = await AsyncStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append('authorization', `Basic ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      appuser_id: userid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.ehospi.in/user/findBookings', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('result', userid);
        const p = result.length - 1;
        console.log('sdfghj', result[p]);
        console.log(result[p].booking_id);
        setjkhjkdhsjks(result[p]);
      })
      .catch(error => console.log('error', error));
    // axios
    //   .get(baseurl + 'user/findBookings/', {
    //     headers: {Authorization: `Bearer ${token}`},
    //   })
    //   .then(response => {
    //     const p = response.data.length - 1;
    //     console.log('sdfghj', response.data[p]);
    //     console.log(response.data[p].bookingId);
    //     setjkhjkdhsjks(response.data[p]);
    //   });
  };

  const appendFormDataSelfPay = userData => {
    console.log('HCODE in Response ' + getHospitalCode);
    userData.append('hospitalCode', getHospitalCode);
    userData.append('bedType', getWard);
    userData.append('bedPrice', gettotalCharges);
    userData.append(
      'bookingDate',
      getDate.split('-')[2] +
        '/' +
        getDate.split('-')[1] +
        '/' +
        getDate.split('-')[0],
    );
    userData.append('bookingTime', getTime + '' + getFormate);
    userData.append('paymentStatus', 'pending');
    userData.append('patientName', patientName);
    userData.append('familyMember', addFamilyMember);
    userData.append('dob', date);
    userData.append('gender', selectedGender);
    userData.append('fatherHusbandName', fName);
    userData.append('address', address);
    userData.append('phone', mobileNumber);
    userData.append('email', email);
    userData.append('nationality', nationality);
    userData.append('religion', religion);
    userData.append('monthlyIncome', Number(mincome));
    userData.append('occupation', occupation);
    userData.append('altPhone', altContactNo);
    userData.append('doctorName', dName);
    userData.append('hospital_id', hospital_id);
    // userData.append('doctor_id', drid);

    if (prescription && idProof) {
      userData.append('prescription', prescription);

      userData.append('idProof', idProof);
    }
  };

  const appendFormDataInsurance = userData => {
    userData.append('policyNumber', policyNo);
    userData.append('employerName', empName);
    userData.append('employerId', empId);

    // userData.append('doctor_id', drid);
    if (insuranceClaim != null) {
      userData.append('insurance', insuranceClaim);
    }
  };

  const userProfileData = async () => {
    const token = await AsyncStorage.getItem('tokenId');

    const validate = validForm();
    let userData = new FormData();
    const id = await AsyncStorage.getItem('user_id');
    const fullyear = new Date().getFullYear();
    const age = fullyear - Number(date.split('-')[2]);
    userData.append('appuser_id', id);
    userData.append('age', age);
    userData.append('relation', 'self');
    userData.append('categoryval', 'Morning');
    if (validate === 1) {
      appendFormDataSelfPay(userData);
      if (!isSelfPay) {
        appendFormDataInsurance(userData);
      }
      console.log(userData);
      console.log('Api called');
      setIsLoading(true);
      if (isSelfPay) {
        console.log('Api called Self Pay', userData);

        fetch(baseurl + 'user/self/bookBed/', {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
          body: userData,
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === 200) {
              getBookinDetails();
              setThankYou(true);
            } else if (data.message === 'Profile already created') {
              alert('user is alredy register');
            } else if ('status code' === 403) {
              alert('please fill all data');
            } else {
              console.log('Error Occured');
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      } else {
        console.log('Api called Insurane');

        fetch(baseurl + 'user/insurance/bookBed/', {
          method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
          body: userData,
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.status === 200) {
              // alert("profile data submitted  successful")
              getBookinDetails();
              setThankYou(true);
            } else if (data.message === 'Profile already created') {
              alert('user is alredy register');
            } else if ('status code' === 403) {
              alert('please fill all data');
            } else {
              console.log('Error Occured');
            }
          })
          .catch(err => {
            // console.log(err);
          })
          .finally(() => setIsLoading(false));

        // axios
        //   .post(baseurl + 'user/insurance/bookBed/', userData, {
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type':
        //         'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
        //       Authorization: `Bearer ${getTokenId}`,
        //     },
        //   })
        //   .then(response => {
        //     console.log('data is coming');
        //     console.log(response.data);
        //     if (response.data.message === 'Registered sucessfull') {
        //       getBookinDetails();
        //       setThankYou(!thankYou);
        //     } else if (response.data.message === 'Profile already created') {
        //       alert('user is alredy register');
        //     } else if ('status code' === 403) {
        //       alert('please fill all data');
        //     } else {
        //       console.log('Error Occured');
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error.response.data);
        //   })
        //   .finally(() => setIsLoading(false));
      }
    } else {
      alert(validate);
    }
  };
  const Doctorlist = id => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.ehospi.in/user/doctorbyhospital_id/' + id,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('result', result);
        setdrlistData(result.response);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    const backAction = () => {
      console.log('You can not go Back');
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const [genderModal, setgenderModal] = useState(false);
  const [nationalityModal, setnationalityModal] = useState(false);
  const [religionModal, setreligionModal] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width,
            justifyContent: 'center',
            marginTop: Platform.OS === 'ios' ? 0 : '7%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
        <Text
          style={{
            fontSize: 18,
            marginLeft: 20,
            color: '#000',
          }}>
          Patient Details
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{width: width * 0.9, alignSelf: 'center', marginTop: 10}}>
            <View style={{...styles.containerRaw}}>
              <TextInput
                style={{...styles.inputTxt1, width: '48%'}}
                placeholder="Patient Name"
                value={patientName}
                onChangeText={text => setPatientName(text)}
              />
              <TextInput
                style={{...styles.inputTxt1, width: '48%'}}
                placeholder="Visitor Name"
                value={addFamilyMember}
                onChangeText={text => setAddFamilyMember(text)}
              />
            </View>
            <View style={styles.containerRaw}>
              <DatePicker
                style={{...styles.inputTxt1, width: '48%'}}
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
              {Platform.OS === 'ios' ? (
                <TouchableOpacity
                  onPress={() => setgenderModal(true)}
                  style={{
                    ...styles.inputTxt1,
                    width: '48%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 12, color: '#000'}}>
                    {selectedGender == '' ? 'Select Gender' : selectedGender}
                  </Text>
                  <FontAwesome5
                    name="caret-down"
                    color="#a9a9a9"
                    size={hp('3%')}
                  />
                </TouchableOpacity>
              ) : (
                <Picker
                  style={{...styles.inputTxt1, width: '48%'}}
                  selectedValue={selectedGender}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedGender(itemValue)
                  }>
                  <Picker.Item
                    label="Gender"
                    value="Gender"
                    style={{fontSize: hp('1.8%')}}
                  />
                  {genderdata.length > 0 &&
                    genderdata.map(item => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          style={{fontSize: hp('1.8%')}}
                        />
                      );
                    })}
                </Picker>
              )}
            </View>

            <TextInput
              style={{...styles.inputTxt5, width: '100%'}}
              placeholder="Father/Husband Name"
              value={fName}
              onChangeText={text => setFName(text)}
            />
            <TextInput
              style={{...styles.inputTxt5, width: '100%'}}
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />

            <View style={styles.containerRaw}>
              <TextInput
                style={{...styles.inputTxt1, width: '48%'}}
                placeholder="Mobile No."
                keyboardType="numeric"
                maxLength={10}
                value={mobileNumber}
                onChangeText={text => setMobileNumber(text)}
              />
              <TextInput
                style={{...styles.inputTxt1, width: '48%'}}
                placeholder="Email"
                value={email}
                onChangeText={email => setEmail(email)}
              />
            </View>
            <View style={styles.containerRaw}>
              {Platform.OS === 'ios' ? (
                <>
                  <TouchableOpacity
                    onPress={() => setnationalityModal(true)}
                    style={{
                      ...styles.inputTxt1,
                      width: '48%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 12, color: '#000'}}>
                      {nationality == '' ? 'Select nationality' : nationality}
                    </Text>
                    <FontAwesome5
                      name="caret-down"
                      color="#a9a9a9"
                      size={hp('3%')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setreligionModal(true)}
                    style={{
                      ...styles.inputTxt1,
                      width: '48%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 12, color: '#000'}}>
                      {religion == '' ? 'Select religion' : religion}
                    </Text>
                    <FontAwesome5
                      name="caret-down"
                      color="#a9a9a9"
                      size={hp('3%')}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Picker
                    style={{...styles.inputTxt1, width: '48%', borderRadius: 8}}
                    selectedValue={nationality}
                    onValueChange={(itemValue, itemIndex) =>
                      setNationality(itemValue)
                    }>
                    <Picker.Item
                      label="Nationality"
                      value="nationality"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {nationalitydata.length > 0 &&
                      nationalitydata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                  <Picker
                    style={{...styles.inputTxt1, width: '48%', borderRadius: 8}}
                    selectedValue={religion}
                    onValueChange={(itemValue, itemIndex) =>
                      setReligion(itemValue)
                    }>
                    <Picker.Item
                      label="Religion"
                      value="religion"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {religiondata.length > 0 &&
                      religiondata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </>
              )}
            </View>
            <View style={styles.containerRaw}>
              <TextInput
                style={{...styles.inputTxt1, width: '48%'}}
                placeholder="Monthly Income"
                keyboardType="numeric"
                value={mincome}
                onChangeText={text => setMincome(text)}
              />
              <TextInput
                style={{...styles.inputTxt1, width: '48%'}}
                placeholder="Occupation"
                value={occupation}
                onChangeText={text => setOccupation(text)}
              />
            </View>

            <TextInput
              style={{...styles.inputTxt5, width: '100%'}}
              placeholder="Alt. Contact No."
              keyboardType="numeric"
              maxLength={10}
              value={altContactNo}
              onChangeText={text => setAltContactNo(text)}
            />
            <TextInput
              style={{...styles.inputTxt5, width: '100%'}}
              placeholder="Doctor Name"
              value={dName}
              onChangeText={text => setDName(text)}
            />

            <View
              style={{
                ...styles.inputTxt1,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingLeft: 10,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000',

                  width: '80%',
                  fontSize: 12,
                }}>
                {prescription != null
                  ? prescription.name
                  : 'prescription Upload'}
              </Text>
              {/* <TextInput
                  style={{color: '#000', fontSize: 14, backgroundColor: 'pink'}}
                  placeholder={
                    prescription ? prescription.name : 'prescription Upload'
                  }
                  value={
                    prescription ? prescription.name : 'prescription Upload'
                  }
                  editable={false}
                  onChangeText={text => setUploadP(text)}
                /> */}
              <TouchableOpacity
                onPress={() => {
                  setprescriptionmodal(true);
                }}>
                <FontAwesome5
                  name="plus-circle"
                  color="#2581d4"
                  size={hp('3%')}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...styles.inputTxt1,
                flexDirection: 'row',
                width: '100%',
                paddingLeft: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000',
                  fontSize: 12,
                  width: '80%',
                }}>
                {idProof ? idProof.name : 'Upload Id Proof'}
              </Text>

              {/* <TextInput
                  style={{color: '#000', fontSize: 14, backgroundColor: 'pink'}}
                  placeholder={idProof ? idProof.name : 'Upload Id Proof'}
                  value={idProof ? idProof.name : 'Upload Id Proof'}
                  editable={false}
                  onChangeText={text => setUploadId(text)}
                /> */}
              <TouchableOpacity
                onPress={() => {
                  setidproofmodal(true);
                }}>
                <FontAwesome5
                  name="plus-circle"
                  color="#2581d4"
                  size={hp('3%')}
                />
              </TouchableOpacity>
            </View>
            {!isSelfPay && (
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 20,
                    color: '#000',
                  }}>
                  Insurance Claim
                </Text>

                <View
                  style={{
                    ...styles.inputTxt1,
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{color: '#000', fontSize: 14, width: '80%'}}>
                    {insuranceClaim ? insuranceClaim.name : 'Medical Insurance'}
                  </Text>
                  {/* <TextInput
                      style={styles.inputTxt20}
                      placeholder={
                        insuranceClaim
                          ? insuranceClaim.name
                          : 'Medical Insurance'
                      }
                      value={
                        insuranceClaim
                          ? insuranceClaim.name
                          : 'Medical Insurance'
                      }
                      editable={false}
                      onChangeText={text => setMinsurance(text)}
                    /> */}
                  <TouchableOpacity
                    style={{
                      width: wp('8%'),
                      height: hp('7%'),
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: wp('1%'),
                    }}
                    onPress={() => {
                      setmedicalinsurancemodal(true);
                    }}>
                    <FontAwesome5
                      name="plus-circle"
                      color="#2581d4"
                      size={hp('3%')}
                    />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={{...styles.inputTxt5, width: '100%'}}
                  placeholder="Policy No."
                  value={policyNo}
                  onChangeText={text => setPolicyNo(text)}
                />

                <View style={styles.containerRaw}>
                  <TextInput
                    style={styles.inputTxt1}
                    placeholder="Employer Name"
                    value={empName}
                    onChangeText={text => setEmpName(text)}
                  />
                  <TextInput
                    style={styles.inputTxt1}
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
                style={{
                  transform: [
                    {scaleX: Platform.OS === 'ios' ? 0.8 : 1.1},
                    {scaleY: Platform.OS === 'ios' ? 0.8 : 1.1},
                  ],
                  marginTop: Platform.OS === 'ios' ? '7%' : 0,
                }}
                boxType="square"
                tintColors={{true: '#2581d4', false: ''}}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={{fontSize: hp('1.8%')}}>Read the </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsAndCondtions')}>
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
                onPress={() => navigation.navigate('TermsAndCondtions')}>
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
                style={{...styles.btn, marginBottom: 20}}
                //onPress={userProfileData}
                onPress={() => {
                  userProfileData();
                }}
                // onPress = {() =>  navigation.navigate('SemiPrivateRoom')}
              >
                <Text style={{color: 'white', fontSize: hp('2.5%')}}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
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
                  <FontAwesome5
                    name="photo-video"
                    color="blue"
                    size={hp('3%')}
                  />
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
            // onBackdropPress={() => setThankYou(false)}
            // onSwipeComplete={() => setThankYou(false)}
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
                  height: hp('45%'),
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {/* <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: wp('2%')}}
                  onPress={() => setThankYou(false)}>
                  <FontAwesome5
                    name="times"
                    size={hp('2.5%')}
                    color={Colors.black}
                  />
                </TouchableOpacity> */}
                <Image
                  source={require('../../Assets/Images/Group.png')}
                  style={{
                    width: hp('11%'),
                    height: hp('11%'),
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
                    color: '#000',
                  }}>
                  Booking ID:{hjkhdjasdas.booking_id}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  You booked a bed in {getValue} Hospital on
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {hjkhdjasdas != '' &&
                    hjkhdjasdas.booking_date.split('/')[2] +
                      '-' +
                      hjkhdjasdas.booking_date.split('/')[1] +
                      '-' +
                      hjkhdjasdas.booking_date.split('/')[0]}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    marginBottom: 5,
                  }}>
                  {hjkhdjasdas.booking_time}
                </Text>
                <CustomButton
                  onPress={() => {
                    setPatientName();
                    setAddFamilyMember();
                    setDate();
                    setgenderModal();
                    setSelectedGender();
                    setFName();
                    setAddress();
                    setMobileNumber();
                    setEmail();
                    setnationalityModal();
                    setreligionModal();
                    setNationality();
                    setReligion();
                    setOccupation();
                    setMincome();
                    setAltContactNo();
                    setDName();
                    setIdProof();
                    setInsuranceClaim();
                    setPolicyNo();
                    setEmpName();
                    setEmpId();

                    setThankYou(false);
                    navigation.navigate('BookingHistory');
                  }}
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
                      onPress={() => navigation.navigate('BookingSlot')}>
                      <Text style={{alignSelf: 'center', color: Colors.blue}}>
                        <Text style={{fontWeight: 'bold'}}></Text> Edit Your
                        Appointment
                      </Text>
                    </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        </View>
        <Modal
          animationType="slide"
          visible={genderModal}
          transparent={true}
          onRequestClose={() => setgenderModal(false)}>
          <TouchableOpacity
            onPressOut={() => setgenderModal(false)}
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', bottom: 0}}>
                <TouchableOpacity
                  onPress={() => setgenderModal(false)}
                  style={{
                    alignSelf: 'center',
                    marginBottom: '3%',
                  }}>
                  <AntDesign
                    name="close"
                    size={50}
                    color="#000"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    // flex: 1,
                    width: width,
                    height: height * 0.3,

                    borderTopLeftRadius: width * 0.1,
                    borderTopRightRadius: width * 0.1,
                    backgroundColor: '#ffffff',
                    elevation: 10,
                  }}>
                  <Picker
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={selectedGender}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedGender(itemValue);
                    }}>
                    <Picker.Item
                      label="Gender"
                      value="Gender"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {genderdata.length > 0 &&
                      genderdata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          visible={nationalityModal}
          transparent={true}
          onRequestClose={() => setnationalityModal(false)}>
          <TouchableOpacity
            onPressOut={() => setnationalityModal(false)}
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', bottom: 0}}>
                <TouchableOpacity
                  onPress={() => setnationalityModal(false)}
                  style={{
                    alignSelf: 'center',
                    marginBottom: '3%',
                  }}>
                  <AntDesign
                    name="close"
                    size={50}
                    color="#000"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    // flex: 1,
                    width: width,
                    height: height * 0.3,
                    borderTopLeftRadius: width * 0.1,
                    borderTopRightRadius: width * 0.1,
                    backgroundColor: '#ffffff',
                    elevation: 10,
                  }}>
                  <Picker
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={nationality}
                    onValueChange={(itemValue, itemIndex) =>
                      setNationality(itemValue)
                    }>
                    <Picker.Item
                      label="Nationality"
                      value="nationality"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {nationalitydata.length > 0 &&
                      nationalitydata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          visible={religionModal}
          transparent={true}
          onRequestClose={() => setreligionModal(false)}>
          <TouchableOpacity
            onPressOut={() => setreligionModal(false)}
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}>
            <TouchableWithoutFeedback>
              <View style={{position: 'absolute', bottom: 0}}>
                <TouchableOpacity
                  onPress={() => setreligionModal(false)}
                  style={{
                    alignSelf: 'center',
                    marginBottom: '3%',
                  }}>
                  <AntDesign
                    name="close"
                    size={50}
                    color="#000"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    // flex: 1,
                    width: width,
                    height: height * 0.3,

                    borderTopLeftRadius: width * 0.1,
                    borderTopRightRadius: width * 0.1,
                    backgroundColor: '#ffffff',
                    elevation: 10,
                  }}>
                  <Picker
                    // style={{ marginTop: 10, marginLeft: 10, marginBottom: 10, borderRadius: 15, borderWidth: 1 }}
                    selectedValue={religion}
                    onValueChange={(itemValue, itemIndex) =>
                      setReligion(itemValue)
                    }>
                    <Picker.Item
                      label="Religion"
                      value="religion"
                      style={{fontSize: hp('1.8%')}}
                    />
                    {religiondata.length > 0 &&
                      religiondata.map(item => {
                        return (
                          <Picker.Item
                            label={item.name}
                            value={item.name}
                            style={{fontSize: hp('1.8%')}}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <View style={{bottom: 0}}>
          <Modal
            isVisible={prescriptionmodal}
            animationOutTiming={900}
            animationInTiming={900}
            hideModalContentWhileAnimating={true}
            useNativeDriverForBackdrop={true}
            onBackdropPress={() => setprescriptionmodal(false)}
            onSwipeComplete={() => setprescriptionmodal(false)}
            swipeDirection={['down']}
            avoidKeyboard={true}
            useNativeDriver={true}
            style={{alignSelf: 'center'}}>
            <View
              style={{
                width: wp('100%'),
                height: hp('50%'),
                alignItems: 'center',
                marginTop: hp('50%'),
                borderTopLeftRadius: hp('4%'),
                borderTopRightRadius: hp('4%'),
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: 'gray',
                  width: wp('30%'),
                  borderRadius: hp('1.5%'),
                  marginTop: hp('2%'),
                }}></View>
              <View
                style={{
                  width: wp('100%'),
                  height: hp('14%'),
                  marginTop: hp('5%'),
                  padding: wp('2.5%'),
                }}>
                <Text
                  style={{
                    fontSize: hp('2.5%'),
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom: hp('1%'),
                    paddingLeft: wp('1%'),
                  }}>
                  Upload Prescription
                </Text>
              </View>
              <View
                style={{
                  width: wp('100%'),
                  height: hp('9%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={ChoosePhotoFromGaleryprescription}
                  style={{
                    width: wp('80%'),
                    height: hp('7%'),
                    backgroundColor: '#2581d4',
                    borderRadius: hp('1.5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.textStyle}>Upload image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={selectOneFileprescription}
                  style={{
                    width: wp('80%'),
                    height: hp('7%'),
                    backgroundColor: '#2581d4',
                    borderRadius: hp('1.5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textStyle}>Upload PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setprescriptionmodal(!prescriptionmodal)}
                  style={{
                    width: wp('80%'),
                    height: hp('7%'),
                    backgroundColor: '#2581d4',
                    borderRadius: hp('1.5%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 12,
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <Modal
          isVisible={idproofmodal}
          animationOutTiming={900}
          animationInTiming={900}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setidproofmodal(false)}
          onSwipeComplete={() => setidproofmodal(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          style={{alignSelf: 'center'}}>
          <View
            style={{
              width: wp('100%'),
              height: hp('50%'),
              alignItems: 'center',
              marginTop: hp('50%'),
              borderTopLeftRadius: hp('4%'),
              borderTopRightRadius: hp('4%'),
              backgroundColor: 'white',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'gray',
                width: wp('30%'),
                borderRadius: hp('1.5%'),
                marginTop: hp('2%'),
              }}></View>
            <View
              style={{
                width: wp('100%'),
                height: hp('14%'),
                marginTop: hp('5%'),
                padding: wp('2.5%'),
              }}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: hp('1%'),
                  paddingLeft: wp('1%'),
                }}>
                Upload Id Proof
              </Text>
            </View>
            <View
              style={{
                width: wp('100%'),
                height: hp('9%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={ChoosePhotoFromGaleryidproof}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: '#2581d4',
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.textStyle}>Upload image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={uploadIdProof}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: '#2581d4',
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Text style={styles.textStyle}>Upload PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setidproofmodal(!idproofmodal)}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: '#2581d4',
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={medicalinsurancemodal}
          animationOutTiming={900}
          animationInTiming={900}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          onBackdropPress={() => setmedicalinsurancemodal(false)}
          onSwipeComplete={() => setmedicalinsurancemodal(false)}
          swipeDirection={['down']}
          avoidKeyboard={true}
          useNativeDriver={true}
          style={{alignSelf: 'center'}}>
          <View
            style={{
              width: wp('100%'),
              height: hp('50%'),
              alignItems: 'center',
              marginTop: hp('50%'),
              borderTopLeftRadius: hp('4%'),
              borderTopRightRadius: hp('4%'),
              backgroundColor: 'white',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'gray',
                width: wp('30%'),
                borderRadius: hp('1.5%'),
                marginTop: hp('2%'),
              }}></View>
            <View
              style={{
                width: wp('100%'),
                height: hp('14%'),
                marginTop: hp('5%'),
                padding: wp('2.5%'),
              }}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  fontWeight: 'bold',
                  color: 'black',
                  marginBottom: hp('1%'),
                  paddingLeft: wp('1%'),
                }}>
                Upload insurance Claim
              </Text>
            </View>
            <View
              style={{
                width: wp('100%'),
                height: hp('9%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={ChoosePhotoFromGaleryinsurance}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: '#2581d4',
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.textStyle}>Upload image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={uploadInsuranceClaim}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: '#2581d4',
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Text style={styles.textStyle}>Upload PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setmedicalinsurancemodal(false)}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  backgroundColor: '#2581d4',
                  borderRadius: hp('1.5%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerRaw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '1%',
  },
  inputTxt1: {
    width: '48%',
    height: 50,
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    // marginTop: wp('3%'),
    // // marginRight: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: wp('4%'),
    fontSize: 12,
  },
  container: {
    width: wp('100%'),
    height: hp('92.5%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('2%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    width: wp('100%'),
    height: hp('90%'),
    padding: wp('3%'),

    // backgroundColor:'yellow',
  },
  pname: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),
    // margin: 5,
    padding: wp('1%'),
  },

  inputTxt2: {
    width: wp('42%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  dob: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt3: {
    width: wp('39%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt4: {
    width: wp('39%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: hp('2%'),

    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  fname: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt5: {
    width: wp('92%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },

  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt1: {
    width: wp('35%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt7: {
    width: wp('50%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  india: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt8: {
    width: wp('50%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt9: {
    width: wp('35%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: hp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },

  income: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt10: {
    width: wp('50%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt11: {
    width: wp('35%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  alt: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt12: {
    width: wp('92%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  upload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt13: {
    width: wp('40%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: hp('2%'),
    //marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt14: {
    width: wp('34%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: hp('2%'),
    //marginTop: wp('3%'),
    marginRight: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  policy: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),

    padding: wp('1%'),
  },
  inputTxt15: {
    width: wp('92%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),

    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  employer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('97%'),
    // margin: 5,
    padding: wp('1%'),
  },
  inputTxt1: {
    width: wp('44%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    // marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt17: {
    width: wp('44%'),
    height: hp('7%'),
    backgroundColor: '#d3d3d3',
    borderRadius: wp('2%'),
    marginTop: wp('3%'),
    marginRight: wp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  inputTxt20: {
    width: wp('80%'),
    height: hp('7%'),
    //backgroundColor: 'pink',
    borderTopLeftRadius: hp('2%'),
    borderBottomLeftRadius: hp('2%'),
    paddingLeft: wp('3%'),
  },
  termsCondition: {
    width: wp('100%'),
    flexDirection: 'row',
    fontSize: hp('3%'),
    padding: wp('1.5%'),
    marginTop: wp('2%'),
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#2581d4',
    borderRadius: wp('2.4%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('7%'),
  },
  txt: {
    fontWeight: 'bold',
    fontSize: hp('2.7%'),
  },
  centeredView: {
    width: wp('100%'),
    bottom: 0,
    position: 'absolute',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: hp('2%'),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  modalText2: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20,
  },
});
export default HospitalForm;
