import createUniClass from "../../Styles/partials/Database/createDB.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "../input";
import Button from "../button";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextArea from "../textarea";
function ModifyOneDataRecord(props) {
    console.log(props)
    const getAllFaculties = "http://localhost:4000/university/allFaculties"
    const getAllUniversities = "http://localhost:4000/university/allUniversities"
    const getAllCompanies = "http://localhost:4000/post/allCompanies"
    const [company, setCompany] = useState("")
    const [companies, setCompanies] = useState([])
    const [faculties, setFaculties] = useState([])
    const [universities, setUniversities] = useState([])
    const [modifyURL, setModifyURL] = useState("")
    const [faculty, setFaculty] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file)
    }
    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }
    const fetchFaculties = async () => {
        const res = await axios.get(`${getAllFaculties}`);
        if (res.data) {
            
            setFaculties(res.data.faculties)
        }
    }
    const fetchUniversities = async () => {
        const res = await axios.get(`${getAllUniversities}`);
        if (res.data) {
            setUniversities(res.data.universities)
        }
    }
    const fetchCompanies = async () => {
        const res = await axios.get(`${getAllCompanies}`);
        if (res.data) {
            console.log(res.data)
            setCompanies(res.data.companies)
        }
    }
    useEffect(() => {
        if (props.table == "Universities") {
            setModifyURL(`http://localhost:4000/university/modifyUniversity/${props.modifyId}`)
        }
        if (props.table == "Faculties") {
            setModifyURL(`http://localhost:4000/university/modifyFaculty/${props.modifyId}`)
            fetchUniversities()
        }
        if (props.table == "Departments") {
            setModifyURL(`http://localhost:4000/university/modifyDepartment/${props.modifyId}`)
            fetchFaculties()
        }
        if (props.table == "Companies") {
            setModifyURL(`http://localhost:4000/post/modifyCompany/${props.modifyId}`)
        }
        if (props.table == "Posts") {
            setModifyURL(`http://localhost:4000/post/modifyPost/${props.postId}`)
            fetchCompanies()

        }



    }, [modifyURL]);
    console.log(universities)
    const [full_name, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [university, setUniversity] = useState("")
    const [department, setDepartment] = useState("")
    const [image, setImage] = useState("");
    const [submitSuccessful, setSubmitSuccessful] = useState(false)
    const modifyForm = async (event) => {  
        console.log("hi")      
        event.preventDefault();
        const payload = {
            ...(props.table != "Posts" && full_name != "" && { full_name }),
            ...((props.table === "Universities" || props.table === "Faculties" || props.table === "Companies") &&  address != "" && { address }),
            ...(props.table === "Faculties" && university != "" && { university }),
            ...(props.table === "Departments" && { faculty }),
            ...(props.table === "Posts" && title != "" && { title }),
            ...(props.table === "Posts" && description != "" && { description }),
            ...(props.table === "Posts" && company != "" && { company }),


        };
        try {
            const res = await axios.put(`${modifyURL}`, payload);
            if (res.data.status == true) {
                toast.success("modified Successfully")
                setSubmitSuccessful(!submitSuccessful)
                window.location.reload()

            }
            else {
                toast.warn("Failed Operation")
            }
        }
        catch (err) {
            toast.error(err.response.data.error)
            console.log(err.response.data.error)
        }
    }
    return (
        <>
            <div className={`modal fade `} tabIndex="-1" id={props.id} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-dialog-centered modal-lg `}>
                    <div className={`modal-content ${createUniClass.main}`}>
                        <button type="button" className={`btn-close ${createUniClass.close}`} data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className={createUniClass.body}>
                            <div className={createUniClass.information}>
                                {
                                    props.table == "Faculties" && (
                                        <div className={`row ${createUniClass.profilDetails}`}>
                                            <div className={`${createUniClass.title} col-lg-3`}>University</div>
                                            <div className={`${createUniClass.description} col-lg-9`}>
                                                <select className={createUniClass.select} onChange={(e) => setUniversity(e.target.value)} value={university} defaultValue='university'>
                                                    <option disabled value="" > Select University</option>
                                                    {
                                                        universities && universities.map((u) => {
                                                            return <option key={u._id} value={u._id}>
                                                                {u.full_name}
                                                            </option>
                                                        }

                                                        )
                                                    }




                                                </select>

                                            </div>
                                        </div>
                                    )
                                }

                              
                                {
                                    props.table == "Departments" && (
                                        <div className={`row ${createUniClass.profilDetails}`}>
                                            <div className={`${createUniClass.title} col-lg-3`}>Faculty</div>
                                            <div className={`${createUniClass.description} col-lg-9`}>
                                                <select className={createUniClass.select} onChange={(e) => setFaculty(e.target.value)} value={faculty} defaultValue='faculty'>
                                                    <option disabled value="" > Select Faculty</option>
                                                    {
                                                        faculties.map((u) => {
                                                            return <option key={u._id} value={u._id}>
                                                                {u.full_name}
                                                            </option>
                                                        }

                                                        )
                                                    }




                                                </select>

                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    props.table == "Posts" && (
                                        <div className={`row ${createUniClass.profilDetails}`}>
                                            <div className={`${createUniClass.title} col-lg-3`}>Faculty</div>
                                            <div className={`${createUniClass.description} col-lg-9`}>
                                                <select className={createUniClass.select} onChange={(e) => setCompany(e.target.value)} value={faculty} defaultValue='faculty'>
                                                    <option disabled value="" > Select Company</option>
                                                    {
                                                        companies.map((u) => {
                                                            return <option key={u._id} value={u._id}>
                                                                {u.full_name}
                                                            </option>
                                                        }

                                                        )
                                                    }




                                                </select>

                                            </div>
                                        </div>
                                    )
                                }
                                <div className={`row ${createUniClass.profilDetails}`}>
                                    <div className={`${createUniClass.title} col-lg-3`}>{
                                        props.table === "Universities" ? "University Name"
                                            :
                                            props.table === "Faculties" ? "Faculty Name"
                                                :
                                                props.table === "Departments" ? "Department Name"
                                                    :
                                                    props.table === "Companies" ? "Company Name"
                                                        : ""
                                    }</div>
                                    {
                                        props.table != "Posts" && (
                                            <div className={`${createUniClass.description} col-lg-9`}>
                                                <Input placeholder="fill this input" type="text" onChange={(e) => setFullName(e.target.value)} value={full_name} />
                                            </div>
                                        )
                                    }
                                </div>

                                {
                                    (props.table == "Universities" || props.table == "Faculties" || props.table == "Companies") && (
                                        <div className={`row ${createUniClass.profilDetails} `}>
                                            <div className={`${createUniClass.title} col-lg-3`}>Address</div>
                                            <div className={`${createUniClass.description} col-lg-9`}>
                                                <Input placeholder="fill this input" text="text" onChange={(e) => setAddress(e.target.value)} value={address} />


                                            </div>
                                        </div>
                                    )
                                }




                                {
                                    props.table == "Posts" && (
                                        <>
                                            <div className={`row ${createUniClass.profilDetails}`}>
                                                <div className={`${createUniClass.title} col-lg-3`}>Title</div>
                                                <div className={`${createUniClass.description} col-lg-9`}>
                                                    <Input placeholder="fill this input" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                                                </div>
                                            </div>
                                            <div className={`row ${createUniClass.profilDetails}`}>
                                                <div className={`${createUniClass.title} col-lg-3`}>Description</div>
                                                <div className={`${createUniClass.description} col-lg-9`}>
                                                    <TextArea placeholder="fill this input" text="text" maxLength="500" onChange={(e) => setDescription(e.target.value)} value={description} />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }



                            </div>
                            <div className={createUniClass.inputDiv} >
                                <div className={createUniClass.navigationBtn} >
                                <Button content="Validate" color="dark" onClick={modifyForm} />

                                </div>
                                <div className={createUniClass.navigationBtn}>
                                    <Button content="Cancel" color="white" dataBsDismiss="modal" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>

    )
}

export default ModifyOneDataRecord