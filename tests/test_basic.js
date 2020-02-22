import tap from 'tap';
import { findMatch, ProductCodes, lineItemFromNACS } from '../src/index';


tap.test('test_basic', async (t) => {
  t.strictEquals(findMatch('Unleaded Regular')?.standardCode, '001', 'Should find by description');
  t.strictEquals(findMatch('Unleaded Reg')?.standardCode, '001', 'Should find by partial description');
  t.strictEquals(ProductCodes['001']?.longName, 'Unleaded Regular', 'Should lookup by product code');

  t.deepEquals(lineItemFromNACS(), {}, 'Should return empty item');
  t.deepEquals(lineItemFromNACS(null, { foo: true }), { foo: true }, 'Should return default item');
  t.deepEquals(lineItemFromNACS(ProductCodes['001']), {
    description: 'Unleaded Regular',
    code: '001',
    name: 'Unleaded Regular',
  }, 'Should return proper item');
});
