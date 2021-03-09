import React from 'react';
import styles from './button.module.scss';

const Button = (props) => {
    return (
        <>
           <button className={styles.staticButton}>{props.text}</button>
        </>
    )
}


export default Button;
