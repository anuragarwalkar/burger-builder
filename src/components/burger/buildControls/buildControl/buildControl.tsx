import * as React from 'react';
import styles from './buildControl.module.css';

export interface BuildControlProps {
    label: string;
    type: string;
    moreClicked: any;
    lessClicked: any;
}
 
const BuildControl: React.SFC<BuildControlProps> = (props: any) => {
    return ( <div className={styles.buildControl}>
        <div className={styles.label}>{props.label}</div>
        <div className={styles.customButtons}>
        <button className={styles.less} onClick={() => props.lessClicked(props.type)}>Less</button>
        <button className={styles.more} onClick={() => props.moreClicked(props.type)}>More</button>
        </div>
    </div> );
}
 
export default BuildControl;