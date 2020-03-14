import {config} from 'dotenv';

let processed = false;

export function init() {
  if (processed) return Promise.resolve(process.env);

  config();
  processed = true;

  return Promise.resolve(process.env);
}
