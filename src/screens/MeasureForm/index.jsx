import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import OrderAction from '../../actions/order_action';
import {connect} from 'react-redux';

const MeasureForm = props => {
  const {accountUser, define_text} = useContext(MainContext);
  console.log(29, JSON.stringify(accountUser));
  const values = useMemo(
    () => ({
      theokg: define_text.txt_loai_lo_kg,
      theokhoi: define_text.txt_loai_lo_khoi,
    }),
    [define_text.txt_loai_lo_kg, define_text.txt_loai_lo_khoi],
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
  const {navigation, createOrder} = props;
  const [selected, setSelected] = useState(values.theokg);

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
    setIsLoadingThanhTien(true);
    const {kg, dai, rong, cao} = formValue.current;
    let canSend = false;
    if (selected === values.theokg) {
      if (kg) {
        setIsValid(true);
        canSend = true;
      } else {
        onChangeKG(kg);
        setIsValid(false);
      }
    } else if (selected === values.theokhoi) {
      if (dai && rong && cao && kg) {
        canSend = true;
        setIsValid(true);
      } else {
        onChangeDai(dai);
        onChangeRong(rong);
        onChangeCao(cao);
        onChangeKG(kg);
        setIsValid(false);
      }
    }

    if (canSend) {
      createOrder({
        info_order: {
          type_order: selected,
          kg,
          cao: cao ?? '',
          rong: rong ?? '',
          dai: dai ?? '',
        },
        callback: response => {
          console.log(117, response);
          ToastAndroid.show('Success', ToastAndroid.LONG);
          setIsLoadingThanhTien(false);
        },
      });
    } else {
      setIsLoadingThanhTien(false);
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
            title={accountUser.full_name}
            right={[
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InformationForm');
                }}
                key={'edit'}>
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
                  {label: define_text.txt_loai_lo_kg, value: values.theokg},
                  {label: define_text.txt_loai_lo_khoi, value: values.theokhoi},
                ]}
                onChange={onChangeLoaiTinh}
              />
            </View>
          </View>
          <ShowComponent condition={selected === values.theokg}>
            <View key={values.theokg}>
              <View style={BaseStyle.mv10}>
                <Text style={styles.textNhapTheo}>
                  {define_text.txt_loai_lo_kg}
                </Text>
              </View>
              <BoxInput
                title={define_text.txt_kg}
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
                <Text style={styles.textNhapTheo}>
                  {define_text.txt_loai_lo_khoi}
                </Text>
              </View>
              <BoxInput
                title={define_text.txt_kg}
                onChange={text => {
                  onChangeKG(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.kg}
              />
              <BoxInput
                title={define_text.txt_rong}
                onChange={text => {
                  onChangeRong(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.rong}
              />
              <BoxInput
                title={define_text.txt_cao}
                onChange={text => {
                  onChangeCao(text);
                  // setIsValid(!!text);
                }}
                required
                errorMessage={errorMessages.current.cao}
              />
              <BoxInput
                title={define_text.txt_dai}
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
        <View style={[BaseStyle.row, BaseStyle.aCenter, BaseStyle.gap(10)]}>
          <Text style={styles.textSuDung}>{'Thành tiền'}</Text>
          <ShowComponent condition={isLoadingThanhTien}>
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
  createOrder: OrderAction.actionOrder.createOrder,
};

export default connect(mapStateToProps, mapDispatch)(MeasureForm);
