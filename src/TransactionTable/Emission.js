/*
	Designed and Developed by Aswin & Nimisha
*/
import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
class Emission extends React.Component {
	render() {
        let emissionList = this.props.emissions.map( (emission) =>
            <li>{emission}</li>
        );
		return (
	
            	
                    <div className="mx-auto card text-center text-dark mb-3" style={{width:"80%"}}>		
			<div className="card-body">
    					<h1 className="card-title">Your Emissions</h1>
                        <ul style={{listStyle:"none"}}>{emissionList}</ul>
                        <button type="submit" class="btn btn-primary">Offset</button>
  			</div>
              </div>
	
            
	
		);
	}
}
export default Emission;