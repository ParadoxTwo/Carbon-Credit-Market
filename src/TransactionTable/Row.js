/*
	Designed and Developed by Aswin & Nimisha
*/
import React from 'react';
class Row extends React.Component  {
	render() {
		let rowItems = this.props.rowItems.map((rowItem) =>
			<td>{rowItem}</td>
		);
		return (

			<tr>{rowItems}</tr>
		);
	}
}

export default Row;