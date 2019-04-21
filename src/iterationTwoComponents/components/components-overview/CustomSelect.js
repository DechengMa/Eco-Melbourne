import React from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	FormSelect
} from 'shards-react';

const CustomSelect = () => (
	<div>
		<InputGroup className='mb-3'>
			<FormSelect>
				<option>Choose</option>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
				<option>6</option>
				<option>7</option>
			</FormSelect>
		</InputGroup>
	</div>
);

export default CustomSelect;