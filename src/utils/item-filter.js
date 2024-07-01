import React from 'react'

export const filterByTag = (filters, items) => {
  let filtered = [];
  if (filters.name != "") {
    if (filtered.length == 0) filtered = filterName(items, filters.name);
    else filtered = filterName(filtered, filters.name);
  }
  if (filters.tag != "") {
    if (filtered.length == 0) filtered = filterTag(items, filters.tag);
    else filtered = filterTag(filtered, filters.tag);
  }
  return filtered;
}

const filterName = (list, filter) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].name.includes(filter))  result.push(list[i]);
  }
  return result;
}

const filterTag = (list, filter) => {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    for (let y = 0; y < list[i].tagList.length; y++){
      if (list[i].tagList[y] == filter) result.push(list[i]);
    }
  }
  return result;
}

//export default filterByTag
