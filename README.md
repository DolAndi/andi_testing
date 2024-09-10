# andi_testing

This repository contains my solution to a QA testing challenge.

## Solution

I opted to utilize Cypress as the automation testing framework, JavaScript for scripting, and the Mochawesome report for generating test reports. 
Also, I used https://serverest.dev/ for API testing and https://www.saucedemo.com for UI testing

## Prerequisites

Before running the tests, make sure you have the following tools installed on your system:

- Node.js (version 12 or higher)
- NPM or Yarn (I recommend NPM)

## Installation

Clone the repository:
```bash
git clone https://github.com/DolAndi/andi_testing.git
```

### For UI Tests
Navigate to the UI tests directory and install dependencies:
```bash
cd cypress-web-tests
```
```bash
npm install
```
```bash
npm install cypress --save-dev
```

### For API Tests
Navigate to the API tests directory and install dependencies:
```bash
cd cy-api-tests
```
```bash
npm install
```
```bash
npm install cypress --save-dev
```

## UI Tests - How to run 

### Headless mode:
```bash
npm run cy:ui-regression
```
### Windowed mode:
```bash
npm run cy:open
```

## API Tests - How to run 

```bash
npm run cy:run
```


---


## Author

Andriano Toazza

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andriano-toazza)
