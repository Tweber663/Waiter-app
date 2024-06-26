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
import { menuPlacedPut } from '../../redux/tableRedux'
import { useEffect } from 'react'
import { menuPlacedGet } from '../../redux/tableRedux'
import { menuPlacedUpdate, menuPlacedDelete } from '../../redux/tableRedux'


const Menu = () => {
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(menuPlacedGet());
    }, [])
    
    const currentState = useSelector(state => state)
    const menuList = useSelector(state => state.tables.addTableTempOrder);
    const [blurOn, setBlurOn] = useState(true);
    const [blurEditOn, setBlurEditOn] = useState(true);
    const [dishName, setDishName] = useState('');
    const [idNum, setIdNum] = useState('');
    const [photoName, setPhotoName] = useState(''); 
    const [basePriceName, setBasePriceName] = useState('');

    const blurHandler = (e) => {
        if (e.target.classList.contains('Menu_windowBlur__dqBNq') || e.target.classList.contains('Menu_windowEditBlur__dxRsn')) {
            console.log(true)
            setBlurOn(true);
            setBlurEditOn(true);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(newMenuListItem(e.target[0].value, e.target[1].value, shortid()));
        dispatch(menuPlacedPut(currentState, e.target[0].value, e.target[1].value, shortid()));
    }

    const submitHandlerEdit = (e) => {
        e.preventDefault();
        console.log(e)
        debugger
        dispatch(menuPlacedUpdate(currentState, e.target[0].value, e.target[1].value, idNum, e.target[2].value))
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


            <div onClick={blurHandler} className={clsx(styles.windowEditBlur, blurEditOn && styles.windowEditBlurOff)}>
                <div className={styles.editInfoBox}>
                    <form onSubmit={submitHandlerEdit}>
                        <labal>Dish Name:</labal>
                        <input onChange={(e) => setDishName(e.target.value)} name="dishName" className={clsx("form-control")} value={dishName}></input>
                        <label>Base price:</label>
                        <input onchange={(e) => setBasePriceName(e.target.value)} className={clsx("form-control")} value={basePriceName}></input>
                        <label>Picture Select:</label>
                        <select onchange={(e) => setPhotoName(e.target.value)} className="form-select">
                            <option value="fork.png">Fork & Spoon</option>
                            <option value="pizza.png">Pizza</option>
                            <option value="spaghetti.png">spaghetti</option>
                        </select>
                        <div className={styles.buttonsBox}>
                            <button type="submit" className={"btn btn-warning"}>Update</button>
                            <button onClick={() => dispatch(menuPlacedDelete(idNum, currentState))} type="button" className={"btn btn-light"}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>

                <h1 className={styles.title}>Menu List</h1>
                <div>
                    <ul className={styles.ulList}>
                        {menuList[0] && (
                            menuList[0].menuOrder.map((item) => (
                                <MenuElement items={item} blurOn={setBlurEditOn} dishName={setDishName} baseName={setBasePriceName} idNum={setIdNum}/>
                            ))
                        )}
                    </ul>
                </div>
                <MenuAdd blur={setBlurOn}/>
            </Container>
           
            <Navigation/>
        </div>
    )
}

export default Menu