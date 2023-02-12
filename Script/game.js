const grid = document.querySelector('.grid');
const localPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const personagens = [
    'ace',
    'brook',
    'chopper',
    'franky',
    'jinbe',
    'luffy',
    'nami',
    'robin',
    'sabo',
    'sanji',
    'usopp',
    'zoro'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let primeiraCarta = '';
let segundaCarta = '';

const checkFimdeJogo = () => {
    const cartasDesabilitadas = document.querySelectorAll('.desabilitar-carta');

    if (cartasDesabilitadas.length === 24){
        clearInterval(this.loop);
        alert(`Parabéns, ${localPlayer.innerHTML}. Seu tempo foi de: ${timer.innerHTML}s. Em breve teremos mais fases, Obrigado por Jogar!`);
    }
}

const checarCartas = () => {
    const personagem1 = primeiraCarta.getAttribute('data-nome');
    const personagem2 = segundaCarta.getAttribute('data-nome');

    if (personagem1 === personagem2) {

        primeiraCarta.firstChild.classList.add('desabilitar-carta');
        segundaCarta.firstChild.classList.add('desabilitar-carta');

        primeiraCarta = '';
        segundaCarta = '';

        checkFimdeJogo();

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove('revelar-carta');
            segundaCarta.classList.remove('revelar-carta');

            primeiraCarta = '';
            segundaCarta = '';
        }, 500)
    }

}

const revelarCarta = ({ target }) => {

    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }

    if (primeiraCarta === '') {
        target.parentNode.classList.add('revelar-carta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta === '') {
        target.parentNode.classList.add('revelar-carta');
        segundaCarta = target.parentNode;

        checarCartas();
    }
}

const createCard = (personagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../Imagens/${personagem}.jpg)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelarCarta);
    card.setAttribute('data-nome', personagem);
    return card;
}

const loadGame = () => {

    const duplicarPersonagens = [...personagens, ...personagens];

    const embaralhar = duplicarPersonagens.sort(() => Math.random() - 0.5);

    embaralhar.forEach((personagem) => {

        const card = createCard(personagem);
        grid.appendChild(card);
    });
}

const comecarTimer = () => {
    this.loop = setInterval(() => {
        const tempoAtual = +timer.innerHTML; // O simbolo de "+" converte a variável de string para númnero de forma mais fácil
        timer.innerHTML = tempoAtual + 1;
    }, 1000);

} 

window.onload = () => {
    localPlayer.innerHTML = localStorage.getItem('player');
    comecarTimer();

    loadGame();    
}

