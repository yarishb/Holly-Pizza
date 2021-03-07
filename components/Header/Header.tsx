import React from 'react';
import styles from './header.module.scss';
import Link from 'next/link'


const Header = () => {
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
                    <div className={styles.header__pizza}>
                        <div className={styles.header__pizza__img}></div>
                    </div>
                    <div className={styles.header__right__bg}>PIZZA</div>
                </div>
            </div>
        </>
    )
}


export default Header;
