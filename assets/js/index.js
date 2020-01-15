const Game = {
	board: new Array(9).fill(''),
	gameContainer: null,
	winnerSequence: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	],
	player: {
		current: 'X',
		change() {
			this.current = this.current === 'X' ? 'O' : 'X';
		}
	},
	init(element) {
		this.gameContainer = document.querySelector(element);
		this.draw();
	},
	changeText(txt) {
		if (txt) {
			document.querySelector('div#placar p').innerText = txt;
			document.querySelector('div.modal-container div.modal p').innerText = txt;
		} else {
			document.querySelector(
				'div#placar p'
			).innerText = `Vez do jogador: ${this.player.current}`;
			document.querySelector(
				'div.modal-container div.modal p'
			).innerText = `Jogador ${this.player.current} venceu!`;
		}
	},
	makePlay(idx) {
		if (this.board[idx] !== '') return false;
		this.board[idx] = this.player.current;
		this.draw();

		for (let i = 0, tam = this.winnerSequence.length; i < tam; i++) {
			if (
				this.board[this.winnerSequence[i][0]] === this.board[idx] &&
				this.board[this.winnerSequence[i][1]] === this.board[idx] &&
				this.board[this.winnerSequence[i][2]] === this.board[idx]
			) {
				this.player.change();
				Modal.show();
			}
		}

		this.player.change();
		this.changeText();
		if (!this.board.includes('')) {
			this.changeText('Deu velha!');
		}
	},
	draw() {
		if (!this.gameContainer) throw 'The game container is not found.';
		this.gameContainer.innerHTML = new Array(9)
			.fill(`<div onclick='Game.makePlay(0)'>${this.board[0]}</div>`)
			.reduce(
				(acc, cur, idx) =>
					(acc += `<div onclick='Game.makePlay(${idx})'>${this.board[idx]}</div>`)
			);
	},
	restart() {
		this.board = new Array(9).fill('');
		this.draw();
	}
};

const Modal = {
	modal: null,
	init() {
		this.modal = document.querySelector('div.modal-container');
	},
	click(callback) {
		this.modal.addEventListener('click', callback);
	},
	toggle() {
		this.modal.classList.toggle('mostrar');
	},
	show() {
		this.modal.classList.add('mostrar');
	},
	close() {
		this.modal.classList.remove('mostrar');
	}
};

document.addEventListener('DOMContentLoaded', () => {
	Game.init('div#app');
	Modal.init();

	Modal.click(({ target }) => {
		if (target.className === 'restart') {
			Game.restart();
			Modal.close();
		} else {
			Modal.close();
		}
	});

	document.querySelector('button#restart').addEventListener('click', () => Game.restart());
});
