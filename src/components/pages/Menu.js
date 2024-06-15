import styles from './Menu.module.scss'
import Navigation from '../features/Navigation'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import MenuElement from './MenuElement'
import MenuAdd from './MenuAdd';
import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newMenuListItem } from '../../redux/tableRedux'
import shortid from 'shortid'

const Menu = () => {
    const dispatch = useDispatch();

    const menuList = useSelector(state => state.tables.addTableTempOrder);

    const [blurOn, setBlurOn] = useState(false);

    const blurHandler = (e) => {
        if (e.target.classList.contains('Menu_windowBlur__dqBNq')) setBlurOn(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(newMenuListItem(e.target[0].value, e.target[1].value, shortid()));
    }




    return (
        <div className={styles.mainBox}>
            <Container>
            <div onClick={blurHandler} className={clsx(styles.windowBlur, blurOn && styles.windowBlurOff)}>
                <div className={styles.windowBox}>
                    <h1>Add new dish to menu List</h1>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <label className={styles.label1}>Dish Name:</label>
                        <input placeholder="Rice" className={clsx("form-control", styles.input1)}></input>
                        <label>Unit price: </label>
                        <input placeholder="$" className={clsx("form-control", styles.input2)}></input>
                        <button className="btn btn-warning">Add</button>
                    </form>
                </div>
            </div>

                <h1 className={styles.title}>Menu List</h1>
                <div>
                    <ul className={styles.ulList}>
                        {menuList[0] && (
                            menuList[0].menuOrder.map((item) => (
                                <MenuElement items={item}/>
                            ))
                        )}
                    </ul>
                </div>
                <MenuAdd/>
            </Container>
           
            <Navigation/>
        </div>
    )
}

export default Menu