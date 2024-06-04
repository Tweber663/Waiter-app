import { useSelector } from "react-redux";
import { API_URL } from "../config";
import { tab } from "@testing-library/user-event/dist/tab";
import { combineReducers } from "redux";
import Orders from "../components/pages/Orders";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { Container } from "react-bootstrap";
//**actionTypes
const actionType1 =  (type) => `app/tables/${type}`;
const GETTING_INFO = actionType1('GETTING_INFO')

//**Action creatores
export const orderPlacedPost = (activeOrders, id) => {
   return () => {
    let options = ''
    activeOrders.forEach((table) => {
        options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                id, 
                order: 
                    table.menuOrder.map((menu) => {
                        return {
                            id: menu.tableNum,
                            title: menu.title,
                            quantity: menu.quantity, 
                            totalAmount: menu.totalAmount, 
                            basePrice: menu.basePrice, 
                            photo: menu.photo
                        }
                    })
            })
        }
    })
        fetch(`${API_URL}/placedOrders/`, options);
    }
} 

export const orderPlacedPut = (activeOrders, id) => {
     return () => {
      let options = ''
      activeOrders.forEach((table) => {
          options = {
              method: 'PUT', 
              headers: {
                  'Content-Type': 'application/json'
              }, 
              body: JSON.stringify({
                  id, 
                  order: 
                      table.menuOrder.map((menu) => {
                          return {
                              id: menu.tableNum,
                              title: menu.title,
                              quantity: menu.quantity, 
                              totalAmount: menu.totalAmount, 
                              basePrice: menu.basePrice, 
                              photo: menu.photo
                          }
                      })
              })
          }
      })
          fetch(`${API_URL}/placedOrders/${id}`, options);
      }
  } 

  export const orderPlacedPutReset = (deletedOrder, id) => {
    console.log(deletedOrder)
    debugger
    return () => {
        const options = {
            method: "PUT", 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(deletedOrder)
        }
        fetch(`${API_URL}/placedOrders/${id}`, options);
    }
  }



//Respo for fetching the info + passing the info to action creator
export const fetchingTables = () => {
    return(dispatch) => {  
        fetch(`${API_URL}/tables`)
        .then((raw) => raw.json())
        .then((tables) =>  {
            console.log('fetched successful:', tables)
            dispatch(gettingTables(tables));   
        })
        //We can add 'dispatch' above because it was passed as argu
    }
}
// 

export const fetchTablePost = (addedTable) => {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(addedTable),
        };

        fetch(`${API_URL}/tables`, options)
        .then(() => dispatch(fetchingTables()));
    }
}

export const deleteTable = (id) => {
    return (dispatch) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        };
        fetch(`${API_URL}/tables/${id}`, options)
        .then((raw) => raw.json)
        .then(() => dispatch((fetchingTables())))
    } 
}  

export const fetchingTablesPUT = (updatedTable) => {
    return (dispatch) => {
        debugger
        console.log(updatedTable)
        const options = {
            method: 'PUT', 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(updatedTable),
        };
        fetch(`${API_URL}/tables/${updatedTable.id}`, options)
        .then(() => dispatch(fetchingTables()));
    }
}

export const updateStore = (payload) => {
   return ({type: "UPDATE_STORE", payload})
}

export const tableErrMsgCheck = (state) => {
       let errMsg = true; 
       let errObj = [];
       if (state.tables.tables) {
            state.tables.Message.forEach((msg) => {
                if (msg.notTriggered === false) {
                    errMsg = false; 
                    errObj.push(msg);
                }   
        })
       }
        return {notTriggered: errMsg, error: errObj}; 
}

export const ifTableAlredyExists = (id, state) => {
    if (state.tables.fetched) {
        return state.tables.tables.find((table) => table.id == id)
    }
}
export const ifTableLimitReached = (state) => {
    if (state.tables.fetched) {
      return state.tables.tables.length > 6 ? true : false
    }
}
export const updateMenuItem = (payload) => {
    return ({type: "UPDATING_MENU_ITEM", payload,});
}


//**Selectors
export const gettingTables = (payload) => ({type: GETTING_INFO, payload});
export const deletingTable = (payload) => ({type: "DELETING_TABLE", payload});
export const selectedTable = ({id, state}) => state.tables.tables.filter((table) => id === table.id);   

