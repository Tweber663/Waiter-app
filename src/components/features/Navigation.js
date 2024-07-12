import styles from './Navigation.module.scss'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const Navigation = ({passed, selected}) => {

    const [orderAdded, setOrderAdded] = useState(false)
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);
    const [isSelected4, setIsSelected4] = useState(false);


    useEffect(() => {
        setOrderAdded(passed)
        if (selected === 'Home') {
            setIsSelected1(true); 
        } else if (selected === "Menu") {
            setIsSelected2(true);
        } else if (selected === "Orders") {
            setIsSelected3(true);  
        } else if (selected === "settings") {
            setIsSelected4(true);
        }

    }, [passed, selected])

    return (
        <div className={styles.background}>

            <div className={clsx(styles.iconBox, isSelected1 && styles.iconBoxSelected)}>
                <NavLink to={"/home"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/table.png`}/>
                </NavLink>
            </div>
            <div className={clsx(styles.iconBox, isSelected2 && styles.iconBoxSelected)}>
                <NavLink to={"/menu"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/menu.png`}/>
                </NavLink>
            </div>
            <div className={clsx(styles.iconBox, orderAdded && styles.iconBoxJump, isSelected3 && styles.iconBoxSelected)}>
                <NavLink to={"/orders"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/time.png`}/>
                </NavLink>
            </div>
            {/* <div className={clsx(styles.iconBox, isSelected4 && styles.iconBoxSelected)}>
                <NavLink to={"/home"}>
                <img alt='tableIcon' src={`${process.env.PUBLIC_URL}/images/nav/settings.png`}/>
                </NavLink>
            </div> */}
        </div>
    )
}


export default Navigation