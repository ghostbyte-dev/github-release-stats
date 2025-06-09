import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): [T, (value: T) => void] {
	const [value, setValue] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const localStorageValue = localStorage.getItem(key);

			setValue(localStorageValue ? JSON.parse(localStorageValue) : []);
		} catch (error) {
			console.error("Local storage error:", error);
		}
		return () => {};
	}, [key]);

	const setValueLocalStorage = (value: T) => {
		try {
			setValue(value);
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error("Local storage error:", error);
		}
	};

	return [value, setValueLocalStorage];
}
