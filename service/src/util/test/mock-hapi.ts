/*
  mock a small subset of hapi for handler unit tests

  todo?: maybe create real servers and use jest's mocking
  for this instead
*/

import * as Hapi from '@hapi/hapi';

export class MockHapi {
  body: object;
  params: object;

  response: object;
  responseCode: number;

  constructor(body = {}, params = {}) {
    this.body = body;
    this.params = params;
  }

  get request(): Hapi.Request {
    return {
      payload: this.body,
      params: this.params,
    } as unknown as Hapi.Request;
  }

  
  get toolkit(): Hapi.ResponseToolkit {
    return {
      response: (r: any) => {
        this.response = r;

        return this.toolkit;
      },

      code: (code: number) => {
        this.responseCode = code;

        return this.toolkit;
      },
    } as unknown as Hapi.ResponseToolkit;
  }
}
