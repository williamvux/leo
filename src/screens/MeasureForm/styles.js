import {StyleSheet} from 'react-native';
import {BaseColor, BaseStyle} from '../../styles';

export default StyleSheet.create({
  btnSuDung: {
    backgroundColor: BaseColor.themeColor,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 5,
    ...BaseStyle.row,
    ...BaseStyle.trungTam,
  },
  textSuDung: {
    fontSize: 14,
    color: BaseColor.whiteColor,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pl10: {
    paddingLeft: 10,
  },
  textNhapTheo: {
    fontWeight: '500',
    fontSize: 14,
    color: BaseColor.lightBlackColor,
  },
});
