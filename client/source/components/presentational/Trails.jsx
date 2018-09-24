import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Journals from './Journals';
import SelectTrail from './SelectTrail';
import StartTrail from './StartTrail';


class Trails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      view: 'map',
      trailInfo: {},
      started: '',
      ended: '',
    };
    this.toggleViews = this.toggleViews.bind(this);
    this.viewHandler = this.viewHandler.bind(this);
    this.getTrail = this.getTrail.bind(this);
    this.startHike = this.startHike.bind(this);
    this.endHike = this.endHike.bind(this);
  }

  getTrail(trail) {
    this.setState({
      trailInfo: trail,
    }, () => {
      this.toggleViews('trail');
    });
  }

  startHike() {
    const startTime = new Date().toLocaleString();
    this.setState({
      started: startTime,
    }, () => {
      this.toggleViews('start');
    });
  }


  endHike() {
    const { changeOuterView } = this.props;
    const endTime = new Date().toLocaleString();
    this.setState({
      ended: endTime,
    }, () => {
      const { trailInfo, started, ended } = this.state;
      const routeInfo = { trailInfo, started, ended };
      //super toggle view
      
      changeOuterView('journal', routeInfo);
    });
  }

  toggleViews(view) {
    this.setState({
      view,
    });
  }

  viewHandler() {
    const { view, trailInfo } = this.state;
    if (view === 'map') {
      return <Map getTrail={this.getTrail} />;
    }
    if (view === 'trail') {
      return <SelectTrail toggleViews={this.toggleViews} trailInfo={trailInfo} startHike={this.startHike} />;
    }
    if (view === 'start') {
      return <StartTrail endHike={this.endHike} />;
    }
    return;
  }


  render() {
    return (
      <div>
        <div className="map">
        <h1>Trails</h1>
          {this.viewHandler()}
          <p className="map-info">
            Click a pin on the map to choose a trail
          </p>
        </div>
      </div>
    );
  }
}

export default Trails;