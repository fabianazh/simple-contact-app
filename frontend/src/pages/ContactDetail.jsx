import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    BiArrowBack,
    BiDotsVerticalRounded,
    BiPencil,
    BiMessageAltDetail,
} from 'react-icons/bi'
import { AiOutlineStar } from 'react-icons/ai'
import { BsTelephone, BsCameraVideo, BsEnvelope } from 'react-icons/bs'
import { Avatar, Button, Divider, useDisclosure } from '@chakra-ui/react'
import DeleteDialog from '../components/DeleteDialog'
import Header from '../components/Header'

export const ContactDetail = () => {
    const { id } = useParams()
    const [contact, setContact] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    useEffect(() => {
        showContact()
    }, [id])

    const showContact = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/contact/${id}`
            )
            setContact(response.data.contact)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContact = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/contact/${id}/delete`
            )
            navigate('/')
            console.log(response.data.message)
        } catch (error) {
            console.log(error)
        }
        return
    }

    return (
        <>
            {/* Contact Detail */}
            <section className='container gap-5 flex flex-col mx-auto py-7 px-5'>
                {/* Heading */}
                <Header className='w-full flex items-center justify-between'>
                    <Header.LeftContent>
                        <Link to={'/'}>
                            <BiArrowBack className='text-2xl' />
                        </Link>
                    </Header.LeftContent>
                    <Header.RightContent customClass='flex items-center gap-4 text-2xl'>
                        <Link to={`/contact/${contact._id}/edit`}>
                            <BiPencil />
                        </Link>
                        <AiOutlineStar />
                        <BiDotsVerticalRounded />
                    </Header.RightContent>
                </Header>
                {/* End Heading */}

                {/* Detail */}
                <div className='flex items-center gap-1 flex-col'>
                    {contact && (
                        <>
                            <Avatar
                                bg={'green.600'}
                                src='https://bit.ly/broken-link'
                                size={'xl'}
                            />
                            <span className='mt-4 font-bold text-2xl block'>
                                {contact.name}
                            </span>
                            <span className='block text-lg font-semibold text-stone-900'>
                                {contact.no}
                            </span>
                        </>
                    )}
                </div>
                {/* End Detail */}

                {/* Action */}
                <div className='w-9/12 rounded mx-auto flex items-center justify-between h-auto mt-2'>
                    <div className='flex flex-col gap-1.5 text-center'>
                        <div className='bg-blue-200 rounded-full p-3 mx-auto'>
                            <BsTelephone className='text-xl' />
                        </div>
                        <span className='block text-base font-bold'>Call</span>
                    </div>
                    <div className='flex flex-col gap-1.5 text-center'>
                        <div className='bg-blue-200 rounded-full p-3 mx-auto'>
                            <BiMessageAltDetail className='text-xl' />
                        </div>
                        <span className='block text-base font-bold'>Text</span>
                    </div>
                    <div className='flex flex-col gap-1.5 text-center'>
                        <div className='bg-blue-200 rounded-full p-3 mx-auto'>
                            <BsCameraVideo className='text-xl' />
                        </div>
                        <span className='block text-base font-bold'>Video</span>
                    </div>
                </div>
                {/* End Action */}

                {/* Contact Info */}
                <div className='bg-stone-100 flex flex-col gap-2 w-full mx-auto h-auto p-3 xl:p-5 rounded-md mt-2'>
                    <span className='font-bold xl:text-xl xl:mb-1'>
                        Contact Info
                    </span>
                    <Divider></Divider>
                    <div className='w-full flex gap-4 p-1 items-center h-auto'>
                        <BsTelephone className='text-lg xl:text-xl' />
                        <span className='font-bold xl:text-lg'>
                            {contact.no}
                        </span>
                    </div>
                    <div className='w-full flex gap-4 p-1 items-center h-auto'>
                        <BsEnvelope className='text-lg xl:text-xl' />
                        <span className='font-bold xl:text-lg'>
                            {contact.email}
                        </span>
                    </div>
                </div>
                {/* Contact Info */}

                {/* Contact Info */}
                <div className='bg-stone-100 w-full flex flex-col gap-0 text-red-600 mx-auto h-auto p-3 xl:px-6 rounded-md mt-2'>
                    <DeleteDialog
                        contact={contact}
                        isOpen={isOpen}
                        onClose={onClose}
                        deleteContact={deleteContact}
                    ></DeleteDialog>
                    <Button
                        onClick={onOpen}
                        className='group'
                        textColor={'red.600'}
                        p={'0'}
                        bg={'stone-100'}
                        _hover={'bg-stone-100'}
                    >
                        <span className='text-red-700 w-full block text-left font-bold font-nunito'>
                            Delete {contact.name}
                        </span>
                    </Button>
                    <Divider></Divider>
                    <Button
                        className='group'
                        textColor={'red.600'}
                        p={'0'}
                        bg={'stone-100'}
                        _hover={'bg-stone-100'}
                    >
                        <span className='text-red-700 w-full block text-left font-bold font-nunito'>
                            Block {contact.name}
                        </span>
                    </Button>
                </div>
                {/* Contact Info */}
            </section>
            {/* Contact Detail */}
        </>
    )
}
