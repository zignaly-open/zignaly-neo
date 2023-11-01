import { flattenOverrideObject } from './i18nextWhitelabel';
describe('flattenOverrideObject', () => {
  it('should flatten flat objects', () => {
    const flatObject = { a: 'b', c: 'd' };
    expect(flattenOverrideObject(flatObject)).toMatchObject(flatObject);
  });

  it('should flatten non-flat objects', () => {
    const flatObject = { a: { b: 'c', d: { e: 'f' } } };
    expect(flattenOverrideObject(flatObject)).toMatchObject({
      'a.b': 'c',
      'a.d.e': 'f',
    });
  });
});
