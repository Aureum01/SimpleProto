(function() {
    // Define standard properties for base prototypes
    const standardProperties = {
        Object: [
            'constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty',
            '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable',
            'toString', 'valueOf', '__proto__'
        ],
        Array: [
            'constructor', 'length', 'concat', 'copyWithin', 'entries', 'every', 'fill',
            'filter', 'find', 'findIndex', 'flat', 'flatMap', 'forEach', 'includes',
            'indexOf', 'join', 'keys', 'lastIndexOf', 'map', 'pop', 'push', 'reduce',
            'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort', 'splice',
            'toLocaleString', 'toString', 'unshift', 'values'
        ],
        Function: [
            'length', 'name', 'prototype', 'apply', 'bind', 'call', 'toString'
        ],
        String: [
            'constructor', 'length', 'charAt', 'charCodeAt', 'concat', 'includes',
            'endsWith', 'indexOf', 'lastIndexOf', 'localeCompare', 'match', 'repeat',
            'replace', 'search', 'slice', 'split', 'startsWith', 'substring', 'toLocaleLowerCase',
            'toLocaleUpperCase', 'toLowerCase', 'toString', 'toUpperCase', 'trim', 'valueOf'
        ],
        Boolean: [
            'constructor', 'toString', 'valueOf'
        ],
        Number: [
            'constructor', 'toExponential', 'toFixed', 'toLocaleString', 'toPrecision',
            'toString', 'valueOf'
        ],
        Date: [
            'constructor', 'toDateString', 'toISOString', 'toJSON', 'toLocaleDateString',
            'toLocaleString', 'toLocaleTimeString', 'toString', 'toTimeString',
            'valueOf', 'getDate', 'getDay', 'getFullYear', 'getHours', 'getMilliseconds',
            'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset',
            'getUTCDate', 'getUTCDay', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds',
            'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'setDate', 'setFullYear',
            'setHours', 'setMilliseconds', 'setMinutes', 'setMonth', 'setSeconds',
            'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours', 'setUTCMilliseconds',
            'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds'
        ],
        RegExp: [
            'constructor', 'exec', 'test', 'toString'
        ],
        Error: [
            'constructor', 'name', 'message', 'toString'
        ],
        // Add more prototypes as needed
    };

    // Reference to base prototypes
    const basePrototypes = {
        Object: Object.prototype,
        Array: Array.prototype,
        Function: Function.prototype,
        String: String.prototype,
        Boolean: Boolean.prototype,
        Number: Number.prototype,
        Date: Date.prototype,
        RegExp: RegExp.prototype,
        Error: Error.prototype,
    };

    // Function to detect prototype pollution
    function detectPrototypePollution() {
        let pollutionDetected = false;

        for (const [protoName, proto] of Object.entries(basePrototypes)) {
            const standardProps = standardProperties[protoName] || [];
            const currentProps = Object.getOwnPropertyNames(proto);
            const unexpectedProps = currentProps.filter(prop => !standardProps.includes(prop));

            if (unexpectedProps.length > 0) {
                pollutionDetected = true;
                console.warn(`🚨 Prototype Pollution Detected in ${protoName}.prototype:`, unexpectedProps);
            } else {
                console.log(`✅ No prototype pollution detected in ${protoName}.prototype.`);
            }
        }

        if (!pollutionDetected) {
            console.log('🎉 No prototype pollution detected in the inspected prototypes.');
        } else {
            console.warn('⚠️ Prototype pollution has been detected! Please investigate the above properties.');
        }
    }

    // Execute the detection function
    detectPrototypePollution();
})();
