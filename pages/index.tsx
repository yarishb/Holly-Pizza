import styles from '../styles/home.module.scss'
import Header from '../components/Header/Header'
import Head from 'next/head'

const MainPage = () => {
    return (
        <>
            <Head>
                <title>Holly Pizza | Home</title>
            </Head>
            <div className={styles.main}>
                <Header />
            </div>
        </>
    )
}

export default MainPage 