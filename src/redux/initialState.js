const initialState = {
    tables: [],
    Message: [
        {error: 'Table limit reached', id: 1,  notTriggered: true}, 
        {error: 'Please pick a table number from 1-6', id: 2,  notTriggered: true},
        {error: 'Table number already in use', id: 3,  notTriggered: true},
        {error: 'Must be a number', id: 4,  notTriggered: true},
        {error: 'Unknown error', id: 5,  notTriggered: true},
    ],
    fetched: false,
    menuOrderTemp: []
};


// menuOrder: [
//     {title: 'Fried rice', id: 1, photo: 'cooking.png', basePrice: 5, quantity: 0, totalAmount: 0, checkbox: false},
//     {title: 'Salad', id: 2, photo: 'salad.png', basePrice: 9, quantity: 0, totalAmount: 0, checkbox: false},
//     {title: 'Menu', id: 3, photo: 'fast-food.png', basePrice: 22, quantity: 0, totalAmount: 0, checkbox: false},
// ]

export default initialState
