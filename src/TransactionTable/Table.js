/*
	Designed and Developed by Aswin & Nimisha
*/
import Row from "./Row";
import React from 'react';
class Table extends React.Component  {
	render() {
	let headers = this.props.headers;
	let rows = this.props.rows.slice();
	let headerCode = headers.map( (header) =>
		<th>{header}</th>
	);
	let rowsCode = rows.map ((row) =>
		<Row rowItems={row}/>
	);
	return (
        <div className="mx-auto mb-5">
		<table class="table">	
        <thead>
		<tr>{headerCode}</tr>
        </thead>
        <tbody>
		{rowsCode}
        </tbody>
		</table>
        </div>
	);
}
	
}
export default Table;