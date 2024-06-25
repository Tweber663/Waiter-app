import styles from './MenuAdd.module.scss'
const MenuAdd = (passed) => {

    return (
        <div>
            <button onClick={() => passed.blur(false)} className={styles.btn}><i class="fa-solid fa-plus"></i></button>
        </div>
    )
}

export default MenuAdd