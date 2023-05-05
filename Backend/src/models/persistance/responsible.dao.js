// import responsibles from "../data/responsible.data.js";
// import users from "../data/users.data.js";



//   function update(responsibleId, newDetails) {
//     let currentResponsible = null;
//     let responsibleIndex;
  
//     responsibles.map((responsible, index) => {
//       if (responsible.id === responsibleId) {
//         currentResponsible = responsible;
//         responsibleIndex = index;
//       }
//     });
  
//     if (!currentResponsible) {
//       return false;
//     }
  
//     const updatedResponsible = {
//       ...currentResponsible,
//       ...newDetails,
//     };
  
//     responsibles.splice(responsibleIndex, 1, updatedResponsible);
//     return updatedResponsible; // Add this line
//   }
// function insert(details){
//     const newResponsible = {id : responsibles.length + 1,...details};
//     responsibles.push(newResponsible);
//     return newResponsible;
//  }
 

//  function remove(responsibleId){
//     const responsiblesCopy = [...responsibles];
//     const deleteResponsible = (responsible,index)=>{
//         if(responsible.id ===responsibleId){
//             responsibles.splice(index,1)
//         }
//     }
//     return  responsiblesCopy.find(deleteResponsible)
//  }

//  export  default {
//     insert , get, remove , update,
//     getAll
//  }