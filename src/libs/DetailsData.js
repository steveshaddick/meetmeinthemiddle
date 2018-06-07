import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import queryString from 'query-string';

let data = {
  you: {
    address: '104 Manning Ave, Toronto, ON',
    travelMode: 'WALKING',
  },
  them: {
    address: '34 Maccaulay, Toronto, ON',
    travelMode: 'BICYCLING',
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

    const newData = {
      you: {
        address: parsed.ya ? decodeURI(parsed.ya) : undefined,
        travelMode: parsed.yt ? parsed.yt : undefined,
      },
      them: {
        address: parsed.ta ? decodeURI(parsed.ta) : undefined,
        travelMode: parsed.tt ? parsed.tt : undefined,
      },
    };

    DetailsData.update(newData);
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
