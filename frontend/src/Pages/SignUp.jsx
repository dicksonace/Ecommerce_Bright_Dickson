import React from 'react'
import Authentication from '../Components/Authentication'

const SignOut = () => {
  return (
    <div>
        <Authentication
      pageType="Create An Account"
      buttonText="Sign Up"
      alternative="or Sign Up With"
      googleImgText="Sign Up With Google"
      sign="Already have an account ? "
      Up="Sign In"
      confirmPwd={true}
      linkTo={"/"}
      />
    </div>
  )
}

export default SignOut
