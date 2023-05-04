// Select elements
const inputImagem = document.getElementById('my-file');
const imagemExibida = document.getElementById('imagemExibida');
const startBtn = document.getElementById('startEye');
const body = document.querySelector('body');
const color = document.getElementById('color');
const divColor = document.getElementById('div-color');
const reset = document.getElementById('reset');
const url = document.getElementById('url');

// Add class to HTML element
document.querySelector('html').classList.add('js');

// Select elements for file input
const fileInput = document.querySelector('.input-file');
const button = document.querySelector('.input-file-trigger');
const theReturn = document.querySelector('.file-return');

// Add event listeners to file input
button.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
        fileInput.focus();
    }
});

button.addEventListener('click', function (event) {
    fileInput.focus();
    return false;
});

// Add event listener to image input
inputImagem.addEventListener('change', function (event) {
    const arquivo = event.target.files[0];
    const urlImagem = URL.createObjectURL(arquivo);

    imagemExibida.src = urlImagem;
});

url.addEventListener('keyup', () => {
    imagemExibida.src = url.value;
})

// Convert hex color to RGB
function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
}

// Add event listener to start button
startBtn.addEventListener('click', () => {
    if (!window.EyeDropper) {
        alert('Your browser does not support the EyeDropper API');
        return;
    }

    const eyeDropper = new EyeDropper();
    const abortController = new AbortController();

    eyeDropper
        .open()
        .then((result) => {
            body.style.backgroundColor = result.sRGBHex;
            color.innerText = 'Hex: ' + result.sRGBHex;

            const rgbColor = hexToRgb(result.sRGBHex);

            const y = 0.299 * rgbColor.r + 0.587 * rgbColor.g + 0.114 * rgbColor.b;

            if (y < 130) {
                // Dark color, white text
                divColor.style.color = '#fff';
            } else {
                // Light color, black text
                divColor.style.color = '#000';
            }
        })
        .catch((e) => {
            alert('Error: ' + e);
        });

    setTimeout(() => {
        abortController.abort();
    }, 2000);
});

// Add event listener to reset button
reset.addEventListener('click', () => {
    imagemExibida.src = '';
    body.style.backgroundColor = '#fff';
    divColor.style.color = '#000';
    color.innerText = '';
    url.value = '';
});