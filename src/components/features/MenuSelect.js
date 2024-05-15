import styles from './MenuSelect.module.scss';
import clsx from 'clsx';
import MenuItem from './MenuItem';
import { useSelector } from 'react-redux';

const MenuSelect = () => {

    const menuItems = useSelector(state => state.tables.menu);


    return (
             <div className={clsx(styles.orderMenu)}>
                {menuItems.map((menuItem, index) => (
                      <MenuItem key={menuItem.id} menuItem={menuItem}/>
                ))}
            </div>
    )
}



export default MenuSelect


