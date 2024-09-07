"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/actions/users.actions'
import SignIn from '@/app/(auth)/sign-in/page'
import { useRouter } from 'next/navigation'


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authformSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            // sign up with Appwrite & create plain link token

            if (type === 'sign-up') {
                const newUser = await signUp(data);
                setUser(newUser);

            }

            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,   
                });

                if (response) router.push('/');
            }

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);

        }

    };
    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/"
                    className="mb-12 
                         cursor-pointer flex 
                         items-center gap-1"
                >
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt='Horizon logo'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>

                <div className='flexflex-col gap-1'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up '
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/*PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        < CustomInput control={form.control}
                                            name='firstName' label='First Name'
                                            placeholder='Enter your first name'
                                        />
                                        < CustomInput control={form.control}
                                            name='lastName' label='Last Name'
                                            placeholder='Enter your last name'
                                        />
                                    </div>
                                    < CustomInput control={form.control}
                                        name='address1' label='Address'
                                        placeholder='Enter your specific address'
                                    />
                                    < CustomInput control={form.control}
                                        name='city' label='City'
                                        placeholder='Enter your city'
                                    />
                                    <div className='flex gap-4'>
                                        < CustomInput control={form.control}
                                            name='state' label='State'
                                            placeholder='Example: NY'
                                        />
                                        < CustomInput control={form.control}
                                            name='postalCode' label='Postal Code'
                                            placeholder='Example: 11101'
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        < CustomInput control={form.control}
                                            name='dateOfBirth' label='Date of Birth'
                                            placeholder='YYYY-MM-DD'
                                        />
                                        < CustomInput control={form.control}
                                            name='ssn' label='SSN'
                                            placeholder='Example: 1234'
                                        />
                                    </div>


                                </>
                            )}
                            < CustomInput control={form.control}
                                name='email' label='Email'
                                placeholder='Enter your email' />
                            < CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
                            <div className='flex flex-col gap-4'>
                                <Button type="submit" disabled={isLoading} className='form-btn' >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20}
                                                className="animate-spin" /> &nbsp;
                                            Loading....
                                        </>
                                    ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal
                           text-gray-600'>{type === 'sign-in'
                                ? "Don't have an account ?"
                                : "Already have an account ?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up'
                            : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm;