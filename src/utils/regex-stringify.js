// replacer function for JSON.stringify containing anobject with a regex pattern
//
// Example Object:
// const obj = {
//  test: /#upcoming/
// }
//
// regexStringifier(test, /#upcoming/)
// will return: "/#upcoming"
//
// or (main purpose)
// JSON.stringify(obj, regexStringifier)
// will return: "{\"test\":\"/#upcoming/\"}"
//
// inspired by: http://www.dyn-web.com/tutorials/php-js/json/filter.php
export const regexStringifier = (name, val) => {
  // convert RegExp to string
  if (val && val.constructor === RegExp) {
    return val.toString()
  }
  return val // return as is
}
