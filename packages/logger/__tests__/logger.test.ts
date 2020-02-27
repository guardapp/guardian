import { Logger } from "../src/logger";

describe('logger', () => {
    it('should exists', () => {
        const logger = new Logger();
        expect(logger).toBeDefined();
    });
});
