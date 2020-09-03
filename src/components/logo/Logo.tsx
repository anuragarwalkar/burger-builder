import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import styles from './Logo.module.css';

const Logo = () => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="Logo" />
    </div>
)

export default Logo

