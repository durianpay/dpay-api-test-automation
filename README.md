# Dpay API Test Automation Framework

## Overview
This framework is designed for automated testing of the Dpay API services. It provides a structured approach to write, maintain, and execute API tests with a focus on readability, reusability, and maintainability.

## Project Structure
```
dpay-api-test-automation/
├── __tests__/                # Test specifications organized by domain
│   ├── snap-disbursement/    # Tests for snap disbursement APIs
│   │   ├── access-token-b2b.spec.js
│   │   └── balance-inquiry.spec.js
│   └── payments/             # Tests for payment APIs
├── pages/                    # Page objects for API interaction
│   ├── base.page.js          # Base class with common functionality
│   ├── access-token-b2b.page.js
│   └── balance-inquiry.page.js
├── fixtures/                 # Test data
│   ├── access-token-b2b.data.js
│   └── balance-inquiry.data.js
├── utils/                    # Utility functions
│   └── signature.js          # Authentication signature generation
├── reports/                  # Test execution reports
│   └── mochawesome/          # Mochawesome report files
├── jest.config.js            # Jest configuration
├── config.js                 # Global configuration
└── package.json              # Project dependencies
```

## How It Works

### Core Components

1. **Pages (Page Objects)**
   - Represent API endpoints and operations
   - Encapsulate API requests and response handling
   - Provide clean interfaces for tests to interact with APIs

2. **Fixtures**
   - Store test data in a structured way
   - Support both static (.json) and dynamic (.js) data formats
   - Organize test scenarios and expected results

3. **Tests**
   - Follow BDD style with describe and it blocks
   - Focus on business requirements and scenarios
   - Organized by domain/feature for better management

4. **Utils**
   - `signature.js`: Manages authentication and signature generation

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/dpay-api-test-automation.git
   cd dpay-api-test-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment-specific configuration in `config.js`

## Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test suite:
```bash
npm test __tests__/snap-disbursement/balance-inquiry.spec.js
```

## How to Contribute

### Setting Up Development Environment
1. Clone the repository
2. Create a feature branch
3. Install dependencies
4. Make your changes
5. Ensure tests pass
6. Submit a pull request

### Coding Standards
- Follow existing code structure and patterns
- Maintain consistent naming conventions
- Write descriptive test cases that explain the business requirement
- Add comments for complex logic

## Creating New Tests

### Step 1: Identify the API Feature to Test
- Understand the API endpoint, parameters, and expected responses
- Review API documentation for the feature

### Step 2: Create or Update Fixtures
- Add test data in `fixtures/` directory
- For new endpoint, create a new file like `endpoint-name.data.js`
- Include valid and invalid test scenarios

Example fixture file:
```json
// fixtures/new-feature.data.json
{
  "featureName": {
    "validScenario": {
      "param1": "value1",
      "param2": "value2"
    },
    "invalidScenario": {
      "param1": "invalid-value"
    }
  }
}
```

### Step 3: Create or Update Page Objects
- Add a new page object in `pages/` directory if needed
- Extend the `BasePage` to inherit common functionality
- Implement methods for API operations

Example page object:
```javascript
// pages/new-feature.page.js
const BasePage = require('./base.page');
const Request = require('../utils/api.request');
const config = require('../config');

class NewFeaturePage extends BasePage {
  async performOperation(data) {
    try {
      const response = await Request.post(`${config.baseUrl}/endpoint`, data);
      return response;
    } catch (error) {
      throw new Error('Failed to perform operation');
    }
  }
}

module.exports = new NewFeaturePage();
```

### Step 4: Write Test Specifications
- Create a new test file in appropriate directory under `__tests__/`
- Follow the BDD pattern with clear describe and it blocks
- Import necessary page objects and fixtures

Example test file:
```javascript
// __tests__/domain/new-feature.spec.js
const AuthPage = require('../../pages/access-token-b2b.page');
const NewFeaturePage = require('../../pages/new-feature.page');
const config = require('../../config');
const featureData = require('../../fixtures/new-feature.data');

describe('New Feature', () => {
  beforeAll(async () => {
    if (!config.accessToken) {
      await AuthPage.getAccessToken();
    }
  });

  it('should perform operation successfully with valid data', async () => {
    const response = await NewFeaturePage.performOperation(featureData.featureName.validScenario);
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Add specific assertions for your API response
  });

  it('should handle invalid data', async () => {
    await expect(NewFeaturePage.performOperation(featureData.featureName.invalidScenario))
      .rejects.toThrow('Failed to perform operation');
  });
});
```

### Step 5: Run and Validate Tests
- Run the new test in isolation to verify it works
- Run the full test suite to ensure no regressions

## Best Practices
- **Keep Tests Independent**: Each test should run independently of others
- **Use Clear Assertions**: Make assertions specific and descriptive
- **Handle Authentication**: Reuse the access token where possible
- **Organize by Domain**: Keep tests organized by API business domain
- **Document Test Cases**: Each test should have a clear purpose and description

## Troubleshooting
- Review logs for detailed error information
- Verify API endpoints and credentials
- Check network connectivity to API services
