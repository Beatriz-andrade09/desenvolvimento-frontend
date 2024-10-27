function calcular(event) {   
    event.preventDefault();

    let numberOne = Number(document.getElementById('number-one').value);
    let numberTwo = Number(document.getElementById('number-two').value);
    let result = document.querySelector('.result');

    result.innerHTML = '';
    for(let i = 1; i <= numberTwo; i++) {
        let item = document.createElement('div');
        item.innerHTML = getProduto(numberOne, i);
        result.appendChild(item);
    }
}

function getProduto(number, i) {
    let operador = (document.getElementById('operador')).value;
    switch (operador) {
        case '+':
            return `${number} + ${i} = ${number + i}`;
        case '-':
            return `${number} - ${i} = ${number - i}`;
        case '*':
            return `${number} x ${i} = ${number * i}`;
        case '/':
            return `${number} / ${i} = ${(number / i).toFixed(2)}`;
        default: return 'Opcão Invalida';
    }
}