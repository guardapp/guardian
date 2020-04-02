'use strict';

jest.mock('express', () => {
  return () => ({
    listen: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    use: jest.fn()
  });
});
const routeHandlerSpy = jest.fn();
process.env.GUARD_JET_TOKEN = 'empty';

const {createServer} = require('..');

// TODO: fix tests
describe.skip('server', () => {
  it('should throw error when service name is not defined', async () => {
    expect.assertions(1);
    try {
      await createServer(null);
    } catch (e) {
      expect(e.message).toEqual('service name must be provided');
    }
  });

  it('should exists', async () => {
    const s = await createServer('test');
    expect(s).toBeDefined();
  });

  it('should call listen on express with port', async () => {
    const s = await createServer('test');
    s.listen(1234);
    expect(s.app.listen.mock.calls.length).toEqual(1);
    expect(s.app.listen.mock.calls[0][0]).toEqual(1234);
  });

  it('should have default route GET /healthcheck', async () => {
    const s = await createServer('test');
    expect(s.app.get.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(s.app.get.mock.calls[0][0]).toEqual('/helthcheck');
  });

  it('should have a GET route', async () => {
    const s = await createServer('test');
    s.get('/get-route', routeHandlerSpy);
    expect(s.app.get.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(s.app.get.mock.calls[1][0]).toEqual('/get-route');
    expect(s.app.get.mock.calls[1][2]).toStrictEqual([routeHandlerSpy]);
  });

  it('should have a POST route', async () => {
    const s = await createServer('test');
    s.post('/post-route', routeHandlerSpy);
    expect(s.app.post.mock.calls.length).toEqual(1);
    expect(s.app.post.mock.calls[0][0]).toEqual('/post-route');
    expect(s.app.post.mock.calls[0][2]).toStrictEqual([routeHandlerSpy]);
  });

  it('should have a PUT route', async () => {
    const s = await createServer('test');
    s.put('/put-route', routeHandlerSpy);
    expect(s.app.put.mock.calls.length).toEqual(1);
    expect(s.app.put.mock.calls[0][0]).toEqual('/put-route');
    expect(s.app.put.mock.calls[0][2]).toStrictEqual([routeHandlerSpy]);
  });

  it('should have a DELETE route', async () => {
    const s = await createServer('test');
    s.delete('/delete-route', routeHandlerSpy);
    expect(s.app.delete.mock.calls.length).toEqual(1);
    expect(s.app.delete.mock.calls[0][0]).toEqual('/delete-route');
    expect(s.app.delete.mock.calls[0][2]).toStrictEqual([routeHandlerSpy]);
  });

  it('should have a use route', async () => {
    const s = await createServer('test');
    const routeHandlerSpy = jest.fn();
    s.use(routeHandlerSpy);
    expect(s.app.use.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(s.app.use.mock.calls[s.app.use.mock.calls.length-1][1]).toStrictEqual([routeHandlerSpy]);
  });
});
