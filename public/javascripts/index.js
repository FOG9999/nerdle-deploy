// Set board size
let length = 8;
let width = 8;

// Set board
let board = new Map();
let keyboard = new Map();
let keyboard2 = new Map();

let randomString = "150/2=75"; // dap an - gia tri default

// Points
let points = 0;

// Current row
let currRow = 1;

// Array for points
let listArrForPoints = [];

// Game is started
let gameStarted = false;

// eventListeners
let eventListenersForNumbers = [];
let eventListenersForOpts = [];
let eventListenersForCalcuOpts = [];
let eventListenersForCalcuNums1 = [];
let eventListenersForCalcuNums2 = [];

// Create board
function createBoard(p1, p2) {
    let board = ""
    for (let i = 1; i <= p1; i++) {
        board += "<tr>"
        for (let j = 1; j <= p2; j++) {
            board += `<td class="Board" id=${i}.${j}></td>`
        }
        board += "</tr>"
    }
    document.getElementById("mainTable").innerHTML = board
}

// Update board
function addRow() {
    length += 1;
    points -= 10;
    if (points < 0) {
        alert('Bạn không có đủ điểm để thêm dòng.');
    }
    else {
        updateBoard(length, width);
        updatePoints();
    }
}

function updateBoard(p1, p2) {
    let list = []
    let a = 0;
    for (let i = 1; i <= p1 - 1; i++) {
        for (let j = 1; j <= p2; j++) {
            list.push([document.getElementById(`${i}.${j}`).innerHTML, document.getElementById(`${i}.${j}`).style.backgroundColor])
        }
    }
    createBoard(p1, p2)
    for (let i = 1; i <= p1 - 1; i++) {
        for (let j = 1; j <= p2; j++) {
            document.getElementById(`${i}.${j}`).innerHTML = list[a][0]
            document.getElementById(`${i}.${j}`).style.backgroundColor = list[a][1]
            a += 1;
        }
    }
}

// Update points
const updatePoints = () => {
    document.getElementById('points').innerHTML = points;
}

// Create keyboard
function createKeyboard() {
    let keyboard = ""
    keyboard += "<tr>"
    for (let i = 1; i <= 10; i++) {
        keyboard += `<td class="Keyboard" id=1.${i}.2></td>`
    }
    keyboard += "</tr>"
    let keyboard2 = ""
    keyboard2 += "<tr>"
    for (let i = 1; i <= 7; i++) {
        keyboard2 += `<td class="Keyboard" id=1.${i}.3></td>`
    }
    keyboard2 += "</tr>"
    document.getElementById("mainKeyboard").innerHTML = keyboard
    document.getElementById("mainKeyboard2").innerHTML = keyboard2
}

// Keyboard letters
function keyboardLetters() {
    lettersList1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    lettersList2 = ["<li><i class='gg-enter'></i></li>", "+", "-", "x", "/", "=", "<li><i class='gg-backspace'></i></li>"]
    for (let index = 0; index < 10; index++) {
        document.getElementById(`1.${index + 1}.2`).innerHTML = `${lettersList1[index]}`
    }
    for (let index = 0; index < 7; index++) {
        document.getElementById(`1.${index + 1}.3`).innerHTML = `${lettersList2[index]}`
    }
}

