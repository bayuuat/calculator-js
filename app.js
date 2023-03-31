const calculator = {
	displayNumber: "0",
	memoryNumber: " ",
	firstNumber: null,
	waitForSecondNumber: false,
	operator: null,
};

const updateDisplay = () => {
	document.querySelector("#displayNumber").innerText =
		calculator.displayNumber;
};

const updateMemoryDisplay = () => {
	document.querySelector("#operateNumber").innerText =
		calculator.memoryNumber;
};

const clearDisplay = () => {
	calculator.displayNumber = "0";
	calculator.memoryNumber = " ";
	calculator.firstNumber;
	calculator.operator = null;
	calculator.waitForSecondNumber = false;
};

const inputValue = (digit) => {
	if (
		calculator.waitForSecondNumber &&
		calculator.firstNumber == calculator.displayNumber
	) {
		calculator.displayNumber = digit;
	} else {
		if (calculator.displayNumber === "0") {
			if (digit === ".") {
				calculator.displayNumber = "0" + digit;
			} else {
				calculator.displayNumber = digit;
			}
		} else {
			calculator.displayNumber += digit;
		}
	}
};

const buttons = document.querySelectorAll(".btn");

const backSpace = () => {
	calculator.displayNumber = calculator.displayNumber.toString().slice(0, -1);
};

for (let button of buttons) {
	button.addEventListener("click", (event) => {
		let target = event.target;

		if (target.classList.contains("clear")) {
			clearDisplay();
			updateDisplay();
			updateMemoryDisplay();
			return;
		}

		if (target.classList.contains("backspace")) {
			backSpace();
			updateDisplay();
			return;
		}

		if (target.classList.contains("percent")) {
			percentate();
			updateDisplay();
			return;
		}

		if (target.classList.contains("negative")) {
			inverseNumber();
			updateDisplay();
			return;
		}

		if (target.classList.contains("operator")) {
			handleOperator(target.innerText);
			calculator.displayNumber = "0";
			calculator.memoryNumber = `${calculator.firstNumber} ${calculator.operator}`;
			updateMemoryDisplay();
			updateDisplay();
			return;
		}

		if (target.classList.contains("equals")) {
			actionCalculation();
			updateDisplay();
			return "";
		}

		if (calculator.displayNumber.length <= 12) {
			inputValue(target.innerText);
		}
		updateDisplay();
	});
}

const inverseNumber = () => {
	if (calculator.displayNumber === "0") {
		return;
	}

	calculator.displayNumber = calculator.displayNumber * -1;
};

const percentate = () => {
	if (calculator.displayNumber === "0") {
		return;
	}
	calculator.displayNumber = calculator.displayNumber / 1000;
};

const handleOperator = (operator) => {
	calculator.operator = operator;
	calculator.waitForSecondNumber = true;
	calculator.firstNumber = calculator.displayNumber;
};

const actionCalculation = () => {
	if (calculator.firstNumber == null || calculator.displayNumber == null) {
		alert("Nilai belum ditetapkan!");
		return;
	}

	let result = 0;
	const prev = parseFloat(calculator.firstNumber);
	const current = parseFloat(calculator.displayNumber);
	calculator.memoryNumber = `${calculator.memoryNumber} ${current} =`;
	updateMemoryDisplay();
	switch (calculator.operator) {
		case "+":
			result = prev + current;
			break;
		case "-":
			result = prev - current;
			break;
		case "x":
			result = prev * current;
			break;
		case "÷":
			result = prev / current;
			break;
		default:
			return;
	}

	let history = {
		firstNumber: calculator.firstNumber,
		secondNumber: calculator.displayNumber,
		operator: calculator.operator,
		result: result,
	};

	// putHistory(history);
	calculator.displayNumber = result;
	// renderHistory();
};
