import { Alert, Button, Grid, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import User from "../models/User";

class SignUpRequest {
  username: string = "";
  password: string = "";
  password2: string = "";
}

const SignUp = ():JSX.Element => {
  const validationSchema = Yup.object({
    username: Yup
      .string()
      .required("Username is mandatory"),
    password: Yup
      .string()
      .required("Password is mandatory"),
    password2: Yup
      .string()
      .oneOf([Yup.ref('password'), ""], "Passwords do not match")
      .required("Password is mandatory"),
  });

  const handleSubmit = async (values: SignUpRequest) => {
    let user = localStorage.getItem(values.username);

    if(user){
      setUserExistsSnackbar(true);
      return;
    }
    let newUser = new User();
    newUser.username = values.username;
    newUser.password = values.password;
    localStorage.setItem(newUser.username, JSON.stringify(newUser));
    setSuccessSnackbar(true);
  }
  
  
  const formik = useFormik({
    validateOnChange: false,
    validationSchema: validationSchema,
    enableReinitialize: false,
    initialValues: new SignUpRequest(),
    onSubmit: handleSubmit,
  });

  const [userExistsSnackbar, setUserExistsSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  
  const userExistsOnClose = () => {
    setUserExistsSnackbar(false);
  };

  const successSnackbarOnClose = () => {
    setSuccessSnackbar(false);
  };
  
  return (
    <Grid container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={userExistsSnackbar}
        autoHideDuration={3000}
        onClose={userExistsOnClose}
      >
        <Alert
          onClose={userExistsOnClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Username is taken.
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successSnackbar}
        autoHideDuration={3000}
        onClose={successSnackbarOnClose}
      >
        <Alert
          onClose={successSnackbarOnClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          User is created.
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
        <TextField
          required
          type="password"
          label="Retype Password"
          value={formik.values?.password2}
          error={Boolean(formik.errors.password2)}
          helperText={formik.errors.password2?.toString()}
          onChange={formik.handleChange}
          name={"password2"}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Button
          
          onClick={formik.submitForm}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
export default SignUp;
