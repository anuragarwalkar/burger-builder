import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => (
    <div className={styles.Logo}>
    <Link to="/"><img src={burgerLogo} alt="Logo" /></Link>
    </div>
)

export default Logo

