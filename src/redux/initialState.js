const initialState = {
    tables: [],
    Message: [
        {error: 'Table limit reached', id: 1,  notTriggered: true}, 
        {error: 'Please pick a table number from 1-6', id: 2,  notTriggered: true},
        {error: 'Table number already in use', id: 3,  notTriggered: true},
        {error: 'Must be a number', id: 4,  notTriggered: true},
    ],
    fetched: false
};

export default initialState
