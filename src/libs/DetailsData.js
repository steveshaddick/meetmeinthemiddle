import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';

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
};

export default DetailsData;
