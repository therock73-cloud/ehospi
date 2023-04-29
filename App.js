import React from 'react';
//import Splash from './Source/Screens/Splash';
//import Login from './Source/Screens/Login';
//import SelectNumber from './Source/Screens/SelectNumber';
//import Otp from './Source/Screens/Otp';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';

import {
  MainStackNavigator,
  ContactStackNavigator,
} from './Source/Navigation/StackNavigation';
import {TopContainer} from './Source/Screens/HospitalDetailScreen';
import {Provider} from 'react-redux';
import {store, persistor} from './Source/Redux/configureStore';
//import About2 from './Source/Screens/About2';
import {MyAppointments} from './Source/Screens/opd/MyAppointments';
import ActiveAppoinment from './Source/Screens/opd/ActiveAppoinment';
import DrawerNavigator from './Source/Navigation/DrawerNavigator';
import ProfileScreen from './Source/Screens/Profile';
import Filter from './Source/Screens/opd/Filter';
import Address from './Source/Screens/labTest/AddAddress';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
