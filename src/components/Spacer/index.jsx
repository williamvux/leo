import React from 'react';
import {View} from 'react-native';
import {BaseColor} from '../../styles';

const Spacer = ({size = 10}) => {
  const styles = {
    width: size,
    height: size,
    backgroundColor: BaseColor.whiteColor,
    opacity: 0,
  };
  return <View style={styles} />;
};

export default Spacer;
