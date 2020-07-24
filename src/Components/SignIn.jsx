import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Authentication';
import {SignUpLink} from './SignUp';
/*
<Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
*/
const SignInPage = () => (<SignInForm />);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        if(this.props.history.location === '/registration'){
          this.props.history.push('/')
        }
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form onSubmit={this.onSubmit} className="container">
        <div className="field">
          <div className="control">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            className="input"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            className="input"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className={`button  is-outlined ${isInvalid ? 'is-danger' : 'is-primary'}`} disabled={isInvalid} type="submit">
            Sign In
            </button>
            
          </div>
          <SignUpLink/>
        </div>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };