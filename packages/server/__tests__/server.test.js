'use strict';

jest.mock('express', () => {
    return () => ({
        listen: jest.fn(),
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        use: jest.fn()        
    })
});


const {Server} = require('..');

describe('server', () => {
    it('should throw error when service name is not defined', () => {
        expect(() => new Server()).toThrowError('service name must be provided');
    });

    it('should exists', () => {
        const s = new Server('test');
        expect(s).toBeDefined();
    });

    it('should call listen on express with port', () => {       
        const s = new Server('test');
        s.listen(1234);
        expect(s.app.listen.mock.calls.length).toEqual(1);
        expect(s.app.listen.mock.calls[0][0]).toEqual(1234);
    });

    it('should have default route GET /healthcheck', () => {
        const s = new Server('test');
        expect(s.app.get.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(s.app.get.mock.calls[0][0]).toEqual('/helthcheck');
    });

    it('should have a GET route', () => {
        const s = new Server('test');
        s.get('/get-route', null);
        expect(s.app.get.mock.calls.length).toBeGreaterThanOrEqual(1);
        expect(s.app.get.mock.calls[1][0]).toEqual('/get-route');
    });

    it('should have a POST route', () => {
        const s = new Server('test');
        s.post('/post-route', null);
        expect(s.app.post.mock.calls.length).toEqual(1);
        expect(s.app.post.mock.calls[0][0]).toEqual('/post-route');
    });

    it('should have a PUT route', () => {
        const s = new Server('test');
        s.put('/put-route', null);
        expect(s.app.put.mock.calls.length).toEqual(1);
        expect(s.app.put.mock.calls[0][0]).toEqual('/put-route');
    });

    it('should have a DELETE route', () => {
        const s = new Server('test');
        s.delete('/delete-route', null);
        expect(s.app.delete.mock.calls.length).toEqual(1);
        expect(s.app.delete.mock.calls[0][0]).toEqual('/delete-route');
    });

    it('should have a use route', () => {
        const s = new Server('test');
        s.use('/use-route', null);
        expect(s.app.use.mock.calls.length).toEqual(1);
        expect(s.app.use.mock.calls[0][0]).toEqual('/use-route');
    });
});
