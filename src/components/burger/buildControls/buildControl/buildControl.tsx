import * as React from 'react';
import styles from './buildControl.module.css';

export interface BuildControlProps {
    label: string;
    type: string;
    moreClicked: any;
    lessClicked: any;
    disabled:any
}
 
const BuildControl: React.SFC<BuildControlProps> = ({label, lessClicked, moreClicked, type, disabled}: any) => {
    return ( <div className={styles.buildControl}>
        <div className={styles.label}>{label}</div>
        <div className={styles.customButtons}>
        <button className={styles.less} onClick={() => lessClicked(type)} disabled={disabled}>Less</button>
        <button className={styles.more} onClick={() => moreClicked(type)}>More</button>
        </div>
    </div> );
}
 
export default BuildControl;