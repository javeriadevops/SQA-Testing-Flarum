# 🧪 Flarum Discussion Forum — Automated Software Testing

### Software Quality Assurance (SQA) | Assignment 02

An automated software testing project for **Flarum Discussion Forum v2.0.2**, developed using **Playwright and JavaScript**.

The project evaluates the forum's core functionality, selected non-functional requirements, and complete user workflows through browser-based automated testing.

## 📌 Project Overview

Flarum is an open-source discussion platform that allows users to register, log in, create discussions, post replies, search for topics, and interact with posts.

This project focuses on testing the application rather than developing the Flarum platform itself.

**Key objectives:**
- Automate functional test scenarios.
- Verify positive and negative user interactions.
- Apply Equivalence Partitioning and Boundary Value Analysis.
- Evaluate performance, responsiveness, and access control.
- Execute smoke, regression, and end-to-end tests.
- Document defects and generate test execution reports.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Flarum v2.0.2 | Application Under Test |
| Playwright | Browser automation and testing |
| JavaScript | Test implementation |
| Node.js and npm | Runtime and dependency management |
| Chromium | Test execution browser |
| PHP | Flarum backend |
| SQLite | Application database |
| GitHub Codespaces | Development and testing environment |
| VS Code | Code editor |

## 🧪 Testing Coverage

The project includes **19 numbered test cases (TC-01 to TC-19)**.

### Functional Testing — 15 Test Cases

| Test ID | Test Scenario |
|---|---|
| TC-01 | Homepage loads successfully |
| TC-02 | Login dialog opens |
| TC-03 | Invalid login is rejected |
| TC-04 | Valid login succeeds |
| TC-05 | Registration form opens |
| TC-06 | Invalid email is rejected |
| TC-07 | Valid registration succeeds |
| TC-08 | Discussion composer opens |
| TC-09 | Discussion is created |
| TC-10 | Empty discussion title is rejected |
| TC-11 | Reply is created |
| TC-12 | Reply is edited |
| TC-17 | Existing discussion can be searched |
| TC-18 | Nonexistent discussion search is handled |
| TC-19 | Post Like functionality works |

### Non-Functional Testing — 3 Test Cases

| Test ID | Testing Area | Acceptance Criteria |
|---|---|---|
| TC-13 | Performance | Homepage loads within 5 seconds |
| TC-14 | Responsiveness | No horizontal overflow at 375 × 667 viewport |
| TC-15 | Security | Unauthorized admin access returns HTTP 403 |

### End-to-End Testing — 1 Test Case

**TC-16: Complete User Journey**

The automated workflow covers:

1. Opening the Flarum forum.
2. Logging in with valid credentials.
3. Creating and publishing a discussion.
4. Posting a reply.
5. Verifying the published content.

### Smoke Testing

Three critical functional tests are reused:

- TC-01 — Homepage
- TC-04 — Valid Login
- TC-08 — Discussion Composer

### Regression Testing

The selected regression test subset includes:

- TC-02 — Login Dialog
- TC-04 — Valid Login
- TC-08 — Discussion Composer

The subset was executed in separate runs. Verification of the proposed application configuration change was not fully evidenced, which is documented as a testing limitation.

## 📊 Test Execution Results

| Category | Tests | Final Result |
|---|---:|---|
| Functional Testing | 15 | Passed |
| Non-Functional Testing | 3 | Passed |
| End-to-End Testing | 1 | Passed |
| Default Playwright Example Tests | 2 | Passed |
| **Total** | **21** | **21 Passed** |

**Final recorded execution: 21 Passed · 0 Failed**

Smoke and regression testing reuse existing functional test cases and are not counted as additional unique tests.

## 📁 Project Structure

```text
SQA-Testing-Flarum/
├── flarum/                  # Flarum application
└── playwright-tests/
    ├── tests/
    │   ├── homepage.spec.js
    │   ├── authentication.spec.js
    │   ├── registration.spec.js
    │   ├── discussion.spec.js
    │   ├── reply.spec.js
    │   ├── search.spec.js
    │   ├── like.spec.js
    │   ├── e2e.spec.js
    │   ├── performance.spec.js
    │   ├── responsive.spec.js
    │   ├── security.spec.js
    │   └── example.spec.js
    ├── playwright.config.js
    ├── package.json
    └── playwright-report/
```

## 🚀 Setup and Installation

### Prerequisites

- Node.js and npm
- PHP with the extensions required by Flarum
- Composer and the Flarum application dependencies
- Playwright and Chromium
- An initialized Flarum SQLite database
- A valid Flarum test account

### 1. Open the Playwright Project

```bash
cd playwright-tests
```

### 2. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Configure Test Credentials

Create a `.env` file inside `playwright-tests`:

```env
FLARUM_USERNAME=your_test_username
FLARUM_PASSWORD=your_test_password
```

Do not commit real credentials to GitHub.

### 4. Start the Flarum Application

In a separate terminal:

```bash
cd flarum
php -d memory_limit=512M -d xdebug.mode=off -S 0.0.0.0:8000 -t public
```

The application should be accessible at:

`http://127.0.0.1:8000`

### 5. Run All Automated Tests

From `playwright-tests`:

```bash
npx playwright test --project=chromium
```

### 6. Generate the HTML Report

```bash
npx playwright test --project=chromium --reporter=html
```

Open the report:

```bash
npx playwright show-report
```

## ▶️ Run Specific Test Suites

**Functional Testing**

```bash
npx playwright test --project=chromium \
  --grep "TC-0[1-9]:|TC-1[0-2]:|TC-1[7-9]:"
```

**Non-Functional Testing**

```bash
npx playwright test --project=chromium \
  --grep "TC-13:|TC-14:|TC-15:"
```

**End-to-End Testing**

```bash
npx playwright test --project=chromium --grep "TC-16:"
```

**Smoke Testing**

```bash
npx playwright test --project=chromium \
  --grep "TC-01:|TC-04:|TC-08:"
```

**Regression Testing**

```bash
npx playwright test --project=chromium \
  --grep "TC-02:|TC-04:|TC-08:"
```

## 🐞 Defect Documentation

**BUG-01: Missing XSLT Polyfill Asset**

During testing, a missing frontend JavaScript asset caused a loading issue and affected the Like functionality.

**Observed error:** `XSLTProcessor is not defined`

**Resolution:** The missing asset files were restored to the public assets directory, the application cache was cleared, and the affected test was executed again.

**Retest result:** TC-19 Passed.

## ⚠️ Testing Limitations

- Automated browser execution was performed using Chromium.
- Performance results were recorded in a local development environment.
- Security testing covered a selected unauthorized-access scenario, not a full penetration test.
- Regression runs were recorded, but the proposed SQLite configuration change was not independently verified.
- The final pass rate applies only to the executed test cases.

## 👥 Team Members

| Name | Role | Enrollment Number |
|---|---|---|
| Hasnain Khalid | Team Lead | 02-134231-033 |
| Javeria Saeed | Team Member | 02-134231-052 |

**Course:** Software Quality Assurance (SQA)

**University:** Bahria University, Karachi Campus

---

*Academic project developed for Software Quality Assurance coursework.*
