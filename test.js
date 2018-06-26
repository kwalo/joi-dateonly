'use strict';

const assert = require('assert');
const joiDateonly = require('./index.js');

describe('joi-dateonly', () => {
  it('is a Joi instance', () => {
    assert(joiDateonly.isJoi)
  });

  it('has dateonly method', () => {
    assert.equal('function', typeof joiDateonly.dateonly);
  });

  describe('schema', () => {
    const schema = joiDateonly.dateonly();

    it('should validate Date instance', () => {
      const result = joiDateonly.validate(new Date('2018-06-21'), schema);
      assert.ifError(result.error);
      assert.equal(20180521, result.value);
    });

    it('should validate date string', () => {
      const dateString = '2018-06-15';
      const result = joiDateonly.validate(dateString, schema);
      assert.ifError(result.error);
      assert.equal(20180515, result.value);
    })

    it('should validate 8-digit number', () => {
      const goodNumber = 20180520;
      const result = joiDateonly.validate(goodNumber , schema);
      assert.ifError(result.error);
      assert.equal(goodNumber, result.value);
    });

    it('should NOT validate improper number', () => {
      const badNumbers = [0, new Date().getTime()];
      badNumbers.forEach(badNumber => {
        const result = joiDateonly.validate(badNumber, schema);
        assert(result.error, result.error);
      });
    });

    it('should not accept nonexisting dates', () => {
      // 31st February and 31st April do not exist
      const nonExistingDates = [20180131, 20180331];
      nonExistingDates.forEach(badDate => {
        const result = joiDateonly.validate(badDate, schema);
        assert(result.error, result.error);
      });
    });
  });
});
