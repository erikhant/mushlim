import React from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, useForm } from '@inertiajs/inertia-react';
import { isEmpty } from 'lodash';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <Guest>
            <Head title="Lupa Password" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
                <p className="text-base">
                    Beri tahu kami alamat email Anda dan kami akan mengirimkan tautan melalui email Anda untuk mengatur ulang kata sandi.
                </p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button type="submit" className="ml-4" processing={processing || isEmpty(data.email)}>
                        Kirimkan Email
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
