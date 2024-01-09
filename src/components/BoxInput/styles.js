import {Platform, StyleSheet} from 'react-native';
import {BaseColor} from '../../styles';

export default StyleSheet.create({
  input: {
    borderRadius: 2,
    paddingVertical: 3,
    backgroundColor:
      Platform.OS === 'ios'
        ? BaseColor.lightGrayColor
        : BaseColor.superLightGrayColor,
  },
  textTitle: {
    fontSize: 14,
    color: BaseColor.lightBlackColor,
  },
  errorBox: {
    borderColor: BaseColor.themeColor,
    borderWidth: 1,
  },
  errorMessage: {
    fontSize: 12,
    color: BaseColor.themeColor,
  },
  required: {
    fontSize: 16,
    color: BaseColor.themeColor,
  },
});
