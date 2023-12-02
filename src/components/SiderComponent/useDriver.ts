import { Config, driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const useDriver = (options: Config = {}) => {
	const driverObj = driver({
		popoverClass: 'driver-theme',
		showButtons: ['next', 'previous', 'close'],
		...options
	});

	return driverObj;
};

export default useDriver;
