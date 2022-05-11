import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
const FormGroup = (props) => {
    const {
        type,
        name,
        valueChangedHandler,
        inputBlurHandler,
        enteredValue,
        inputHasError,
        errMsg
    } = props;
    return ( 
        <>   
        <TextField
            fullWidth
            label={name}
            name={name}
            autoComplete={name}
            type={type}
            id={name}
            onChange={valueChangedHandler}
            onBlur={inputBlurHandler}
            value={enteredValue}/>
          {inputHasError && <p style={{color: 'red'}}>{errMsg}</p>}
        </>)
}

export default FormGroup;