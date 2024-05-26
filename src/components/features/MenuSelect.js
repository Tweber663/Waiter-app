import styles from './MenuSelect.module.scss';
import clsx from 'clsx';
import MenuItem from './MenuItem';
import { useSelector } from 'react-redux';
import { compileString } from 'sass';
import { menuOrderList } from '../../redux/tableRedux';
import shortid from 'shortid';

const MenuSelect = (passed) => {
    return (
             <div className={clsx(styles.orderMenu)}>
                {passed.selectedTable[0].orderMenu.map((order) => (
                    <MenuItem id={shortid} menuItems={order} selectedTable={passed.selectedTable[0]}/>
                ))}
            </div>
    )
}



export default MenuSelect 


