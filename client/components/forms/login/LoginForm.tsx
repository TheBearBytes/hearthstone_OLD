import React from 'react';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import loginFormValidationSchema from "./loginFormValidationSchema";
import useStyles from '../style';

const LoginForm = ({onSubmit, loading}) => {
    const classes = useStyles();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginFormValidationSchema,
        onSubmit,
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={classes.root}
        >
            <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
            >
                Submit
            </Button>
        </form>
    );
};

export default LoginForm;
