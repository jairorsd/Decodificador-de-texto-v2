const texto = document.querySelector('.texto');
const resultado = document.querySelector('.msg');
const btnLimpar = document.querySelector('.btn-limpar');
const btnCopiar = document.querySelector('.btn-copiar');
const btnCriptografar = document.querySelector('.btn-criptografar');
const btnDescriptografar = document.querySelector('.btn-descriptografar');

const descriptografados = ['e', 'i', 'a', 'o', 'u'];
const criptografados = ['enter', 'imes', 'ai', 'ober', 'ufat'];

btnCriptografar.onclick = function (event) {
    event.preventDefault();

    criptografaEDescriptografaTexto(descriptografados, criptografados);
};

btnDescriptografar.onclick = function (event) {
    event.preventDefault();

    criptografaEDescriptografaTexto(criptografados, descriptografados);
};

function criptografaEDescriptografaTexto(caracteresRemovidos, caracteresAdicionados) {

    const textoModificado = [];
    let textoDigitado = texto.value;
    let posicao = 0;
    let indiceCaractere = 0;
    let caractereAtual = '';
    let encontrouCaracteres = false;

    if (!verificaSeTextoEValido(textoDigitado)) return;
    window.scrollTo({ top: 500, behavior: 'smooth' });

    while (posicao < textoDigitado.length) {

        caractereAtual = caractereAtual + textoDigitado[posicao];

        for (let i = 0; i < caracteresRemovidos.length; i++) {

            if (caractereAtual == caracteresRemovidos[i]) {
                textoModificado.push(caracteresAdicionados[i]);
                caractereAtual = '';
                indiceCaractere = 0;
                break;

            } else if (caractereAtual[0] == caracteresRemovidos[i][0]
                && caractereAtual[indiceCaractere] == caracteresRemovidos[i][indiceCaractere]
                && posicao < textoDigitado.length - 1) {

                indiceCaractere++;
                encontrouCaracteres = true;
                break;

            } else {
                encontrouCaracteres = false;
            }
        };
        if (!encontrouCaracteres) {
            textoModificado.push(caractereAtual);
            caractereAtual = '';
            indiceCaractere = 0;
        };
        posicao++;
    };

    mostraResultado(textoModificado);
};

function verificaSeTextoEValido(texto) {

    let valido = false;

    if (texto.trimStart() != '') {

        if (estaEmMinusculoESemAcento(texto)) {
            document.querySelector('form span').style.color = '#000000';
            valido = true;
        } else {
            document.querySelector('form span').style.color = '#ff0000';
        }
    } else {
        resultado.value = '';
        resultado.style.display = 'none';
        resultado.previousElementSibling.style.display = 'block';
        resultado.parentElement.style.justifyContent = 'center';
        btnCopiar.style.display = 'none';
    };
    return valido;
};

function estaEmMinusculoESemAcento(texto) {

    let textoValido = false;

    for (let i = 0; i < texto.length; i++) {

        let code = texto.charCodeAt(i);

        if (code >= 97 && code <= 122 || code == 32) {
            textoValido = true;
        } else {
            textoValido = false;
            break;
        };
    };
    return textoValido;
};

function mostraResultado(texto) {

    resultado.style.display = 'inline-block';
    resultado.previousElementSibling.style.display = 'none';
    resultado.parentElement.style.justifyContent = 'space-between';
    btnCopiar.style.display = 'inline-block';

    resultado.value = texto.join('');
    resultado.style.height = resultado.scrollHeight.toString() + 'px';
};

btnCopiar.onclick = function() {

    navigator.clipboard.writeText(resultado.value);
    this.innerHTML = 'Copiado!';

};

btnCopiar.onmouseout = function() {

    this.innerHTML = 'Copiar';
};

btnLimpar.onclick = function (event) {

    event.preventDefault();
    texto.value = '';
    // texto.style.caretColor = 'transparent';
};

// let interval;
// texto.onfocus = function() {

//     if (!this.value) {
//         interval = setInterval(placeholder, 500);
//     };
// };

// texto.onblur = function() {

//     this.placeholder = 'Digitar texto_';
//     clearInterval(interval);
// };

// texto.oninput = function() {

//     clearInterval(interval);

//     this.style.caretColor = '#0A3871';
//     if (!this.value) {
//         interval = setInterval(placeholder, 500);
//         this.style.caretColor = 'transparent';
//     };
// };

// let sublinhado = '_';
// function placeholder() {

//     texto.placeholder = 'Digitar texto' + sublinhado;

//     if (!sublinhado) {
//         sublinhado = '_';
//     } else {
//         sublinhado = '';
//     };
// };

document.onclick = function(event) {

    const elemento = event.target;

    if(elemento.className == 'top') {
        window.scrollTo(0, 0);
    };
};

let btnScrollEstaVisivel = false;

window.onscroll = rolarAPaginaParaTopo;

function rolarAPaginaParaTopo() {

    const btnScroll = document.querySelector('.top');

    if(window.scrollY == 0) {
        if(btnScroll != null) {
            btnScroll.style.display = 'none';
        };

    } else {
        if(btnScroll != null) {
            btnScroll.style.display = 'inline-block';
        };
    };
    if(btnScrollEstaVisivel) {
        return;
    } else {
        botaoDeRolagemParaOTopo();
        btnScrollEstaVisivel = true;
    };
};
function botaoDeRolagemParaOTopo() {

    const btnScroll = document.createElement('button');

    btnScroll.classList.add('top');
    document.body.appendChild(btnScroll);
};

