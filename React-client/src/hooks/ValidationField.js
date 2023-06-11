import { useState, useEffect } from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isValidInput, setValidInput] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length <= validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          //eslint-disable-next-line
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true);
          break;

        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || isEmail) {
      setValidInput(false);
    } else {
      setValidInput(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, isEmail]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmail,
    isValidInput,
  };
};

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const [isChange, setChange] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
    if (isDirty) {
      setChange(true);
    }
  };
  const onFocus = (e) => {
    setDirty(true);
  };
  const onBlur = (e) => {
    setDirty(false);
    setChange(false);
  };

  return {
    value,
    onChange,
    onBlur,
    onFocus,
    isChange,
    isDirty,
    ...valid,
  };
};

export const inputArrayErrors = (input, passConfirm) => {
  let valid = true;
  let errors = [];
  if (input.isEmpty) {
    errors.push('Поле не может быть пустым.');
    valid = false;
  }
  if (input.minLengthError) {
    errors.push('Поле слишком короткое.');
    valid = false;
  }
  if (input.maxLengthError) {
    errors.push('Поле слишком длинное.');
    valid = false;
  }
  if (passConfirm) {
    errors.push('Пароли не совпадают.');
    valid = false;
  }

  return {errors, valid}
};

export const confirmPasswords = (password, confirmPassword) => {
  if (password.value === '' || confirmPassword.value === ''){
    return true
  }
  else if (password.value === confirmPassword.value) {
    return false
  }
  else {
    return true
  }
}

// const email = useInput('', {isEmpty: true, minLength: 10, isEmail: true, maxLength: 32})
// const password = useInput('', {isEmpty: true, minLength: 5})
//
// {(email.isDirty && email.isEmpty) && <div>Поле не может быть пустым</div>}
// {(email.isDirty && email.minLengthError) && <div>Почта слишком короткая</div>}
// {(email.isDirty && email.maxLengthError) && <div>Почта слишком длинная</div>}
// {(email.isDirty && email.minLengthError) && <div>Некорректная почта</div>}
// <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} name='email' type='text' placeholder='Enter your email...'/>
//
// <button disable={!email.isValidInput || !password.}>Registration</button>
//
//
