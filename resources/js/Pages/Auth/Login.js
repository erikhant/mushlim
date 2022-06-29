import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { isEmpty } from 'lodash';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Head title={"Log in"} /> 

            <h1 className="text-2xl sm:text-4xl text-secondary-dark font-bold mb-10">Log in</h1>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="w-full">
                <div>
                    <Input
                        name="email"
                        value={data.email}
                        className="mt-1 w-full"
                        autoComplete="email"
                        isFocused={true}
                        placeholder="Email"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="password"
                        className="mt-1 w-full"
                        autoComplete="current-password"
                        togglePassword={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                        <span className="ml-2 text-xs sm:text-sm text-gray-600">Biarkan saya tetap masuk</span>
                    </label>
                    
                    {canResetPassword && (
                        <p className="text-secondary-normal text-xs sm:text-sm">
                            <Link href={route('password.request')}>
                                Lupa password
                            </Link>
                        </p>
                    )}
                </div>

                <Button 
                    type="submit" 
                    variant="solid"
                    processing={processing || isEmpty(data.email) || isEmpty(data.password)} 
                    className="my-5"
                >
                    Log in
                </Button>            
                
                <p className="text-xs sm:text-sm text-secondary-dark">
                    Belum punya akun?
                    <span className="font-semibold text-primary-normal">
                        <Link href={route('sign-up')}>
                            {' '}Daftar
                        </Link>
                    </span>
                </p>
                    

            </form>
        </Guest>
    );
}
