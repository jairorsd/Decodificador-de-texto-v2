const indicesDosInputsRemovidosDescriptografados = [];
const indicesDosInputsRemovidosCriptografados = [];

const sectionPrincipal = document.querySelector('.principal');
const btnEditar = document.querySelector('.btn-editar');
const edit = document.createElement('div'); // 
const fechaEditContainer = document.createElement('div');
const btnFechaEdit = document.createElement('button');
const form = document.createElement('form');
const mainContainerInputs = document.createElement('div');
const btnAdicionar = document.createElement('button');
const salvarContainer = document.createElement('div');
const btnSalvar = document.createElement('button');

edit.classList.add('editar');
fechaEditContainer.classList.add('fechar-edit-container');
btnFechaEdit.classList.add('btn-fechar');
btnFechaEdit.innerHTML = '✕';
form.classList.add('form-editar');
mainContainerInputs.classList.add('main-container-inputs');
btnAdicionar.classList.add('adicionar');
btnAdicionar.innerHTML = 'Adicionar';
btnSalvar.classList.add('salvar');
btnSalvar.innerHTML = 'Salvar';
salvarContainer.classList.add('salvar-container');

fechaEditContainer.appendChild(btnFechaEdit);
form.appendChild(mainContainerInputs);
salvarContainer.appendChild(btnAdicionar);
salvarContainer.appendChild(btnSalvar);

function mostraEditar() {

    let posicao = 0;
    
    for (let i = 0; i < descriptografados.length; i++) {
        
        while (posicao < criptografados.length) {
            criaElementosDoForm(descriptografados[i], criptografados[posicao]);
            break;
        }
        posicao++
    };
};

function criaElementosDoForm(descriptografados = '', criptografados = '') {

    const containerInputs = document.createElement('div');
    const inputTextoContainer = document.createElement('div');
    const descriptografadosInputTexto = document.createElement('input');
    const simboloDeSeta = document.createElement('span');
    const criptografadosInputTexto = document.createElement('input');
    const containerBotoes = document.createElement('div');
    const btnExcluir = document.createElement('button');

    containerInputs.classList.add('container-inputs');
    inputTextoContainer.classList.add('input-texto-container');
    descriptografadosInputTexto.classList.add('descriptografados');
    criptografadosInputTexto.classList.add('criptografados');
    btnExcluir.classList.add('btn-excluir');

    btnExcluir.innerHTML = 'Excluir';
    descriptografadosInputTexto.required = true;
    criptografadosInputTexto.required = true;

    containerBotoes.appendChild(btnExcluir);
    inputTextoContainer.appendChild(descriptografadosInputTexto);
    descriptografadosInputTexto.after(simboloDeSeta);
    inputTextoContainer.appendChild(criptografadosInputTexto);
    containerInputs.appendChild(inputTextoContainer);
    containerInputs.appendChild(containerBotoes);
    mainContainerInputs.appendChild(containerInputs);

    descriptografadosInputTexto.value = descriptografados;
    criptografadosInputTexto.value = criptografados;

    edit.appendChild(fechaEditContainer);
    edit.appendChild(form);
    form.appendChild(salvarContainer);
    sectionPrincipal.appendChild(edit);
};

function verificaSeAlgumCampoFoiModificado() {

    const listaInputsTextoDescriptografados = form.querySelectorAll('.descriptografados');
    const listaInputsCriptografados = form.querySelectorAll('.criptografados');

    let campoFoiModificado = false;

    for (let i = 0; i < listaInputsTextoDescriptografados.length; i++) {

        if (listaInputsTextoDescriptografados[i].value != descriptografados[i] ||
            listaInputsTextoDescriptografados.length != descriptografados.length) {
            campoFoiModificado = true;
            break;
        };
    };

    for (let i = 0; i < listaInputsCriptografados.length; i++) {

        if (listaInputsCriptografados[i].value != criptografados[i] ||
            listaInputsCriptografados.length != criptografados.length) {
            campoFoiModificado = true;
            break;
        };
    };
    return campoFoiModificado;
};

function verificaSeAlgumCampoFoiRemovido(listaDeInputsTexto) {

    let foiExcluido = false;

    if (listaDeInputsTexto.length < (descriptografados.length + criptografados.length)) {
        foiExcluido = true;
    };
    return foiExcluido;
};

function removeDoArrayOsValoresDosInputsExcluidos(indicesInputsRemovidos, arrayPrincipal) {

    for (let i = 0; i < indicesInputsRemovidos.length; i++) {
        arrayPrincipal.splice(indicesInputsRemovidos[i]);
    };
};

