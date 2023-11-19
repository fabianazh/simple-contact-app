/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import { FiX, FiUser } from 'react-icons/fi'
import { BsTelephone, BsEnvelope } from 'react-icons/bs'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

export const ContactEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState('')
    const [no, setNo] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        showContact()
    }, [])

    const showContact = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/contact/${id}`
            )
            setName(response.data.contact.name)
            setNo(response.data.contact.no)
            setEmail(response.data.contact.email)
        } catch (error) {
            console.log(error)
        }
    }

    const updateContact = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.patch(
                `http://localhost:3000/contact/${id}`,
                {
                    name,
                    no,
                    email,
                }
            )
            console.log(response.data.message)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className='container gap-5 flex flex-col mx-auto py-7 px-5'>
                {/* Heading */}
                <Header className='w-full flex items-center justify-between'>
                    <Header.LeftContent>
                        <span className='font-bold text-lg'>Edit Contact</span>
                    </Header.LeftContent>
                    <Header.RightContent>
                        <Link to={'/'}>
                            <FiX className='text-2xl' />
                        </Link>
                    </Header.RightContent>
                </Header>
                {/* End Heading */}
                <form
                    onSubmit={updateContact}
                    className='flex flex-col gap-6 mt-3'
                >
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <FiUser className={'text-xl'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            id='name'
                            name='name'
                            className='border w-full rounded py-1 px-3'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={'Name'}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <BsTelephone className={'text-lg'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            id='no'
                            name='no'
                            className='border w-full rounded py-1 px-3'
                            value={no}
                            onChange={(e) => setNo(e.target.value)}
                            placeholder={'Phone Number'}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <BsEnvelope className={'text-xl'} />
                        </InputLeftElement>
                        <Input
                            type='text'
                            id='email'
                            name='email'
                            className='border w-full rounded py-1 px-3'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={'Email'}
                        />
                    </InputGroup>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 hover:bg-blue-600 transition-all py-2 text-white rounded mt-5'
                    >
                        Edit
                    </button>
                </form>
            </section>
        </>
    )
}
