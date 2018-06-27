'use strict';

const DateOnly = require('dateonly');

module.exports = function joiDateonly(joi) {
  return joi.extend((joi) => ({
    name: 'dateonly',
    language: {
      dateonly: 'must be a date'
    },
    pre(value, state, options) {
      let dateonly;
      const error = () => this.createError('dateonly.dateonly',
                                           {v: value}, state, options);


      // Accept JSON representation of DateOnly format
      // This is 8-digit integer of form yyyymmdd
      if (/^\d{8}$/.test(value)) {
        dateonly = new DateOnly(parseInt(value)).valueOf();
      // Other integers are passed to Date() constructor.
      // Do not allow them.
      } else if (/^\d+$/.test(value)) {
          return error();
      } else {
        dateonly = new DateOnly(value).valueOf();
      }

      if (isNaN(dateonly)) {
        return error();
      }

      return dateonly;
    }
  }));
}
