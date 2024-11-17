const btnCalcular = document.getElementById('btn-calculate');
const formImc = document.getElementById('form-imc');
const resultImc = document.getElementById('result-container');
const btnReturn = document.getElementById('btn-return');

const imcValue = document.getElementById('imc-value');

btnCalcular.addEventListener('click', (e) => {
    e.preventDefault();
    const weight = formatarNumero(document.getElementById('weight').value);
    const height = formatarNumero(document.getElementById('height').value);

    if (!isNaN(weight) && !isNaN(height)) {
        const result = weight / (height * height);

        imcValue.innerText = result.toFixed(2);
        formImc.classList.add('hidden');
        resultImc.classList.remove('hidden');
    }

});

btnReturn.addEventListener('click', () => {
    formImc.classList.toggle('hidden');
    resultImc.classList.toggle('hidden');
});

function formatarNumero(numero) {
   numero = numero.replace(',', '.');
   return parseFloat(numero);
}