// Events
function eventClick() {
    let index = 1
    let index2 = 1
    let counter = 1;
    let calcuNum1 = "";
    let calcuPrevious1 = [];
    let calcuNum2 = "";
    let calcuPrevious2 = [];
    for (let i = 0; i < 10; i++) {
        let funcForThis = () => {
            if (index2 != length + 1) {
                document.getElementById(`${index}.${index2}`).innerHTML = document.getElementById(`1.${i + 1}.2`).innerHTML;
                ++index2;
            }
        }
        document.getElementById(`1.${i + 1}.2`).addEventListener('click', funcForThis);
        eventListenersForNumbers.push(funcForThis);
    }
    for (let i = 0; i < 7; i++) {
        let funcForThis = () => {
            if (i > 0 && i < 6 && index2 != length + 1) {
                // Hai dau toan tu khong o canh nhau (Tru khi dau - tao ra so am)
                if(!parseInt(document.getElementById(`1.${i + 1}.3`).innerHTML) && index2 > 1){
                    if (!parseInt(document.getElementById(`${index}.${index2-1}`).innerHTML) && document.getElementById(`${index}.${index2-1}`).innerHTML !== "0"){
                        if (i == 2){
                            if (document.getElementById(`${index}.${index2 - 1}`).innerHTML === "+" && index2 != 1){
                                document.getElementById(`${index}.${index2-1}`).innerHTML = "-";
                                alert('Nếu dấu "-" ở sau dấu "+", dấu "+" sẽ thành dấu "-".');
                            }
                            else if (document.getElementById(`${index}.${index2 - 1}`).innerHTML === "-" && index2 != 1){
                                document.getElementById(`${index}.${index2-1}`).innerHTML = "+";
                                alert('Nếu dấu "-" ở sau dấu "-", dấu "-" sẽ thành dấu "+".');
                            }
                            else{
                                document.getElementById(`${index}.${index2}`).innerHTML = document.getElementById(`1.${i + 1}.3`).innerHTML;
                                ++index2;
                            }
                        }
                        else{
                            alert('Hai dấu toán tử không ở cạnh nhau (Trừ khi dấu "-" tạo số âm).');
                        }
                    }
                    else{
                        document.getElementById(`${index}.${index2}`).innerHTML = document.getElementById(`1.${i + 1}.3`).innerHTML;
                        ++index2;
                    }
                }
                else{
                    // Ky tu dau moi dong khong phai la dau +, x, /, =
                    if (index2 == 1){
                        if (i == 2){
                            document.getElementById(`${index}.${index2}`).innerHTML = document.getElementById(`1.${i + 1}.3`).innerHTML;
                            ++index2;
                        }
                        else{
                            alert('Ký tự đầu mỗi dòng không phải là dấu "+", "x", "/", "=".')
                        }
                    }
                    else{
                        document.getElementById(`${index}.${index2}`).innerHTML = document.getElementById(`1.${i + 1}.3`).innerHTML;
                        ++index2;
                    }
                }
            } 
            else if (i == 6 && index2 > 1) {
                document.getElementById(`${index}.${index2 - 1}`).innerHTML = "";
                --index2;
            } 
            else if (i == 0 && index2 === length + 1) {
                let theList = []; // arr charcter of current row
                for (let j = 1; j < length + 1; j++) {
                    theList.push(document.getElementById(`${index}.${j}`).innerHTML);
                }
                if (checkIfOperatorisRight(theList)){
                    let checkedArr = checkCurrentRow(theList);
                    for (let i = 1; i <= length; i++) {
                        if (checkedArr[i - 1] == -1) {
                            document.getElementById(`${index}.${i}`).style.backgroundColor = "red";
                        }
                        if (checkedArr[i - 1] == 0) {
                            document.getElementById(`${index}.${i}`).style.backgroundColor = "yellow";
                        }
                        if (checkedArr[i - 1] == 1) {
                            document.getElementById(`${index}.${i}`).style.backgroundColor = "lightgreen";
                        }
                    }
                    index2 = 1
                    ++index
                    for (let i = 1; i < length + 1; i++){
                        if (document.getElementById(`${index-1}.${i}`).style.backgroundColor != "lightgreen"){
                            if (index == 9){
                                updatePoints();
                                document.getElementById('start-btn').innerHTML = 'Bắt đầu';
                                document.getElementById('start-btn').className = "btn btn-success";
                                document.getElementById('add-row').style.visibility = 'hidden';
                                document.getElementById('calculator').style.visibility = 'hidden';
                                onSurrender(true);
                                gameStarted = !gameStarted;
                            }
                            break;
                        }
                        if (i == 8){
                            updatePoints();
                            document.getElementById('start-btn').innerHTML = 'Bắt đầu';
                            document.getElementById('start-btn').className = "btn btn-success";
                            document.getElementById('add-row').style.visibility = 'hidden';
                            document.getElementById('calculator').style.visibility = 'hidden';
                            onSurrender(false);
                            gameStarted = !gameStarted;
                        }
                    }
                }
            }
        }
        document.getElementById(`1.${i + 1}.3`).addEventListener('click', funcForThis);
        eventListenersForOpts.push(funcForThis);
    }
    for (let i = 0; i < 4; i++){
        let funcForThis = () => {
            document.getElementById(`calcu-opt-${counter}`).style.backgroundColor = "white";
            document.getElementById(`calcu-opt-${i + 1}`).style.backgroundColor = "lightgreen";
            counter = i + 1;
        }
        document.getElementById(`calcu-opt-${i + 1}`).addEventListener('click', funcForThis);
        eventListenersForCalcuOpts.push(funcForThis);
    }
    for (let i = 0; i < 12; i++){
        let funcForThis = () => {
            if (i < 11){
                if (i == 10 && calcuNum1 != ""){
                    alert('Dấu "-" không đứng sau một chữ số trong một tham số.')
                }
                else{
                    if (document.getElementById(`expression1`).innerHTML[0] === "0") alert('Các số có 2 chữ số trở lên không bắt đầu với chữ số "0".');
                    else if(document.getElementById(`expression1`).innerHTML[0] === "-" && document.getElementById(`expression1`).innerHTML[1] === "0"){
                        alert('Các số có 2 chữ số trở lên không bắt đầu với chữ số "0".');
                    }
                    else{
                        if (document.getElementById(`expression1`).innerHTML.length === 4) alert('Tham số chỉ có 4 ký tự.');
                        else{
                            calcuPrevious1.push(document.getElementById(`expression1`).innerHTML);
                            calcuNum1 += document.getElementById(`calcu-num-${i + 1}.1`).innerHTML;
                            document.getElementById(`expression1`).innerHTML = calcuNum1;
                        }
                    }
                }
            }
            if (i == 11 && document.getElementById(`expression1`).innerHTML != ""){
                document.getElementById(`expression1`).innerHTML = calcuPrevious1[calcuPrevious1.length - 1];
                calcuNum1 = calcuPrevious1[calcuPrevious1.length - 1];
                calcuPrevious1.pop();
            }
        }
        document.getElementById(`calcu-num-${i + 1}.1`).addEventListener('click', funcForThis);
        eventListenersForCalcuNums1.push(funcForThis);
    }
    for (let i = 0; i < 12; i++){
        let funcForThis = () => {
            if (i < 11){
                if (i == 10 && calcuNum2 != ""){
                    alert('Dấu "-" không đứng sau một chữ số trong một tham số.')
                }
                else{
                    if (document.getElementById(`expression2`).innerHTML[0] === "0") alert('Các số có 2 chữ số trở lên không bắt đầu với chữ số "0".');
                    else if(document.getElementById(`expression2`).innerHTML[0] === "-" && document.getElementById(`expression2`).innerHTML[1] === "0"){
                        alert('Các số có 2 chữ số trở lên không bắt đầu với chữ số "0".');
                    }
                    else{
                        if (document.getElementById(`expression2`).innerHTML.length === 4) alert('Tham số chỉ có 4 ký tự.');
                        else{
                            calcuPrevious2.push(document.getElementById(`expression2`).innerHTML);
                            calcuNum2 += document.getElementById(`calcu-num-${i + 1}.2`).innerHTML;
                            document.getElementById(`expression2`).innerHTML = calcuNum2;
                        }
                    }
                }
            }
            if (i == 11 && document.getElementById(`expression2`).innerHTML != ""){
                document.getElementById(`expression2`).innerHTML = calcuPrevious2[calcuPrevious2.length - 1];
                calcuNum2 = calcuPrevious2[calcuPrevious2.length - 1];
                calcuPrevious2.pop();
            }
        }
        document.getElementById(`calcu-num-${i + 1}.2`).addEventListener('click', funcForThis);
        eventListenersForCalcuNums2.push(funcForThis);
    }
}

