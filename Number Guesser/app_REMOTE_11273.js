//Assigning value to variables
let minNumber = 1,
    maxNumber = 10,
    tryCounter = 3,
    guessNo = 2;


//UI elements
let game = document.querySelector('#game'),
    minNumUI = document.querySelector('.min-num'),
    maxNumUI = document.querySelector('.max-num'),
    inputBox = document.querySelector('#guess-input'),
    submit = document.querySelector('#guess-submit'),
    message = document.querySelector('.message');


//Assigning Dynamic value to minNumUi AND maxNumUI
minNumUI.textContent = minNumber;
maxNumUI.textContent = maxNumber;



submit.addEventListener('click',() => {
    const convertToInt = parseInt(inputBox.value);

    if(isNaN(convertToInt) || convertToInt < minNumber || convertToInt > maxNumber){
       return setMsg(`Insert a number between ${minNumber} and ${maxNumber}`,'red');
    }

    if(convertToInt === guessNo){
        isWin(true,`${guessNo} !! Awesome guessing!!`);
    }else{
        tryCounter -= 1;

        if(tryCounter === 0){
        //Disable inputBox after guessing a incorrect number three times
        //Border color red after incorrect guessing
        isWin(false,`Try again!! Correct guessing is ${guessNo}`);

        setMsg(`Filed to guess correct number.Correct number is ${guessNo} `,'red');
        }else{
            //When answer is not correct the border color turns into red
            inputBox.style.borderColor = 'red';
            inputBox.value = '';
            setMsg(`${convertToInt} is not correct guess !!Chances left ${tryCounter}`,'red');
        }
    }

});


function setMsg(msg,color){
    message.textContent= msg;
    message.style.color = color;
}


//DRY-Don't Repeat Yourself(Reuse code)
function isWin(win,msg){
    let color;
    //Ternary operator 
    win === true ? color = 'green' : color = 'red';
    //Disable inputBox after guessing a correct number
    inputBox.disabled = true;
    //Message color
    message.style.color = color;
    //Border color green after correct guessing
    inputBox.style.borderColor = color;
    

    setMsg(msg);
}