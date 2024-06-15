import styles from './MenuElement.module.scss'

const MenuElement = (passed) => {
    const {photo, title} = passed.items
    return (
        <div className={styles.itemMainBox}>
            <div className={styles.mainBoxItems}>
                <img alt="foodImage" className={styles.imgFoodItem} src={`${process.env.PUBLIC_URL}/images/${photo}`}/>
                <li>{title}</li>
            </div>
        </div>
    )
}

export default MenuElement