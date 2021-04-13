import Axios from "axios";
import {Fields} from "../../../interfaces/newPizza";
import {useEffect, useRef, useState} from "react";
import styles from "../../../styles/pizza.module.scss";


import {NextPageContext} from "next";
import Head from "next/head";
import Back from "../../../components/Back/Back";
import TypesBox from "../../../components/TypesBox/TypesBox";
import { useRouter } from "next/router";
import {DBRequestManager} from '../../../utils/pizza';
import Input from "../../../components/Input/Input";
import {fileTypes, options} from '../../../utils/variables';
import Select from 'react-select';
import AddCategory from "../../../components/admin/AdminPizza/addCategoryButton/AddCategory";
import Button from "../../../components/Button/Button";
import {ErrorInterface} from "../../../interfaces/error";
import Error from "../../../components/Error/Error";

interface PizzaNextPageProps extends NextPageContext {
    query: {
        id: string
    }
}


export default function Pizza({pizzaResData}) {
    const inputOpenFileRef = useRef<HTMLInputElement>()
    const [pizzaData, setPizzaData] = useState<Fields>()
    const [turnChangePizza, setTurnChangePizza] = useState<boolean>(false)
    const [newFields, setNewFields] = useState<Fields>({
        ...pizzaData,
        category: ''
    })
    const [error, setError] = useState<ErrorInterface>({
        open: false,
        text: '',
        status: 0
    })
    const router = useRouter()
    const pizzaHelperManager = new DBRequestManager()

    const setErrorHandler = (msg: string, status: number) => {
        setError({
            open: true,
            text: msg,
            status: status
        })
    }


    const deletePizza = () => {
        pizzaHelperManager.deleteItemRequest(pizzaData.id, 'pizzas/deletePizza')
            .then(() => {
                router.back()
            })
            .catch(err => {
                setErrorHandler(err.response.data.msg, 400)
            })
    }

    const showOpenFileDlg = (e) => {
        e.preventDefault()
        inputOpenFileRef.current.click()
    }

    const loadImage = (e) => {
        if (fileTypes.includes(e.target.files[0].type)) {
            setNewFields({
                ...newFields,
                file: e.target.files[0]
            })
        } else {
            setErrorHandler("Недоступний тип картинки. Спробуйте jpeg або png.", 400)
        }
    }


    const changeData = (e, isNumeric=false) => {
        e.preventDefault()
        const targetValue = isNumeric ? +e.target.value : e.target.value

        setNewFields({
            ...newFields,
            [e.target.name]: targetValue
        })
    }

    const addCategory = (e) => {
        e.preventDefault()                
        if (!newFields.categories.includes(newFields.category) && newFields.category !== undefined) {
            setNewFields({
                ...newFields,
                categories: [...newFields.categories, newFields.category],
            })
        }
    }

    useEffect(() => {
        setPizzaData(pizzaResData)
        setNewFields(pizzaResData)
    }, [pizzaResData])

    
    const changeSize = newSize => {               
        setNewFields({
            ...newFields,
            size: newSize.value
        })
    }

    const updateNewFields = async(e) => {
        try {
            e.preventDefault()
            const data = new FormData()
            data.append('file', newFields.file)            
            
            Object.keys(newFields).forEach((name: string) => {
                if (name !== 'category') {
                    data.append(name, newFields[name])
                }
            })
            
            const updatedPizzaFields = await Axios.put(
                `${process.env.API_URL}/pizzas/updatePizza`,
                data,
                {headers: {"Content-type": 'multipart/form-data'}})

        } catch (err) {
            console.log(err)
        }
    }

    if (pizzaData) {
        return (
            <>
                <Error status={error.status} text={error.text} open={error.open}/>
                <Head>
                    <title>Admin Pizza | {pizzaData.name}</title>
                </Head>
                <Back />
                <div className={styles.pizzaPage}>
                    <img src={`${pizzaData.image}`} className={styles.pizzaPage__photo} />
                    <div className={styles.pizzaPage__info}>
                        
                            <div className={styles.pizzaPage__info__top}>
                                <div className={styles.pizzaPage__info__top__name}>
                                    {!turnChangePizza ? 
                                        pizzaData.name 
                                        : 
                                        <Input value={newFields.name} placeholder={newFields.name} onChange={changeData} type={'text'} name={"name"}/>
                                    }
                                </div>
                                <div className={styles.pizzaPage__info__top__buttons}>
                                    <div className={styles.pizzaPage__info__top__button}>
                                        {!turnChangePizza ? 
                                            <div onClick={() => {setTurnChangePizza(true)}} className={`
                                                ${styles.pizzaPage__info__top__buttons__button__image} 
                                                ${styles.backgroundImage} 
                                                ${styles.pizzaPage__info__top__buttons__button__imageEdit}`}>
                                            </div>
                                        :
                                            <div onClick={() => {setTurnChangePizza(false)}}
                                                className={`
                                                    ${styles.pizzaPage__info__top__buttons__button__image} 
                                                    ${styles.pizzaPage__info__top__buttons__button__cancel}`}
                                            >X</div>
                                        }
                                    </div>
                                    <div className={styles.pizzaPage__info__top__buttons__button}>
                                        <div onClick={() => deletePizza()} className={`
                                            ${styles.pizzaPage__info__top__buttons__button__image} 
                                            ${styles.backgroundImage}`}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.pizzaPage__info__desc}>
                                {!turnChangePizza ?
                                    pizzaData.description
                                    :
                                    <Input value={newFields.description} placeholder={newFields.description} onChange={changeData} type={'text'} name={"description"}/>
                                }
                            </div>
                            <div className={styles.pizzaPage__info__includes}>
                                <div>
                                    <div className={styles.pizzaPage__info__includes__title}>
                                        жири / 100г
                                    </div>
                                    <div className={styles.pizzaPage__info__includes__item}>
                                        {!turnChangePizza ? 
                                            pizzaData.fat + 'г' 
                                            :
                                            <input 
                                                value={newFields.fat} 
                                                className={styles.pizzaPageInput}
                                                placeholder={newFields.fat + 'г'} 
                                                onChange={(e) => changeData(e, true)}
                                                type={'number'} name={'fat'}/>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.pizzaPage__info__includes__title}>
                                        білки / 100г
                                    </div>
                                    <div className={styles.pizzaPage__info__includes__item}>
                                        {!turnChangePizza ? 
                                            pizzaData.protein + 'г' 
                                            :
                                            <input 
                                                value={newFields.protein} 
                                                className={styles.pizzaPageInput}
                                                placeholder={newFields.protein + "г"} 
                                                onChange={(e) => changeData(e, true)}
                                                type={'number'} name={'protein'}
                                            />
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.pizzaPage__info__includes__title}>
                                        вугл. / 100г
                                    </div>
                                    <div className={styles.pizzaPage__info__includes__item}>
                                        {!turnChangePizza ? 
                                            pizzaData.carbohydrates + 'г' 
                                            :
                                            <input 
                                                value={newFields.carbohydrates} 
                                                className={styles.pizzaPageInput}
                                                placeholder={newFields.carbohydrates + "г"} 
                                                onChange={(e) => changeData(e, true)}
                                                type={'number'} name={'carbohydrates'}/>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.pizzaPage__info__includes__title}>
                                        вага
                                    </div>
                                    <div className={styles.pizzaPage__info__includes__item}>
                                        {!turnChangePizza ? 
                                                pizzaData.weight + 'г' 
                                                :
                                                <input 
                                                    value={newFields.weight} 
                                                    className={styles.pizzaPageInput}
                                                    placeholder={newFields.weight + "г"} 
                                                    onChange={(e) => changeData(e, true)}
                                                    type={'number'} name={'weight'}/>
                                            }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.pizzaPage__info__size}>
                                <div className={styles.pizzaPage__info__size__sizeTitle}>Розмір: </div>
                                <div className={styles.pizzaPage__info__size__sizeItem}>
                                    {!turnChangePizza ?
                                        pizzaData.size === 'medium' ? "Середня" : pizzaData.size === 'small' ? "Мала" : "Велика"
                                        :
                                        <Select
                                            className={styles.pizzaPage__info__size__sizeItem__select}
                                            value={newFields.size}
                                            onChange={changeSize}
                                            options={options}
                                            placeholder={newFields.size === 'medium' ? "Середня" : newFields.size === 'small' ? "Мала" : "Велика"}
                                    />
                                    }
                                </div>
                            </div>
                            <div className={styles.pizzaPage__info__orders}>
                                <div className={styles.pizzaPage__info__size__sizeTitle}> Замовлень:</div>
                                <div className={styles.pizzaPage__info__size__sizeItem}>
                                    {!turnChangePizza ?
                                        pizzaData.orders
                                        :
                                        <input 
                                            value={newFields.orders} 
                                            className={styles.pizzaPageInput}
                                            placeholder={newFields.orders + ""} 
                                            onChange={(e) => changeData(e, true)}
                                            type={'number'} name={'orders'}
                                        />
                                    }
                                </div>
                            </div>
                            {
                                turnChangePizza &&
                                    <AddCategory value={newFields.category} addCategory={addCategory} onChange={changeData}/>
                            }
                            <div className={styles.pizzaPage__info__typeBox}>
                                <TypesBox fields={turnChangePizza ? newFields.categories : pizzaData.categories} remove={false} removeCategory={null}/>
                            </div>
                            <div className={styles.pizzaPage__info__price}>
                                {!turnChangePizza ? 
                                    pizzaData.price 
                                    :
                                    <input 
                                        value={newFields.price} 
                                        className={styles.pizzaPageInput}
                                        placeholder={newFields.price + ""} 
                                        onChange={(e) => changeData(e, true)}
                                        type={'number'} name={'price'}
                                    />
                                } грн
                            </div>
                            <input onChange={
                                (e) => loadImage(e)}
                                name={'image'}
                                ref={inputOpenFileRef}
                                type="file"
                                style={{ display: "none" }}
                            />
                            {turnChangePizza &&
                            <div className={styles.pizzaPage__info__uploadImage}>
                                <button
                                    className={styles.pizzaPage__info__upload}
                                    onClick={(e) =>
                                        showOpenFileDlg(e)}
                                >Змінити фото</button>
                                {
                                    newFields.file !== undefined &&
                                    <div className={styles.pizzaPage__info__uploadImage__imageName}>{
                                        newFields.file.name.substr(0, 20) + "..."
                                    }</div>
                                }
                            </div>}
                            {turnChangePizza && 
                                <div onClick={(e) => updateNewFields(e)}><Button text={'Змінити'}/></div>
                            }
                    </div>
                </div>
            </>
        )
    }

    return (
        <></>
    )
}

Pizza.getInitialProps = async({query}: PizzaNextPageProps) => {
    const body = {"id": query.id, "name": ''}

    const resData = await Axios.post(`${process.env.API_URL}/pizzas/getPizza`, body)
    const pizzaResData: Fields = resData.data[0]

    return {
        pizzaResData
    }
}
