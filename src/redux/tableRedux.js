import { API_URL } from "../config";
//**actionTypes
const actionType1 =  (type) => `app/tables/${type}`;
const GETTING_INFO = actionType1('GETTING_INFO')

const actionType2 =  (type) => `app/tables/${type}`;
const UPDATING_INFO = actionType2('UPDATING_INFO')

//**Action creatores
//Respo for fetching the info + passing the info to action creator
export const fetchingTables = () => {
    return(disptach) => {  
        fetch(`${API_URL}/tables`)
        .then((raw) => raw.json())
        .then((tables) =>  {
            disptach(gettingTables(tables));   
        })
        // passing info to action creaotr
        //We can add 'dispatch' above because it was passed as argu
    }
}
export const fetchingTablesPUT = (updatedTable) => {
    return (disptach) => {
        const options = {
            method: 'PUT', 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(updatedTable),
        };
        fetch(`${API_URL}/tables/${updatedTable.id}`, options)
        .then(() => disptach(updatingTables(updatedTable)));
    }
}

export const fetchTablePost = (addedTable) => {
    console.log(addedTable)
    return (disptach) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify(addedTable),
        };

        fetch(`${API_URL}/tables`, options)
        .then((raw) => raw.json())
        .then((e) => console.log(e))
    }
}

export const deleteTable = (id) => {
    console.log(id);
    return () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        };
        fetch(`${API_URL}/tables/${id}`, options)
    } 
}  

//**Selectors
export const gettingTables = (payload) => ({type: GETTING_INFO, payload});
export const updatingTables = (payload) => ({type: UPDATING_INFO, payload});
//Returns correct table based on url id
export const selectedTable = ({id, state}) => {
    return state.tables.tables.filter((table) => id === table.id);   
}

export const ifTableAlredyExists = (id, state) => state.tables.tables.find((table) => table.id == id);
export const ifTableLimitReached = (state) => {
    const tableLimit = state.tables.tables.length > 4 ? true : false
    return tableLimit
}
export const tableErrMsg = (payload) => {
return ({type: "ERROR_MESSAGE", payload})
} ;
export const tableErrMsgClear = (payload) => ({type: "ERROR_MESSAGE_CLEAR", payload});

export const tableErrMsgCheck = (state) => {
   let errMsg = true; 
   let errObj = [];
    state.tables.Message.forEach((msg) => {
        if (msg.notTriggered === false) {
            errMsg = false; 
            errObj.push(msg);
        } 
        
    })
       return {notTriggered: errMsg, error: errObj}; 
}
//**Subreducers
const tablesReducer = (statePart = [], action) => {
    switch (action.type) {
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
        case GETTING_INFO:
            return {...statePart, tables: action.payload, Message: statePart.tables.Message};
        case UPDATING_INFO:
            return statePart.forEach(table =>
                table.id === action.payload.id ? { ...table, ...action.payload } : table);
        default:
            return statePart
    }
}


export default tablesReducer;