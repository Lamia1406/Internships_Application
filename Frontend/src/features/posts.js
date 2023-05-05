// {
//     type : "ADD_POST",
//     payloads: {
//         title : "Graphic Design Internship",
//         company : "Google",
//         published_at : "12/12/2020",
//         description: "We are seeking a motivated software engineering intern to work on the development of our cutting-edge software products. The ideal candidate will have a strong foundation in software engineering principles and experience with one or more programming languages such as Python, Java, or C++. You will work closely with our team of experienced software engineers to develop new features, fix bugs, and ensure the high quality of our software products."
//     }
// }

const { combineReducers } = require("@reduxjs/toolkit")

function addPost(post){
    return {
        type : "ADD_POST",
        payload  : post
    }
}


function apps(state,action){
    switch (action.type)
    {
        case 'ADD_POST':
            return [...state, action.post]
        default:
            return state
    }
}
const internshipApp = combineReducers({
    addPost,
    addStudent,
    addSupervisor,
    addResponsible
})