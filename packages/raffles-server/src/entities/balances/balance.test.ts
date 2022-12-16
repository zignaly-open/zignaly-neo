import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

export async function makeRequest(
  gql: string,
  token: string,
  variables = {},
): Promise<any> {
  let r = request.post('/graphql');
  if (token) r = r.set('Authorization', 'Bearer ' + token);
  return r
    .send({
      query: gql,
      variables,
    })
    .set('Accept', 'application/json');
}

describe('e2e demo', () => {
  // beforeAll(async () => {
  // });

  // afterAll(async () => {
  // });

  it('should be able to get deposits', async () => {
    expect(true).toBe(true);
  });
});
