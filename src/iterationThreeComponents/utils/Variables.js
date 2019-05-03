import moment from 'moment-business-days';

export const Colors = {
	mainGreen: '#489e52',
	mainYellow: '#e7853d',
	mainBlue: '#2f64a7'
};

export const isNumeric = value => {
	return /^-{0,1}\d+$/.test(value);
};

export const get_next_weekday = () => {
	return moment(new Date())
		.nextBusinessDay()
		.hour(8)
		.minutes(0)._d;
};