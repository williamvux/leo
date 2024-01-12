import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {BoxInput, HeaderLogo, ImageTheme} from '../../components';
import {BaseStyle} from '../../styles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const InformationForm = props => {
  const errorMessages = useRef({
    name: null,
    phone: null,
    email: null,
    code: null,
  });

  const formValue = useRef({
    name: null,
    phone: null,
    email: null,
    code: null,
  });
  const [isValid, setValid] = useState(true);
  const setIsValid = () => {
    const date = Date.now();
    setValid(date);
  };
  const {navigation} = props;
  const onChangeName = text => {
    errorMessages.current.name = !text ? 'Tên không để trống' : null;
    formValue.current.name = text;
  };
  const onChangePhone = text => {
    errorMessages.current.phone = !text ? 'Số điện thoại không để trống' : null;
    formValue.current.phone = text;
  };
  const onChangeEmail = text => {
    if (!text) {
      errorMessages.current.email = 'Email không để trống';
    } else {
      if (!text.includes('@')) {
        errorMessages.current.email = 'Email không đúng định dạng';
      } else {
        errorMessages.current.email = null;
      }
    }
    formValue.current.email = text;
  };
  const onChangeCode = text => {
    errorMessages.current.code = !text ? 'Mã giới thiệu không để trống' : null;
    formValue.current.code = text;
  };
  const onPreshTuVan = () => {
    navigation.navigate('YeuCauTuVan');
  };

  const handleSuDung = () => {
    const {code, name, phone, email} = formValue.current;
    if (code && name && phone && email && email.includes('@')) {
      setIsValid(true);
      setTimeout(() => {
        navigation.navigate('MeasureForm');
      }, 500);
    } else {
      onChangeCode(code);
      onChangeEmail(email);
      onChangeName(name);
      onChangePhone(phone);
      setIsValid(false);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeView}>
      <ScrollView style={BaseStyle.f1}>
        <View style={BaseStyle.ph10}>
          <HeaderLogo onPressTuVan={onPreshTuVan} />
        </View>
        <View style={BaseStyle.pd(10)}>
          <ImageTheme />
        </View>
        <View style={[BaseStyle.f1, BaseStyle.ph10, BaseStyle.pv10]}>
          <BoxInput
            title={'Họ tên'}
            onChange={text => {
              onChangeName(text);
              // setIsValid(!!text);
            }}
            required
            errorMessage={errorMessages.current.name}
          />
          <BoxInput
            title={'Địa chỉ email'}
            onChange={text => {
              onChangeEmail(text);
              // setIsValid(!!text);
            }}
            required
            errorMessage={errorMessages.current.email}
          />
          <BoxInput
            title={'Số điện thoại'}
            onChange={text => {
              onChangePhone(text);
              // setIsValid(!!text);
            }}
            required
            errorMessage={errorMessages.current.phone}
          />
          <BoxInput
            title={'Mã giới thiệu'}
            onChange={text => {
              onChangeCode(text);
              // setIsValid(!!text);
            }}
            required
            errorMessage={errorMessages.current.code}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleSuDung} style={styles.btnSuDung}>
        <Text style={styles.textSuDung}>{'Nhập thông tin đơn hàng'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InformationForm;
