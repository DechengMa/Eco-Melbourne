import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ArrowForward } from '@material-ui/icons';
import Shake from 'react-reveal/Shake';

const styles = theme => ({
	button: {
		display: 'block',
		marginTop: theme.spacing.unit * 2
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		textAlign: 'left'
	}
});

class ControlledOpenSelect extends React.Component {
	state = {
		open: false
	};

	handleChange = event => {
		this.props.handleChange(event.target.value);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		const { classes, period } = this.props;

		return (
			<>
				<Shake forever={true} timeout={4000}>
					<span style={{ marginTop: '30px' }}>
						Try to change period
						<ArrowForward />
					</span>
				</Shake>

				<form autoComplete='off' style={{ textAlign: 'right' }}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor='demo-controlled-open-select'>
							Period
						</InputLabel>

						<Select
							open={this.state.open}
							onClose={this.handleClose}
							onOpen={this.handleOpen}
							value={period}
							onChange={this.handleChange}
							inputProps={{
								name: 'period',
								id: 'demo-controlled-open-select'
							}}
						>
							<MenuItem value={'Day'}>Daily</MenuItem>
							<MenuItem value={'Week'}>Weekly</MenuItem>
							<MenuItem value={'Month'}>Monthly</MenuItem>
							<MenuItem value={'Year'}>Yearly</MenuItem>
						</Select>
					</FormControl>
				</form>
			</>
		);
	}
}

ControlledOpenSelect.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledOpenSelect);
