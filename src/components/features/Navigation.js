
import styles from './Navigation.module.scss'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Navigation = ({passed}) => {

    const [orderAdded, setOrderAdded] = useState(false)

    useEffect(() => {
        setOrderAdded(passed)
    }, [passed])

    console.log(orderAdded)


    return (
        <div className={styles.background}>

            <div className={styles.iconBox}>
                <NavLink to={"/home"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/table.png`}/>
                </NavLink>
            </div>
            <div className={styles.iconBox}>
                <NavLink to={"/home"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/menu.png`}/>
                </NavLink>
            </div>
            <div className={clsx(styles.iconBox, orderAdded && styles.iconBoxJump)}>
                <NavLink to={"/orders"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/time.png`}/>
                </NavLink>
            </div>
            <div className={styles.iconBox}>
                <NavLink to={"/home"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/settings.png`}/>
                </NavLink>
            </div>
        </div>
    )
}


export default Navigation