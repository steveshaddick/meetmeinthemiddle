import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import queryString from 'query-string';

let data = {
  you: {
    address: '',
    travelMode: 'WALKING',
  },
  them: {
    address: '',
    travelMode: 'WALKING',
  },
  place: {
    searchTerms: '',
    radius: 300,
  },
};

let tmpData = cloneDeep(data);

const DetailsData = {
  update: newData => {
    data = merge(data, newData);
    tmpData = cloneDeep(data);
    return data;
  },

  get: (type, key) => {
    return key
      ? cloneDeep(data[type][key])
      : type
        ? cloneDeep(data[type])
        : cloneDeep(data);
  },

  change: (type, key, value) => {
    tmpData[type][key] = value;
    return tmpData;
  },

  commit: () => {
    return DetailsData.update(tmpData);
  },

  cancelChanges: () => {
    tmpData = cloneDeep(data);
    return data;
  },

  clone: type => {
    return type ? cloneDeep(data[type]) : cloneDeep(data);
  },

  parseUrl: () => {
    const parsed = queryString.parse(location.search);

    if (parsed.ya && parsed.ta) {
      const newData = {
        you: {
          address: decodeURI(parsed.ya),
          travelMode: parsed.yt ? parsed.yt : undefined,
        },
        them: {
          address: decodeURI(parsed.ta),
          travelMode: parsed.tt ? parsed.tt : undefined,
        },
      };

      DetailsData.update(newData);

      return true;
    }

    return false;
  },

  getShareUrl: () => {
    return `${window.location.protocol}//${window.location.host}?ya=${encodeURI(
      data.you.address
    )}&yt=${data.you.travelMode}&ta=${encodeURI(data.them.address)}&tt=${
      data.them.travelMode
    }`;
  },
};

export default DetailsData;
