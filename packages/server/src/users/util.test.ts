import * as config from '../../config';
import { ImportMock } from 'ts-mock-imports';

ImportMock.mockOther(config, 'secret', 'vfsdv');

describe('JWT signature', () => {
  it('should work', () => {
    expect(config.secret).toBe('vfsdv');
  });
});
