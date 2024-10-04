import React from 'react'
import Authentication from '../Components/Authentication'


const SignIn = () => {
  return (
    <div>
      <Authentication
      pageType="Login To Your Account"
      buttonText="Sign In"
      alternative="or Sign in With"
      googleImgText="Sign In With Google"
      sign="Do not have an account ? "
      confirmPwd={false}
      Up="Sign Up"
      linkTo={"/signup"}
      />
    </div>
  )
}

export default SignIn



