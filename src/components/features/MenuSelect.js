import styles from './MenuSelect.module.scss';
import clsx from 'clsx';
import MenuItem from './MenuItem';
import shortid from 'shortid';

const MenuSelect = (passed) => {
    return (
             <div className={clsx(styles.menuOrder)}>
                {passed.selectedTable[0].menuOrder.map((order) => (
                    <MenuItem id={shortid} menuItems={order} selectedTable={passed.selectedTable[0]}/>
                ))}
            </div>
    )
}



export default MenuSelect 


