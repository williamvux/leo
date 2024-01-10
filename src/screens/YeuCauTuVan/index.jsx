import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {BaseColor, BaseStyle} from '../../styles';
import styles from './styles';
import {BoxInput, Header, ImageTheme, Spacer} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const YeuCauTuVan = props => {
  const {navigation} = props;
  const [isValid, setValid] = useState(true);
  const setIsValid = () => {
    setValid(Date.now());
  };

  const errorMessages = useRef({name: null, phone: null, note: null});
  const formValues = useRef({name: null, phone: null, note: null});

  const onChangeName = text => {
    errorMessages.current.name = !text ? 'Nhập họ tên' : null;
    formValues.current.name = text;
  };
  const onChangePhone = text => {
    errorMessages.current.phone = !text ? 'Nhập số điện thoại' : null;
    formValues.current.phone = text;
  };
  const onChangeNote = text => {
    errorMessages.current.note = !text ? 'Nhập thông tin tư vấn' : null;
    formValues.current.note = text;
  };

  const handleTuvan = () => {
    const {name, phone, note} = formValues.current;
    if (name && phone && note) {
      setIsValid();
      navigation.pop();
    } else {
      onChangeName(name);
      onChangeNote(note);
      onChangePhone(phone);
      setIsValid();
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeView}>
      <Header
        title={'Yêu cầu tư vấn'}
        left={[
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Icon name={'arrow-left'} size={20} color={BaseColor.themeColor} />
          </TouchableOpacity>,
        ]}
      />
      <ScrollView>
        <View style={[BaseStyle.f1, BaseStyle.ph10]}>
          <ImageTheme />
          <Spacer size={20} />
          <BoxInput
            onChange={onChangeName}
            required
            title={'Họ tên'}
            errorMessage={errorMessages.current.name}
          />
          <BoxInput
            onChange={onChangePhone}
            required
            title={'Số điện thoại'}
            errorMessage={errorMessages.current.phone}
          />
          <BoxInput
            onChange={onChangeNote}
            required
            title={'Ghi chú'}
            noOfLines={5}
            errorMessage={errorMessages.current.note}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleTuvan} style={styles.btnSuDung}>
        <Text style={styles.textSuDung}>{'Tư vấn'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default YeuCauTuVan;
