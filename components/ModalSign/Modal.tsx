import React, {useEffect, useState} from 'react';
import styles from './modal.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import Axios from "axios";
import {useRouter} from "next/router";

interface Input {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    is_staff: boolean
}


const ModalSign = () => {
    const [signup, setSignUp] = useState<boolean>(true)
    const [data, setData] = useState<Input>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
        phone: '',
        is_staff: false
	})
    const router = useRouter()

	const inputHandler = (e) => {
		e.preventDefault()
		const value = e.target.value

		setData({
			...data,
			[e.target.name]: value
		})
	}

	const sign = async(e, path) => {
        e.preventDefault()
        try {
            const res = await Axios.post(`${process.env.API_URL}/users/${path}`, data)
            localStorage.setItem('x-auth-token', res.data.token)
            await router.push('/account')
        } catch (err) {
            console.log(err.response.data.msg)
        }
    }


    return (
        <>
            <div className={styles.signType}>
                {signup ? "Реєстрація" : "Вхід"}
            </div>
            <form className={styles.form} onSubmit={(e) => signup? sign(e,'signup') : sign(e, 'signin')}>
                {signup && <Input value={data.name} name={'name'} onChange={inputHandler} type={'name'}
                        placeholder={"Введіть Ваше ім'я"}/>}
				<Input value={data.email} name={'email'} onChange={inputHandler} type={'email'} placeholder={'Введіть email.'}/>
				<Input value={data.password} name={'password'} onChange={inputHandler} type={'password'} placeholder={'Введіть пароль.'}/>
                {signup && <Input value={data.confirmPassword} name={'confirmPassword'} onChange={inputHandler} type={'password'}
                        placeholder={'Введіть пароль ще разю.'}/>}
                {signup && <Input value={data.phone} name={'phone'} onChange={inputHandler} type={'phone'}
                        placeholder={'Введіть ваш номер телефону.'}/>}
			    <div className={styles.changeType} onClick={() => setSignUp(!signup)}>{signup? "Вже зареєстровані? Спробуйте ввійти в аккаунт!" : "Ще не зареєстровані? Спробуйте зареєструватись!"}</div>
                <Button type={'submit'} text={signup?'Зареєструватись' : 'Ввійти'}/>
            </form>
        </>
    )
}


export default ModalSign;
