import styles from './MenuAdd.module.scss'
const MenuAdd = (passed) => {

    return (
        <div>
            <button onClick={() => passed.blurInfo(false)} className={styles.btn2}><i class="fa-solid fa-info"></i></button>
            <button onClick={() => passed.blur(false)} className={styles.btn1}><i class="fa-solid fa-plus"></i></button>
        </div>
    )
}

export default MenuAdd