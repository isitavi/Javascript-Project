document.querySelector('#loan-form').addEventListener('submit',calculateResults);

//Calculate Loan
function calculateResults(evntObj){
    //Defining UI variables
    let amountUI = document.querySelector('#amount');
    let interestUI = document.querySelector('#interest');
    let yearsUI = document.querySelector('#years');
    let monthlyPayUI = document.querySelector('#monthly-payment');
    let totalPayUI = document.querySelector('#total-payment');
    let totalInterestUI = document.querySelector('#total-interest');
    const loading = document.querySelector('#loading');
    



    //Main part of the calculations
        //Principle = amount of loan taken
    let principle = parseFloat(amountUI.value);
    // console.log(principle);
    let calculateInterest = parseFloat(interestUI.value)/ 12 / 100;
    // console.log(calculateInterest);
    let calculateYearToMonths = parseFloat(yearsUI.value) * 12;
    // console.log(calculateYearToMonths);

    //Result Calculation(https://en.wikipedia.org/wiki/Mortgage_calculator) Follow this link to understand back-end logic
    // r = interest rate,n = no of months(which willbe to the power)
    //P - the amount borrowed, known as the loan's principal.Which is 200000
    // (1+r)^n
    // let equation = (6.5 / 100 / 12) * 200000) / (1 - (1 + (6.5 / 100 / 12)) ^ (-30 * 12)
    
    let calculateExpectedPayment = (calculateInterest
    *principle)/(1-Math.pow((1+calculateInterest),(-calculateYearToMonths)));
    // console.log(calculateLoan);


    //Check any user insert valid number or not
    if(isFinite(calculateExpectedPayment)){
        monthlyPayUI.value = calculateExpectedPayment.toFixed(3);
        totalPayUI.value = (calculateExpectedPayment*calculateYearToMonths).toFixed(3);
        totalInterestUI.value = ((calculateExpectedPayment*calculateYearToMonths)-principle).toFixed(3);
        // console.log(totalInterestUI);

        // If user insert proper data then only loading gif shows
        document.getElementById('loading').style.display = 'block';
        
        // Loading result after disappear loading gif in 2s then result will be display
        setTimeout(loadResult,2000)

        //Display results after 2s
        

    }else{
        //Not display loading.gif because user insert invalid input
        document.getElementById('loading').style.display = 'none';
        showError ('Insert Valid Number!!');

        //Test code not work here :P 
        // window.alert = function(amountUI, interestUI, yearsUI) {
        //     alert('Error message: '+amountUI+'\nURL: '+interestUI+'\nLine Number: '+yearsUI);
        //     return true;
        // }
    }
    evntObj.preventDefault();
    
}

//Show Error

function showError(errMsg){
    //Create a new element 
    const errElement = document.createElement('div');
    //Add classname to element
    errElement.className = 'alert alert-danger';
    // Add text message to element which is decleared before showError ('Insert Valid Number!!');
    errElement.appendChild(document.createTextNode (errMsg));

    //Show error before the heading but inside card class
    const Card = document.querySelector('.card');
    const Heading = document.querySelector('.heading');

    //Display errMsg before the heading Loan Calculator
    Card.insertBefore(errElement,Heading);

    // Using jQuery
    // setTimeout(function(){
    //     $('div.alert').remove();
    //   }, 2000);


    // Using vanilla JS
    setTimeout(clearErr,2000);



}

function clearErr(){
    document.querySelector('.alert').remove();
}

// Loading result when loading gif disappears
function loadResult(){
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}
    
    