import styles from '../styles/home.module.scss'
import Header from '../components/Header/Header'
import NavLayout from "../components/NavLayout/NavLayout";
import Head from 'next/head'

const MainPage = () => {
    return (
        <NavLayout>
            <Head>
                <title>Holly Pizza | Home</title>
            </Head>
            <div className={styles.main}>
                <Header />
            </div>
        </NavLayout>
    )
}

/* TODO: bucket, profile, menu,
    pizzaSlider,changeUserProps, changePizzaProps,
    orderPizza, userOrders, pizzaOrders
 */


export default MainPage 