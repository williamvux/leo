import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {InformationForm, MeasureForm, YeuCauTuVan} from '../screens';
import {MainContext} from '../context';

const MainStack = createStackNavigator();

const Main = () => {
  const {accountUser} = useContext(MainContext);
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        accountUser && accountUser.account_id
          ? 'MeasureForm'
          : 'InformationForm'
      }>
      <MainStack.Screen name="InformationForm" component={InformationForm} />
      <MainStack.Screen name="MeasureForm" component={MeasureForm} />
      <MainStack.Screen name="YeuCauTuVan" component={YeuCauTuVan} />
    </MainStack.Navigator>
  );
};

export default Main;
