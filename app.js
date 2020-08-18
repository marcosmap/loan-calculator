// definimos las variables que usaremos generalmente
const form = document.getElementById('form');
const message = document.querySelector('.message');
const monthlyPay = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// funcion de los event listeners
EventListenersLoaded();

// creamos la funcion donde estaran los event listeners
function EventListenersLoaded() {
    // enviar el formulario
    form.addEventListener('submit', function(e) {
        // escondemos los resultados
        document.getElementById('results').style.display = 'none';
        // mostramos el spinner
        document.getElementById('loading').style.display = 'block';

        setTimeout(getAmount, 2000);

        e.preventDefault();
    });
}

// guardamos los datos del form
function getAmount() {
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;

    // agregamos un mensaje si cualquier campo esta vacio
    if(amount === '' || interest === '' || years === ''){
        // ocultamos el spinner
        document.getElementById('loading').style.display = 'none';

        message.innerHTML = `
            <div class="alert alert-danger alerta" role="alert">
                Complete the form, please!
            </div>
        `;
        setTimeout(function(){
            document.querySelector('.alerta').remove();
        }, 3000);
    }
    else {
        // realizamos los calculos
        const quantity = parseFloat(amount);
        const interestPerc = parseFloat(interest) / 100 /12;
        const calculatedPay = parseFloat(years) * 12;

        // calculamos el pago mensual
        const x = Math.pow(1 + interestPerc, calculatedPay);
        const monthly = (quantity * x * interestPerc) / (x-1);

        // verificamos que el pago sea un numero finito
        if(isFinite(monthly)) {
            monthlyPay.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPay).toFixed(2);
            totalInterest.value = ((monthly * calculatedPay) - quantity).toFixed(2);
            // mostramos los resultados
            document.getElementById('results').style.display = 'block';
            // ocultamos el spinner
            document.getElementById('loading').style.display = 'none';
            // form.reset();
        }
        else {
            console.log('check your numbers');
        }
    }
}