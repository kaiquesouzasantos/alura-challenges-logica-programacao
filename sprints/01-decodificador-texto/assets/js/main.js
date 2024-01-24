/* Padrao Aceito como Entrada */
const regexPass = /^[a-z\s]+$/

/* Campos */
let entrada = document.getElementById('text-entrada');
let resultado = document.getElementById('text-resultado');

/* Botões */
let botaoEncrypt = document.getElementById('btn-criptografar');
let botaoDecrypt = document.getElementById('btn-descriptografar');
let botaoCopiar = document.getElementById('btn-copiar');

let erro = document.getElementById('erro');

/* Modals */
let modalCopiar = document.getElementById('modal-copiar');
let textoCopiar = document.getElementById('modal-copiar-texto');

/* Lógica de Criptografia */
const vogais = ['e', 'i', 'a', 'o', 'u'];
const saida = ['enter', 'imes', 'ai', 'ober', 'ufat'];

function criptografar(texto) {
	for (let i = 0; i < vogais.length; i++)
		texto = texto.replaceAll(vogais[i], saida[i]);

	return texto;
}

function descriptografar(texto) {
	for (let i = 0; i < vogais.length; i++)
		texto = texto.replaceAll(saida[i], vogais[i]);

	return texto;
}

/* Validacao */
function validaEntrada(texto) {
	return regexPass.test(texto)
}

/* Alteracao de Visibilidade */
function limpaComponente(componente) {
	componente.value = ''
}

function alteraEstadoImagemResultado(estado) {
	resultado.style.backgroundImage = estado
}

function alteraEstadoResultante() {
	botaoCopiar.classList.remove('bloqueado');
	limpaComponente(entrada);
	alteraEstadoImagemResultado("none");
}

/* Eventos */
botaoEncrypt.addEventListener('click', () => {
	if (validaEntrada(entrada.value)) {
		resultado.value = criptografar(entrada.value);
		alteraEstadoResultante();
	}
});

botaoDecrypt.addEventListener('click', () => {
	if (validaEntrada(entrada.value)) {
		resultado.value = descriptografar(entrada.value);
		alteraEstadoResultante();
	}
});

botaoCopiar.addEventListener('click', () => {
	let valorResultado = resultado.value;

	if (valorResultado != '') {
		navigator.clipboard.writeText(valorResultado);
		limpaComponente(resultado);

		textoCopiar.textContent = 'Copiado com sucesso para a área de transferência.';
		modalCopiar.classList.add('show-modal');

		setTimeout(() => {
			modalCopiar.classList.remove('show-modal');
		}, 1400);
	}
	
	alteraEstadoImagemResultado('url(\'../assets/img/saida-background.svg\')');
});

entrada.addEventListener('input', () => {
	if(validaEntrada(entrada.value)) {
		botaoEncrypt.classList.remove('bloqueado');
		botaoDecrypt.classList.remove('bloqueado');

		erro.style.display = "none";
	} else {
		botaoEncrypt.classList.add('bloqueado');
		botaoDecrypt.classList.add('bloqueado');
		botaoCopiar.classList.add('bloqueado');

		erro.style.display = "block";
	}
});
