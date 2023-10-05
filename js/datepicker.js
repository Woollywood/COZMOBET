let pickers = document.querySelectorAll('[data-datepicker]');
pickers.forEach((picker) => {
	flatpickr(picker, {
		mode: 'range',
	});
});
