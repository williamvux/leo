import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  BoxInput,
  Header,
  HeaderLogo,
  ImageTheme,
  RadioButton,
  ShowComponent,
} from '../../components';
import {BaseColor, BaseStyle} from '../../styles';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {MainContext} from '../../context';
import {getData} from '../../config/asyncStorage';
import Icon from 'react-native-vector-icons/FontAwesome';

const MeasureForm = props => {
  const {accountUser} = useContext(MainContext);
  const values = useMemo(
    () => ({
      theokg: 'kg',
      theokhoi: 'khoi',
    }),
    [],
  );
  const errorMessages = useRef({
    kg: null,
    dai: null,
    rong: null,
    cao: null,
  });

  const formValue = useRef({
    kg: null,
    dai: null,
    rong: null,
    cao: null,
  });
  const [, setValid] = useState(true);
  const [isLoadingThanhTien, setIsLoadingThanhTien] = useState(false);
  const setIsValid = () => {
    const date = Date.now();
    setValid(date);
  };
  const {navigation} = props;
  const [selected, setSelected] = useState(values.theokg);
  const [accountName, setAccoutName] = useState(accountUser.full_name);

  useEffect(() => {
    if (!accountUser || !accountUser.full_name) {
      getData('userInfo').then(user => {
        setAccoutName(user.full_name);
      });
    }
  }, [accountUser]);

  const onChangeLoaiTinh = text => {
    setSelected(text);
  };
  const onChangeKG = text => {
    errorMessages.current.kg = !text ? 'Nhập khối lượng' : null;
    formValue.current.kg = text;
  };
  const onChangeRong = text => {
    errorMessages.current.rong = !text ? 'Nhập chiều rộng' : null;
    formValue.current.rong = text;
  };
  const onChangeCao = text => {
    errorMessages.current.cao = !text ? 'Nhập chiều cao' : null;
    formValue.current.cao = text;
  };
  const onChangeDai = text => {
    errorMessages.current.dai = !text ? 'Nhập chiều dài' : null;
    formValue.current.dai = text;
  };
  const onPreshTuVan = () => {
    navigation.navigate('YeuCauTuVan');
  };

  const handleThanhTien = () => {
    const {kg, dai, rong, cao} = formValue.current;
    if (selected === values.theokg) {
      if (kg) {
        setIsValid(true);
      } else {
        onChangeKG(kg);
        setIsValid(false);
      }
    } else if (selected === values.theokhoi) {
      if (dai && rong && cao && kg) {
        setIsValid(true);
      } else {
        onChangeDai(dai);
        onChangeRong(rong);
        onChangeCao(cao);
        onChangeKG(kg);
        setIsValid(false);
      }
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
        <View>
          <Header
            title={accountName}
            right={[
              <TouchableOpacity>
                <Icon name={'edit'} color={BaseColor.themeColor} size={20} />
              </TouchableOpacity>,
            ]}
          />
        </View>
        <View style={[BaseStyle.f1, BaseStyle.ph10]}>
          <View style={[BaseStyle.pv10]}>
            <View style={BaseStyle.f1}>
              <RadioButton
                defaultValue={values.theokg}
                arrValues={[
                  {label: 'Theo kg', value: values.theokg},
                  {label: 'Theo khối', value: values.theokhoi},
                ]}
                onChange={onChangeLoaiTinh}
              />
            </View>
          </View>
          <ShowComponent condition={selected === values.theokg}>
            <View key={values.theokg}>
              <View style={BaseStyle.mv10}>
                <Text style={styles.textNhapTheo}>
                  {'Nhập Theo khối lượng'}
                </Text>
              </View>
              <BoxInput
                title={'Số Kg'}
                keyboardType={'numeric'}
                onChange={text => {
                  onChangeKG(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.kg}
              />
            </View>
          </ShowComponent>
          <ShowComponent condition={selected === values.theokhoi}>
            <View key={values.theokhoi}>
              <View style={BaseStyle.mv10}>
                <Text style={styles.textNhapTheo}>{'Nhập Theo khối'}</Text>
              </View>
              <BoxInput
                title={'Số Kg'}
                keyboardType={'numeric'}
                onChange={text => {
                  onChangeKG(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.kg}
              />
              <BoxInput
                title={'Chiều rộng'}
                keyboardType={'numeric'}
                onChange={text => {
                  onChangeRong(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.rong}
              />
              <BoxInput
                title={'Chiều cao'}
                keyboardType={'numeric'}
                onChange={text => {
                  onChangeCao(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.cao}
              />
              <BoxInput
                title={'Chiều dài'}
                keyboardType={'numeric'}
                onChange={text => {
                  onChangeDai(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.dai}
              />
            </View>
          </ShowComponent>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleThanhTien} style={styles.btnSuDung}>
        <Text style={styles.textSuDung}>{'Thành tiền'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MeasureForm;
