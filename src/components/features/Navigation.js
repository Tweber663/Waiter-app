
import styles from './Navigation.module.scss'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const Navigation = () => {
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
            <div className={clsx(styles.box3, styles.iconBox)}>
                <NavLink to={"/home"}>
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