const checkCurrentRow = (theList) => {
    currRow++;
    let arrCharacters = randomString.split(''); // ['1','5',...]
    let checkedArr = [];
    theList.forEach((cha, ind) => {
        let indexInAnswer = arrCharacters.indexOf(cha);
        if (indexInAnswer < 0) { // [1,1].indexof(1) -> 0
            checkedArr[ind] = -1; // not exist
        }
        else {
            if (arrCharacters[ind] === cha) {
                checkedArr[ind] = 1; // trùng cả vị trí lẫn giá trị
                let repeatedArr = listArrForPoints.filter(index => index === cha);
                if (repeatedArr.length === 0){
                    points += 1;
                    listArrForPoints.push(cha);
                }
            }
            else {
                checkedArr[ind] = 0; // trùng giá trị
                let repeatedArr = listArrForPoints.filter(index => index === cha);
                if (repeatedArr.length === 0){
                    points += 2;
                    listArrForPoints.push(cha);
                }
            }
            updatePoints();
        }
    })
    return checkedArr;
}

const checkIfOperatorisRight = (theList) => {
    let numbers = theList.join('').split(/[,. \D]/).map(s => parseInt(s)); // truoc dau = -> k duoc co dau nao ca
    let notNumberArr = theList.filter(cha => !parseInt(cha) && cha !== '0');
    let beforeMultiply = theList.indexOf('x');
    let beforeDivide = theList.indexOf('/');
    let beforeEqual = theList.indexOf('=');
    // truoc mot so khong duoc co chu so 0
    for (let i = 0; i < length; i++){ 
        if (parseInt(theList[i]) || theList[i] === "0"){
            if (theList[i-1] === "0") {
                if (!parseInt(theList[i-2])){
                    if(theList[i-2] === "0"){
                        if(!parseInt(theList[i-3])){
                            alert('Các số có 2 chữ số trở lên không bắt đầu với chữ số "0".')
                            return false;
                        }
                    }
                    else{
                        alert('Các số có 2 chữ số trở lên không bắt đầu với chữ số "0".')
                        return false;
                    }
                }
            }
        }
    }
    // 1 phep tinh co nghia voi 1 cach tinh toan
    if (theList.indexOf('=') < 0) return false;
    if (theList[beforeEqual + 1] === "-"){
        // E.g. 37 - 46 = -9 => [37, 46, NaN, 9] & [-, =, -]
        numbers[numbers.length - 1] *= -1;
        numbers.splice(numbers.length - 2, 1); 
        notNumberArr.splice(notNumberArr.length - 1, 1); 
    }
    if (theList.indexOf('-') === 0){
        // E.g. -5 - 6 = -11 => [NaN, 5, 6, -11] & [-, -, =]
        numbers[1] *= -1; 
        numbers.splice(0, 1);
        notNumberArr.splice(0, 1);
    }
    if (theList[beforeMultiply + 1] === "-" && beforeMultiply >= 0){
        // E.g. 5 x -2 = -10 => [5, NaN, 2, -10] & [x, -, =]
        numbers.splice(notNumberArr.indexOf('x') + 1, 1); 
        numbers[notNumberArr.indexOf('x') + 1] *= -1;
        notNumberArr.splice(notNumberArr.indexOf('-'), 1);
    }
    if (theList[beforeDivide + 1] === "-" && beforeDivide >= 0){
        // E.g. 15 / -3 = -5 => [15, NaN, 3, -5] & [/, -, =]
        numbers.splice(notNumberArr.indexOf('/') + 1, 1); 
        numbers[notNumberArr.indexOf('/') + 1] /= -1;
        notNumberArr.splice(notNumberArr.indexOf('-'), 1);
    }
    if (notNumberArr.length !== 2){ // 1 dau = va 1 dau tinh toan
        alert('Mỗi lần đoán là 1 phép tính có 1 cách tính toán.')
        return false; 
    }
    else {          
        // tinh toan
        let result = 0;
        if (notNumberArr.indexOf('x') === 1 && notNumberArr.indexOf('/') != 0){
            numbers[notNumberArr.indexOf('x')] = numbers[notNumberArr.indexOf('x')] * numbers[notNumberArr.indexOf('x') + 1];
            numbers.splice(notNumberArr.indexOf('x') + 1, 1);
            notNumberArr.splice(notNumberArr.indexOf('x'), 1);
        } 
        if (notNumberArr.indexOf('/') === 1){
            numbers[notNumberArr.indexOf('/')] = numbers[notNumberArr.indexOf('/')] / numbers[notNumberArr.indexOf('/') + 1];
            numbers.splice(notNumberArr.indexOf('/') + 1, 1);
            notNumberArr.splice(notNumberArr.indexOf('/'), 1);
        } 
        if (notNumberArr[notNumberArr.length - 1] === "="){
            for (let i = 0; i < notNumberArr.length; i++){
                let opt = "";
                if (i === 0) opt = "+";
                else opt = notNumberArr[i-1];
                if (opt === "+") result += numbers[i];
                if (opt === "-") result -= numbers[i];
                if (opt === "x") result *= numbers[i];
                if (opt === "/") result /= numbers[i];
            }
            if (result === numbers[numbers.length - 1]){
                return true;
            }
            else{
                alert('Mỗi lần đoán là 1 phép tính có nghĩa.')
                return false;
            }
        }
    }
}

