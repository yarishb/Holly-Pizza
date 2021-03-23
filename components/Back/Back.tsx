import styles from './back.module.scss';
import {useRouter} from "next/router";


export default function Back() {
    const router = useRouter()
    const handleBack = () => {
        return router.back()
    }

    return (
        <button onClick={() => handleBack()} className={styles.back}>&#8592; назад</button>
    )
}