import React from 'react';
import styles from './addCategory.module.scss';
import Input from '../../../Input/Input';

export default function AddCategory({onChange, value, addCategory}) {
    return (
        <div className={styles.categoriesField}>
            <Input
                name={'category'}
                value={value}
                onChange={onChange}
                type={'text'}
                placeholder={'Добавити категорію'}
            />
            <button onClick={(e) => addCategory(e)} className={`${styles.categoryButton} ${styles.boxShadow}`}>+</button>
    </div>
    )
}
