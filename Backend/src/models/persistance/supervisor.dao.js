// import supervisors from "../data/supervisor.data.js";
// function get(supervisorsId){
//     return supervisors.find((supervisor)=>supervisor.id === supervisorId  
//        );
//   }
//   function getAll () {
//      return supervisors;
//   } 
//   function update(supervisorId, newDetails) {
//     let currentSupervisor = null;
//     let supervisorIndex;
  
//     supervisors.map((supervisor, index) => {
//       if (supervisor.id === supervisorId) {
//         currentSupervisor = supervisor;
//         supervisorIndex = index;
//       }
//     });
  
//     if (!currentSupervisor) {
//       return false;
//     }
  
//     const updatedSupervisor = {
//       ...currentSupervisor,
//       ...newDetails,
//     };
  
//     supervisors.splice(supervisorIndex, 1, updatedSupervisor);
//     return updatedSupervisor; // Add this line
//   }
// function insert(details){
//     const newSupervisor = {id : supervisors.length + 1,...details};
//     supervisors.push(newSupervisor);
//     return newSupervisor;
//  }
 

//  function remove(supervisorId){
//     const supervisorsCopy = [...supervisors];
//     const deleteSupervisor = (supervisor,index)=>{
//         if(supervisor.id ===supervisorId){
//             supervisors.splice(index,1)
//         }
//     }
//     return  supervisorsCopy.find(deleteSupervisor)
//  }

//  export  default {
//     insert , get, remove , update,
//     getAll
//  }