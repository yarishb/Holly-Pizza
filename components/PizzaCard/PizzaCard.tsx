import React, {useEffect, useState} from 'react';
import styles from './PizzaCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';


interface ButtonProps {
    link: {
        href: string,
        to: string
    },
    text: string
}

export default function PizzaCard({pizza, idx, buttonType}) {
    const [buttonProps, setButtonProps] = useState<ButtonProps>({
        link: {
            href: '',
            to: ''
        },
        text: ''
    })

    useEffect(() => {
      if (buttonType === "change") {
        setButtonProps({
            link: {
                href: "/admin/pizza/[id]",
                to: `/admin/pizza/${pizza.id}`
            },
            text: "Редагувати"
        })
      }
      if (buttonType === "show") {
          setButtonProps({
              link: {
                href: "...",
                to: "..."
              },
              text: "Дивитись"
          })
      }
    }, [])

    return (
            <div className={styles.pizzaEl} key={idx}>
                <Image className={styles.pizzaEl__pizzaImage} src={`${pizza.image}`}  width="230" height="230" />
                <div className={styles.pizzaEl__name}>{pizza.name}</div>
                <div className={styles.pizzaEl__description}>{pizza.description}</div>
                <div className={styles.categories}>
                    {typeof pizza.categories === "object" &&
                        pizza.categories.map((category: string, idx:number) => {
                            return (
                                <div key={idx} className={styles.categories__category}>{category}</div>
                            )
                    })}
                </div>
                <div className={styles.pizzaEl__bottom}>
                    <div className={styles.pizzaEl__bottom__priceAndWeight}>
                        <div className={styles.pizzaEl__bottom__priceAndWeight__weight}>{pizza.weight} г</div>
                        <div className={styles.pizzaEl__bottom__priceAndWeight__price}>{pizza.price} ₴</div>
                    </div>
                    <Link href={buttonProps.link.href} as={buttonProps.link.to}><button className={styles.pizzaEl__bottom__more}>{buttonProps.text}</button></Link>
                </div>
            </div>
    )
}
