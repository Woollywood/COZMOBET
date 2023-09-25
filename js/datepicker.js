let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

Date.prototype.daysInMonth = function () {
	return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

class PickerRange {
	constructor(picker) {
		this.picker = picker;
		this.rangeList = new Map();

		this._rangeInit();
	}

	_rangeInit(def = true) {
		let range = [];
		let date = new Date();

		let thisDay = def ? date.getDate() : 1;
		let endDay = thisDay + 7 > date.daysInMonth() + 1 ? date.daysInMonth() + 1 : thisDay + 7;
		for (let i = thisDay; i < endDay; i++) {
			range.push({
				value: thisDay,
				tag: Array.from(this.picker.calendar.querySelectorAll('.qs-square.qs-num')).find(
					(cell) => +cell.firstChild.data === thisDay
				),
			});
			thisDay++;
		}

		this.rangeList.set(this.picker.currentMonthName, range);
		this._setStyles(range.map((item) => item.tag));
	}

	_removeStyles(range) {
		range[0].classList.remove('first-slot');
		range[range.length - 1].classList.remove('last-slot');
		for (const item of range) {
			item.classList.remove('in-range');
		}
	}

	_setStyles(range) {
		range[0].classList.add('first-slot');
		range[range.length - 1].classList.add('last-slot');
		for (const item of range) {
			item.classList.add('in-range');
		}
	}

	updateCells() {
		this.cells = document.querySelectorAll('.qs-square.qs-num');
	}

	updateRange() {
		if (!this.rangeList.has(this.picker.currentMonthName)) {
			this._rangeInit(false);
		} else {
			let range = this.rangeList.get(this.picker.currentMonthName);
			range = range.map((item) => ({
				value: item.value,
				tag: Array.from(this.picker.calendar.querySelectorAll('.qs-square.qs-num')).find(
					(cell) => +cell.firstChild.data === item.value
				),
			}));
			this.rangeList.set(this.picker.currentMonthName, range);
			this._setStyles(range.map((item) => item.tag));
		}
	}

	stylesInit() {
		let cells = this.picker.calendar.querySelectorAll('.qs-square.qs-num');
		cells[0].classList.add('left-end');
		cells[cells.length - 1].classList.add('right-end');

		for (let i = 1; i < cells.length - 1; i++) {
			if (cells[i].getBoundingClientRect().left > cells[i + 1].getBoundingClientRect().left) {
				cells[i].classList.add('right-end');
				cells[i + 1].classList.add('left-end');
			}
		}
	}

	handleEvent(event) {
		let type = event.type;
		let action = 'on' + type[0].toUpperCase() + type.slice(1);
		this[action](event);
	}

	onMousedown(event) {
		let x = event.clientX;
		let y = event.clientY;

		let rangeCells = this.rangeList.get(this.picker.currentMonthName).map((item) => item.tag);
		let cell = document.elementFromPoint(x, y).closest('.qs-square.qs-num');

		if (rangeCells.includes(cell)) {
			if (cell.closest('.first-slot')) {
				this.movedSlot = 'FIRST_SLOT';
			} else if (cell.closest('.last-slot')) {
				this.movedSlot = 'LAST_SLOT';
			}
		}
	}

	onMouseup(event) {
		this.movedSlot = '';
	}

	onMousemove(event) {
		let x = event.clientX;
		let y = event.clientY;

		let rangeCells = this.rangeList.get(this.picker.currentMonthName).map((item) => item.tag);
		let cell = document.elementFromPoint(x, y).closest('.qs-square.qs-num');

		try {
			switch (this.movedSlot) {
				case 'FIRST_SLOT':
					this.moveFirstSlot(cell);
					break;
				case 'LAST_SLOT':
					this.moveLastSlot(cell);
					break;
			}
		} catch (error) {
			console.log('За пределами области');
		}
	}

	moveFirstSlot(cell) {
		let range = this.rangeList.get(this.picker.currentMonthName);

		let startValue = +cell.firstChild.data;
		let endValue = range[range.length - 1].value;

		if (startValue >= endValue) {
			return;
		}

		this._removeStyles(range.map((item) => item.tag));
		range.length = 0;

		for (let i = startValue; i <= endValue; i++) {
			range.push({
				value: i,
				tag: Array.from(this.picker.calendar.querySelectorAll('.qs-square.qs-num')).find(
					(cell) => +cell.firstChild.data === i
				),
			});
		}

		this.rangeList.set(this.picker.currentMonthName, range);
		this._setStyles(range.map((item) => item.tag));
	}

	moveLastSlot(cell) {
		let range = this.rangeList.get(this.picker.currentMonthName);

		let startValue = range[0].value;
		let endValue = +cell.firstChild.data;

		if (startValue >= endValue) {
			return;
		}

		this._removeStyles(range.map((item) => item.tag));
		range.length = 0;

		for (let i = startValue; i <= endValue; i++) {
			range.push({
				value: i,
				tag: Array.from(this.picker.calendar.querySelectorAll('.qs-square.qs-num')).find(
					(cell) => +cell.firstChild.data === i
				),
			});
		}

		this.rangeList.set(this.picker.currentMonthName, range);
		this._setStyles(range.map((item) => item.tag));
	}
}

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
				formatter: (input, date, instance) => {
					const value = date.toLocaleDateString();
					input.value = value;
				},
				onSelect: (instance) => {
					// Show which date was selected.
					console.log(instance.dateSelected);
					picker.show();
				},
				onShow: (instance) => {
					// console.log('Calendar showing.');
					rangePicker.stylesInit();
				},
				onHide: (instance) => {
					// console.log('Calendar hidden.');
				},
				onMonthChange: (instance) => {
					// Show the month of the selected date.
					console.log(instance.currentMonthName);
					rangePicker.updateCells();
					rangePicker.updateRange();
					rangePicker.stylesInit();
					console.log(rangePicker.rangeList);
				},
				// disableYearOverlay: true,
			});

			let rangePicker = new PickerRange(picker);

			picker.calendar.addEventListener('mousedown', rangePicker);
			picker.calendar.addEventListener('mouseup', rangePicker);
			picker.calendar.addEventListener('mousemove', rangePicker);

			document.querySelector('.qs-datepicker-container')?.addEventListener('click', (e) => {
				if (e.target.closest('.qs-datepicker__submit')) {
					const isHidden = picker.calendarContainer.classList.contains('qs-hidden');
					picker[isHidden ? 'show' : 'hide']();
				}
			});
		});
	}
});
