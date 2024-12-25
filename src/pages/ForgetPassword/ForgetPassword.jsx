import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from 'yup';

export default function ForgetPassword() {
    const navigate = useNavigate()
    const [message, setmessage]= useState(null)
    async function sendDataToLogin(values){
        try{
          const options = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            method:"POST",
            data : values,
           };
           let {data} = await axios.request(options);
           setmessage(data.message)
           if(data.statusMsg==="success"){
           // localStorage.setItem("token",data.token);
           // setToken(data.token);
            setTimeout(()=>{navigate("/verifyCode");},1000);
           }
           
        } catch(error) {
          console.log(error);
          setInCorrectEmailorPasswordError(error.response.data.message)
        }
        
      }
 const validationSchema = object({
        email: string().required("email is required").email("email is invalid"),
    })
  const formik = useFormik({
    initialValues:{
        email:'',
    },
    validationSchema,
    onSubmit: sendDataToLogin
  })
  return (
    <>
      <section>
        <h2 className="text-3xl text-primary font-semibold my-4">
            <i className="fa-regular fa-circle-user me-3"></i>
            <span>Forget Password</span>
            
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            {message ? (<div className="text-primary font-semibold my-2">{message}</div>):''}
            <div>
                <input type="email" placeholder="email" name="email" className="form-control w-full" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            </div>
            {formik.errors.email && formik.touched.email && <p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>}

            <button type="submit" className="btn bg-primary hover:bg-primary text-white w-full">
                Submit
            </button>

        </form>
      </section>
    </>
  )
}
