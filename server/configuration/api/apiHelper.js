import {isArray, isNull, isUndefined} from 'lodash';

export const normalizeResponse = (result, error) =>{
  if(!isNull(error) && !isUndefined(error)){
    return {
      status: false,
      error: error.toString()
    }
  }

  if(isArray(result)){
    return {
      status: true,
      data: result
    }
  }

  if(isNull(result) || isUndefined(result)){
    return {
      status: false,
      data: []
    }
  }

  return {
    status: true,
    data: result
  }
};