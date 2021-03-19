import '../styles/index.scss'
import {AppProps} from "next/app";

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from "next/router";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const HollyPizza = ({Component, pageProps}: AppProps) => {
    return (
        <Component {...pageProps}/>
    )
}


export default HollyPizza