import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    isLoading: false,
  };

  onClick = async () => {
    const { loginName, history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: loginName });

    return history.push('/search');
  };

  render() {
    const { inputChange, loginName } = this.props;
    const { isLoading } = this.state;

    const three = 3;
    const loginButtonValidation = loginName.length >= three;

    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
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
            )
        }
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
