
var queue = [];
var input = 0;

//Dynamic User Interface
var data = ["9", "8", "7", "+", "6", "5", "4", "-", "3", "2", "1", "X", "0", ".", "queue", "/"];
            var init = 0;
            for (var i = 1; i < 5; i++) {
                document.write(`<div class='row'>`)
                for (var j = 1; j < 5; j++) {
                    init++;
                    console.log();
                    if ('/+-X'.split("").indexOf(data[init-1]) !== -1){
                        console.log("condition checking", '/+-X'.split("" ).indexOf(data[init-1]) == 1);
                        document.write(`<input type="button" onclick="operatorButton('${data[init-1]}')" value=${data[init-1]}>`);
                    }
                    else if(data[init - 1] === "queue") {
                        document.write(`<input type="button" onclick="calculation(queue)" value="=">`);
                    }
                    else{
                        document.write(`<input type="button" onclick="numericButton('${data[init - 1]}')" value=${data[init - 1]}>`);
                    }
                }
                document.write(`</div>`)
            }

// adding input into array
function addToQueue(input) {
    queue.push(input);
}
// Calculation Part
function calculation(value) {
    if (input !== 0) {
        input = parseFloat(input);
        addToQueue(input);
    }
    var answer = value[0];
    var dividedByZero = 0;
    for (var i = 2; i < value.length; i = i + 2) {
        switch (queue[i - 1]) {
            case '+':
                answer += value[i];
                break;
            case '-':
                answer -= value[i];
                break;
            case '/': 
                if (value[i] === 0) dividedByZero = 1;
                else answer = answer / value[i];
                break;
            case 'X': answer = answer * value[i];
                break;
        }
    }
// Clear input and calculation
function clearAll() {
        queue = [];
        input = 0;
        document.getElementById("answer").innerHTML = "0";
    }
// if divided by zero
if (dividedByZero === 1) {
        clearAll();
        document.getElementById("answer").innerHTML = "ERROR";
    }
    else {
        document.getElementById("answer").innerHTML = answer;
        input = answer;
        queue = [];
    }
}

// number button
function numericButton(arg) {
    if (document.getElementById("answer").innerHTML === "ERROR" || (document.getElementById("answer").innerHTML == "0" && arg != ".")) { document.getElementById("answer").innerHTML = ""; }
    if (!(arg === ".") || !input.match(/[.]/)) {
        input += arg;
        document.getElementById("answer").innerHTML += arg;
    }
}
// operator button
function operatorButton(arg) {
    if (input !== 0 && input !== "-") {
        input = parseFloat(input);
        addToQueue(input);
        addToQueue(arg);
        document.getElementById("answer").innerHTML += arg;
        input = 0;
    }
    if (arg == "-" && isNaN(queue[0]) && input !== "-") {
        input = "-";

        document.getElementById("answer").innerHTML = "-";
    }
}
