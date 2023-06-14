import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountRegistration } from '../../store/Actions/ActionCreator';
import { useInput, inputArrayErrors, confirmPasswords } from '../../hooks/ValidationField';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../components/Tooltip/Tooltip';
import '../LoginPage/LoginPage.css';
import '../OffsetStyle.css';


const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const email = useInput('', { isEmpty: true, minLength: 10, maxLength: 32 });
  const login = useInput('', { isEmpty: true, minLength: 3, maxLength: 15 });
  const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 20 });
  const confirmPassword = useInput('', { isEmpty: true, minLength: 5, maxLength: 32 });

  const [validLogin, setValidLogin] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);

  const [regSuccess, setRegSuccess] = useState(false)
  const [confirm, setConfirm] = useState(true);

  const { isSuccess } = useSelector((state) => state.userStore);
  useEffect(() => {
    if(isSuccess === true)
    navigation('/login')
  }, [isSuccess]);

  useEffect(() => {
    if(login.isChange || regSuccess === true){
      setValidLogin(inputArrayErrors(login).valid);
    }
    if(email.isChange || regSuccess === true){
      setValidEmail(inputArrayErrors(email).valid);
    }
    if(password.isChange || confirmPassword.isChange || regSuccess === true ){
      setConfirm(confirmPasswords(password, confirmPassword))
      setValidPassword(inputArrayErrors(password, confirm).valid);
      setValidConfirmPassword(inputArrayErrors(confirmPassword, confirm).valid);
    }
  }, [password, confirmPassword, email, login, confirm]);

  const checkFieldsOnClick = () => {
    setRegSuccess(true)
    if (validLogin && validEmail && validPassword && validConfirmPassword && !confirm) {
      dispatch(accountRegistration(login.value, email.value, password.value));
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <div className="logo">
            <img src="image/logo-site.png" alt="logo" width={70} height={70} />
            <span>Template </span>
          </div>
        </div>
        <div className="auth-container">
          <div className="auth-block">
            <div className="auth-block__padding">
              <p className="auth-block__title">Registration</p>
              <div className="auth-block__input">
                <div className={validLogin || login.isDirty ? '' : 'input-dirty'}>
                  <div className="auth-block__input__tooltip">
                    <p>login</p>
                    <Tooltip tooltip={inputArrayErrors(login).errors}>
                      {validLogin ? (
                        ''
                      ) : (
                        <img src="image/validateAlert.svg" alt="info" width={15} />
                      )}
                    </Tooltip>
                  </div>
                  <input
                    onChange={(e) => login.onChange(e)}
                    onBlur={(e) => login.onBlur(e)}
                    onFocus={(e) => login.onFocus(e)}
                    value={login.value}
                    name="login"
                    type="text"
                    placeholder="login123"
                  />
                </div>
                <div className={validEmail || email.isDirty ? '' : 'input-dirty'}>
                  <div className="auth-block__input__tooltip">
                    <p>Email</p>
                    <Tooltip tooltip={inputArrayErrors(email).errors}>
                      {validEmail ? (
                        ''
                      ) : (
                        <img src="image/validateAlert.svg" alt="info" width={15} />
                      )}
                    </Tooltip>
                  </div>
                  <input
                    onChange={(e) => email.onChange(e)}
                    onBlur={(e) => email.onBlur(e)}
                    onFocus={(e) => email.onFocus(e)}
                    value={email.value}
                    name="email"
                    type="text"
                    placeholder="example@mail.com"
                  />
                </div>
                <div className={validPassword || password.isDirty ? '' : 'input-dirty'}>
                  <div className="auth-block__input__tooltip">
                    <p>Password</p>
                    <Tooltip tooltip={inputArrayErrors(password, confirm).errors}>
                      {validPassword ? (
                        ''
                      ) : (
                        <img src="image/validateAlert.svg" alt="info" width={15} />
                      )}
                    </Tooltip>
                  </div>
                  <input
                    onChange={(e) => password.onChange(e)}
                    onBlur={(e) => password.onBlur(e)}
                    onFocus={(e) => password.onFocus(e)}
                    value={password.value}
                    name="password"
                    type="password"
                    placeholder="•••••••"
                  />
                </div>
                <div
                  className={validConfirmPassword || confirmPassword.isDirty ? '' : 'input-dirty'}>
                  <div className="auth-block__input__tooltip">
                    <p>Confirm Password</p>
                    <Tooltip tooltip={inputArrayErrors(confirmPassword, confirm).errors}>
                      {validConfirmPassword ? (
                        ''
                      ) : (
                        <img src="image/validateAlert.svg" alt="info" width={15} />
                      )}
                    </Tooltip>
                  </div>
                  <input
                    onChange={(e) => confirmPassword.onChange(e)}
                    onBlur={(e) => confirmPassword.onBlur(e)}
                    onFocus={(e) => confirmPassword.onFocus(e)}
                    value={confirmPassword.value}
                    name="confirmPassword"
                    type="password"
                    placeholder="•••••••"
                  />
                </div>
              </div>
              <div className="auth-block__button__bottom">
                <div className="auth-block__button">
                  <button onClick={() => checkFieldsOnClick()}>Sign Up</button>
                </div>
                <p className="auth-block__signup" onClick={() => navigation('/login')}>Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
