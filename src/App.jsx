import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Loading from './components/Loading';

const localStorageFull = JSON.parse(localStorage.getItem('user'));

class App extends React.Component {
  state = {
    login: '',
    loginTrue: false,
    ...localStorageFull,
  };

  componentDidUpdate() {
    const { name } = this.state;
    if (name !== undefined) {
      this.setState({ loginTrue: true });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.saveButtonValidation);
  };

  // loginValidation = () => {
  //   const localStorageFull = !JSON.parse(localStorage.getItem('user')) === false;
  //   if (localStorageFull) {
  //     this.setState({ loginTrue: true });
  //   }
  // };

  render() {
    const {
      login,
      loginTrue,
    } = this.state;
    console.log(localStorageFull);
    return (
      <BrowserRouter>
        <div>
          <p>TrybeTunes</p>
          <Switch>
            <Route
              exact
              path="/"
              render={ (p) => (
                <Login { ...p } inputChange={ this.handleChange } loginName={ login } />
              ) }
            />
            <Route
              exact
              path="/search"
              render={ () => (!loginTrue ? <Loading /> : <Search />) }
            />
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
