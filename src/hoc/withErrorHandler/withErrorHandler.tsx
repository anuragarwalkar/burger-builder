import React, { Fragment } from "react";
import Modal from "../../components/UI/Modal/modal";
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent: any, axios: any) => {
  return (props: any) => {
    const [error, errorConfirmedHandler]: any = useHttpErrorHandler(axios);

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
