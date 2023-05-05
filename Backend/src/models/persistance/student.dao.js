/*import students from "../data/students.data.js";
 

  function update(studentId, newDetails) {
    let currentStudent = null;
    let studentIndex;
  
    students.map((student, index) => {
      if (student.id === studentId) {
        currentStudent = student;
        studentIndex = index;
      }
    });
  
    if (!currentStudent) {
      return false;
    }
  
    const updatedStudent = {
      ...currentStudent,
      ...newDetails,
    };
  
    students.splice(studentIndex, 1, updatedStudent);
    return updatedStudent; // Add this line
  }
function insert(details){
    const newStudent = {id : students.length + 1,...details};
    students.push(newStudent);
    return newStudent;
 }
 

 function remove(studentId){
    const studentsCopy = [...students];
    const deleteStudent = (student,index)=>{
        if(student.id ===studentId){
            students.splice(index,1)
        }
    }
    return  studentsCopy.find(deleteStudent)
 }

 export  default {
    insert , get, remove , update,
    getAll
 }
 */