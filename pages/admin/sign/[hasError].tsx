import { NextPageContext } from "next";
import Error from "../../../components/Error/Error";
import { useState, useEffect } from 'react';
import {ErrorInterface} from '../../../interfaces/error';
import Input from '../../../components/Input/Input';
import styles from '../../../styles/adminSign.module.scss';
import Button from '../../../components/Button/Button';
import User from "../../../utils/user";
import { useRouter } from "next/router";
import Head from 'next/head';

interface Login {
    email: string,
    password: string
}

export default function Sign({err}) {
    const [error, setError] = useState<ErrorInterface>({
        open: false,
        text: '',
        status: 0
    })
    const [data, setData] = useState<Login>({
        email: '',
        password: ''
    })
    const userManager = new User()
    const router = useRouter()

    const setErrorHandler = (msg, status) => {
        setError({
            open: true,
            text: msg,
            status: status
        })

        setTimeout(() => {
            setError({
                open: false,
            } as Pick<ErrorInterface, keyof ErrorInterface>)
        }, 2500);
    }

    useEffect(() => {
        err && setErrorHandler('Доступ заборонений, спробуйте ввійти.', 400)
    }, [err])


    const signAdmin = async (e) => {
        e.preventDefault()
        const resData = userManager.sign('signin', data)
        resData.then(() => {
            setErrorHandler('Доступ успішно надано.', 200)
            setTimeout(() => router.back(), 2500)
        })
    }

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
            <Head>
                Holly pizza | admin sign
            </Head>
            {error.open && 
                <Error status={error.status} text={error.text}/>
            }
            <div className={styles.fullPage}>
                <div className={styles.form}>
                    <div className={`${styles.form__admin} ${styles.backgroundImage}`} />
                    <form className={styles.formItems} onSubmit={(e) => signAdmin(e)}>
                        <div className={styles.formItems__enter}>Вхід в систему</div>
                        <Input value={data.email} name={'email'} onChange={inputHandler} type={'email'} placeholder={'Введіть email.'}/>
                        <Input value={data.password} name={'password'} onChange={inputHandler} type={'password'} placeholder={'Введіть пароль.'}/>
                        <Button type={'submit'} text={'Ввійти'}/>
                    </form>
                </div>
            </div>
        </>
    )
}



Sign.getInitialProps = async ({query}: NextPageContext) => {
    return {
        err: query.hasError
    }
}