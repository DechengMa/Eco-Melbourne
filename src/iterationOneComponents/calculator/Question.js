import React, { Component } from 'react';
import InputField from '../utils/InputField';
import SelectField from '../utils/SelectField';
import { unstable_Box as Box } from '@material-ui/core/Box';
import LocationSearchInput from '../utils/LocationSearchInput';
import Button from '@material-ui/core/Button';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLEMAPAPI } from '../../config/keys';
import axios from 'axios';
import { isNumeric } from '../utils/Variables';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors } from '../utils/Variables';

class Question extends Component {
	state = {
		livingSuburb: '',
		workingSuburb: '',
		vehicle: '',
		daysWork: '',
		fuelType: '',
		fuelConsumption: 0,
		distance: '',
		period: 'Week',
		loading: false,
		errorOrNot: false,
		error: {}
	};

	getDistance = (baseLocation, targetLocation) => {
		const { google } = this.props;

		// const transitOptions = {
		// 	arrivalTime: Date,
		// 	departureTime: Date,
		// 	modes: ['TRAM', 'TRAIN'],
		// 	routingPreference: TransitRoutePreference
		// };

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
			{
				origins: [baseLocation],
				destinations: [targetLocation],
				travelMode: 'DRIVING'
				// transitOptions: TransitOptions,
				// drivingOptions: DrivingOptions,
				// unitSystem: UnitSystem,
				// avoidHighways: true,
				// avoidTolls: true
			},
			(response, status) => {
				if (status !== 'OK') {
					console.log('ERROR!');
					console.log(status);
				} else {
					// console.log(response.rows[0].elements[0].distance.text);
					var distance = response.rows[0].elements[0].distance.text;
					distance = distance.substring(0, distance.length - 2);
					// return;

					this.setState({
						distance: distance
					});

					this.getDataFromBackEnd();
				}
			}
		);
	};

	componentWillReceiveProps(props) {
		if (props.period !== this.state.period) {
			this.setState({ period: props.period });
			this.handleCheckResult();
		}
	}

	getDataFromBackEnd = () => {
		const {
			daysWork,
			vehicle,
			fuelType,
			fuelConsumption,
			distance
		} = this.state;
		const { period } = this.props;
		var url = `Https://ecomelbourne.azurewebsites.net/Calculator/index?fuelType=${fuelType}&distance=${distance}&days=${daysWork}&average=${fuelConsumption}&vehicleType=${vehicle}&period=${period}`;
		axios
			.get(url)
			.then(response => {
				this.setState({ loading: false });
				this.props.setupResult(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleCheckResult = () => {
		const {
			livingSuburb,
			workingSuburb,
			daysWork,
			vehicle,
			fuelType,
			fuelConsumption
		} = this.state;

		var hasError = false;

		if (livingSuburb === '') {
			this.setState((prevState, props) => ({
				error: {
					...prevState.error,
					livingSuburb: 'Please select a valid suburb'
				}
			}));
			hasError = true;
		}

		if (workingSuburb === '') {
			this.setState((prevState, props) => ({
				error: {
					...prevState.error,
					workingSuburb: 'Please select a valid suburb'
				}
			}));
			hasError = true;
		}

		if (daysWork === '') {
			this.setState((prevState, props) => ({
				error: {
					...prevState.error,
					daysWork: 'Please select a how many days you work weekly'
				}
			}));
			hasError = true;
		}

		if (vehicle === '') {
			this.setState((prevState, props) => ({
				error: {
					...prevState.error,
					vehicle: 'Please select a way of travel'
				}
			}));

			hasError = true;
		}

		if (vehicle === 'Car' || vehicle === 'MotorBike') {
			if (fuelType === '') {
				this.setState((prevState, props) => ({
					error: {
						...prevState.error,
						fuelType: 'Please select type of fuel you use'
					}
				}));

				hasError = true;
			}

			if (!isNumeric(fuelConsumption) || parseInt(fuelConsumption) <= 0) {
				this.setState((prevState, props) => ({
					error: {
						...prevState.error,
						fuelConsumption: 'Please select a valid fuel consumption'
					}
				}));

				hasError = true;
			}
		}
		if (hasError) {
			return;
		}

		this.setState({ loading: true });
		this.getDistance(this.state.livingSuburb, this.state.workingSuburb);
	};

	clearResult = () => {
		this.setState({
			livingSuburb: '',
			workingSuburb: '',
			vehicle: '',
			daysWork: '',
			fuelType: '',
			fuelConsumption: 0,
			distance: '',
			period: 'Week',
			loading: false,
			errorOrNot: false,
			error: {}
		});
	};

	handleLivingSelect = address => {
		this.setState({ livingSuburb: address, error: { livingSuburb: '' } });
	};

	handleWorkingSelect = address => {
		this.setState({ workingSuburb: address, error: { workingSuburb: '' } });
	};

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value, error: {} });
	};

	render() {
		const vehicleArr = ['Car', 'MotorBike', 'Bus', 'Bicycle', 'Walk'];
		const daysworkArr = ['1', '2', '3', '4', '5', '6', '7'];
		var fuelTypeArr = ['Petrol', 'Diesel', 'Gas'];
		if (this.state.vehicle === 'MotorBike') {
			fuelTypeArr = ['Petrol'];
		}
		return (
			<>
				<Box
					display='flex'
					flexDirection='column'
					style={{ marginLeft: '20px' }}
				>
					<Box>
						<p>Input Where You Live</p>
						<LocationSearchInput
							value={this.state.livingSuburb}
							error={this.state.error.livingSuburb ? true : false}
							name='Living Suburb'
							handleSelect={this.handleLivingSelect}
							errorMsg={
								this.state.error.livingSuburb
									? this.state.error.livingSuburb
									: ''
							}
							returnCenterPoint={this.returnCenterPoint}
						/>
					</Box>
					<Box>
						<p>Input Where You Work</p>
						<LocationSearchInput
							value={this.state.workingSuburb}
							error={this.state.error.workingSuburb ? true : false}
							name='Working Suburb'
							handleSelect={this.handleWorkingSelect}
							errorMsg={
								this.state.error.workingSuburb
									? this.state.error.workingSuburb
									: ''
							}
							returnCenterPoint={this.returnCenterPoint}
						/>
					</Box>
					<Box>
						<p>Input How many days you work weekly</p>
						<SelectField
							name='daysWork'
							selectName='Day works weekly'
							value={this.state.daysWork}
							error={this.state.error.daysWork ? true : false}
							errorMsg={this.state.error.daysWork}
							itemList={daysworkArr}
							handleChange={this.handleChange}
						/>
					</Box>
					<Box>
						<p>How Do You Usually Travel?</p>
						<SelectField
							name='vehicle'
							selectName='Vehicle Using'
							value={this.state.vehicle}
							error={this.state.error.vehicle ? true : false}
							errorMsg={this.state.error.vehicle}
							itemList={vehicleArr}
							handleChange={this.handleChange}
						/>
					</Box>
					{this.state.vehicle === 'Car' ||
					this.state.vehicle === 'MotorBike' ? (
						<div>
							<Box p={1}>
								<p>Select Type Of Fuel You Use</p>
								<SelectField
									name='fuelType'
									selectName='Type of Fuel Using'
									value={this.state.fuelType}
									itemList={fuelTypeArr}
									error={this.state.error.fuelType ? true : false}
									errorMsg={this.state.error.fuelType}
									handleChange={this.handleChange}
								/>
							</Box>
							<Box p={1}>
								<p>Average Fuel /100km</p>
								<InputField
									inputName='Fuel Consumption'
									name='fuelConsumption'
									value={this.state.fuelConsumption}
									error={this.state.error.fuelConsumption ? true : false}
									errorMsg={this.state.error.fuelConsumption}
									handleChange={this.handleChange}
								/>
							</Box>
						</div>
					) : (
						<div />
					)}
					<Box>
						<Button
							variant='contained'
							style={{
								backgroundColor: Colors.mainYellow,
								color: '#fff',
								width: '40%',
								height: '50px',
								marginRight: '20px'
							}}
							onClick={this.clearResult}
						>
							Reset
						</Button>
						<Button
							variant='contained'
							style={{
								backgroundColor: Colors.mainGreen,
								color: '#fff',
								height: '50px',
								width: '40%'
							}}
							onClick={this.handleCheckResult}
						>
							{this.state.loading ? (
								<CircularProgress style={{ color: '#fff' }} />
							) : (
								'Check'
							)}
						</Button>
					</Box>
				</Box>
			</>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: GOOGLEMAPAPI
})(Question);