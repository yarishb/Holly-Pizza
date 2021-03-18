import React from 'react';
import styles from './error.module.scss';


interface Error {
    text: string,
    status: number
}

const Error = ({text, status}: Error) => {
    return (
        <div className={styles.error} style={{backgroundColor: status===200 && 'green'}}>
            {text}
        </div>
    )
}


export default Error
