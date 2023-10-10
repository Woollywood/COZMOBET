let select = document.querySelector('.select');
let deploy_btn = document.getElementById('deploy-btn');
let options_list = document.querySelector('.options-list');
let value_wrap = document.querySelector('.value-wrap');

let options = document.querySelectorAll('.option');
let input = document.getElementById('country');

for (let option of options) {
	option.onclick = selectOption;
}

//console.log(deploy_btn);
deploy_btn.onclick = function () {
	if (deploy_btn.getAttribute('data-state') == 'rolled') {
		options_list.style.display = 'flex';
		options_list.style.opacity = 1;
		deploy_btn.setAttribute('data-state', 'deployed');
		deploy_btn.style.rotate = '180deg';
	} else {
		options_list.style.opacity = 0;
		options_list.style.display = 'none';
		deploy_btn.setAttribute('data-state', 'rolled');
		deploy_btn.style.rotate = '360deg';
	}
};

function selectOption() {
	let current = options_list.querySelector('.current');
	current.classList.remove('current');
	this.classList.add('current');
	deploy_btn.setAttribute('data-state', 'rolled');
	options_list.style.opacity = 0;
	options_list.style.display = 'none';
	deploy_btn.style.rotate = '360deg';

	let country = this.querySelector('span').innerHTML;
	let flag = this.querySelector('img').src;

	let event = new CustomEvent('optionSelected', { detail: { country: country, flag: flag } });
	select.dispatchEvent(event);
}

select.addEventListener('optionSelected', setNewCurentOpton);

function setNewCurentOpton(event) {
	value_wrap.querySelector('img').src = event.detail.flag;
	value_wrap.querySelector('span').innerHTML = event.detail.country;
	country.value = event.detail.country;
}

//deploy_btn.getAttribute('data-state');
