import { Form } from "react-bootstrap";
import styles from './TableSearch.module.scss';
import clsx from "clsx";
import { useState } from "react";

const TableSearch = (passed) => {

    const [isVisible, setIsVisible] = useState(false);

    const searchHandler = (e) => {
        e.preventDefault();
        passed.setSearchId(e.target.value);
    }
    
    const clickHandler = (e) => {
        e.preventDefault();
        setIsVisible(!isVisible); 
    }

    return (
        <div className={styles.mainBox}>
            <form>
                <h1 className={styles.pageTitle}>All tables</h1>
                <img onClick={clickHandler} alt="search" className={clsx(styles.glass, isVisible && styles.hidden)} src={`${process.env.PUBLIC_URL}/images/glass.png`} />
                <input onChange={searchHandler}
                    type="text"
                    className={clsx("form-control", styles.searchInput, isVisible && styles.visible)}
                    placeholder="Search..."
                    maxLength="10"
                />
            </form>
        </div>
    );
}

export default TableSearch;