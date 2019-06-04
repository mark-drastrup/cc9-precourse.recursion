/* exported getElementsByClassName */

/*
  The Document object in JavaScript is amazing. It does a lot of beautiful things for you,
  like getting all the elements on a page by their classname:

  const className = 'example';
  const elements = document.getElementsByClassName(className);

  But we don't like easy! So we'll make you write your own.
*/

const getElementsByClassName = (className, node = document.body) => {
  let arr = []
  

  function recursion(node) {
    if(node.classList.contains(className)) {
      arr.push(node);
    }

    for(let elem of node.children) {
      if(elem.localName === "script" || elem === undefined) continue;
    
      if(elem.firstChild === null && elem.nextSibling !== null) {
        recursion(elem.nextSibling)
      } else if(elem.firstChild !== null && elem.firstChild.nodeType !== 3) {
        recursion(elem.firstChild)
      } 
    }
  }
  recursion(node)
  return arr;
};
