import {useRef, useState} from "react";
import Head from "next/head";
import Axios from "axios";

import styles from "../../../styles/adminNewPizza.module.scss";

import Input from "../../../components/Input/Input";
import Error from "../../../components/Error/Error";
import Button from "../../../components/Button/Button";

import {NewPizza, PizzaFields, PizzasRes} from "../../../interfaces/newPizza";
import {ErrorInterface} from "../../../interfaces/error";


const newPizza = () => {
    const inputOpenFileRef = useRef<HTMLInputElement>()
    const [fields, setFields] = useState<PizzaFields>({
        file: undefined,
        name: '',
        description: '',
        price: undefined,
        category: '',
        categories: ['Новинка'],
        protein: undefined,
        fat: undefined,
        carbohydrates: undefined,
        weight: undefined,
        size: 'medium'
    })

    const [error, setError] = useState<ErrorInterface>({
        open: false,
        text: '',
        status: 0
    })


    const newPizzaInputHandler = (e) => {
        e.preventDefault()
        const value: string = e.target.value

        setFields({
            ...fields,
            [e.target.name]: value
        })
    }


    const setErrorHandler = (msg: string, status: number) => {
        setError({
            open: true,
            text: msg,
            status: status
        })
        setTimeout(() => {
            setError({open: false} as Pick<ErrorInterface, keyof  ErrorInterface>)
        }, 2500)
    }

    const loadImage = (e) => {
        const fileTypes: Array<string> = ['image/jpeg', 'image/png', 'image/jpg'];

        if (fileTypes.includes(e.target.files[0].type)) {
            setFields({
                ...fields,
                file: e.target.files[0]
            })

        } else {
           setErrorHandler("Недоступний тип картинки. Спробуйте jpeg або png.", 400)
        }
    }

    const showOpenFileDlg = (e) => {
        e.preventDefault()
        inputOpenFileRef.current.click()
    }

    const addCategory = (e) => {
        e.preventDefault()
        if (!fields.categories.includes(fields.category) && fields.category !== undefined) {
            setFields({
                ...fields,
                categories: [...fields.categories, fields.category],
                category: ''
            })
        }
    }

    const removeCategory = (category) => {
        const list = fields.categories.filter((item) => {
           return item !== category
        })
        setFields({
            ...fields,
            categories: list
        })
    }

    const addSize = (e, size) => {
        e.preventDefault()
        setFields({
            ...fields,
            size: size
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', fields.file)
        Object.keys(fields).forEach((name: string) => {
            if (name !== 'category') {
                data.append(name, fields[name])
            }
        })

        const newPizzaReq = Axios.post(
            `${process.env.API_URL}/pizzas/createPizza`,
            data,
            {headers: {"Content-type": 'multipart/form-data'}})

        newPizzaReq.then((data: PizzasRes) => {
            setErrorHandler("Піца була успішно добавлена", 200)
        })

        newPizzaReq.catch((err) => {
            setErrorHandler(err.message, 400)
        })
    }

    return (
        <>
            <Head>
                <title>Admin Page | new pizza</title>
            </Head>
                {
                    error.open &&
                        <Error status={error.status} text={error.text}/>
                }
                <div className={styles.newPizza}>
                    <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
                        <input onChange={
                            (e) => loadImage(e)}
                                name={'image'}
                                ref={inputOpenFileRef}
                                type="file"
                                style={{ display: "none" }}
                        />
                        <div className={styles.form__uploadImage}>
                            <button
                                className={styles.form__upload}
                                onClick={(e) =>
                                    showOpenFileDlg(e)}
                            >Завантажити фото</button>

                            {
                                fields.file !== undefined &&
                                    <div className={styles.form__uploadImage__imageName}>{
                                        fields.file.name.substr(0, 20) + "..."
                                    }</div>
                            }
                        </div>
                        <Input
                            value={fields.name}
                            name={'name'}
                            onChange={newPizzaInputHandler}
                            type={'name'}
                            placeholder={'Введіть назву піци'}
                        />
                        <Input
                            value={fields.description}
                            name={'description'}
                            onChange={newPizzaInputHandler}
                            type={'text'}
                            placeholder={'Введіть опис / інградієнти піци'}
                        />
                        <Input
                            value={fields.price}
                            name={'price'}
                            onChange={newPizzaInputHandler}
                            type={'text'}
                            placeholder={'Введіть ціну в грн'}
                        />
                        <div className={styles.form__categories__categoriesField}>
                            <Input
                                name={'category'}
                                value={fields.category}
                                onChange={newPizzaInputHandler}
                                type={'text'}
                                placeholder={'Добавити категорію'}
                            />
                            <button onClick={(e) => addCategory(e)} className={`${styles.form__categoryButton} ${styles.boxShadow}`}>+</button>
                        </div>
                        <Input
                            value={fields.protein}
                            name={'protein'}
                            onChange={newPizzaInputHandler}
                            type={'text'}
                            placeholder={'Введіть кількість білків на 100г'}
                        />
                        <Input
                            value={fields.fat}
                            name={'fat'}
                            onChange={newPizzaInputHandler}
                            type={'text'}
                            placeholder={'Введіть кількість жирів на 100г'}
                        />
                        <Input
                            value={fields.carbohydrates}
                            name={'carbohydrates'}
                            onChange={newPizzaInputHandler}
                            type={'text'}
                            placeholder={'Введіть кількість вуглеводів на 100г'}
                        />
                        <Input
                            value={fields.weight}
                            name={'weight'}
                            onChange={newPizzaInputHandler}
                            type={'text'}
                            placeholder={'Введіть вагу піци в грамах'}
                        />
                        <div className={styles.sizes}>
                            <button onClick={(e) => addSize(e, 'small')} className={styles.sizes__size}>Мала</button>
                            <button onClick={(e) => addSize(e, 'medium')} className={styles.sizes__size}>Середня</button>
                            <button onClick={(e) => addSize(e, 'large')} className={styles.sizes__size}>Велика</button>
                        </div>
                        <Button type={'submit'} text={'Створити'}/>
                    </form>
                    <div className={styles.form__categoryBox}>
                        <div className={styles.form__categoryBox__categoryField}>Категорії:</div>
                        <div className={styles.form__categories}>
                            {
                                fields.categories !== undefined && fields.categories.map((data: string, idx: number) =>
                                        <>
                                            <div key={idx} className={`${styles.form__categories__category} ${styles.boxShadow}`}>
                                                <div onClick={() => removeCategory(data)} className={styles.form__categories__categoryDelete}>x</div>
                                                {data}
                                            </div>
                                        </>
                                    )
                                }
                        </div>
                    </div>
                </div>
        </>
    )
}

export default newPizza