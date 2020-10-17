import React from 'react';
import axios from 'axios';
import './popupStyles.css';

class PopUp extends React.Component {
    state = {
        latitude: null,
        longitude: null,
    }
    async componentDidMount(){
    }
  render() {
    return (
    <div>
      {this.props.popup?<div className='popup'>
        <div className='popup_inner'>
            <button type="button" class="btn btn-info" onClick={this.props.closePopup}>X</button><br/><br/>
            &nbsp;<button type="button" class="btn btn-primary" onClick={async()=>{await this.getCoordinates();}}>Coordinates</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.latitude?"Latitude: "+this.state.latitude+" Longitude: "+this.state.longitude:null} 
            <h5 className="text-center">Modify Tenement</h5>
            <form className="mx-auto my-5" style={{width:"70%"}}>
                <div class="form-group align-center">
                    <label for="nCoordinates">New Coordinates</label>
                    <div id="nCoordinates">
                        <input type="text" class="form-control" id="nLatitude"  placeholder="Enter The Latitude"/>
                        <input type="text" class="form-control" id="nLongitude"  placeholder="Enter The Longitude"/>
                    </div>
                    <label for="newSequestrationRate">New Sequestration Rate</label>
                    <input type="number" class="form-control" id="newSequestrationRate"  placeholder="Enter The Sequestration Rate"/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={async()=>{await this.modifyTenement(
                    "[[\""+document.getElementById("nLatitude").value+"\", \""+document.getElementById("nLongitude").value+"\"]]",
                    document.getElementById("newSequestrationRate").value
                )}}>Modify</button>
            </form>
            <h5 className="text-center">Change Tenement Owner</h5>
            <form className="mx-auto my-5" style={{width:"70%"}}>
                <div class="form-group align-center">
                    <label for="newOwner">New Owner</label>
                    <input type="text" class="form-control" id="newOwner"  placeholder="Enter New Owner's Address"/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={async()=>{await this.changeTenementOwner(
                    document.getElementById("newOwner").value,
                )}}>Change</button>
            </form>
        </div>
      </div>
      :null}
    </div>
    );
  }
    async getCoordinates(){
        let tenementId = this.props.popupDetails.tenement.id;
        console.log(tenementId);
        let users = this.props.popupDetails.users;
        let accounts = this.props.accounts;
        function setLatitude(latitude){
            this.setState({latitude});
        }
        setLatitude = setLatitude.bind(this);
        function setLongitude(longitude){
            this.setState({longitude});
        }
        setLongitude = setLongitude.bind(this);
        await users.methods.coordinates(tenementId,0,0).call({from: accounts[0]})
        .then((latitude)=>{
            console.log(latitude);
            setLatitude(latitude);
        })
        .catch((err)=>{
            console.log(err);
        })
        await users.methods.coordinates(tenementId,0,1).call({from: accounts[0]})
        .then((longitude)=>{
            console.log(longitude);
            setLongitude(longitude);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    async modifyTenement(coordinates, sequestrationRate){
        console.log(coordinates);
        alert(coordinates);
        let tenement = this.props.popupDetails.tenement;
        let users = this.props.popupDetails.users;
        let carbon = this.props.popupDetails.carbon;
        let accounts = this.props.accounts;
            axios({
                method: 'post',
                url: 'http://localhost:5000/modifyTenement',
                data: {
                    tenementId: tenement.id,
                    sequestrationRate: sequestrationRate,
                    coordinates: coordinates,
                    owner: tenement.owner
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            await carbon.methods.transfer("0x7C5F370F9099f3ee69E3545bA851d59deF1f2C82",tenement.sequestrationRate).call({from: accounts[0]});
    }
    async changeTenementOwner(newOwner){
        let tenementId = this.props.popupDetails.tenement.id;
        let oldOwner = this.props.popupDetails.tenement.owner;
        let sequestrationRate = this.props.popupDetails.tenement.sequestrationRate;
        axios({
            method: 'post',
            url: 'http://localhost:5000/changeTenementOwner',
            data: {
                tenementId: tenementId,
                oldOwner: oldOwner,
                newOwner: newOwner,
                allowance: sequestrationRate
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export default PopUp;