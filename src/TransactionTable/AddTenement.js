/*
  Designed and Developed by Aswin & Nimisha
  Backend functionalities added by Edwin
*/
import React from 'react'; 
import axios from 'axios';
class AddTenement extends React.Component {
	render() {
		return (
            <div className="my-5 text-dark">
    					  <h1 className="card-title text-center">Add Tenement</h1>
                  <form className="mx-auto my-5" style={{width:"70%"}}>
                    <div class="form-group align-center">
                      <label for="tenementName">Name</label>
                      <input type="text" class="form-control" id="tenementName"  placeholder="Enter Tenement Name"/>
                      <div class="form-group align-center">
                        <label for="coordinates">Coordinates</label>
                        <div id="coordinates">
                          <input type="text" class="form-control" id="latitude"  placeholder="Enter The Latitude"/>
                          <input type="text" class="form-control" id="longitude"  placeholder="Enter The Longitude"/>
                        </div>
                        <label for="sequestrationRate">Sequestration Rate</label>
                        <input type="number" class="form-control" id="sequestrationRate"  placeholder="Enter The Sequestration Rate"/>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick = {()=>{this.addTenement(
                      document.getElementById("tenementName").value,
                      this.props.owner,
                      document.getElementById("sequestrationRate").value,
                      "[["+document.getElementById("latitude").value+", "+document.getElementById("longitude").value+"]]"
                    )}}>Add</button>
                  </form>
            </div>
          );
  }
  addTenement(tenement, owner, sequestrationRate, coordinates){
    alert("Adding Tenement...");
    function refresh(){
			window.location.reload();
		}
		refresh = refresh.bind(this);
    axios({
        method: 'post',
        url: 'http://localhost:5000/addTenement',
        data: {
            tenement: tenement,
            owner: owner,
            sequestrationRate: sequestrationRate,
            coordinates: coordinates
        }
    })
    .then(function (response) {
        console.log(response);
        refresh();
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
export default AddTenement;