let customTip = document.getElementById('custom-tip');
let numOfPeople = document.getElementById('num-people');
let bill = document.getElementById('bill');
let errorPara = document.querySelector('.error-p');
let tipButtons = [...document.querySelectorAll('[data-tip-button]')];
let outputTipPP = document.getElementById('tip-pp')
let outputTotalPP = document.getElementById('total-pp')
let resetButton = document.querySelector("#reset");

tipButtons.forEach(button => {
	button.addEventListener('click', (e) => {
		removeActive()
		e.target.classList.add('active');
		checkCalculation()

	})
})

numOfPeople.addEventListener('keyup', (e) => {
	let invalid = e.target.validity.valid;
	if (!invalid) {
		errorPara.classList.add('active');
		return
	}
	errorPara.classList.remove('active');
	checkCalculation()
})
customTip.addEventListener('focusin', (e) => {
	removeActive()
	e.target.style.textAlign = 'right';
})
bill.addEventListener("keyup", () => {
	checkCalculation();
})
customTip.addEventListener("keyup", () => {
	if(customTip.value) {
		checkCalculation()
	}
})

function checkCalculation() {
	let currentTipActive = document.querySelector('button.active')
		? +document.querySelector('button.active').textContent.replace('%', '')
		: +customTip.value;
	if(!numOfPeople.value || +numOfPeople.value === 0) return;
	if (!bill.value && !currentTipActive ) {
		outputTipPP.textContent = `$0.00`;
		outputTotalPP.textContent = `$0.00`;
		return;
	}
	let tipPP = Math.ceil((getTip(+bill.value, currentTipActive) / +numOfPeople.value) * 100)/ 100
	let totalPP = Math.ceil(getTotalPP(+bill.value, +numOfPeople.value, tipPP) * 100) / 100;
	console.log(tipPP)
	outputTipPP.textContent = `$${tipPP}`;
	outputTotalPP.textContent = `$${totalPP}`;
	reset()
}

function reset() {
	resetButton.disabled = false;
	resetButton.addEventListener("click", resetAll)
}

function resetAll() {
	bill.value = "";
	if(document.querySelector("button.active")) {
		document.querySelector("button.active").classList.remove("active");
	}
	numOfPeople.value = "";
	customTip.value = "";
	customTip.style.textAlign = "center"
	outputTipPP.textContent = "0.00"
	outputTotalPP.textContent = "0.00"
	resetButton.disabled = true;
	resetButton.removeEventListener("click", resetAll)
}

function getTip(total, tip) {
	return Math.ceil((total * (tip / 100) * 100)) / 100;
}

function getTotalPP(bill, numberOfPeople, tip) {
	return Math.ceil((bill / numberOfPeople) * 100) / 100 + tip;
}

function removeActive() {
	let currentActive = document.querySelector('button.active')
	if (currentActive) {
		currentActive.classList.remove('active');
	}
}