# SimpleProto
A simple and easy script to paste into your console to help you find prototype vulnerabilities and log them


This script is designed to detect potential prototype pollution vulnerabilities in JavaScript code by analyzing the use of `Object.assign`, `__proto__`, and other prototype-modifying methods. It traces the source of pollution, identifies user-controlled inputs, and validates whether critical application properties are affected.

## How to Use the Script

### Open the Developer Console
1. Open the website you want to test in your browser.
2. Right-click anywhere on the page and select **Inspect** or press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (Mac).
3. Navigate to the **Console** tab.

### Paste the Script
1. Copy the entire script from the provided code file.
2. Paste it into the console and press `Enter`.

### Step 3: Analyze the Results
- The script will immediately start monitoring for prototype pollution vulnerabilities in real-time.
- Any potential issues will be logged in the console with the following details:
  - **Type of vulnerability** (e.g., `Object.assign`, `JSON.parse`).
  - **Target object** showing polluted properties.
  - **Source code stack trace** leading to the pollution.
  - **Confirmation if pollution is confirmed** with a confidence level.

### Trace Vulnerability Sources
- Review the stack trace to identify the exact location in the source code where the prototype pollution occurred.
- Look for lines such as:
  ```
  fetchWithoutJwt @ fetch.js:66
  authorizedFetch @ fetch.js:126
  ```
- You'll find the prototype within those scripts, more directly where the type is next to a log

### Step 5: Mitigation
If prototype pollution is confirmed:
- Ensure input validation and sanitization for all user-controlled data.
- Restrict reserved object keys like `__proto__`, `constructor`, or `prototype`.
- Use safe alternatives for deep merging or cloning, such as `lodash` with safeguards enabled.

## Example Output
When prototype pollution is detected, the output will look something like this:
```plaintext
[🔥 Prototype Pollution Confirmed] - Object.assign
Details: {
  target: {...},
  sources: Array(1),
  result: {...}
}
```

## Notes
- Use responsibly
- It only logs potential vulnerabilities to the console.

## Troubleshooting
- If no issues are detected but you suspect vulnerabilities, ensure the script is pasted correctly and refresh the page before re-running.
- Tested via Chrome, Chromium, and Firefox

Happy Testing!
