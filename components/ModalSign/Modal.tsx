import React, {useEffect, useState} from 'react';
import styles from './modal.module.scss';
import Input from "../Input/Input";
import Button from "../Button/Button";
import {InputInterface} from '../../interfaces/user'


const ModalSign = ({sign}) => {
    const [signup, setSignUp] = useState<boolean>(true)
    const [data, setData] = useState<InputInterface>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
        phone: '',
        is_staff: false
	})

	const inputHandler = (e) => {
		e.preventDefault()
		const value: string = e.target.value

		setData({
			...data,
			[e.target.name]: value
		})
	}


    return (
        <>
            <div className={styles.signType}>
                {signup ? "Реєстрація" : "Вхід"}
            </div>
            <form className={styles.form} onSubmit={(e) => signup? sign(e,'signup', data) : sign(e, 'signin', data)}>
                {signup && <Input value={data.name} name={'name'} onChange={inputHandler} type={'name'}
                        placeholder={"Введіть Ваше ім'я"}/>}
				<Input value={data.email} name={'email'} onChange={inputHandler} type={'email'} placeholder={'Введіть email.'}/>
				<Input value={data.password} name={'password'} onChange={inputHandler} type={'password'} placeholder={'Введіть пароль.'}/>
                {signup && <Input value={data.confirmPassword} name={'confirmPassword'} onChange={inputHandler} type={'password'}
                        placeholder={'Введіть пароль ще раз.'}/>}
                {signup && <Input value={data.phone} name={'phone'} onChange={inputHandler} type={'phone'}
                        placeholder={'Введіть ваш номер телефону.'}/>}
			    <div className={styles.changeType} onClick={() => setSignUp(!signup)}>{signup? "Вже зареєстровані? Спробуйте ввійти в аккаунт!" : "Ще не зареєстровані? Спробуйте зареєструватись!"}</div>
                <Button type={'submit'} text={signup?'Зареєструватись' : 'Ввійти'}/>
            </form>
        </>
    )
}


export default ModalSign;
