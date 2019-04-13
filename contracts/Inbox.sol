pragma solidity ^0.4.25;

// similar to class
contract Inbox {
    // storage variable (or global variable) that all changes get persisted on blockchain, different from local variable
    // when a public storage variable is declared, a getter function is generated automatically (with the same name)
    string public message;

    // constructor function, automatically called one time when the contract is created
    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string m) public {
        message = m;
    }
}

// view/constant: no modification
// pure: no modification and no reading
// payable: when someone call this function they might send Ether along
// returns: only applicable for view/constant functions, that means you can't modify a storage variable and returns value in one function

/*
Run functions on a contract:
1. calling
    cannot modify data (storage variables)
    can return data
    runs instantly
    free

2. transacting
    can modify data (storage variables)
    cannot return data, but returns the transaction hash
    takes time to execute
    costs Ether (gas)

*/
