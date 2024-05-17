import styles from './MenuSelect.module.scss';
import clsx from 'clsx';
import MenuItem from './MenuItem';
import { useSelector } from 'react-redux';
import { compileString } from 'sass';
import { menuOrderList } from '../../redux/tableRedux';

const MenuSelect = (passed) => {

    return (
             <div className={clsx(styles.orderMenu)}>
                {passed.selectedTable[0].menuOrder.map((order) => (
                    <MenuItem menuItems={order} selectedTable={passed.selectedTable[0]}/>
                ))}
            </div>
    )
}



export default MenuSelect 

