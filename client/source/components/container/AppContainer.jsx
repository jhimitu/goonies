import React from 'react';
import ReactDOM from 'react-dom';
// import { Link, Router} from '@reach/router';
import Dashboard from '../presentational/Dashboard';
import Login from '../presentational/Login';
import Trails from '../presentational/Trails';
import Journals from '../presentational/Journals';
import Profile from '../presentational/UserProfile';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      view: 'dash',
      viewData: null,
    };
    this.transferUserInfo = this.transferUserInfo.bind(this);
    this.logOut = this.logOut.bind(this);
    this.changeView = this.changeView.bind(this);
    this.viewHandler = this.viewHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      loggedIn: localStorage.getItem('loggedIn'),
      username: localStorage.getItem('username'),
    });
  }

  transferUserInfo(userData) {
    this.setState({
      loggedIn: true,
      username: userData,
    });
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('username', userData);
  }

  changeView(view, viewData) {
    this.setState({ 
      view,
      viewData,
    }, () => {console.log(view);});
  }

  viewHandler() {
    const { loggedIn, username, view, viewData } = this.state;
    if (loggedIn) {
      if (view === 'dash') {
        return <Dashboard username={username} logOut={this.logOut} handleChange={this.changeView} />;// dashboard
      }
      if (view === 'journal') {
        return <Journals username={username} viewData={viewData}/>;
      }
      if (view === 'trails') {
        return <Trails changeOuterView={this.changeView} />;
      }
      if (view === 'profile') {
        return <Profile username={username}/>;
      }
    }
    return <Login transferUserInfo={this.transferUserInfo} />;
  }

  logOut() {
    this.setState({ loggedIn: false });
    localStorage.clear();
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        {
          loggedIn ? (
            <div className="container">
              <div className="sidebar">
                <nav>
                  <div>
                     <span className="menu-logo" id="logo" onClick={() => this.changeView('dash')}>BackPacker</span>
                  <span className="menu" id="dash" onClick={() => this.changeView('dash')}>Dashboard</span>
                  <span className="menu" id="journals" onClick={() => this.changeView('journal')}>Trail Journal</span>
                  <span className="menu" id="trailInfo" onClick={() => this.changeView('trails')}>Trails</span>
                  <span className="menu" id="profile" onClick={() => this.changeView('profile')}>Profile</span>
                  <span className="menu" id="logOut" onClick={this.logOut}>Logout</span>
                  </div>
                </nav>
              </div>
              <div className="content">
                {this.viewHandler()}
              </div>
            </div>
          )
            : (
              <div className="landing">
                {this.viewHandler()}
              </div>
            )
        }
      </div>
    );
  }
}
const { document } = global;
ReactDOM.render(<AppContainer />, document.getElementById('app'));
