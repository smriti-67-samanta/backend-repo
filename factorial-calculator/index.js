const { factorial, calculateFactorialWithMessage, factorialRecursive } = require('./factorial.js');


function testFactorialNumbers() {
    
    const testCases = [
        { number: 0, expected: 1 },
        { number: 1, expected: 1 },
        { number: 5, expected: 120 },
        { number: 7, expected: 5040 },
        { number: 10, expected: 3628800 },
        { number: 3, expected: 6 },
        { number: 4, expected: 24 },
        { number: 6, expected: 720 },
        { number: 8, expected: 40320 },
        { number: 12, expected: 479001600 }
    ];

    console.log('🧮 Factorial Calculator Results:\n');
    console.log('=' .repeat(50));

    let passed = 0;
    let failed = 0;

    
    testCases.forEach((testCase, index) => {
        try {
            const result = factorial(testCase.number);
            const status = result === testCase.expected ? '✅ PASS' : '❌ FAIL';
            
            if (result === testCase.expected) {
                passed++;
            } else {
                failed++;
            }

            console.log(`${index + 1}. ${testCase.number}! = ${result} (Expected: ${testCase.expected}) ${status}`);
        } catch (error) {
            console.log(`${index + 1}. ${testCase.number}! -> Error: ${error.message} ❌ FAIL`);
            failed++;
        }
    });

    console.log('=' .repeat(50));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('=' .repeat(50));
}

function demoFactorialMessages() {
    console.log('\n💬 Formatted Messages:\n');
    
    const numbers = [0, 1, 5, 7, 10, 3, 4, 6, 8, 12];
    
    numbers.forEach(num => {
        console.log(calculateFactorialWithMessage(num));
    });
}


function testErrorHandling() {
    console.log('\n⚠️  Error Handling Tests:\n');
    
    const invalidInputs = [
        -5,     
        -1,        
        3.14,     
        'not a number',
        null,
        undefined,
        NaN,
        {}
    ];
    
    invalidInputs.forEach(input => {
        try {
            factorial(input);
            console.log(`Unexpected: ${JSON.stringify(input)} did not throw error`);
        } catch (error) {
            console.log(`✅ Correctly handled: ${JSON.stringify(input)} -> ${error.message}`);
        }
    });
}

function testLargeNumbers() {
    console.log('\n⚡ Large Number Tests:\n');
    
    const largeNumbers = [
        15,   
        20,   
        25,    
        30,    
        50    
    ];
    
    largeNumbers.forEach(num => {
        try {
            const start = process.hrtime();
            const result = factorial(num);
            const end = process.hrtime(start);
            const timeMs = (end[0] * 1000 + end[1] / 1000000).toFixed(3);
            
            console.log(`${num}! = ${result} (${timeMs} ms)`);
            console.log(`   Type: ${typeof result}, Length: ${result.toString().length} digits`);
        } catch (error) {
            console.log(`${num}! -> Error: ${error.message}`);
        }
    });
}


function compareApproaches() {
    console.log('\n🔍 Comparison: Iterative vs Recursive (Small numbers only):\n');
    
    const smallNumbers = [0, 1, 5, 7, 10];
    
    smallNumbers.forEach(num => {
        try {
          
            const startIterative = process.hrtime();
            const resultIterative = factorial(num);
            const endIterative = process.hrtime(startIterative);
            const timeIterative = (endIterative[0] * 1000 + endIterative[1] / 1000000).toFixed(3);
            
           
            const startRecursive = process.hrtime();
            const resultRecursive = factorialRecursive(num);
            const endRecursive = process.hrtime(startRecursive);
            const timeRecursive = (endRecursive[0] * 1000 + endRecursive[1] / 1000000).toFixed(3);
            
            console.log(`${num}! = ${resultIterative}`);
            console.log(`   Iterative: ${timeIterative} ms, Recursive: ${timeRecursive} ms`);
            
        } catch (error) {
            console.log(`${num}! -> Error in recursive: ${error.message}`);
        }
    });
}


function main() {
    console.log('🚀 Factorial Calculator - Node.js Module Implementation\n');
    
   
    testFactorialNumbers();
    demoFactorialMessages();
    testErrorHandling();
    testLargeNumbers();
    compareApproaches();
    
    console.log('\n🎉 All tests completed!');
}


main();