const generateExpression = () => {
    let a, b, opt, c;
    // a opt b = c
    const optArr = ['+', '-', 'x', '/'];
    let output = "";
    // generate a 
    let abcOrAcb = Math.random() > 0.9; // (90% a has 1 to 3 digits, 10% a has 4 digits)
    if (abcOrAcb) {
        a = Math.floor(Math.random() * 9000) + 1000; // a = Math.floor(Math.random() x 9000)+1000; //on-site, 3 digits (1000-9999)
    }
    else {
        let abcOrAcb = Math.random() > 0.5;
        if (abcOrAcb) {
            a = Math.floor(Math.random() * 900) + 100; // a = Math.floor(Math.random() x 900)+100; //on-site, 3 digits (100-999)
        }
        else {
            a = Math.floor(Math.random() * 90) + 1; // a = Math.floor(Math.random() x 90)+10; //test 2 digits (10-99)
        }
    }

    if (a.toString().length === 4) {
        opt = optArr[2];
        b = 0;
        c = 0;
    }
    else if (a.toString().length === 3) {
        let abcOrAcb = Math.random() > 0.9; // (90% a is positive, 10% a is negative, at 3 digits)
        if (abcOrAcb) {
            opt = optArr[2];
            a *= -1;
            b = 0;
            c = 0;
        }
        else {
            let optArrForOpt = ['-', '/'];
            opt = optArrForOpt[Math.floor(Math.random() * 2)];
            if (opt === '-') {
                if (a >= 109) {
                    a = Math.floor(Math.random() * 9) + 100; // 100-108 = 100 + x                
                }
                let x = a - 100;
                // generate b with 2 numbers = 90 + y
                // 100 + x - (90+y) <= 10 -> x <= y < 10
                b = Math.floor(Math.random() * (10 - x)) + x + 1; // >=x, <10  
                if (b === 10) b = 9;
                c = a - b;
            }
            if (opt === '/') {
                let detected = false, uocArr = [];
                for (let uoc = 10; uoc < 100; uoc++) {
                    if (a % uoc === 0 && a / uoc <= 9) {
                        uocArr.push(uoc);
                    }
                }
                if (uocArr.length > 0) detected = true;
                while (!detected) {
                    a = Math.floor(Math.random() * 900) + 100;
                    // check if has at least one uoc thuoc [10-99]
                    for (let uoc = 10; uoc < 100; uoc++) {
                        if (a % uoc === 0 && a / uoc <= 9) {
                            uocArr.push(uoc);
                        }
                    }
                    if (uocArr.length > 0) detected = true;
                }
                // random b with 2 numbers
                let randomBIndex = Math.floor(Math.random() * uocArr.length);
                b = uocArr[randomBIndex];
                c = a / b;
            }
        }
    }
    else {
        let abcOrAcb = Math.random() > 0.5;
        if (abcOrAcb) {
            if (a.toString().length === 2) {
                let optArrForOpt = ['+', '-', '/'];
                opt = optArrForOpt[Math.floor(Math.random() * 3)];
                if (opt === '+') {
                    // 10 < a < 89 for b with 2 numbers
                    // 10 < b < 99 - a
                    if (a < 10 || a > 89) {
                        a = Math.floor(Math.random() * 80) + 10
                        if (a === 10) a = 11;
                    }
                    b = Math.floor(Math.random() * (89 - a)) + 10;
                    c = a + b;
                }
                if (opt === '-') {
                    // 19 < a < 100 for b with 2 numbers
                    // a - b > 9 || 0 > a - b > -10
                    if (a < 19 || a > 100) {
                        a = Math.floor(Math.random() * 81) + 19
                        if (a === 19) a = 20;
                    }
                    let abcOrAcb = Math.random() > 0.5;
                    if (abcOrAcb) {
                        b = Math.floor(Math.random() * (a - 19)) + 10; // a - b > 9 && b > 9
                    }
                    else {
                        // 0 > a - b > -10 && b < 100
                        if (a > 90) {
                            b = Math.floor(Math.random() * (100 - a)) + a;
                        }
                        else {
                            b = Math.floor(Math.random() * 10) + a;
                        }
                        if (b === a) b += 1;
                    }
                    c = a - b;
                }
                if (opt === '/') {
                    // 56 / -8 = -7
                    // 0 > b > -10
                    let detected = false, uocArr = [];
                    for (let uoc = 1; uoc < 10; uoc++) {
                        if (a % uoc === 0 && a / uoc <= 9) {
                            uocArr.push(uoc);
                        }
                    }
                    if (uocArr.length > 0) detected = true;
                    while (!detected) {
                        a = Math.floor(Math.random() * 90) + 10;
                        // check if has at least one uoc thuoc [1-9]
                        for (let uoc = 1; uoc < 10; uoc++) {
                            if (a % uoc === 0 && a / uoc <= 9) {
                                uocArr.push(uoc);
                            }
                        }
                        if (uocArr.length > 0) detected = true;
                    }
                    let randomBIndex = Math.floor(Math.random() * uocArr.length);
                    b = uocArr[randomBIndex] * -1;
                    c = a / b;
                }
            }
            else if (a.toString().length === 1) {
                let optArrForOpt = ['+', '-', 'x'];
                opt = optArrForOpt[Math.floor(Math.random() * 3)];
                if (opt === '+') {
                    // 6 + 94 = 100
                    // b <= 100 - a & b <= 99
                    b = Math.floor(Math.random() * a + (100 - a));
                    c = a + b;
                    if (c === undefined) {
                        console.log("1 chu so duong, +")
                    }
                }
                if (opt === '-') {
                    // 7 - 38 = -31
                    b = Math.floor(Math.random() * (90 - a) + (10 + a));
                    c = a - b;
                }
                if (opt === 'x') {
                    // 3 x 92 = 276 & 5 x -4 = -20 
                    // 0 x b = 0 & 1 x b = b
                    if (a <= 1) a += Math.floor(Math.random() * 8) + (2 - a);
                    let abcOrAcb = Math.random() > 0.5;
                    if (abcOrAcb) {
                        b = Math.floor(Math.random() * (100 - Math.floor(100 / a))) + Math.floor(100 / a);
                        if (b === Math.floor(100 / a)) {
                            b += 1; // 4 x 25 = 100, b increased by 1 => 4 x 26 = 104
                        }
                    }
                    else {
                        b = (Math.floor(Math.random() * (10 - Math.floor(10 / a))) + Math.floor(10 / a)) * -1;
                        if (b === Math.floor(10 / a) * -1) {
                            b -= 1; // 3 x -3 = -9, b reduced by 1 => 3 x -4 = -12
                        }
                    }
                    c = a * b;
                }
            }
        }
        else { // a is negative
            if (a.toString().length === 2) {
                let optArrForOpt = ['+', '/'];
                opt = optArrForOpt[Math.floor(Math.random() * 2)];
                if (opt === '+') {
                    // -58 + 59 = 1
                    if (a < 91) {
                        b = Math.floor(Math.random() * 10) + a
                    }
                    else {
                        b = Math.floor(Math.random() * (100 - a)) + a
                    }
                    a *= -1;
                    c = a + b;
                }
                if (opt === '/') {
                    let detected = false, uocArr = [];
                    for (let uoc = 1; uoc < 10; uoc++) {
                        if (a % uoc === 0 && a / uoc <= 9) {
                            uocArr.push(uoc);
                        }
                    }
                    if (uocArr.length > 0) detected = true;
                    while (!detected) {
                        a = Math.floor(Math.random() * 90) + 10;
                        // check if has at least one uoc thuoc [10-99]
                        for (let uoc = 1; uoc < 10; uoc++) {
                            if (a % uoc === 0 && a / uoc <= 9) {
                                uocArr.push(uoc);
                            }
                        }
                        if (uocArr.length > 0) detected = true;
                    }
                    // random b with 2 numbers
                    let randomBIndex = Math.floor(Math.random() * uocArr.length);
                    a *= -1;
                    b = uocArr[randomBIndex];
                    c = a / b;
                }
            }
            else if (a.toString().length === 1) {
                let optArrForOpt = ['+', '-', 'x'];
                opt = optArrForOpt[Math.floor(Math.random() * 3)];
                if (opt === '+') {
                    // -6 + 93 = 87
                    b = Math.floor(Math.random() * (90 - a)) + (10 + a);
                    a *= -1;
                    c = a + b;
                }
                if (opt === '-') {
                    // -6 - 5 = -11
                    b = Math.floor(Math.random() * a) + (10 - a);
                    a *= -1;
                    c = a - b;
                }
                if (opt === 'x') {
                    // -4 x 5 = -20 & -3 x -5 = 15
                    b = Math.floor(Math.random() * (10 - Math.floor(10 / a))) + Math.floor(10 / a);
                    a *= -1
                    let abcOrAcb = Math.random() > 0.5;
                    if (abcOrAcb) {
                        if (b === Math.floor(10 / a)) {
                            b += 1;
                        }
                    }
                    else {
                        b *= -1
                        if (b === Math.floor(10 / a) * -1) {
                            b -= 1;
                        }
                    }
                    c = a * b;
                }
            }
        }
    }
    output = a + opt + b + '=' + c;
    return output;
}

