import React from 'react';
import styles from './error.module.scss';


const Error = ({text}) => {
    return (
        <div className={styles.error}>
            {text}
        </div>
    )
}


export default Error
