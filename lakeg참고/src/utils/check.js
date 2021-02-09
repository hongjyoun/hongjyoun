function checkForm(form) {
	for (let [, value] of Object.entries(form)) {
		if (typeof value === 'number') {
			if (value < 0) {
				return false;
			}
		} else {
			if (!value || value.length <= 0) {
				return false;
			}
		}
	}
	return true;
}

export { checkForm };
