/* exported stringifyJSON */

/*

What does the output for stringifyJSON look like? Play around with JSON.stringify to find out!

*/

const stringifyJSON = (value) => {
  if(typeof value === "boolean" || typeof value === "number" || value === null) return `${value}`;
  else if(typeof value === "string") {
    return '"' + value + '"';
  } 
  
  function recurse(collection) {
    let JSONstring = Array.isArray(collection) ? "[" : "{";
    if(Array.isArray(collection)) {
      let arrStr = collection.reduce((acc, current, index) => {
        if(typeof current === "string") return acc += '"' + current + '"';
      else if(Array.isArray(current)) {
        return acc += recurse(current);
      }
      else {
        if(index !== collection.length -1) {
          return acc += current  + ",";
        } else {
          return acc += current;
        }
      } 
      }, "")
      JSONstring += arrStr;
    } else {
      let keys = Object.keys(collection)
    keys.forEach((key, index) => {
      if(typeof collection[key] === "boolean" || typeof collection[key] === "number" || typeof collection[key] === "string") {
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
        console.log("array")
        JSONstring += '"' + key + '"' + ":"
        JSONstring += "[";
        let arr = collection[key].reduce((acc, current, index) => {
          if(typeof current === "string") {
            if(index !== collection[key].length -1) {
              return acc += '"' + current + '"' + ',';
            } else {
              return acc += '"' + current + '"';
            }
          } 
          else {
            if(index !== collection[key].length -1) {
              return acc += current  + ",";
            } else {
              return acc += current;
            }
          } 
        }, "")
        JSONstring += arr + "]"
      } else if(typeof collection[key] === "object") {
        console.log("object")
        JSONstring += '"' + key + '"' + ":"
        JSONstring += recurse(collection[key])
      }  else {
        JSONstring += '"' + key + '"' + ":" + '"' + collection[key] + '"';
        
      }
    })
    }
    
    JSONstringend = Array.isArray(collection) ? "]" : "}";
    return JSONstring + JSONstringend;
  }

  return recurse(value);
};

