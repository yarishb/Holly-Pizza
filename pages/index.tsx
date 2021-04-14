import styles from '../styles/home.module.scss';
import Header from '../components/Header/Header';
import NavLayout from "../components/NavLayout/NavLayout";
import Head from 'next/head';
import TopSalesCorousel from '../components/TopSalesCorousel/TopSalesCorousel';

const MainPage = () => {
    return (
        <NavLayout>
            <Head>
                <title>Holly Pizza | Home</title>
            </Head>
            <div className={styles.main}>
                <Header />
                <div className={styles.main__template}>
                    <TopSalesCorousel />
                </div>
            </div>
        </NavLayout>
    )
}

/* TODO: bucket, profile, menu,
    pizzaSlider,changeUserProps, changePizzaProps,
    orderPizza, userOrders, pizzaOrders
 */


export default MainPage 