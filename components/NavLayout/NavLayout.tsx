import React, {useState, useRef, useEffect} from "react";
import styles from './navlayout.module.scss'
import Link from 'next/link'
import ModalSign from "../ModalSign/Modal";


export default function navLayout({children}) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [link, setLink] = useState<string>('/')
    const modalRef = useRef<HTMLHeadingElement>()
    

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

    return (
        <>
            {openModal &&
                <>
                    <div className={styles.modalCenter}>
                        <div ref={modalRef} className={`${styles.modal} ${styles.modal_open}`}>
                            <div onClick={() => closeModal()} className={styles.close}>x</div>
                            <ModalSign/>
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