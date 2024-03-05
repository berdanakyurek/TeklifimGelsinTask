import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import User from "../models/User";
import { useAppDispatch, useAppSelector } from "../store/store";
import Slice from "../store/Slice";
import { useNavigate } from "react-router-dom";

class LoginRequest {
  username: string = "";
  password: string = "";
}

const Login = ():JSX.Element => {
  const loginUser = useAppSelector(s => s.slice.loginUser);
  const navigate = useNavigate();
  useEffect(()=>{
    if(loginUser)
      navigate("..");
  }, [loginUser])
  const dispatch = useAppDispatch();
  
  const validationSchema = Yup.object({
    username: Yup
      .string()
      .required("Username is mandatory"),
    password: Yup
      .string()
      .required("Password is mandatory"),
  });

  const handleSubmit = async (values: LoginRequest) => {
    let userStr = localStorage.getItem(values.username);

    if(!userStr){
      setErrorSnackbar(true);
      return;
    }

    const user : User = JSON.parse(userStr);

    if(user.password != values.password){
      setErrorSnackbar(true);
      return;
    }
    
    dispatch(Slice.actions.setLoginUser(user));
    
  }
  
  
  const formik = useFormik({
    validateOnChange: false,
    validationSchema: validationSchema,
    enableReinitialize: false,
    initialValues: new LoginRequest(),
    onSubmit: handleSubmit,
  });

  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const errorSnackbarOnClose = () => {
    setErrorSnackbar(false);
  };
  
  return (
    <Grid container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={errorSnackbarOnClose}
      >
        <Alert
          onClose={errorSnackbarOnClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Username or password is not correct.
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <TextField
          required
          label="Username"
          value={formik.values?.username}
          error={Boolean(formik.errors.username)}
          helperText={formik.errors.username?.toString()}
          onChange={formik.handleChange}
          name={"username"}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          type="password"
          label="Password"
          value={formik.values?.password}
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password?.toString()}
          onChange={formik.handleChange}
          name={"password"}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={formik.submitForm}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
export default Login;
