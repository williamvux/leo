import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BoxInput,
  HeaderLogo,
  ImageTheme,
  ShowComponent,
} from '../../components';
import {BaseColor, BaseStyle} from '../../styles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {MainContext} from '../../context';
import {getDeviceId} from 'react-native-device-info';
import CustomerAction from '../../actions/customer_action';
import {connect} from 'react-redux';
import {setData} from '../../config/asyncStorage';

const InformationForm = props => {
  const {navigation, getProfileCustomer} = props;
  const Context = useContext(MainContext);
  const {accountUser, define_text, setAccountUser} = Context;
  const [, setValid] = useState(true);
  const [isLoadingBtnCustomer, setIsLoadingBtnCustomer] = useState(false);
  const errorMessages = useRef({
    name: null,
    phone: null,
    email: null,
    code: null,
  });
  const formValue = useRef({
    name: accountUser.full_name,
    phone: accountUser.account_phone,
    email: accountUser.account_email,
    code: accountUser.code_referral,
  });

  const setIsValid = () => {
    const date = Date.now();
    setValid(date);
  };
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

  const handleSuDung = useCallback(() => {
    const {code, name, phone, email} = formValue.current;
    if (code && name && phone && email && email.includes('@')) {
      setIsValid(true);
      const device_id = getDeviceId();
      console.log(80, name);
      getProfileCustomer({
        device_id,
        account_phone: phone,
        account_email: email,
        full_name: name,
        code_referral: code,
        callback: response => {
          console.log(response);
          if (response.code === 500000) {
            const user = {
              ...accountUser,
              ...response.data,
              account_phone: phone,
            };
            setAccountUser(user);
            setData('userInfo', user).then(() => {
              navigation.navigate('MeasureForm');
            });
          }
          setIsLoadingBtnCustomer(false);
        },
      });
    } else {
      onChangeCode(code);
      onChangeEmail(email);
      onChangeName(name);
      onChangePhone(phone);
      setIsValid(false);
      setTimeout(() => {
        setIsLoadingBtnCustomer(false);
      }, 200);
    }
  }, [accountUser, getProfileCustomer, navigation, setAccountUser]);

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
            title={define_text.txt_full_name}
            initialValue={accountUser.full_name}
            onChange={text => {
              onChangeName(text);
            }}
            required
            errorMessage={errorMessages.current.name}
          />
          <BoxInput
            title={define_text.txt_email}
            onChange={text => {
              onChangeEmail(text);
            }}
            initialValue={accountUser.account_email}
            required
            errorMessage={errorMessages.current.email}
          />
          <BoxInput
            title={define_text.txt_phone}
            onChange={text => {
              onChangePhone(text);
            }}
            initialValue={accountUser.account_phone}
            required
            keyboardType={'numeric'}
            errorMessage={errorMessages.current.phone}
          />
          <BoxInput
            title={define_text.txt_code_referral}
            onChange={text => {
              onChangeCode(text);
            }}
            initialValue={accountUser.code_referral}
            required
            canEdit={!accountUser.code_referral}
            errorMessage={errorMessages.current.code}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (!isLoadingBtnCustomer) {
            handleSuDung();
            setIsLoadingBtnCustomer(true);
          }
        }}
        style={styles.btnSuDung}>
        <View style={[BaseStyle.row, BaseStyle.aCenter, BaseStyle.gap(10)]}>
          <Text style={styles.textSuDung}>
            {define_text.bttn_info_customer}
          </Text>
          <ShowComponent condition={isLoadingBtnCustomer}>
            <ActivityIndicator size={'small'} color={BaseColor.whiteColor} />
          </ShowComponent>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatch = {
  getProfileCustomer: CustomerAction.actionCustomer.getProfileCustomer,
};

export default connect(mapStateToProps, mapDispatch)(InformationForm);
