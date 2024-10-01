import React, { useEffect, useRef, useState } from 'react'
import { Form, Link } from 'react-router-dom'
import EcommerceLogo from "/Img/EcommerceLogo.svg"
import GoogleLogo from "/Img/GoogleLogo.svg"
import axios from 'axios'

const Authentication = ({pageType, buttonText, alternative, googleImgText, sign, Up, confirmPwd,linkTo}) => {
  //States
  const [email,setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus,setEmailFocus] = useState(false)

  const [pwd,setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus,setPwdFocus] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState("")
  const [validConfPwdFocus, setValidConfPwdFocus] = useState(false)

  const [matchPwd,setMatchPwd] = useState(false)

  const [errMessage, setErrMessage] = useState("")
  const [success,setSuccess] = useState("")


  const [isValidating, setIsValidating] = useState(false)

  //UseRefs
  const inputRef = useRef()
  const errRef = useRef()

  //useEffects
  useEffect(() => {
    inputRef.current.focus()
  },[])

  //Email useEffect
  useEffect(()=> {
    const Evalue = email.replace(/\s+/g, '').trim()
    const Eresults = emailRegex.test(Evalue)
    setValidEmail(Eresults)
  },[email])


  //Pwd and ConfirmPwd useEffect
  useEffect(()=> {
    setIsValidating(true)
    const Pvalue = pwd.replace(/\s+/g, '').trim()
    const PwdResults = passwordRegex.test(Pvalue)
      setValidPwd(PwdResults)
    const CPasswordvalue = confirmPassword.replace(/\s+/g, '').trim()
    const CPassword = passwordRegex.test(CPasswordvalue)
    const match = Pvalue === CPasswordvalue
    setMatchPwd(match)
    setIsValidating(false)
  },[pwd, confirmPassword])


  useEffect(() => { 
    setErrMessage("")
  },[email, pwd, confirmPassword])

  //username and password Regex for validation
   const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@gmail\.com$/
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/

  const handleOnChangeEml = (e) => {
    setEmail(e.target.value)
  }

  const handleOnChangePwd = (e) => {
    setPwd(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }
 

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    if (!validEmail || !validPwd || (confirmPassword && !matchPwd)) {
      setErrMessage("Form is invalid");
      setSuccess(false);
      return;
  } else {
      setSuccess(true);
  }
  
  // Integration With APi
  // try {
  //   const response = await axios.post('posturl', {
  //     useremail: email,
  //     password: pwd,
  //   }, { withCredentials: true });
  //   if (response.status === 200) {
  //  setSuccess(true)
  // setEmail("")
  // setPwd("")
  // setConfirmPassword("")
  //   } else {
  //     setErrMessage("Login failed");
  //     setSuccess(false);
  //   }
  // } catch (error) {
  //   setErrMessage("An error occurred. Please try again.");
  //   setSuccess(false);
  // }
  } 
    
  return ( 
    <>   
    {
      success ? (<>
      <h1 className='text-3xl text-center text-green-400'>Success !!</h1>
      </>) : 
    <div className='flex gap-[5%] m-[2%] flex-wrap  max-md:flex-col'>
        <div className='grow basis-2/4'>
     <img src={EcommerceLogo} alt="Ecommerce Logo" width="620" height="750" className='max-md:w-[200px] max-md:mx-auto'/> 
        </div>
        <div className='grow basis-2/5 flex flex-col justify-start items-center'>
            <div>  
            <p className={errMessage ? "errorStyle" : "hidden"} ref={errRef}>{errMessage}</p>
            <h2 className='text-[50px] mb-[20px] font-light max-md:text-[30px] max-md:my-8 max-md:text-center'>{pageType}</h2>
            <Form className='flex flex-col gap-[30px] w-full max-md:w-screen max-sm:w-screen' onSubmit={handleSubmit}>

                <input type="email" className='border-1 rounded-xl h-[45px] text-xl bg-white shadow-xl outline-none text-center w-[90%] mx-auto max-md:w-[80%] max-sm:w-[90%]' placeholder='Enter your email' required ref={inputRef} onChange={handleOnChangeEml}
                onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}/>
                  <p className={`${emailFocus && email && !validEmail ? "instructions" : "error"}`}>
                  Enter a valid Gmail address.
                  </p>

                <input type="text" className='border-1 rounded-xl h-[45px] text-xl bg-white shadow-xl outline-none text-center w-[90%] mx-auto max-md:w-[80%]
                max-sm:w-[90%]' placeholder='Enter your password' required onChange={handleOnChangePwd} onFocus={()=>setPwdFocus(true)} onBlur={()=>setPwdFocus(false)}/>
                  <p className={`${pwdFocus && !validPwd ? "instructions" : "error"}`}>
                  Password should have letters, numbers, and symbols (!@#$%).
                  </p>

               { confirmPwd && <> 
               <input type="text" className='border-1 rounded-xl h-[45px] text-xl bg-white shadow-xl outline-none text-center w-[90%] mx-auto max-md:w-[80%]
                max-sm:w-[90%]' placeholder='Confirm your password' required onChange={handleConfirmPassword} onFocus={()=>setValidConfPwdFocus(true)} onBlur={()=>setValidConfPwdFocus(false)}/>
                <p className={`${validConfPwdFocus && !matchPwd ? "instructions" : "error"}`}>
                  Must match the first password
                  </p>
                  </>
                }

          
              <button className={`bg-[#F0A43A] w-[40%] mx-auto
            py-2 text-xl text-white rounded-md ${!validEmail || !validPwd || (confirmPwd &&  !matchPwd) || isValidating ? "bg-slate-300" : "bg-[#F0A43A]"}`} disabled={!validEmail || !validPwd ||(confirmPwd &&  !matchPwd) || isValidating}>{buttonText}</button> 

            </Form>
            </div>
            <div className='mt-6'>
            <p className='text-lg text-center'>{alternative}</p>
            <div className='flex gap-4 justify-center items-center bg-white m-5 px-2  rounded-xl'>  
             <img src={GoogleLogo} alt="Google Logo" className='w-[50px] h-[50px] bg-white max-md:w-[40px]'/> 
            <p className='bg-white'>{googleImgText}</p>
            </div>
            <p>{sign} {" "} <Link to={linkTo}><span className='text-[#F0A43A]'>{Up}</span></Link></p>
            </div>
    </div>
 </div>
  }
 </>
  )
}


export default Authentication
