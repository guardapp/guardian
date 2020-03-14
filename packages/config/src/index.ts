import {config} from 'dotenv';

export function init() {
  config();
  return Promise.resolve();
}
