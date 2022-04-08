import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    displayName: 'BROWSER',
    preset: 'solid-jest/preset/browser',
    verbose: true,
    prettierPath: 'prettier',
};

export default config;
