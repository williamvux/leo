import React, {useCallback, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Spacer from '../Spacer';
import styles from './styles';
import {BaseStyle} from '../../styles';
import ShowComponent from '../ShowComponent';

const BoxInput = ({
  title = '',
  onChange,
  placeholder,
  keyboardType = 'default',
  isSecure = false,
  errorMessage,
  noOfLines = 1,
  required = false,
  initialValue = '',
  canEdit = true,
  modifyInput,
}) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (modifyInput) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      modifyInput = modify;
    }
  }, [modify, modifyInput]);
  const modify = useCallback((string = '') => {
    setValue(string);
  }, []);
  return (
    <View>
      <View style={BaseStyle.row}>
        <Text style={styles.textTitle}>{title}</Text>
        <ShowComponent condition={required}>
          <Text style={styles.required}>{' *'}</Text>
        </ShowComponent>
      </View>
      <Spacer size={5} />
      <TextInput
        value={value}
        onChangeText={text => {
          setValue(text);
          if (onChange) {
            onChange(text);
          }
        }}
        editable={canEdit}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={[
          styles.input,
          !canEdit ? styles.disable : BaseStyle.empty,
          errorMessage ? styles.errorBox : BaseStyle.empty,
        ]}
        secureTextEntry={isSecure}
        numberOfLines={noOfLines}
        textAlignVertical={noOfLines > 1 ? 'top' : 'center'}
      />
      <ShowComponent condition={errorMessage}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </ShowComponent>
      <Spacer size={15} />
    </View>
  );
};

export default BoxInput;
