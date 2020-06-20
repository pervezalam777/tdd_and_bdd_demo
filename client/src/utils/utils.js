//@ts-nocheck

export function isValidContainer(container){
  return (container && container.tagName && container.tagName === "DIV")
}


export function hasPropertyWithType(options, properties, type){
  if(options && typeof options === 'object'){
    for(let item of properties){
      if(!options[item] && !(typeof options[item] === type)){
        return false;
      }
    }
    return true;
  }
  return false;
}

export function checkType(value, type){
  return typeof value === type;
}