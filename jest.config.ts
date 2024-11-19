import { Config } from "jest";

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
}

export default config;