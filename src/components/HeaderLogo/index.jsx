import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CTGLogo from '../../assets/ctg.png';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const HeaderLogo = ({onPressTuVan}) => {
  return (
    <View style={styles.containerHeader}>
      <FastImage source={CTGLogo} style={styles.logo} />
      <TouchableOpacity style={styles.boxTuVan} onPress={onPressTuVan}>
        <Text style={styles.textTuVan}>{'Yêu cầu tư vấn'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLogo;
