import React, {useCallback, useMemo, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Spacer from '../Spacer';
import {BaseColor, BaseStyle} from '../../styles';
import ShowComponent from '../ShowComponent';

const RadioButton = ({
  defaultValue = null,
  arrValues = [{label: 'Label', value: 'label'}],
  sizeLabel = 14,
  sizeBox = 20,
  onChange,
  direction = null,
  styleLabel = {},
  styleContainer = {},
  styleCircle = {},
  styleActiveCircle = {},
}) => {
  const [value, setValue] = useState(defaultValue);
  const styles = useMemo(() => {
    let direct = BaseStyle.row;
    const arr = ['row', 'column'];
    if (!arr.includes(direction)) {
      if (arrValues.length > 3) {
        direct = BaseStyle.column;
      }
    } else {
      direct = BaseStyle[direction];
    }
    const span = sizeBox - 6;
    return {
      label: {
        color: BaseColor.lightBlackColor,
        fontSize: sizeLabel,
        fontWeight: '700',
      },
      circleBox: {
        borderWidth: 1,
        borderColor: BaseColor.lightGrayColor,
        width: sizeBox,
        height: sizeBox,
        borderRadius: 10,
      },
      circle: {
        backgroundColor: BaseColor.themeColor,
        width: span,
        height: span,
        borderRadius: 10,
      },
      container: [BaseStyle.f1, direct],
      pb10: {paddingBottom: 10},
    };
  }, [arrValues.length, direction, sizeBox, sizeLabel]);
  const changeValue = useCallback((newValue, onChangeValue) => {
    setValue(newValue);
    if (onChangeValue) {
      onChangeValue(newValue);
    }
  }, []);
  return (
    <View style={styles.container}>
      {arrValues.map(item => {
        return (
          <View
            key={'radio-button-' + item.value}
            style={[BaseStyle.f1, BaseStyle.row, styles.pb10, styleContainer]}>
            <TouchableWithoutFeedback
              onPress={() => {
                changeValue(item.value === value ? null : item.value, onChange);
              }}>
              <View style={[BaseStyle.row, BaseStyle.aCenter]}>
                <View
                  style={[
                    styles.circleBox,
                    BaseStyle.row,
                    BaseStyle.trungTam,
                    styleCircle,
                  ]}>
                  <ShowComponent condition={item.value === value}>
                    <View style={[styles.circle, styleActiveCircle]} />
                  </ShowComponent>
                </View>
                <Spacer />
                <Text style={[styles.label, styleLabel]}>{item.label}</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={BaseStyle.f1} />
          </View>
        );
      })}
    </View>
  );
};

export default RadioButton;
