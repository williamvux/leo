import {StyleSheet} from 'react-native';
import {BaseColor, BaseStyle} from '../../styles';

export default StyleSheet.create({
  logo: {
    ...BaseStyle.logo0_35,
  },
  containerHeader: {
    ...BaseStyle.row,
    ...BaseStyle.js_b,
    ...BaseStyle.aCenter,
  },
  boxTuVan: {
    ...BaseStyle.ph10,
    ...BaseStyle.pv10,
    backgroundColor: BaseColor.themeColor,
    borderRadius: 5,
  },
  textTuVan: {
    color: BaseColor.whiteColor,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
