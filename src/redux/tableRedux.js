import { useSelector } from "react-redux";
import { API_URL } from "../config";
//**actionTypes
const actionType1 =  (type) => `app/tables/${type}`;
const GETTING_INFO = actionType1('GETTING_INFO')

//**Action creatores
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
       debugger
       console.log(state)
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


//**Selectors
export const gettingTables = (payload) => ({type: GETTING_INFO, payload});
export const deletingTable = (payload) => ({type: "DELETING_TABLE", payload});
export const selectedTable = ({id, state}) => state.tables.tables.filter((table) => id === table.id);   

export const tableErrMsg = (payload) => ({type: "ERROR_MESSAGE", payload});
export const tableErrMsgClear = (payload) => ({type: "ERROR_MESSAGE_CLEAR", payload});



//**Subreducers
const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
        case "UPDATE_STORE":
        return statePart.tables
        case "DELETING_TABLE":
         return {...statePart.tables.tables.filter((table) => table.id !== action.payload)}    
        case GETTING_INFO:
            if (action.payload.length > 0) {
                return {...statePart, tables: action.payload, Message: statePart.tables.Message, fetched: true};
            }
            break;
        case 'ERROR_MESSAGE':
                return {
                    ...statePart,
                    tables: statePart.tables.tables,
                    Message: statePart.tables.Message.map(msg =>
                        msg.id === action.payload.id? { ...msg, notTriggered: false } : msg
                    ),
                }
        case 'ERROR_MESSAGE_CLEAR':
                return {
                    ...statePart,
                    tables: statePart.tables.tables,
                    Message: statePart.tables.Message.map(msg => 
                        msg.id !== action.payload.id? { ...msg, notTriggered: true } : msg
                    )
                } 
            default:
        return statePart
    }
}


export default tablesReducer;