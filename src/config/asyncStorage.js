import AsyncStorage from '@react-native-community/async-storage';

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    } else {
      return {};
    }
  } catch (e) {
    console.log('e', e);
    return {};
  }
};

const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

export {setData, getData, removeValue};