const onSurrender = (confirm) => {
    if (confirm){
        let splitRandom = randomString.split('');
        for (let i = 1; i <= 8; i++) {
            if (currRow === length + 1){
                length += 1;
                updateBoard(length, width);
            }
            document.getElementById(`${currRow}.${i}`).innerHTML = splitRandom[i - 1];
            document.getElementById(`${currRow}.${i}`).style.backgroundColor = 'lightgreen';
        }
    }
    // remove all event listener for action buttons
    for (let i = 0; i < 10; i++) {
        document.getElementById(`1.${i + 1}.2`).removeEventListener('click', eventListenersForNumbers[i]);
    }
    eventListenersForNumbers = [];
    for (let i = 0; i < 7; i++) {
        document.getElementById(`1.${i + 1}.3`).removeEventListener('click', eventListenersForOpts[i]);
    }
    eventListenersForOpts = [];
    for (let i = 0; i < 4; i++) {
        document.getElementById(`calcu-opt-${i + 1}`).removeEventListener('click', eventListenersForCalcuOpts[i]);
        if (document.getElementById(`calcu-opt-${i + 1}`).style.backgroundColor = "lightgreen"){
                document.getElementById(`calcu-opt-${i + 1}`).style.backgroundColor = "white";
        }
    }
    eventListenersForCalcuOpts = [];
    for (let i = 0; i < 12; i++) {
        document.getElementById(`calcu-num-${i + 1}.1`).removeEventListener('click', eventListenersForCalcuNums1[i]);
    }
    eventListenersForCalcuNums1 = [];
    for (let i = 0; i < 12; i++) {
        document.getElementById(`calcu-num-${i + 1}.2`).removeEventListener('click', eventListenersForCalcuNums2[i]);
    }
    eventListenersForCalcuNums2 = [];
}

