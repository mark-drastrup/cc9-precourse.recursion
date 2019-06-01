/* exported getElementsByClassName */

/*
  The Document object in JavaScript is amazing. It does a lot of beautiful things for you,
  like getting all the elements on a page by their classname:

  const className = 'example';
  const elements = document.getElementsByClassName(className);

  But we don't like easy! So we'll make you write your own.
*/

const getElementsByClassName = (className) => {
  const nodeList = document.getElementsByClassName(className);
  const array = Array.prototype.slice.apply(nodeList);
  return array;
};
