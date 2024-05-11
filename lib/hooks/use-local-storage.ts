import { useEffect, useState } from "react";
export default function useLocalStorage<T>(
	key: string,
	initialValue: T
): [
		T,
		(value: T) => void,
		boolean,
		boolean] {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [usingInitialValue, setUsingInitialValue] = useState(true);
	const [storedValue, setStoredValue] = useState(initialValue);

	const setStoredValueWrapper = (value: T) => {
		setUsingInitialValue(false);
		setStoredValue(value);
	}

	useEffect(() => {
		if (isFirstLoad) {
			const item = window.localStorage.getItem(key);

			let itemInitial: string | boolean = window.localStorage.getItem(`${key}Inital`) ?? 'true';
			try {
				if (itemInitial) {
					itemInitial = JSON.parse(itemInitial as string) as boolean;
				}
			} catch (error) {
				itemInitial = true;
			}

			if (item) {
				try {
					setUsingInitialValue(itemInitial as boolean);
					setStoredValue(JSON.parse(item) as T);
				} catch (error) {
					setUsingInitialValue(true);
					setStoredValue(initialValue);
				}
			}
			setIsFirstLoad(!isFirstLoad);
		}
	}, [key, isFirstLoad]);

	useEffect(() => {
		if (!isFirstLoad) {
			if (usingInitialValue) {
				window.localStorage.setItem(`${key}Inital`, JSON.stringify(true));
				window.localStorage.setItem(key, JSON.stringify(storedValue));
			} else {
				window.localStorage.setItem(`${key}Inital`, JSON.stringify(false));
				window.localStorage.setItem(key, JSON.stringify(storedValue));
			}
		}
	}, [storedValue, key, isFirstLoad]);

	return [storedValue, setStoredValueWrapper, isFirstLoad, usingInitialValue];
}