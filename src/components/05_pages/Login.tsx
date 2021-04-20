import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseLine from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { GlobalStoreProvider, User } from "@/types";
import { Store } from "@/src/Store";
import { Redirect } from "react-router-dom";
import ajax from "@/src/utils/ajax";
/* type */
interface Props {
  className?: string;
  Login: Login;// テスト用
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Login {
  mail: string;
  password: string;
}
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  // console.log(props.location.state);
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseLine />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="mail"
            autoComplete="email"
            autoFocus
            defaultValue={props.Login.mail}
            onChange={props.onChange}
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
            defaultValue={props.Login.password}
            onChange={props.onChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="ログイン情報を保存する"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                パスワードを忘れた場合
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                新規作成はこちら
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
/* classes */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
/* container */
const Login: React.FC = (): JSX.Element => {
  console.log(document.referrer);
  const { state, dispatch }: GlobalStoreProvider = React.useContext(Store);
  const [login, setLogin] = React.useState<Login>({
    mail: "sakai@gmail.com",
    password: "12345",
  });
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch(login.mail) {
      case "sakai@gmail.com":
        return dispatch({type: "LOGIN", payload: {id: 1, name: "酒井 陽太"}});
      case "kamino@hal.ac.jp":
        return dispatch({type: "LOGIN", payload: {id: 2, name: "神農隆晴"}});
      case "kazuya@gmail.com":
        return dispatch({type: "LOGIN", payload: {id: 3, name: "石橋和弥"}});
      case "taturo@gmail.com":
        return dispatch({type: "LOGIN", payload: {id: 4, name: "大島達郎"}});
      default:
        return;
    }
    // dispatch({type: "LOGIN", payload: {id: 1, name: "酒井 陽太"}});
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({...login,[e.target.name]: e.target.value});
  }
  return (
    <>
    {state.user.id ? (
      <Redirect to="/" />
    ):(
      <Component onSubmit={handleSubmit} onChange={handleChange} Login={login} />
    )}
    </>
  );
};

export default Login;