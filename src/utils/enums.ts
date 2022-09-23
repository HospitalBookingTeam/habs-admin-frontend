export enum CONFIG_TYPES {
	DEV,
	HOSPITAL,
	SUPER,
}

export const convertConfigEnumValueToKey = (value: number) => {
	let key = 'DEV'

	for (const [_key, _value] of Object.entries(CONFIG_TYPES)) {
		if (Number(_value) === value) {
			key = _key
			break
		}
	}
	return key.toLowerCase()
}
