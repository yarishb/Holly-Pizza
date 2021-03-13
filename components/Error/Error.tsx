import React from 'react';
import styles from './error.module.scss';


const Error = ({text, ref}) => {
    return (
        <div ref={ref} className={styles.error}>
            {text}
        </div>
    )
}


export default Error
