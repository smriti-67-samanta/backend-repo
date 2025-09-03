const { isPrime, checkPrimeWithMessage } = require('./isPrime.js');


function testPrimeNumbers() {

    const testCases = [
        { number: 2, expected: true },
        { number: 10, expected: false },
        { number: 17, expected: true },
        { number: 21, expected: false },
        { number: 29, expected: true },
        { number: 1, expected: false },     
        { number: 0, expected: false },     
        { number: -5, expected: false },    
        { number: 97, expected: true },     
        { number: 100, expected: false }     
    ];

    console.log('🔢 Prime Number Checker Results:\n');
    console.log('=' .repeat(40));

    let passed = 0;
    let failed = 0;

   
    testCases.forEach((testCase, index) => {
        const result = isPrime(testCase.number);
        const status = result === testCase.expected ? '✅ PASS' : '❌ FAIL';
        
        if (result === testCase.expected) {
            passed++;
        } else {
            failed++;
        }

        console.log(`${index + 1}. ${testCase.number} -> ${result ? 'Prime' : 'Not Prime'} (Expected: ${testCase.expected ? 'Prime' : 'Not Prime'}) ${status}`);
    });

    console.log('=' .repeat(40));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('=' .repeat(40));
}


function demoPrimeMessages() {
    console.log('\n💬 Formatted Messages:\n');
    
    const numbers = [2, 10, 17, 21, 29, 1, -3, 97, 100];
    
    numbers.forEach(num => {
        console.log(checkPrimeWithMessage(num));
    });
}


function testErrorHandling() {
    console.log('\n⚠️  Error Handling Tests:\n');
    
    const invalidInputs = [
        'not a number',
        null,
        undefined,
        3.14,     
        NaN,
        {}
    ];
    
    invalidInputs.forEach(input => {
        try {
           
            isPrime(input);
            console.log(`Unexpected: ${input} did not throw error`);
        } catch (error) {
            console.log(`✅ Correctly handled: ${JSON.stringify(input)} -> ${error.message}`);
        }
    });
}


function testPerformance() {
    console.log('\n⚡ Performance Test (Large Numbers):\n');
    
    const largeNumbers = [
        1000003,  
        1000000,  
        15485863, 
        15485864   
    ];
    
    largeNumbers.forEach(num => {
        const start = process.hrtime();
        const result = isPrime(num);
        const end = process.hrtime(start);
        const timeMs = (end[0] * 1000 + end[1] / 1000000).toFixed(3);
        
        console.log(`${num} -> ${result ? 'Prime' : 'Not Prime'} (${timeMs} ms)`);
    });
}


function main() {
    console.log('🚀 Prime Number Checker - Node.js Module Implementation\n');
    

    testPrimeNumbers();
    demoPrimeMessages();
    testErrorHandling();
    testPerformance();
    
    console.log('\n🎉 All tests completed!');
}


main();