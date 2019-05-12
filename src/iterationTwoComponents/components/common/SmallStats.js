import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, CardBody } from 'shards-react';
import Tooltip from '@material-ui/core/Tooltip';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { HelpOutline } from '@material-ui/icons';

const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: '1.2em'
			}
		}
	}
});

class SmallStats extends React.Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
		this.state = { open: false };
	}

	toggle = () => {
		this.setState({
			open: !this.state.open
		});
	};

	render() {
		const {
			variation,
			label,
			value,
			percentage,
			increase,
			unit,
			numberDesc
		} = this.props;
		const cardClasses = classNames(
			'stats-small',
			variation && `stats-small--${variation}`
		);

		const cardBodyClasses = classNames(
			variation === '1' ? 'p-0 d-flex' : 'px-0 pb-0'
		);

		const innerWrapperClasses = classNames(
			'd-flex',
			variation === '1' ? 'flex-column m-auto' : 'px-3'
		);

		const dataFieldClasses = classNames(
			'stats-small__data',
			variation === '1' && 'text-center'
		);

		const labelClasses = classNames(
			'stats-small__label',
			'text-uppercase',
			variation !== '1' && 'mb-1'
		);

		const valueClasses = classNames(
			'stats-small__value',
			'count',
			variation === '1' ? 'my-3' : 'm-0'
		);

		const innerDataFieldClasses = classNames(
			'stats-small__data',
			variation !== '1' && 'text-right align-items-center'
		);

		const percentageClasses = classNames(
			'stats-small__percentage',
			`stats-small__percentage--${increase ? 'increase' : 'decrease'}`
		);

		return (
			<Card small className={cardClasses}>
				<CardBody className={cardBodyClasses}>
					<div className={innerWrapperClasses}>
						<div className={dataFieldClasses}>
							<span className={labelClasses}>{label}</span>
							<h6 className={valueClasses}>
								{value}
								<span style={{ fontSize: '0.8rem' }}>{unit}</span>
							</h6>
						</div>

						{percentage ? (
							<div className={innerDataFieldClasses}>
								<span className={percentageClasses}>{percentage}</span>
							</div>
						) : (
							<></>
						)}
					</div>
					{/* <canvas
						height={canvasHeight}
						ref={this.canvasRef}
						className={`stats-small-${shortid()}`}
          			/> */}
				</CardBody>
				<MuiThemeProvider theme={theme}>
					<Tooltip title={numberDesc ? numberDesc : ''}>
						<HelpOutline
							style={{
								position: 'absolute',
								left: '10px',
								bottom: '10px',
								color: '#838ea1'
							}}
						/>
					</Tooltip>
				</MuiThemeProvider>
			</Card>
		);
	}
}

SmallStats.propTypes = {
	/**
	 * The Small Stats variation.
	 */
	variation: PropTypes.string,
	/**
	 * The label.
	 */
	label: PropTypes.string,
	/**
	 * The value.
	 */
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * The percentage number or string.
	 */
	percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	/**
	 * Whether is a value increase, or not.
	 */
	increase: PropTypes.bool,
	/**
	 * The Chart.js configuration object.
	 */
	chartConfig: PropTypes.object,
	/**
	 * The Chart.js options object.
	 */
	chartOptions: PropTypes.object,
	/**
	 * The chart data.
	 */
	chartData: PropTypes.array.isRequired,
	/**
	 * The chart labels.
	 */
	chartLabels: PropTypes.array
};

SmallStats.defaultProps = {
	increase: true,
	percentage: 0,
	value: 0,
	label: 'Label',
	chartOptions: Object.create(null),
	chartConfig: Object.create(null),
	chartData: [],
	chartLabels: []
};

export default SmallStats;