export const tableErrMsg = (payload) => ({type: "ERROR_MESSAGE", payload});
export const tableErrMsgClear = (payload) => ({type: "ERROR_MESSAGE_CLEAR", payload});

export const menuOrderList = (payload) => payload.tables.tables
export const checkMenuOrderId = (state, id) => {
    const filtered = state.tables.menuOrderTemp.filter((order) => {
        if (order.tableId == id) {
            return order.menuOrder
        } 
    })
    return filtered;
}
export const addTableTemplate = (state, tableId) => {
    let filteredTable = ''
    let filteredMenu = ''
    if (tableId > 0) {
        filteredTable = state.tables.addTableTempOrder.map((table) => {
            filteredMenu = table.menuOrder.map((order) => {
                return {...order, tableNum: tableId}
            })
            return {...table, id: tableId, menuOrder: filteredMenu}
        })
    }
    return {...state.tables, addTableTempOrder: filteredTable}
}

export const searchFilter = (state, id) => {
    const regexNum = /\d/;
    const regexLett = /[a-zA-Z]/;
    if (id) {
        if (id.length <= 10 && !regexNum.test(id)) {
            return state.tables
        } else if (regexNum.test(id) === true && regexLett.test(id) === false && id.length <= 4) {
            return state.tables.filter((table) => table.id === id)
        } else if (regexNum.test(id) === true && regexLett.test(id) === false) {
            return state.filter((table) => table.id === id);
        } else if (id.charAt(5) === " ") {
            return state.tables.filter((table) => table.id === id.slice(6))
        } else {
            return state.tables.filter((table) => table.id === id.slice(5))
        }
    } else {
        return state.tables
    }
}
export const checkingforOrders = (state) => {
    const tables = state.tables.menuOrderTemp.map((table) => {
        return  {
          ...table, 
          menuOrder: table.menuOrder.filter((order) => order.quantity > 0)
        };
      });

      const activeOrders = tables.filter((order) => {
        if (order.menuOrder.length) {
            return order
        }
      })
      return activeOrders


}

//**Subreducers
const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case "UPDATE_STORE":
        return statePart.tables
        case "DELETING_TABLE":
         return {...statePart.tables.tables.filter((table) => table.id !== action.payload)}    
        case GETTING_INFO:
            if (action.payload.length > 0) {
                return {
                    ...statePart,
                    tables: action.payload,
                    Message: statePart.tables.Message,
                    fetched: true,
                    addTableTempOrder: statePart.tables.addTableTempOrder,
                    menuOrderTemp: action.payload.map((table, index) => ({
                    tableId: table.id, 
                    menuOrder: table.menuOrder,
                    }))
                  };
            }
            break;
        case 'ERROR_MESSAGE':
                return {
                    ...statePart.tables,
                    Message: statePart.tables.Message.map(msg =>
                        msg.id === action.payload.id? { ...msg, notTriggered: false } : msg
                    ),
                }
        case 'ERROR_MESSAGE_CLEAR':
                return {
                    ...statePart.tables,
                    Message: statePart.tables.Message.map(msg => 
                        msg.id !== action.payload.id? { ...msg, notTriggered: true } : msg
                    )
                } 
        case "UPDATING_MENU_ITEM": 
        let filteredTables = ''
        let filteredOrder = ''
        filteredTables = statePart.tables.menuOrderTemp.map((table) => {
            if (table.tableId == action.payload.tableNum) {
                filteredOrder = table.menuOrder.map((order) => {
                    if (order.title == action.payload.title) {
                        return {
                            basePrice: action.payload.basePrice,
                            checkbox: action.payload.checkbox,
                            id: action.payload.id,
                            photo: action.payload.photo,
                            quantity: action.payload.quantity,
                            tableNum: action.payload.tableNum,
                            title: action.payload.title,
                            totalAmount: action.payload.totalAmount,
                        }
                    } else {
                        return order
                    }
                })
            } else {
                return table
            }

            console.log({
                ...table,
                menuOrder: filteredOrder,
            })
            // debugger

            return {
                ...table,
                menuOrder: filteredOrder,
            }; 
        })
        return {...statePart.tables, menuOrderTemp: filteredTables}
            default:
        return statePart
    }
}


export default tablesReducer;