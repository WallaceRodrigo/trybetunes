import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { RouterPropTypes } from 'react-router';
import { createUser } from '../services/userAPI';

class Login extends Component {
  onClick = () => {
    const { loginName, history } = this.props;

    createUser({ name: loginName });

    return history.push('/search');
  };

  render() {
    const { inputChange, loginName } = this.props;

    const three = 3;
    const loginButtonValidation = loginName.length >= three;

    // console.log(this.onClick());
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login">
            Username
            <input
              type="text"
              name="login"
              data-testid="login-name-input"
              onChange={ inputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ !loginButtonValidation }
            onClick={ () => this.onClick() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.defaultProps = { loginName: '' };

Login.propTypes = {
  inputChange: PropTypes.func.isRequired,
  loginName: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
