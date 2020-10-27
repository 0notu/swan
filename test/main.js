let Swan = require('../src/core.js')

var test_obj = {
    "Server": () => {
        new Swan.Server(Swan.Duck, 1336);
    }
}

for (var test in test_obj) {
    console.log("\n\n[#] Testing: ",test);
    test_obj[test]()
}