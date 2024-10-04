import React, { useEffect, useRef, useState } from 'react'
import { Form, Link } from 'react-router-dom'
import EcommerceLogo from "/Img/EcommerceLogo.svg"
import GoogleLogo from "/Img/GoogleLogo.svg"
import axios from 'axios'
import InputField from './InputField'

const Authentication = ({pageType, buttonText, alternative, googleImgText, sign, Up, confirmPwd,linkTo}) => {

  //States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  //Validation
  const [validations,setValidations] = useState({
    validEmail: false,
    validPassword: false,
    matchPassword: false,
  })

  const [errMessage, setErrMessage] = useState("")
  const [success,setSuccess] = useState("")
  const [isValidating, setIsValidating] = useState(false)

  //Disabling Button
  const isFormInvalid = !validations.validEmail || !validations.validPassword || (confirmPwd && !validations.matchPassword);

  //UseRef
  const inputRef = useRef()


  //useEffects
  useEffect(() => {
    if(inputRef.current)
    inputRef.current.focus()
  },[])

  //Email and Password Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@gmail\.com$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/

  useEffect(() => {
    const { email, password, confirmPassword } = formData;
    setValidations({
      validEmail: emailRegex.test(email.trim()),
      validPassword: passwordRegex.test(password.trim()),
      matchPassword: confirmPwd ? password === confirmPassword : true
    });
  }, [formData]);


  useEffect(() => {
    setErrMessage('');
  }, [formData]);

  
  const handleOnChange = (e) => {
    const {name,value} = e.target
    setFormData((oldvalue)=> ({
      ...oldvalue,
      [name]:value 
    }))
  }
 

  const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  const { validEmail, validPassword, matchPassword} = validations;
  if (!validEmail) {
    setErrMessage('Please enter a valid Gmail address');
  } else if (!validPassword) {
    setErrMessage('Password must be at least 8 characters long with special characters');
  } else if (confirmPwd && !matchPassword) {
    setErrMessage('Passwords do not match');
  }else{
    setIsValidating(true)
    
  }
 await wait(5000)
//  Api integration
    try {
      const response = await axios.post('posturl', {
        useremail: formData.email,
        password: formData.password
      }, { withCredentials: true });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ email: '', password: '', confirmPassword: '' });
        setValidations({
          validEmail: false,
          validPassword: false,
          matchPassword: false,
        });
      } else {
        setErrMessage('Login failed');
        setSuccess(false)
      }
    } catch (error) {
        if (!error.response) {
          setErrMessage('No response from server');
        } else if (error.response.status === 400) {
          setErrMessage('Bad request - Invalid credentials');
        } else {
          setErrMessage('An error occurred. Please try again.');
        }
      }finally{
        setIsValidating(false);
      }
      
    }

  return ( 
    <>   
    {
      success ? (<>
      <h1 className='text-3xl text-center text-green-400'>Success !!</h1>
      </>) :  (
        <>
    <div className='flex max-lg:flex-col gap-[10%] flex-wrap m-5 justify-center items-center '>
        <div className='w-[50%] max-lg:w-[70%]'>
     <img src={EcommerceLogo} alt="Ecommerce Logo" className='w-[90%] h-full'/> 
        </div>
        <div className='w-[40%] max-lg:mt-[5%] flex  flex-col justify-center items-center mx-atuo max-lg:w-[100%]'>
          
            <p className={errMessage ? "errorStyle" : "hidden"} >{errMessage}</p>
            <h2 className='text-[50px]  font-light max-md:text-[3rem] max-md:text-center text-center'>{pageType}</h2>
            <div className='w-[100%] h-full'> 
            <Form className='flex flex-col gap-[45px] w-[70%] max-md:w-[100%]
             max-md:mx-auto sm:mt-2 mx-auto justify-center
              ' onSubmit={handleSubmit}>

                  <InputField 
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                ref={inputRef}
                isValid={validations.validEmail}
                validationMessage="Please enter a valid Gmail address"
                required
                  />
                
                <InputField
                type='text'
                name='password'
                value={formData.password}
                placeholder='Enter your password'
                onChange={handleOnChange}
                isValid={validations.validPassword}
                validationMessage='Password should have letters, numbers, and symbols (!@#$%).'
                required
              />

               {
                confirmPwd && 
                  <InputField 
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  placeholder='Confirm your password'
                  onChange={handleOnChange}
                  isValid={validations.matchPassword}
                  validationMessage='Must match the first password.'
                  required
                  />
               }

              <button className={`bg-[#F0A43A] w-[60%] mx-auto inline-flex justify-center gap-3
            py-2 text-xl text-white rounded-md ${isValidating ||  isFormInvalid ? "bg-slate-300 cursor-not-allowed" : 'bg-[#F0A43A]'}`} 
              disabled={isFormInvalid || isValidating}>
                {isValidating ? (
                  <>
                    <span className='spinner'> </span>
                    Submitting...
                   
                  </>
                ) : (
                  buttonText
                )}
                </button> 

            </Form>

            <div className='-mt-15 sm:mt-5 max-md:mt-[5px]'>
            <p className='text-lg text-center my-5'>{alternative}</p>
            <div className='flex gap-10 justify-center items-center bg-white px-2 shadow-lg  w-[60%]  mx-auto rounded-xl cursor-pointer'>  
             <img src={GoogleLogo} alt="Google Logo" className='w-[20%] h-auto bg-white max-md:w-[20%]'/> 
            <p className='bg-white text-lg'>{googleImgText}</p>
            </div>
            <p className='text-center mt-5'>{sign} {" "} <Link to={linkTo}><span className='text-[#F0A43A]'>{Up}</span></Link></p>
            </div>
            </div>
    </div>
 </div>
 </>
  )
  }
 </>
            
  )
} 
export default Authentication
