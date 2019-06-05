/* exported stringifyJSON */

/*

What does the output for stringifyJSON look like? Play around with JSON.stringify to find out!

*/

const stringifyJSON = (value) => {
  if(typeof value === "boolean" || typeof value === "number" || value === null) return `${value}`;
  else if(typeof value === "string") {
    return '"' + value + '"';
  } else if(value instanceof Date) {
    return '"' + value.toISOString() + '"';
  }
  
  function recurse(collection) {
    let JSONstring = Array.isArray(collection) ? "[" : "{";
    if(Array.isArray(collection)) {
      let arrStr = collection.reduce((acc, current, index) => {
        if(typeof current === "string") {
          if(index !== collection.length -1) {
            return acc += '"' + current + '"' + ',';
          } else return acc += '"' + current + '"';
        } 
      else if(current instanceof Date) {
        return acc += '"' + current.toISOString() + '"';
      } 
      else if(Array.isArray(current) || typeof current === "object") {
        if(index !== collection.length -1 && !Array.isArray(current)) {
          return acc += recurse(current) + ","
        } else return acc += recurse(current);
      }
      else {
        if(index !== collection.length -1) {
          if(Array.isArray(collection[index-1]) && !Array.isArray(current)) {
            return acc += "," + current  + ",";
          } else return acc += current  + ",";
        } else {
          return acc += current;
        }
      } 
      }, "")
      JSONstring += arrStr;
    } else {
      let keys = Object.keys(collection)
      keys.forEach((key, index) => {
      if(typeof collection[key] === "number" || typeof collection[key] === "string") {
        if(index !== keys.length -1) {
          JSONstring += '"' + key + '"' + ":" + collection[key] + ',';
        } else {
          JSONstring += '"' + key + '"' + ":" + '"' + collection[key] + '"';
        }
      } else if(collection[key] === null) {
        if(index !== keys.length -1) {
          JSONstring += '"' + key + '"' + ":" + collection[key] + ',';
        } else {
          JSONstring += '"' + key + '"' + ":" + collection[key];
        }
      } else if(Array.isArray(collection[key])) {
        JSONstring += '"' + key + '"' + ":"
        JSONstring += recurse(collection[key])
        if(keys[index + 1] !== undefined) {
          JSONstring += ","
        }
      } else if(typeof collection[key] === "object") {
        JSONstring += '"' + key + '"' + ":"
        JSONstring += recurse(collection[key])
        if(keys[index + 1] !== undefined) {
          JSONstring += ","
        }
      } else if(typeof collection[key] === "boolean"){
        if(index !== keys.length -1) {
          JSONstring += '"' + key + '"' + ":" + collection[key] + ',';
        } else {
          JSONstring += '"' + key + '"' + ":" + collection[key];
        }
      }
    })
    }
    
    let JSONstringend = Array.isArray(collection) ? "]" : "}";
    return JSONstring + JSONstringend;
  }

  return recurse(value);
};

