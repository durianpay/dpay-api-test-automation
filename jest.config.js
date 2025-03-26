// jest.config.js (buat file ini jika belum ada)
module.exports = {
    verbose: true,
    reporters: [
        "default",
        ['jest-console-reporter', {
            colors: true,
            showInline: true,
            showSuiteName: true,
            showTestName: true,
            showTestResults: true,
            showTestDuration: true,
            showTestSummary: true,
            showTestErrors: true,
            showTestStack: true,
            showTestLocation: true,
            showPath: true,
            showColour: true,
            showConsole: true,
            showSymbol: true,
            showComments: true
        }]
    ],
    testTimeout: 30000,
};