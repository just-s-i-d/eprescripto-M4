module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@assets/(.*)$": "<rootDir>/src/assets/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@constants/(.*)$": "<rootDir>/src/constants/$1",
        "^@context/(.*)$": "<rootDir>/src/context/$1",
        "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
        "^@routes/(.*)$": "<rootDir>/src/routes/$1",
        "^@style/(.*)$": "<rootDir>/src/style/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@theme/(.*)$": "<rootDir>/src/theme/$1",
        "^@test/(.*)$": "<rootDir>/src/__test__/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@ts/(.*)$": "<rootDir>/src/ts/$1",
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@tests/(.*)$": "<rootDir>/src/__test__/$1",
    },
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileTransformer.cjs',
    },
    collectCoverage: false,
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!<rootDir>/src/theme/*.ts", "!<rootDir>/src/constants/*.{ts,tsx}", "!<rootDir>/src/__test__/{matchMedia,setup}.ts", "!<rootDir>/src/**/*.d.ts", "!<rootDir>/src/constants/*.test.*", "!<rootDir>/src/pages/PatientDashboardPage.tsx", "!<rootDir>/src/utils/AxiosInstance.ts", "!<rootDir>/src/main.tsx"],
};