import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectField = props => {
	return (
		// <FormControl error={props.error}>
		<FormControl style={{ width: '100%' }} error={props.error}>
			<InputLabel htmlFor='age-simple'>{props.selectName}</InputLabel>
			<Select
				value={props.value}
				onChange={props.handleChange}
				name={props.name}
				style={{ width: '100%' }}
			>
				{props.itemList.map(item => (
					<MenuItem key={item} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{props.errorMsg}</FormHelperText>
		</FormControl>
	);
};

export default SelectField;
