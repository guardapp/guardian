# `logger`

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