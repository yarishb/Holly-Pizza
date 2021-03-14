import Pizza from '../components/PizzaRotate/Pizza';
import styles from '../styles/404.module.scss';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function undefinedPage() {
    const ref = useRef()
    const router = useRouter()


    useEffect(() => {
        setTimeout(() => {
            router.back()
        }, 3000);
    }, [])


    return (
        <>
            <div className={styles.full}>
                <div className={styles.main}>
                    <div className={styles.main__number}>4</div>
                    <Pizza pizzaRef={ref} style={{position: "relative", marginLeft: 0}}/>
                    <div className={styles.main__number}>4</div>
                </div>
            </div>
        </>
    )
}
