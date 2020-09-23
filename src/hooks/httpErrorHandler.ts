import { useState, useEffect } from 'react';

const initialState = { message: '' };

export default (httpClient: any) => {
    const [error, setError] = useState(initialState);
    const { interceptors: {request, response} } = httpClient;

    const reqInterceptor = request.use((req: any) => {
        setError(initialState);
        return req;
    });

    const resInterceptor = response.use(
        (res: any) => res,
        ({ message }: any) => {
            setError({ message });
        }
    );

    const errorConfirmedHandler = () => {
        setError(initialState);
    };

    useEffect(() => {
        return () => {
            request.eject(reqInterceptor);
            response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor, request, response]);

    return [error, errorConfirmedHandler]
}