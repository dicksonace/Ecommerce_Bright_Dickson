import React, { forwardRef, useState } from 'react'

const InputField = forwardRef(
    ({type,name,value,placeholder,onChange,required,isValid,validationMessage}, ref) => {
        const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
              <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`border-1 rounded-xl h-[50px] text-xl bg-white 
                shadow-xl outline-none text-center w-[100%] mx-auto max-md:w-[80%]
                max-sm:w-[90%]`}
               ref={ref}
               onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}
            required={required}
        
              />
              { 
                (!isValid && isFocused) && (
                    <p className={`${!isValid ? 'instructions' : 'hidden'}`}>{validationMessage}</p>)
              }
             
    </div>
  )
}
)
   InputField.displayName = 'InputField';
export default InputField
