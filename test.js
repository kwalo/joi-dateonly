'use strict';

const assert = require('assert');
const DateOnly = require('dateonly');
const joiDateonly = require('./index.js');
let joi = require('joi');
joi = joiDateonly(joi);

describe('joi-dateonly', () => {
  it('is a Joi function', () => {
    assert.equal('function', typeof joiDateonly)
  });

  it('has dateonly method', () => {
    assert.equal('function', typeof joi.dateonly);
  });

  describe('schema', () => {
    const schema = joi.dateonly();

    it('should validate DateOnly instance', () => {
      const result = joi.validate(new DateOnly('2018-06-21'), schema);
      assert.ifError(result.error);
      assert.equal(20180521, result.value);
    });

    it('should validate Date instance', () => {
      const result = joi.validate(new Date('2018-06-21'), schema);
      assert.ifError(result.error);
      assert.equal(20180521, result.value);
    });

    it('should validate date string', () => {
      const dateString = '2018-06-15';
      const result = joi.validate(dateString, schema);
      assert.ifError(result.error);
      assert.equal(20180515, result.value);
    })

    it('should validate 8-digit number', () => {
      const goodNumber = 20180520;
      const result = joi.validate(goodNumber , schema);
      assert.ifError(result.error);
      assert.equal(goodNumber, result.value);
    });

    it('should NOT validate improper number', () => {
      const badNumbers = [0, new Date().getTime()];
      badNumbers.forEach(badNumber => {
        const result = joi.validate(badNumber, schema);
        assert(result.error);
      });
    });

    it('should NOT validate bad date string', () => {
      const result = joi.validate('bad-string', schema);
      assert(result.error);
    });

    it('should convert nonexisting dates', () => {
      // 31st February is 03 March
      let result = joi.validate(20180131, schema);
      assert.ifError(result.error);
      assert.equal(20180203, result.value);
      // 31 April is 01 May
      result = joi.validate(20180331, schema);
      assert.ifError(result.error);
      assert.equal(20180401, result.value);
    });
  });
});
