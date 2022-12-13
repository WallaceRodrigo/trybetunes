import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

const localStorageFull = JSON.parse(localStorage.getItem('user'));

class App extends React.Component {
  state = {
    login: '',
    ...localStorageFull,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  render() {
    const {
      login,
    } = this.state;

    return (
      <BrowserRouter>
        <div>
          <p>TrybeTunes</p>
          <Switch>
            <Route
              exact
              path="/"
              render={ (p) => (
                <Login
                  { ...p }
                  inputChange={ this.handleChange }
                  loginName={ login }
                />
              ) }
            />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />

            <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
