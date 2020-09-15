import React, { Fragment, useState, useEffect } from "react";
import authForm from "./authForm";
import { convertFormToArray, checkValidity } from "../../utils/functions";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { auth, setAuthRedirectPath } from "../../store/actions";
import { connect } from "react-redux";
import { RootState } from "../../models/rootState.model";
import { Redirect } from "react-router-dom";

export interface AuthProps {
  onAuth: (
    email: string,
    password: string,
    method: "signIn" | "signUp"
  ) => void;
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  authRedirectPath: string;
  building: boolean;
  onSetAuthRedirectPath: () => void
}

const Auth: React.SFC<AuthProps> = (props) => {
  const [controls, setControls]: any = useState(authForm);

  const [formIsValid, setFormIsValid]: any = useState(false);

  const [isSignUp, setIsSignUp]: any = useState(false);

  const switchAuthModeHandler = () => {
    setIsSignUp((prevState: any) => {
      return !prevState;
    });
  };


  useEffect(() => {
    if(!props.building && props.authRedirectPath !== ''){
        props.onSetAuthRedirectPath();
    }

    // eslint-disable-next-line 
  }, []);

  const inputChangeHandler = async (event: any, inputName: string) => {
    const value: string = event.target.value;
    const validation = controls[inputName].validation;
    const valid: boolean = validation ? checkValidity(value, validation) : true;
    let newState: any = {};

    setControls((oldState: any) => {
      newState = {
        ...oldState,
        [inputName]: {
          ...oldState[inputName],
          value,
          valid,
          touched: true,
        },
      };

      let isValid = true;

      for (const key in newState) {
        if (!newState[key].valid) {
          isValid = false;
          break;
        }
      }

      setFormIsValid(isValid);
      return newState;
    });
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = controls;

    props.onAuth(email, password, isSignUp ? "signUp" : "signIn");
  };

  const formArray = convertFormToArray(controls);

  let form = formArray.map((element: any) => {
    return (
      <Input
        changed={(event) => inputChangeHandler(event, element.id)}
        elementType={element.config.elementType}
        invalid={!element.config.valid}
        elementConfig={element.config.elementConfig}
        shouldValidate={element.config.validation}
        value={element.config.value}
        touched={element.config.touched}
        key={element.id}
      />
    );
  });

  if (props.loading) {
    form = <Spinner />;
  }

  let message = null;

  if (props.error) {
    message = <div className={classes.error}>{props.error}</div>;
  }

  return (
    <Fragment>
      {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
      <div className={classes.auth}>
        {message}
        <form onSubmit={onSubmitHandler}>
          {form}
          <div>
            <Button disabled={!formIsValid} btnType="Success">
              Submit
            </Button>
          </div>
        </form>
        <Button btnType="Danger" click={switchAuthModeHandler}>
          Swith To {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state: RootState) => {
  const { loading, error, token, authRedirectPath } = state.auth;
  const { building } = state.burgerBuilder;
  return {
    loading,
    error,
    isAuthenticated: token !== "",
    building, 
    authRedirectPath
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string, method: "signUp" | "signIn") =>
      dispatch(auth(email, password, method)),
      onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
