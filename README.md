# joi-dateonly
A Joi extension to for validating [DateOnly](https://www.npmjs.com/package/dateonly) class.

## Installation

```
npm install joi-dateonly
```

## Usage
Use extended joi object for validation
```js
const joiDateonly = require('joi-dateonly');
let joi = require('joi');
joi = joiDateonly(joi);

let result = joi.validate('2018-06-20', joi.dateonly());
console.log(result.value); // => 20180520

// Other joi types work as well
joi.validate({number: 1, date: 20180520}, {number: joi.number(), date: joi.dateonly().required()});
```
