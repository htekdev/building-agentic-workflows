import { fileURLToPath } from 'node:url';
import { joinSession } from '@github/copilot-sdk/extension';
import { createHooks } from './policy.mjs';

await joinSession({
  hooks: createHooks(fileURLToPath(new URL('../../../', import.meta.url))),
});
