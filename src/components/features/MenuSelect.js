import styles from './MenuSelect.module.scss';
import clsx from 'clsx';
import MenuItem from './MenuItem';

const MenuSelect = (passed) => {
    return (
             <div className={clsx(styles.menuOrder)}>
                {passed.selectedTable[0].menuOrder.map((order) => (
                    <MenuItem key={order.id} menuItems={order} selectedTable={passed.selectedTable[0]}/>
                ))}
            </div>
    )
}



export default MenuSelect 


