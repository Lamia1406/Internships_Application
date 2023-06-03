const changeDateFormat =(d) =>{
    let date = new Date(d);
    if (
      date == new Date()
    ) {
      return "today";
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (
     yesterday == date
    ) {
      return "yesterday";
    }
    date = date.toDateString();
  
  
    
  
    return `${date}`;
}


export default changeDateFormat