const onStartOrEnd = () => {
    if (!gameStarted) {
        points = 0;
        length = 8;
        currRow = 1;
        listArrForPoints = [];
        createBoard(length, width);
        document.getElementById('start-btn').innerHTML = 'Đầu hàng';
        document.getElementById('start-btn').className = "btn btn-danger";
        document.getElementById('add-row').style.visibility = 'visible';
        document.getElementById('calculator').style.visibility = 'visible';
        document.getElementById(`expression1`).innerHTML = "";
        document.getElementById(`expression2`).innerHTML = "";
        document.getElementById(`result`).innerHTML = "Kết quả: ";
        randomString = generateExpression();
        console.log(randomString);
        updatePoints();
        eventClick();
    }
    else {
        document.getElementById('start-btn').innerHTML = 'Bắt đầu';
        document.getElementById('start-btn').className = "btn btn-success";
        document.getElementById('add-row').style.visibility = 'hidden';
        document.getElementById('calculator').style.visibility = 'hidden';
        onSurrender(true);
    }
    gameStarted = !gameStarted;
}

function calculator(){
    if (document.getElementById(`expression1`).innerHTML !== "" && document.getElementById(`expression2`).innerHTML !== ""){
        for (let i = 0; i < 4; i++){
            if(document.getElementById(`calcu-opt-${i + 1}`).style.backgroundColor === "lightgreen"){
                let a = parseInt(document.getElementById(`expression1`).innerHTML);
                let b = parseInt(document.getElementById(`expression2`).innerHTML);
                let opt = document.getElementById(`calcu-opt-${i + 1}`).innerHTML;
                let c = "";
                if (opt === "+") c = a + b;
                if (opt === "-") c = a - b;
                if (opt === "x") c = a * b;
                if (opt === "/"){
                    if (b === 0) alert('Không thể chia với 0.')
                    else c = a / b;
                }
                document.getElementById(`result`).innerHTML = "Kết quả: " + c;
            }
        }
    }
}

// Console
createBoard(length, width);
createKeyboard();
keyboardLetters();
updatePoints();