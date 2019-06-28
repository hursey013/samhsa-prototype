import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json'
});

export const buildParams = query => {
  const initialValues = {
    sType: 'BOTH',
    sCodes: '',
    pageSize: 10,
    page: 1,
    sort: 0
  };

  const params = Object.entries(query).reduce((memo, [key, value]) => {
    if (key === 'distance' && value !== 'All') {
      return {
        ...memo,
        limitType: 2,
        limitValue: 16093.4
      };
    }

    if (key === 'languages') {
      return {
        ...memo,
        sLanguages: value
      };
    }

    if (key === 'location') {
      return {
        ...memo,
        sAddr: `${value.location.lat}, ${value.location.lng}`
      };
    }

    if (key === 'page') {
      return {
        ...memo,
        page: value
      };
    }

    if (key === 'type' && value === 'Intake') {
      return memo;
    }

    return {
      ...memo,
      sCodes:
        memo.sCodes
          .split(',')
          .filter(v => !!v)
          .concat(value)
          .join() || undefined
    };
  }, initialValues);

  if (!params.sCodes) {
    const { sCodes, ...finalParams } = params;

    return finalParams;
  }

  return params;
};
