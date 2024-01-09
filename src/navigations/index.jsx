import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {InformationForm, MeasureForm, YeuCauTuVan} from '../screens';

const MainStack = createStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="InformationForm">
      <MainStack.Screen name="InformationForm" component={InformationForm} />
      <MainStack.Screen name="MeasureForm" component={MeasureForm} />
      <MainStack.Screen name="YeuCauTuVan" component={YeuCauTuVan} />
    </MainStack.Navigator>
  );
};

export default Main;
