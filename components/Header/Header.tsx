import React, {useEffect, useRef} from 'react';
import styles from './header.module.scss';
import Link from 'next/link'
import Pizza from '../PizzaRotate/Pizza';


const Header = () => {
    const ref = useRef<HTMLHeadingElement>()


    useEffect(() => {
        window.onscroll = () => {
            if (ref !== undefined) {
                ref.current.style.transform = "rotate(" + window.pageYOffset/2 + "deg)"
            }
        }
    }, [])

    return (
        <>
            <div className={styles.header}>
                <div className={styles.header__left}>
                    <div className={styles.header__left__content}>
                        <div className={styles.header__moto}>
                            Спробуй емоції на смак!
                        </div>
                        <Link href="/menu">
                            <button className={styles.header__menu}>
                                MENU
                            </button>
                        </Link>
                     </div>
                </div>
                <div className={styles.header__right}>
                    <Pizza pizzaRef={ref}/>
                    <div className={styles.header__right__bg}>PIZZA</div>
                </div>
            </div>
        </>
    )
}


export default Header;
