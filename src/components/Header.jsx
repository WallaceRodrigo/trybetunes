import React, { Component } from 'react';
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
      <header data-testid="header-component">
        {
          isLoading
            ? <Loading />
            : <h2 data-testid="header-user-name">{ loginName }</h2>
        }
      </header>
    );
  }
}

export default Header;
