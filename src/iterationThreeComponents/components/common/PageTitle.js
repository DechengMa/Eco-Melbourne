import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Col } from 'shards-react';

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
	const classes = classNames(
		className,
		'text-center',
		'text-md-left',
		'mb-sm-0'
	);

	return (
		<Col xs='12' sm='8' className={classes} {...attrs}>
			<h3 className='page-title'>{title}</h3>
			<h6 style={{ marginTop: '10px' }} className='text-uppercase'>
				{subtitle}
			</h6>
		</Col>
	);
};

PageTitle.propTypes = {
	/**
	 * The page title.
	 */
	title: PropTypes.string,
	/**
	 * The page subtitle.
	 */
	subtitle: PropTypes.string
};

export default PageTitle;
