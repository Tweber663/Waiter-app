const initialState = {
    tables: [],
    Message: [
        {error: 'Table limit reached', id: 1,  notTriggered: true}, 
        {error: 'Please pick a table number from 1-10', id: 2,  notTriggered: true},
        {error: 'Table number already in use', id: 3,  notTriggered: true},
        {error: 'Must be a number', id: 4,  notTriggered: true},
        {error: 'Unknown error', id: 5,  notTriggered: true},
    ],
    fetched: false,
    menuOrderTemp: [],
    addTableTempOrder: [ {
      id: '',
      orderPlaced: false,
      status: "Free",
      peopleAmount: "2",
      maxPeopleAmount: "4",
      timeStamp: "00:00",
      bill: "0",
      info: "Type your notes here:",
      menuOrder: [
        {
          title: "Fried rice",
          id: 1,
          tableNum: '',
          photo: "cooking.png",
          basePrice: 5,
          quantity: 0,
          totalAmount: 0,
          checkbox: false,
        },
        {
          title: "Salad",
          id: 2,
          tableNum: '',
          photo: "salad.png",
          basePrice: 9,
          quantity: 0,
          totalAmount: 0,
          checkbox: false
        },
        {
          title: "Menu deal",
          id: 3,
          tableNum: '',
          photo: "fast-food.png",
          basePrice: 22,
          quantity: 0,
          totalAmount: 0,
          checkbox: false
        },
        {
          title: "Biryani",
          id: 4,
          tableNum: '',
          photo: "biryani.png",
          basePrice: 5,
          quantity: 0,
          totalAmount: 0,
          checkbox: false,
        },
        {
          title: "Spaghetti",
          id: 5,
          tableNum: '',
          photo: "spaghetti.png",
          basePrice: 9,
          quantity: 0,
          totalAmount: 0,
          checkbox: false
        },
        {
          title: "Pizza",
          id: 6,
          tableNum: '',
          photo: "pizza.png",
          basePrice: 22,
          quantity: 0,
          totalAmount: 0,
          checkbox: false
        },
        
      ]
    }
  ]
};


export default initialState
