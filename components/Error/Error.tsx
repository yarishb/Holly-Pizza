import React, {useEffect, useState} from 'react';
import styles from './error.module.scss';


interface Error {
    text: string,
    status: number,
    open: boolean
}

const Error = ({text, status, open=false}: Error) => {
    const [openError, setOpen] = useState(false)


    useEffect(() => {
        open && setOpen(true)
    }, [open])

    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 3500)
    }, [openError])

    if (openError) {
        return (
            <div className={styles.error} style={{backgroundColor: status === 200 && 'green'}}>
                <div className={styles.error__close} onClick={() => setOpen(false)}>x</div>
                {text}
            </div>
        )
    }

    return (
        <></>
    )
}


export default Error
