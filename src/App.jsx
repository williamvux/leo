import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BaseStyle, BaseColor} from './styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import NavigationTabs from './navigations';
import {MainProvider} from './context';
import {ShowComponent} from './components';
import FastImage from 'react-native-fast-image';
import CTGLogo from './assets/ctg.png';
import {persistor, store} from './store';
import AppAction from './actions/app_action';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setData} from './config/asyncStorage';
import {
  getDeviceType,
  getUserAgent,
  getIpAddress,
  getUniqueId,
} from 'react-native-device-info';

const App = props => {
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  useEffect(() => {
    let timerId;
    getIpAddress()
      .then(async ip => {
        const device_id = await getUniqueId();
        const apiConfiguration = {
          deviceId: device_id,
          device_id,
          ip,
          device_type: getDeviceType(),
          user_agent: await getUserAgent(),
        };
        return setData('apiConfiguration', apiConfiguration);
      })
      .then(() => {
        store.dispatch({
          type: AppAction.actions.GET_CONFIG,
          payload: {
            callback: response => {
              timerId = setTimeout(() => {
                setIsLoadingApp(false);
              }, 1000);
            },
          },
        });
      })
      .catch(error => {
        console.log(38, error);
      });

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);
  return (
    <SafeAreaView style={BaseStyle.f1}>
      <ShowComponent condition={isLoadingApp} hasElse>
        <View style={styles.centerVertContainer}>
          <View style={styles.centerLogo}>
            <FastImage source={CTGLogo} style={styles.logo} />
          </View>
          <Text style={styles.text}>{'Design by  unitedexpress'}</Text>
        </View>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GestureHandlerRootView style={BaseStyle.f1}>
              <NavigationContainer>
                <MainProvider>
                  <NavigationTabs />
                </MainProvider>
              </NavigationContainer>
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
      </ShowComponent>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  logo: {
    ...BaseStyle.logo0_5,
  },
  centerLogo: {
    ...BaseStyle.f1,
    ...BaseStyle.row,
    ...BaseStyle.trungTam,
  },
  centerVertContainer: {
    ...BaseStyle.f1,
    ...BaseStyle.column,
    ...BaseStyle.aCenter,
    backgroundColor: BaseColor.whiteColor,
  },
  text: {
    fontSize: 12,
    color: BaseColor.themeColor,
    fontWeight: '600',
    ...(Platform.OS === 'android' ? {paddingBottom: 30} : {}),
  },
});
