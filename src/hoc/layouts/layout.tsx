import React, { useState, Fragment } from 'react';
import styles from './layout.module.css';
import Toolbar from '../../components/navigation/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';
import { RootState } from '../../models/rootState.model';
import { connect } from 'react-redux';

const Layout = (props: any) => {

    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerHandler = (cond: boolean) => {
        setSideDrawer(cond);
    }

    return <Fragment>
        <Toolbar isAuthenticated={props.isAuthenticated} show={() => sideDrawerHandler(true)}/>
        <SideDrawer open={showSideDrawer} isAuthenticated={props.isAuthenticated} closed={() => sideDrawerHandler(false)}/>
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.auth.token !== ''
    }
}

export default connect(mapStateToProps)(Layout);