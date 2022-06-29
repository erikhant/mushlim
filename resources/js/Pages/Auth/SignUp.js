import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { isEmpty } from 'lodash';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('sign-up'));
    };

    return (
        <Guest>
            <Head title="Sign Up" />

            <h1 className="text-2xl sm:text-4xl text-secondary-dark font-bold mb-10">Sign up</h1>

            <ValidationErrors errors={errors} />

            <form onSubmit={submit} className="w-full">
                <div>
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        placeholder="nama lengkap"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="alamat email"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder="password"
                        handleChange={onHandleChange}
                        showPassword
                        required
                    />
                </div>

                <div className="mt-4">
                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        placeholder="konfirmasi password"
                        handleChange={onHandleChange}
                        showPassword
                        required
                    />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Button type="submit" processing={processing || isEmpty(data.name) || isEmpty(data.email) || isEmpty(data.password) || isEmpty(data.password_confirmation)} className="my-5">
                       Daftar
                    </Button>            
                    
                    <p className="text-xs sm:text-sm text-secondary-dark">
                        Sudah memiliki akun?
                        <span className="text-semibold text-primary-normal">
                            <Link href={route('login')}>
                                {' '}Login
                            </Link>
                        </span>
                    </p>
                </div>
            </form>
        </Guest>
    );
}
