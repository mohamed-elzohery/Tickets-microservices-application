import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import sendAuthRequest, {signin} from '../../hooks/useAuthApi';
import Router from 'next/router';



import  useInput  from '../../hooks/useInput';
import FormGroup from '../../components/form/FormGroup';

import { validateEmail, validatePassword, validateName } from '../../utils/validators';

const SigninForm = () => {
    
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
        if(isEmailValid && isPasswordValid) {
            const registerReq = signin({email: enteredEmail, password: enteredPassword});
            await sendAuthRequest(registerReq, Router.push.bind(null, '/'));
            resetEmailHandler();
            resetPasswordHandler();
        }
    }
    return (<Box component="form" noValidate onSubmit={onSumbitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
            {isEmailValid && isPasswordValid && 
                        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            }

            <Grid container justifyContent="flex-end">
            <Grid item>
                    <Link href="./signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </Box>)
}
export default SigninForm;