import React, { useState } from 'react'
import './Submit.css'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'


function Submit (){
    
    const [details,setDetails] = useState({
        firstname: '',
        lastname: '',
        email: '@gmail.com',
        contact: '+91',
        gender: '',
        subject: [],
        resume: null,
        linkedin_url: '',
        skill: '',
        about: 'Tell us your previous experience'})
    

    // used to handle the data entered in the form field for validation
    const changeHandler = (e) => {
        const {name,value,type,checked}  = e.target
        
        if (type === 'checkbox') {
            // For checkboxes, handle multiple selections
            const updatedSubjects = checked ? [...details.subject, value] : details.subject.filter(sub => sub !== value);
            setDetails((previousState) => ({
                ...previousState,
                subject: updatedSubjects
            }))
        }
       else if (type==="file") {
            setDetails((previousState)=>{
               return({
                    ...previousState,resume:e.target.files[0]
                })
        })
        
        }
        else{
            setDetails((previousState)=>{
                return({
                     ...previousState,[name]:value
                 })
        })
        
    }

}

    // Used to handle reset data button.
    function handleReset(){
        console.log("Data have been Reseted...!!!..!!!");
        toast.info("Data has been Deleted !!!!...!!!!")
    }

    const handleSubmit = async(e)=>{

        // used to prevent default action of the form
        e.preventDefault()

        // Details entered in the form are captured using FormData
        const formData = new FormData()
        formData.append("firstname",details.firstname)
        formData.append("lastname",details.lastname)
        formData.append("email",details.email)
        formData.append("contact",details.contact)
        formData.append("gender",details.gender)
        formData.append("subject",details.subject)
        formData.append("resume",details.resume)
        formData.append("linkedin_url",details.linkedin_url)
        formData.append("skill",details.skill)
        formData.append("about",details.about)

        // POST request using axios 
        const result = await axios.post('http://localhost:3001/submitform',formData,{headers:{'Content-Type':'multipart/form-data'}})
        console.log(result);
        if( result.data.status === "OK"){ 
            toast.success("Successfully Submitted !!!!..!!...")
        }
    }

    
    
    return (
        <div className='container'>
            <h3>Application Submit Form</h3>
            <form className='formsubmit' onSubmit={handleSubmit} action='/submitform'>
                <div className='details'>
                    <label>Firstname:<input type="text" name="firstname" onChange={changeHandler} /></label>
                    <label>Lastname:<input type="text" name="lastname" onChange={changeHandler}  /></label>
                    <label>Email:<input type="email" name="email" onChange={changeHandler} value={details.email} /></label>
                    <label>Contact:<input type="tel" name="contact" onChange={changeHandler} value={details.contact} /></label>
                </div>
                <div className='gender' >
                    <label>Gender:
                        <input type="radio" value="Male" name="gender" onChange={(e)=>setDetails({...details,gender:e.target.value})} /> Male
                        <input type="radio" value="Female" name="gender" onChange={(e)=>setDetails({...details,gender:e.target.value})} /> Female
                    </label>
                </div>
                <div className='subject'>
                    <label>Your Best Subject:
                        <input type="checkbox" name='subject' value="English" onChange={changeHandler} />English
                        <input type="checkbox" name='subject' value="Physics" onChange={changeHandler} />Physics
                        <input type="checkbox" name='subject' value="Maths" onChange={changeHandler} />Maths
                    </label>
            </div>
                <div className='resume'>
                    <label>Resume:<input type="file" name='resume' onChange={changeHandler} /></label>
                    <label>LinkedIn URL:<input type="url" name='linkedin_url' onChange={changeHandler} /></label>
                </div>
                <div className='ans'>
                    <label>Select Your Ans: 
                        <select name="skill" onChange={changeHandler}>
                            <option name="skill" value="Select">Select</option>
                            <option name="skill" value="HTML5">HTML5</option>
                            <option name="skill" value="CSS3">CSS3</option>
                            <option name="skill" value="JAVA script">JAVA script</option>
                            <option name="skill" value="React JS">react JS</option>
                            <option name="skill" value="Node JS">Node JS</option>
                            <option name="skill" value="Mongo DB">Mongo DB</option>
                            <option name="skill" value="MYSQL">MYSQL</option>
                        </select>
                    </label>
                </div>
                <div className='about'>
                    <label>About: <textarea name='about' cols="30" rows="10" onChange={changeHandler} value={details.about}></textarea></label>
                    <input type="reset" value="Reset" onClick={handleReset} />
                    <input type="submit" value="submit"  />
                    <ToastContainer />
                </div>
            </form>
           
        </div>
        
    )
}
export default Submit;