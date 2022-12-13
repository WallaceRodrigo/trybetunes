import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    isLoading: true,
    loginName: '',
  };

  componentDidMount() {
    this.onClick();
  }

  onClick = async () => {
    const loginNameObj = await getUser();
    this.setState({
      loginName: loginNameObj.name,
      isLoading: false,
    });
  };

  render() {
    const { loginName, isLoading } = this.state;
    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <header data-testid="header-component">
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                <h2 data-testid="header-user-name">{ loginName }</h2>
              </header>
            )
        }
      </div>
    );
  }
}

export default Header;
