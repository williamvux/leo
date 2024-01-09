import React, {useState} from 'react';
import {View} from 'react-native';
import {bgImageSize} from '../../styles/base_styles';
import FastImage from 'react-native-fast-image';
import ImgTheme from '../../assets/background_image.png';

const ImageTheme = () => {
  const [width, setWidth] = useState(0);
  const ratio = bgImageSize.height / bgImageSize.width;
  const style = {
    width: '100%',
    height: width * ratio,
  };
  return (
    <View
      style={style}
      onLayout={event => {
        const w = Math.floor(event.nativeEvent.layout.width);
        if (w !== width) {
          setWidth(w);
        }
      }}>
      <FastImage source={ImgTheme} style={modifySize(width, width * ratio)} />
    </View>
  );
};

const modifySize = (width = bgImageSize.width, height = bgImageSize.height) => {
  return {
    width,
    height,
    resizeMode: 'cover',
  };
};

export default ImageTheme;
