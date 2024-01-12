import axios from 'axios';
import md5 from 'md5';
import isEmpty from 'lodash/isEmpty';
import {API_URL} from './constants';
import {getData} from './asyncStorage';
import moment from 'moment';
import {Platform} from 'react-native';

const Request = {
  callAPI(method, url, args = {requiredFields: '', payload: {}}) {
    return new Promise(async (resolve, reject) => {
      try {
        let apiConfiguration = {};
        const storageConfigData = await getData('apiConfiguration');
        const userInfo = await getData('userInfo');
        // const token = await getData('token');
        apiConfiguration = storageConfigData || {};
        // console.error('userInfo.env', userInfo)
        const keyHash = md5(
          `${apiConfiguration.app_key}${apiConfiguration.ip}${
            apiConfiguration.deviceId
          }${Number(apiConfiguration.otp + 30)}${args.requiredFields}`,
        );
        const memberUser = {
          id_member: userInfo?.id_member || 0,
          is_active: userInfo?.is_active || 0,
          is_verify: userInfo?.is_verify || 0,
          account_id: userInfo?.account_id || '',
          type_socical: userInfo?.type_socical || '',
          account_name: userInfo?.account_name || '',
          full_name: userInfo?.full_name || '',
          account_email: userInfo?.account_email || '',
          account_phone: userInfo?.account_phone || '',
          c_money: userInfo?.c_money || 0,
          id_socical: userInfo?.id_socical || '',
          is_map_user: userInfo?.is_map_user || 0,
          social: userInfo?.social || {},
          code_referral: userInfo?.code_referral || '',
        };
        //console.error('apiCguration', apiConfiguration)
        const requiredFieldsData = isEmpty(apiConfiguration)
          ? {
              platform: 'apps',
              keyhas: keyHash,
              has: keyHash,
              app_key: 'alonhatro',
            }
          : {
              ip: apiConfiguration.ip,
              userIp: apiConfiguration.ip,
              user_ip: apiConfiguration.ip,
              user_agent: apiConfiguration.user_agent,
              deviceType: apiConfiguration.device_type,
              device_id: apiConfiguration.device_id,
              user_device: apiConfiguration.device_id,
              clientId: keyHash,
              keyhas: keyHash,
              has: keyHash,
              connectId: 'alonhatro',
              platform: Platform.OS,
              app_key: 'alonhatro',
              item_account: memberUser,
              id_member: userInfo?.id_member || '0',
              access_token: userInfo?.token || 'none',
              otp: moment().add(+5, 'minute').unix(), //apiConfiguration.otp,
              env: apiConfiguration.env,
            };
        const payload =
          process.env.NODE_ENV === 'development'
            ? {...requiredFieldsData, dev: 1, ...args.payload}
            : {...requiredFieldsData, ...args.payload};
        // if (process.env.NODE_ENV === 'development') {
        //   console.log('====[METHOD]====', {
        //     url,
        //     args,
        //     app_key: apiConfiguration.app_key,
        //     storageConfigData,
        //     token,
        //   });
        // }
        // console.error('===args.payload payload===', payload);
        //delete payload['dev'];
        const qs = Object.keys(payload)
          .map(function (key) {
            return key + '=' + payload[key];
          })
          .join('&');
        payload.token = md5(qs);
        memberUser.ip = apiConfiguration.ip;
        memberUser.user_agent = apiConfiguration.user_agent;
        memberUser.device_id = apiConfiguration.device_id;
        memberUser.platform = Platform.OS;
        console.log(`${API_URL}${url}\n`, JSON.stringify(payload));
        const dataRequest = {
          method,
          url: `${API_URL}${url}`,
          data: payload,
          withCredentials: true,
          headers: {
            Authorization: '',
            'Access-Control-Allow-Origin': '*',
            Language: 'vi',
            'Key-User': payload.app_key,
          },
        };
        // console.error('=== Start request');
        //console.error('=== Start request', dataRequest.url);
        const response = await axios(dataRequest);
        // console.error('=== End request');
        //  console.error('=== Start response', JSON.stringify(response));
        if (process.env.NODE_ENV === 'development') {
        }
        let result = {};
        if (response.data.code) {
          const arrCode = [false, null, 200, 2000, 61000, 500000, 100000];
          result = {
            ...response.data,
            accountUser: memberUser,
            code:
              arrCode.indexOf(response.data.code) >= 0 ||
              arrCode.indexOf(response.data.err) >= 0 ||
              arrCode.indexOf(response.data.code) >= 0
                ? 500000
                : 500001,
          };
        } else {
          result = {
            accountUser: memberUser,
            code: 500001,
            error: JSON.stringify(response.data),
            message: 'Lỗi kết nối nối xảy ra.',
          };
        }
        // console.error('===result development===', JSON.stringify(result));
        resolve(result);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          //console.log('===ERROR development===', error);
          // console.error(`URL ======> ${API_URL}${url}`);
        }
        resolve({
          code: 500001,
          error: JSON.stringify(error),
          msg: 'Lỗi kết nối',
        });
      }
    });
  },
};

export default Request;
