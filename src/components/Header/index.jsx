import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {BaseStyle} from '../../styles';

const Header = ({title = '', left = [], right = []}) => {
  return (
    <View
      style={[
        BaseStyle.row,
        BaseStyle.jCenter,
        BaseStyle.aCenter,
        styles.safeView,
      ]}>
      <View
        style={[
          BaseStyle.f1,
          BaseStyle.row,
          BaseStyle.left,
          BaseStyle.gap(10),
        ]}>
        {left}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          BaseStyle.f1,
          BaseStyle.row,
          BaseStyle.right,
          BaseStyle.gap(10),
        ]}>
        {right}
      </View>
    </View>
  );
};

export default Header;
