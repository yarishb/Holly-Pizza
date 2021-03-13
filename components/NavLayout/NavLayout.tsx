import React, {useState, useRef, useEffect} from "react";
import styles from './navlayout.module.scss'
import Link from 'next/link';
import ModalSign from "../ModalSign/Modal";
import {useRouter} from 'next/router';
import Axios from 'axios';
import Error from '../Error/Error';
import {ErrorInterface} from '../../interfaces/error'
import User from "../../utils/user";


export default function navLayout({children}) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [link, setLink] = useState<string>('/')

    const modalRef = useRef<HTMLHeadingElement>()    
    const router = useRouter()
    const userManager = new User()

    const [error, setError] = useState<ErrorInterface>({
        text: '',
        open: false
    })

    const handleUser = () => {
        if (typeof window !== "undefined") {
            let token = localStorage.getItem('x-auth-token')
            if (token !== null && token !== '') {
                setLink('/account')
            } else {
                setOpenModal(true)
            }
        }
    }


    const closeModal = () => {
        if (openModal) {
            modalRef.current.classList.add(`${styles.modal_close}`)
            modalRef.current.classList.remove(`${styles.modal_open}`)

            setTimeout(() => {
                setOpenModal(false)
            }, 500)
        }
    }


    const sign = async(e, path, data) => {
        e.preventDefault()

        try {
            userManager.sign(path, data)     
            router.push(`admin/sign/${true}`)       
        } catch (err) {
            setError({
                text: err,
                open: true
            })         
            
            setTimeout(() => {
               setError({
                   text: '',
                   open: false
               }) 
            }, 2500);
        }
    }

    return (
        <>
            {openModal &&
                <>
                    {
                        error.open &&
                            <Error text={error.text}/>
                    }
                    <div className={styles.modalCenter}>
                        <div ref={modalRef} className={`${styles.modal} ${styles.modal_open}`}>
                            <div>
                                <div onClick={() => closeModal()} className={styles.close}>x</div>
                                <ModalSign sign={sign}/>
                            </div>
                        </div>
                    </div>
                </>
            }
            <nav className={styles.layout}>
                <div className={`${styles.bucket} ${styles.backgroundImage}`} />
                <Link href={link}><div onClick={() => handleUser()} className={`${styles.user} ${styles.backgroundImage}`}/></Link>
            </nav>
            <main>{children}</main>
        </>
    )
}