function salvar() {

    const listaDeInputsTexto = form.querySelectorAll('.criptografados, .descriptografados');

    if (verificaSeAlgumCampoFoiRemovido(listaDeInputsTexto)) {
        
        removeDoArrayOsValoresDosInputsExcluidos(indicesDosInputsRemovidosDescriptografados, descriptografados);
        removeDoArrayOsValoresDosInputsExcluidos(indicesDosInputsRemovidosCriptografados, criptografados);
    };

    atualizaOsValoresNoArray(listaDeInputsTexto);

    alert("Salvo!");
};

function atualizaOsValoresNoArray(listaDeInputsTexto) {

    let indiceCriptografados = 0;
    let indiceDescriptografados = 0;

    for (let i = 0; i < listaDeInputsTexto.length; i++) {

        if (i % 2 === 0) {
            descriptografados[indiceDescriptografados] = listaDeInputsTexto[i].value;
            indiceDescriptografados++;
        } else {
            criptografados[indiceCriptografados] = listaDeInputsTexto[i].value;
            indiceCriptografados++;
        };
    };
};

function removeElementoClicado(elemento, event) {


    if (elemento.className == 'btn-excluir' && mainContainerInputs.children.length > 1) {

        event.preventDefault();

        const inputDescriptografados = elemento.parentElement.parentElement.querySelector('.descriptografados');
        const inputCriptografados = elemento.parentElement.parentElement.querySelector('.criptografados');
        const listaInputsTextoDescriptografados = form.querySelectorAll('.descriptografados');
        const listaInputsTextoCriptografados = form.querySelectorAll('.criptografados');

        const arrayDeInputsDescriptografados = converteNodeListEmUmArray(listaInputsTextoDescriptografados);
        const arrayDeInputsCriptografados = converteNodeListEmUmArray(listaInputsTextoCriptografados);

        const indiceDoInputDescriptografados = arrayDeInputsDescriptografados.indexOf(inputDescriptografados);
        const indiceDoInputCriptografados = arrayDeInputsCriptografados.indexOf(inputCriptografados);

        indicesDosInputsRemovidosDescriptografados.push(indiceDoInputDescriptografados);
        indicesDosInputsRemovidosCriptografados.push(indiceDoInputCriptografados);

        elemento.parentElement.parentElement.remove();
        mostraOuEscondeBotaoAdicionar();

    } else if (elemento.className == 'btn-excluir' && mainContainerInputs.children.length <= 1) {
        event.preventDefault();
    };
};

function converteNodeListEmUmArray(nodeList) {

    const arrayNodeList = [];

    for (let i = 0; i < nodeList.length; i++) {

        let nodeItem = nodeList[i];
        arrayNodeList.push(nodeItem);
    };
    return arrayNodeList;
};

function fechaEdit() {

    const containerInputList = mainContainerInputs.querySelectorAll('.container-inputs');
    let msg = false;

    if (verificaSeAlgumCampoFoiModificado()) {

        msg = confirm('Descartar alterações?');
    };

    if (msg || !verificaSeAlgumCampoFoiModificado()) {

        for (let i = 0; i < containerInputList.length; i++) {
            containerInputList[i].remove();
        };

        sectionPrincipal.removeChild(edit);
        sectionPrincipal.classList.remove('editando');
    };
};

function mostraOuEscondeBotaoAdicionar() {

    if(form.querySelectorAll('.descriptografados, .criptografados').length < 10) {
        btnAdicionar.style.display = 'inline-block';
        btnAdicionar.style.marginRight = '16px';
    } else {
        btnAdicionar.style.display = 'none';
    }
};

btnEditar.onclick = function() {

    sectionPrincipal.classList.add('editando');

    if(sectionPrincipal.contains(edit)) {
        fechaEdit();
        return;
    } else {
        mostraEditar();
        edit.scrollIntoView({ block: "center", behavior: "smooth" });
    };
    mostraOuEscondeBotaoAdicionar();
};

form.onclick = function (event) {

    const elemento = event.target;

    removeElementoClicado(elemento, event);
};

btnAdicionar.onclick = function(event) {
    event.preventDefault();

    if(mainContainerInputs.children.length <= 4) {
        criaElementosDoForm();
        mostraOuEscondeBotaoAdicionar();
    };
};

btnSalvar.onclick = function (event) {

    if (form.checkValidity()) {
        event.preventDefault();
        salvar();
    };

};

btnFechaEdit.onclick = fechaEdit;