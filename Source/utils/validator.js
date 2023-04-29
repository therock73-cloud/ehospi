// export const validForm = () => {
//   const emailRegex = /\S+@\S+\.\S+/;
//   const reg = /^[6-9]{1}[0-9]{9}$/;
//   const rule = /^[a-zA-Z ]{2,40}$/;
//   const dn = /[A-Za-z]$/;
//   const DOB_REGEX =
//     /^((0[0-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01]))-((20[012]\d|19\d\d)|(1\d|2[0123]))$/;

//   if (rule.test(patientName) == '') {
//     return 'Enter the Patient Name';
//   } else if (rule.test(addFamilyMember) == '') {
//     return 'Enter Family Member Name';
//   } else if (DOB_REGEX.test(date) == '') {
//     return 'Select Your Date of Birth';
//   } else if (selectedGender == '') {
//     return 'Select Your Gender';
//   } else if (rule.test(fName) == '') {
//     return 'Enter Your Fathers/Husband Name';
//   } else if (address == '') {
//     return 'Enter Your Address';
//   } else if (reg.test(mobileNumber) == '') {
//     return 'Enter Your Correct Mobile No.';
//   } else if (emailRegex.test(email) == '') {
//     return 'Enter Your Email';
//   } else if (nationality == '') {
//     return 'Select Your Nationality';
//   } else if (religion == '') {
//     return 'Select Your Religion';
//   } else if (mincome == '') {
//     return 'Enter Your Monthly Income';
//   } else if (rule.test(occupation) == '') {
//     return 'Enter your Occupation';
//   } else if (reg.test(altContactNo) == '') {
//     return 'Enter correct Alt.Contact No.';
//   } else if (dn.test(dName) == '') {
//     return 'Enter Doctor Name';
//   }

//   // else if (minsurance == '') {
//   //   return ('Enter Medical Insurance');
//   // }
//   else if (policyNo == '') {
//     return 'Enter Your PolicyNo.';
//   } else if (rule.test(empName) == '') {
//     return 'Enter Employer Name';
//   } else if (empId == '') {
//     return 'Enter Employer Id';
//   } else if (toggleCheckBox === false) {
//     return 'Click on Checkbox to Confirm then Submit';
//   } else {
//     //   return alert('Form Submitted Successfully');
//     // props.navigation.navigate('SemiPrivateRoom')
//     return 1;
//   }
// };
