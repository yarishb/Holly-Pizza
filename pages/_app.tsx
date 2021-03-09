import '../styles/index.scss'
import {AppProps} from "next/app";

const HollyPizza = ({Component, pageProps}: AppProps) => {
    return (
        <Component {...pageProps}/>
    )
}

export default HollyPizza