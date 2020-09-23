import React, { useState, useEffect, Fragment } from "react";
import Modal from "../../components/UI/Modal/modal";

const initialState = {message: ''};
const withErrorHandler = (WrappedComponent: any, axios: any) => {
  return (props: any) => {
    const [error, setError] = useState(initialState);

    let reqInterceptor: any;
    let resInterceptor: any;


      reqInterceptor = axios.interceptors.request.use((req: any) => {
        setError(initialState);
        return req;
      });
      resInterceptor = axios.interceptors.response.use(
        (res: any) => res,
        ({message}: any) => {
          setError({message});
        }
      );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(initialState);
    };

    return (
      <Fragment>
        <Modal show={error.message !== ''} hide={errorConfirmedHandler}>
          {error.message !== '' ? error.message : 'Something went wrong'}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorHandler;
