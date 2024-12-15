let letters = 'abcdefghijklmnopqrstuvwxyz';
letters += letters.toUpperCase();
const passwordGenerated = document.querySelector('#password-generated-text');
const btnCopy = document.querySelector('#copy-password');
const errorMessage = document.querySelector('#error-message');

document.getElementById('show-options').addEventListener('click', () => {
    document.querySelector('.options').style.display = 'flex';
});

document.getElementById('gerator-password').addEventListener('click', () => {
     createPassword();    
});

createLetters = () => {
    return letters[Math.floor(Math.random() * letters.length)];   
}

createSymbols = () => {
    const symbols = "!@#$%&*()-_=+[]{}~^<>,./?";
    return symbols[Math.floor(Math.random() * symbols.length)];   
}

createNumbers = () => {
    const numbers = "0123456789";
    return numbers[Math.floor(Math.random() * numbers.length)];   
}

createPassword = () => {
    let password = []
    let countCharacters = parseInt(document.getElementById('characters').value);
    let countNumbers = parseInt(document.getElementById('numbers').value);
    let countLetters = parseInt(document.getElementById('letters').value);

    if (countCharacters + countNumbers + countLetters <8) {
        errorMessage.style.display = 'flex';
        passwordGenerated.style.display = 'none';
        btnCopy.style.display = 'none';
        return;
    }

    for (let i = 0; i < countLetters; i++) {
        password.push(createLetters());
    }

    for (let i = 0; i < countCharacters; i++) {
        let types = [createSymbols()];
        password.push(types[Math.floor(Math.random() * types.length)]);
    }

    for (let i = 0; i < countNumbers; i++) {
        let types = [createNumbers()];
        password.push(types[Math.floor(Math.random() * types.length)]);
    }

    errorMessage.style.display = 'none';
    passwordGenerated.innerHTML = password.sort(() => Math.random() - 0.5).join('');
    passwordGenerated.style.display = 'flex';
    btnCopy.style.display = 'block';
}

document.getElementById('copy-password').addEventListener('click', () => {
    navigator.clipboard.writeText(passwordGenerated.innerText);
    btnCopy.innerText = 'Copiada!';

    setTimeout(() => {
        btnCopy.innerText = 'Copiar';
    }, 1500);
});