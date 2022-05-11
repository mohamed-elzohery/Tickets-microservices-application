import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import sendAuthRequest, {signup} from '../../hooks/useAuthApi';
import  useInput  from '../../hooks/useInput';
import FormGroup from '../../components/form/FormGroup';

import Router from 'next/router';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';

const SignupForm = () => {
    const {
        enteredValue: enteredName, 
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        msg: nameErrMsg,
        isValid: isNameValid,
        hasError: nameHasError,
        resetHandler: resetNameHandler
    } = useInput(validateName);
    
    const {
        enteredValue: enteredEmail, 
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        msg: emailErrMsg,
        isValid: isEmailValid,
        hasError: emailHasError,
        resetHandler: resetEmailHandler
    } = useInput(validateEmail);
    
    const {
        enteredValue: enteredPassword, 
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        msg: passwordErrMsg,
        isValid: isPasswordValid,
        hasError: passwordHasError,
        resetHandler: resetPasswordHandler
    } = useInput(validatePassword);
    
    const onSumbitHandler = async (e) => {
        e.preventDefault();
        if(isEmailValid && isPasswordValid && isNameValid) {

          const registerReq =  signup(
            {email: enteredEmail,
            username: enteredName,
            password: enteredPassword});
          await sendAuthRequest(registerReq,  Router.push.bind(null, '/'));
          resetNameHandler();
          resetEmailHandler();
          resetPasswordHandler();
          
        }
    }
    return (
  <Box component="form" noValidate onSubmit={onSumbitHandler} sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormGroup
          type = 'text'
          name = 'username'
          enteredValue={enteredName}
          valueChangedHandler={nameChangeHandler}
          inputBlurHandler={nameBlurHandler}
          inputHasError = {nameHasError}
          errMsg = {nameErrMsg}
          />
      </Grid>
      <Grid item xs={12}>
      <FormGroup
          type = 'email'
          name = 'email'
          enteredValue={enteredEmail}
          valueChangedHandler={emailChangeHandler}
          inputBlurHandler={emailBlurHandler}
          inputHasError = {emailHasError}
          errMsg = {emailErrMsg}
          />
      </Grid>
      <Grid item xs={12}>
      <FormGroup
          type = 'password'
          name = 'password'
          enteredValue={enteredPassword}
          valueChangedHandler={passwordChangeHandler}
          inputBlurHandler={passwordBlurHandler}
          inputHasError = {passwordHasError}
          errMsg = {passwordErrMsg}
          />
      </Grid>
    </Grid>
    {isEmailValid && isPasswordValid && isNameValid && 
                <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
    </Button>
    }

    <Grid container justifyContent="flex-end">
      <Grid item>
        <Link href="./signin" variant="body2">
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  </Box>
    )
}
export default SignupForm;