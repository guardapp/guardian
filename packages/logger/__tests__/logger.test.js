const { Logger } = require('..');

describe('logger', () => {
    it('should exists', () => {
        const logger = new Logger('logger.test');
        expect(logger).toBeDefined();        
    });
});
