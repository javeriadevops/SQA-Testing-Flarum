# SQA Assignment 02 - Flarum Automated Testing

Application: Flarum 2.0.2
Framework: Playwright with JavaScript
Browser: Chromium

Team Members:
- Hasnain Khalid (Team Lead) - 02-134231-033
- Javeria Saeed - 02-134231-052

## Setup

1. Install Node.js and npm.
2. Install project dependencies:
   npm ci
3. Install Chromium:
   npx playwright install chromium
4. Start the configured Flarum application locally at:
   http://127.0.0.1:8000
5. Create a .env file with the required test account credentials:
   FLARUM_USERNAME=your_test_username
   FLARUM_PASSWORD=your_test_password

## Run All Tests

npx playwright test --project=chromium

## Generate HTML Report

npx playwright test --project=chromium --reporter=html

## Open HTML Report

npx playwright show-report

## Notes

The Flarum application must be running before executing tests.
Tests that create users, discussions, or replies require suitable test data and permissions.
The .env file is intentionally excluded for security.
