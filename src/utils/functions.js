export const isEmpty = (param) => {
  return param == undefined || param == null || (typeof param === 'string' && param == '') || (typeof param === 'object' && param.length == 0) || (typeof param === 'array' && param.length == 0);
}