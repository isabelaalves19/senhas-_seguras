const numeroSenha = document.querySelector(".parametro-senha__texto");
const botoes = document.querySelectorAll(".parametro-senha__botao");
const campoSenha = document.querySelector("#campo-senha");
const checkbox = document.querySelectorAll(".checkbox");
const forcaSenha = document.querySelector(".forca");
const valorEntropia = document.querySelector(".entropia");

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*?";

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;

// Eventos dos botões
botoes[0].addEventListener("click", diminuirTamanho);
botoes[1].addEventListener("click", aumentarTamanho);

// Eventos dos checkboxes
checkbox.forEach(item => {
    item.addEventListener("change", geraSenha);
});

function diminuirTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

function aumentarTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

function geraSenha() {

    let alfabeto = "";

    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }

    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }

    if (checkbox[2].checked) {
        alfabeto += numeros;
    }

    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    if (alfabeto.length === 0) {
        campoSenha.value = "";
        forcaSenha.className = "forca";
        valorEntropia.textContent = "";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {
        const indice = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[indice];
    }

    campoSenha.value = senha;

    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {

    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove("fraca", "media", "forte");

    if (entropia <= 35) {
        forcaSenha.classList.add("fraca");
    } else if (entropia <= 57) {
        forcaSenha.classList.add("media");
    } else {
        forcaSenha.classList.add("forte");
    }

    valorEntropia.textContent = `Entropia: ${entropia.toFixed(1)} bits`;
}

// Gera a senha ao abrir a página
geraSenha();