export function normalizePhone(input: string): string {
	if (!/^\+?[\d\s()-]+$/.test(input.trim())) {
		throw new Error("Введите номер телефона в международном формате");
	}

	const phone = input.replace(/\D/g, "");

	if (!/^(?:7\d{10}|375\d{9})$/.test(phone)) {
		throw new Error(
			"Введите номер с кодом страны: +7 (11 цифр) или +375 (12 цифр)"
		);
	}

	return phone;
}

export function formatPhone(phone: string): string {
	return /^7\d{10}$/.test(phone)
		? `+7 ${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 9)} ${phone.slice(9)}`
		: `+${phone}`;
}
