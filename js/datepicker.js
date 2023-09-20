window.addEventListener('load', (e) => {
	let pickerElemts = document.querySelectorAll('[data-datepicker]');
	if (pickerElemts) {
		pickerElemts.forEach((element) => {
			let pickerObserver = new MutationObserver((MutationRecords) => {
				for (const { addedNodes } of MutationRecords) {
					for (const node of addedNodes) {
						if (node.classList.contains('qs-datepicker-container')) {
							node.querySelector('.qs-datepicker').insertAdjacentHTML(
								'beforeend',
								`<div class="qs-datepicker__actions">
									<div class="qs-datepicker__field qs-datepicker__field--from">
										<div class="qs-datepicker__field-title">From</div>
										<div class="qs-datepicker__field-text">4 Aug, 2023</div>
									</div>
									<div class="qs-datepicker__field qs-datepicker__field--to">
										<div class="qs-datepicker__field-title">To</div>
										<div class="qs-datepicker__field-text">17 Aug, 2023</div>
									</div>
									<button class="qs-datepicker__submit" type="button">OK</button>
								</div>`
							);
						}
					}
				}
			});

			pickerObserver.observe(element.parentElement, {
				childList: true,
			});

			const picker = datepicker('[data-datepicker]', {
				customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
				customMonths: [
					'Январь',
					'Февраль',
					'Март',
					'Апрель',
					'Май',
					'Июнь',
					'Июль',
					'Август',
					'Сентябрь',
					'Октябрь',
					'Ноябрь',
					'Декабрь',
				],
				startDay: 1,
				formatter: (input, date, instance) => {
					const value = date.toLocaleDateString();
					input.value = value;
				},
				onSelect: (instance) => {
					// Show which date was selected.
					console.log(instance.dateSelected);
				},
				onShow: (instance) => {
					console.log('Calendar showing.');
				},
				onHide: (instance) => {
					console.log('Calendar hidden.');
				},
				onMonthChange: (instance) => {
					// Show the month of the selected date.
					console.log(instance.currentMonthName);
				},
				disableYearOverlay: true,
			});

			document.querySelector('.qs-datepicker-container')?.addEventListener('click', (e) => {
				e.stopPropagation();

				if (e.target.closest('.qs-datepicker__submit')) {
					const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
					picker[isHidden ? 'show' : 'hide']();
				}
			});
		});
	}
});
