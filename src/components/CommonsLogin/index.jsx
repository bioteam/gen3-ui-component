import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './CommonsLogin.css';

class CommonsLogin extends React.Component {
  render() {
    return (
      <div className='commons-login'>
        <p className='commons-login__title'>
          {this.props.title}
        </p>
        <img className='commons-login__logo' src={this.props.logoSrc} alt='logo' />
        <Button
          className='commons-login__button'
          label={this.props.buttonTitle}
          buttonType='secondary'
          onClick={this.props.onButtonClick}
        />
      </div>
    );
  }
}

CommonsLogin.propTypes = {
  title: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default CommonsLogin;
