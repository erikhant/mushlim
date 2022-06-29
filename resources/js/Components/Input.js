import React, { useEffect, useRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import Button from './Button';

export default function Input({
    type = 'text',
    max,
    min,
    name,
    value,
    options = [],
    className = '',
    inputClasses = '', 
    required = false,
    isFocused = false,
    autoComplete,
    handleChange,
    handleKeyboard,
    togglePassword = false,
    placeholder = '',
    ...props
}) {

    const input = useRef();
    const [ showPassword, setShowPassword ] = useState(false);
    const style = {
        base: 'w-full border-secondary-light text-sm sm:text-base focus:border-primary-normal focus:ring focus:ring-primary-light focus:ring-opacity-50 rounded-md shadow-sm placeholder:text-neutral-400 placeholder:capitalize text-secondary-dark'
    }

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }

    }, []);

    useEffect(() => {
        if (type !== 'textarea' && togglePassword) {
            showPassword ? input.current.type = 'text' : input.current.type = 'password';
        }
    
    }, [showPassword])
    

    return (
        <div className={`flex flex-col items-start relative ` + className}>
            {
                type === 'textarea' ?
                <textarea
                    ref={input}
                    name={name}
                    value={value}
                    className={`${style.base} ${inputClasses}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={handleChange}
                    onKeyUp={handleKeyboard}
                    {...props}
                />
                :
                type === 'select' ?
                    <select
                    ref={input}
                    name={name}
                    value={value}
                    className={`${style.base} ${inputClasses}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={handleChange}
                    {...props}
                    >
                        {
                            options.map(opt => (
                                <option key={opt.value} className="max-h-32 py-1" value={opt.value}>{opt.name}</option>
                            ))
                        }
                    </select>
                :
                <input
                    ref={input}
                    type={type}
                    name={name}
                    min={min}
                    max={max}
                    value={value}
                    className={`${style.base} ${inputClasses}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={handleChange}
                    onKeyUp={handleKeyboard}
                    {...props}
                />
            }
           
         {
             type === 'password' && togglePassword &&
                <Button 
                    className="p-2 absolute right-0 top-0" 
                    onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword 
                        ? 
                        <EyeIcon className="h-6 w-6 text-secondary-dark" />
                        :
                        <EyeOffIcon className="h-6 w-6 text-secondary-dark" />
                    }
                </Button>
         }
        </div>
    );
}
