import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/modal';

const WithErrorHandler = (WrappedComponent: any, axios: any) => {
    const ReturnedComponent = (props: any) => {

        const initialErrorState = { message: '', state: false };

        const [error, setError] = useState(initialErrorState);

        useEffect(()=>{
            axios.interceptors.response.use((res: any) => res, (err: any) => {
                if(err) {
                    // console.log('err:', err)
                    const { message } = err;
                    setError({message, state: true});
                }        
            }) 
            axios.interceptors.response.use((res:any) => {
                // console.log('res:', res)
                setError(initialErrorState);
                return res;
            })
            
            // eslint-disable-next-line  
        },[]);

        const closeModal = () => {setError(initialErrorState)}

        return (<Fragment>
            <Modal show={error.state} hide={closeModal}>{error.message}</Modal>
            <WrappedComponent {...props}/>
        </Fragment>)
    }

    return ReturnedComponent;
}   

export default WithErrorHandler;