# `@guardapp/logger`

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![CI](https://github.com/guardapp/guardian/workflows/CI/badge.svg)

Logger package to log to console in a formatted way

## Usage

```javascript
import {Logger} from "@guardapp/logger";

const logger = new Logger("app name"); // unique for every app/lib

logger.debug("message");
logger.info("message");
logger.error("message");
logger.fatal("message");
```