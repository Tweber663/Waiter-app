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
    const [error, setError] = useState(true);
    const [blurSwitchOff, setBlurSwitchOff] = useState(false);
    const [infoBlurOff, setInfoBlurOff] = useState(true);
    const [isSelected, setIsSelected] = useState(true);
   
    useEffect(() => {
      const ulList = document.querySelectorAll(`.${styles.selectList} ul > li`);
      Array.from(ulList).forEach((list) => {
        const titleElement = list.querySelector('h6').innerHTML;
        const imgElement = list.querySelector('img').getAttribute('src');
        if (imgElement.slice(8) === photoName.photo) {
            setPhotoName({title: titleElement, photo: imgElement.slice(8)}); 
        }
      });
    }, [blurEditOn])

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
        setBlurOn(true);
    }

    const regex = /^\d*$/

    const submitHandlerEdit = (e) => {
        e.preventDefault();
        console.log(photoName)
        debugger
        if (regex.test(e.target[2].value)) {
            dispatch(menuPlacedUpdate(currentState, e.target[0].value, e.target[2].value, idNum, photoName.photo))
            setBlurEditOn(true);
        } 
    } 

    const onChangeHandler = (e) => {
        setBasePriceName(e.target.value)
        if (!regex.test(e.target.value)) {
            setError(false);
            setBlurSwitchOff(true);
        }
    }

    const onChangeTitleHanlder = (e) => {
        setDishName(e.target.value)
    }

    const selectorHandler = (e) => {
        setPhotoName({title: e.target.querySelector('h6').innerHTML, photo: e.target.getAttribute('value')});
        setIsSelected(true);
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

            <div className={clsx(styles.windowErrorBlur, error && styles.off)}>
                <div className={styles.errorBox}>
                    <h1>Must be a number</h1>
                        <button onClick={() => {
                            setError(true) 
                            setBlurSwitchOff(false)
                        }} className={clsx(styles.btnOk, "btn btn-warning")}>OK</button>
                </div>
            </div>
            
            <div className={clsx(styles.windowInfoBlur, infoBlurOff && styles.windowInfoBlurOff)}>
                <div className={styles.infoBox}>
                    <h1>Keep in mind that newly added menu items will "only" be available in newly created tables</h1>
                    <button onClick={() => setInfoBlurOff(true)} className="btn btn-warning">OK</button>
                </div>
            </div>

            <div onClick={blurHandler} className={clsx(styles.windowEditBlur, blurEditOn && styles.windowEditBlurOff, blurSwitchOff && styles.blurSwitchOff)}>
                <div className={styles.editInfoBox}>
                    <form onSubmit={submitHandlerEdit}>
                        <labal>Dish Name:</labal>
                        <input onChange={onChangeTitleHanlder} name="dishNameInput" className={clsx("form-control")} value={dishName}></input>
                        <label>Picture Select:</label>
                        <input onClick={() => setIsSelected(prev => !prev)} value={photoName.title} className={clsx("form-select", styles.selectt)}>
                        </input>
                        <div className={clsx(styles.selectList, isSelected && styles.selectListOff)}>
                            <ul className={styles.selectListUl} onClick={selectorHandler}>
                                <li value="fork.png" className={styles.selectItem}>
                                    <img name="selectPhoto" alt="menuPhoto" className={styles.thumnNail} src={`${process.env.PUBLIC_URL}/images/fork.png`}/>
                                    <h6>Fork</h6>
                                </li>
                                <li value="pizza.png" className={styles.selectItem}>
                                    <img alt="menuPhoto" className={styles.thumnNail} src={`${process.env.PUBLIC_URL}/images/pizza.png`}/>
                                    <h6>Pizza</h6>
                                </li>
                            </ul>
                        </div>
                        <label>Base price:</label>
                        <input maxLength="3" onChange={onChangeHandler} className={clsx("form-control", styles.priceInput)} value={basePriceName}></input>
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
                                <MenuElement items={item} blurOn={setBlurEditOn} dishName={setDishName} baseName={setBasePriceName} idNum={setIdNum} img={setPhotoName}/>
                            ))
                        )}
                    </ul>
                </div>
                <MenuAdd blurInfo={setInfoBlurOff} blur={setBlurOn}/>
            </Container>
           
            <Navigation/>
        </div>
    )
}

export default Menu