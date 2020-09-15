import React, {useEffect} from 'react';
import { logout } from '../../../store/actions/auth'
import { connect } from 'react-redux';

export interface LogoutProps {
    onLogout: () => void
}
 
const Logout: React.SFC<LogoutProps> = (props) => {

    useEffect(() => {
        props.onLogout();
    })

    return ( 
        <div style={{textAlign: 'center'}}>
            You have been log out successfully.
        </div> 
     );
}

const mapdispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => dispatch(logout())
    }
}
 
export default connect(null, mapdispatchToProps)(Logout);