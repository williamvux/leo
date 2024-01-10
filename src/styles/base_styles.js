import {Platform, StyleSheet} from 'react-native';
import BaseColor from './base_colors';

const logoSize = {
  width: 434,
  height: 70,
};
const bgImageSize = {
  width: 1119,
  height: 351,
};

export {logoSize, bgImageSize};

export default StyleSheet.create({
  f1: {
    flex: 1,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mv20: {
    marginVertical: 20,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mv10: {
    marginVertical: 10,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  pv10: {
    paddingVertical: 10,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  pv20: {
    paddingVertical: 20,
  },
  pd: num => ({
    padding: num,
  }),
  w100: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  js_b: {
    justifyContent: 'space-between',
  },
  jCenter: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  trungTam: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aCenter: {
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: BaseColor.grayColor,
  },
  empty: {},
  gap: num => ({
    gap: num,
  }),
  bgWhite: {
    backgroundColor: BaseColor.whiteColor,
  },
  bgSuperLightGray: {
    backgroundColor: BaseColor.superLightGrayColor,
  },
  textLgBlack: {
    color: BaseColor.lightBlackColor,
  },
  logo: logoSize,
  logo0_5: {
    width: logoSize.width * 0.5,
    height: logoSize.height * 0.5,
    resizeMode: 'cover',
  },
  logo0_25: {
    width: logoSize.width * 0.25,
    height: logoSize.height * 0.25,
    resizeMode: 'cover',
  },
  logo0_35: {
    width: logoSize.width * 0.35,
    height: logoSize.height * 0.35,
    resizeMode: 'cover',
  },
  safeView: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
    paddingTop: 10,
    // ...(Platform.OS === 'android' ? {paddingVertical: 10} : {}),
  },
});
