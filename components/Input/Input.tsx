import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    return (
        <>
            <input
				onChange={props.onChange}
			 	name={props.name}
			 	className={styles.field}
			 	type={props.type}
			 	placeholder={props.placeholder}
			 	value={props.value}
			/>
        </>
    )
}


export default Input;
