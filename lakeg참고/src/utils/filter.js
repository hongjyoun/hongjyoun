export function formatDate(value) {
	if (value) {
		const date = new Date(value);
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		month = month > 9 ? month : `0${month}`;
		const day = date.getDate();
		let hours = date.getHours();
		hours = hours > 9 ? hours : `0${hours}`;
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	} else {
		return '';
	}
}
