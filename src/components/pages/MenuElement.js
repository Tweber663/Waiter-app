import styles from './MenuElement.module.scss'

const MenuElement = (passed) => {
    const {photo, title, basePrice, id} = passed.items;

    const settingsHandler = () => {
        passed.dishName(title);
        passed.blurOn(false);
        passed.baseName(basePrice);
        passed.idNum(id);
        passed.img({photo, title});
    }



    return (
        <li className={styles.itemMainBox}>
            <img onClick={settingsHandler} alt="settingImage" className={styles.settings} src={`${process.env.PUBLIC_URL}/images/setting.png`}/>
            <hp className={styles.price}>${basePrice}</hp>
            <div className={styles.mainBoxItems}>
                <img alt="foodImage" className={styles.imgFoodItem} src={`${process.env.PUBLIC_URL}/images/${photo}`}/>
                <li>{title}</li>
            </div>
        </li>
    )
}

export default MenuElement