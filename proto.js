// Advanced Prototype Pollution Scanner
(function () {
  const detectedIssues = [];

  // Utility function to log results
  function logIssue(issue) {
    console.warn('%c[Prototype Pollution Detected]', 'color: red; font-weight: bold;', issue);
    detectedIssues.push(issue);
  }

  // Hook Object.defineProperty to monitor property definitions
  const originalDefineProperty = Object.defineProperty;
  Object.defineProperty = function (obj, prop, descriptor) {
    if (prop === '__proto__' || prop === 'constructor') {
      logIssue({
        type: 'Object.defineProperty',
        object: obj,
        property: prop,
        descriptor: descriptor,
      });
    }
    return originalDefineProperty.apply(this, arguments);
  };

  // Hook Object.assign to detect pollution
  const originalAssign = Object.assign;
  Object.assign = function (target, ...sources) {
    sources.forEach((source) => {
      if (source && (source.__proto__ || source.constructor)) {
        logIssue({
          type: 'Object.assign',
          target: target,
          source: source,
        });
      }
    });
    return originalAssign.apply(this, arguments);
  };

  // Monitor JSON.parse for malicious payloads
  const originalParse = JSON.parse;
  JSON.parse = function (text, reviver) {
    let parsed;
    try {
      parsed = originalParse(text, reviver);
      if (parsed && typeof parsed === 'object' && ('__proto__' in parsed || 'constructor' in parsed)) {
        logIssue({
          type: 'JSON.parse',
          payload: text,
          parsed: parsed,
        });
      }
    } catch (err) {
      console.error('[JSON.parse Error]:', err);
    }
    return parsed;
  };

  // Hook Object.prototype.__proto__ for direct pollution
  Object.defineProperty(Object.prototype, '__proto__', {
    set(value) {
      logIssue({
        type: 'Direct Pollution',
        property: '__proto__',
        value: value,
      });
    },
  });

  // Monitor function constructors (Function, eval, setTimeout, etc.)
  const originalFunction = Function;
  Function = function (...args) {
    const body = args[args.length - 1];
    if (body.includes('__proto__') || body.includes('constructor')) {
      logIssue({
        type: 'Function Constructor',
        body: body,
      });
    }
    return originalFunction.apply(this, args);
  };

  // Display detected issues
  window.showPrototypePollutionIssues = function () {
    console.table(detectedIssues);
    if (detectedIssues.length === 0) {
      console.log('%c[No Prototype Pollution Detected]', 'color: green; font-weight: bold;');
    }
  };

  console.log('%c[Advanced Prototype Pollution Scanner Enabled]', 'color: blue; font-weight: bold;');
})();
