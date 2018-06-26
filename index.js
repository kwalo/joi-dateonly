'use strict';

const DateOnly = require('dateonly');

module.exports = function joiDateonly(joi) {
  return joi.extend((joi) => ({
    name: 'dateonly',
    language: {
      dateonly: 'must be a date'
    },
    pre(value, state, options) {
      let d = new DateOnly(value);
      // Accept JSON representation of DateOnly format
      // This is 8-digit integer of form yyyymmdd
      // Other integers are passed to Date() constructor.
      // Do not allow them.
      if (typeof value === 'number' && d.toJSON() != value) {
        return this.createError('dateonly.dateonly',
          {v: value}, state, options
        );
      }
      return d.toJSON();
    }
  }));
}
