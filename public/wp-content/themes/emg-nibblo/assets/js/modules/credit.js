/**
 * Crédits Piqo et e-Medias : au survol la mention passe en espagnol (CSS).
 * Easter egg : plus on insiste, plus le chef a des choses à dire, en franco-espagnol
 * approximatif (c'est voulu, comme dans toute la marque).
 */
const LINES = {
	emedias: [
		null,
		'So, do you like this masterpiece? ¿Sí o sí, amigo?',
		null,
		'Fun fact: 47 pinchos were sacrificados during the creation of this masterpiece.',
		null,
		'¿You again? You cannot eat this masterpiece… pero se clica (you can click it).',
		'Una obra maestra, I know. Alright, you can click now, por favor.',
	],
	piqo: [
		null,
		'Every single pincho was drawn by hand. Sí, señor, by hand.',
		null,
		'51 pictograms drawn. Nosotros? We just tasted them.',
		null,
		'“Le Piqo” is also a pincho on the menu. ¿Coincidencia? No creo.',
		'¡Arte puro! Pure art. Go ahead and click, they deserve it.',
	],
};

export function initCredit() {
	document.querySelectorAll('[data-credit]').forEach((link) => {
		const bubble = link.querySelector('[data-credit-bubble]');
		const lines = LINES[link.dataset.credit] || [];
		if (!bubble || !lines.length) return;
		let count = 0;
		let timer = 0;
		link.addEventListener('pointerenter', () => {
			const line = lines[count % lines.length];
			count++;
			if (!line) return;
			bubble.textContent = line;
			bubble.classList.add('is-on');
			clearTimeout(timer);
			timer = setTimeout(() => bubble.classList.remove('is-on'), 3800);
		});
	});
}
