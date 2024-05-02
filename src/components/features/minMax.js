const minMax = (e) => {
    console.log(e.target.value)
    if (e.target.name === "peopleAmount") {
      if(e.target.value <= 10) {
        return e.target.value
      } else {
        return 1.5
      }

    } else {
        return console.log(false)
    }
}


export default minMax