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

const App = props => {
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoadingApp(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
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
        <GestureHandlerRootView style={BaseStyle.f1}>
          <NavigationContainer>
            <MainProvider>
              <NavigationTabs />
            </MainProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
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
