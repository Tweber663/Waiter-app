import styles from './MenuElement.module.scss'

const MenuElement = (passed) => {
    const {photo, title, basePrice, id} = passed.items;

    const settingsHandler = () => {
        passed.dishName(title);
        passed.blurOn(false);
        passed.baseName(basePrice);
        passed.idNum(id);
    }



    return (
        <div className={styles.itemMainBox}>
            <img onClick={settingsHandler} alt="settingImage" className={styles.settings} src={`${process.env.PUBLIC_URL}/images/setting.png`}/>
            <div className={styles.mainBoxItems}>
                <img alt="foodImage" className={styles.imgFoodItem} src={`${process.env.PUBLIC_URL}/images/${photo}`}/>
                <li>{title}</li>
            </div>
        </div>
    )
}

export default MenuElement