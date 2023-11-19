import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { Avatar } from '@chakra-ui/react'

export const ContactList = () => {
    const [contacts, setContact] = useState([])

    useEffect(() => {
        getContacts()
    }, [])

    const getContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/contact')
            setContact(response.data.contacts)
        } catch (error) {
            console.log(error)
        }
    }

    const groupContactsByFirstLetter = () => {
        const groupedContacts = {}
        contacts.forEach((contact) => {
            let firstLetter = contact.name.charAt(0).toUpperCase()
            // Check if the first letter is not an alphabet character
            if (!/^[A-Z]$/.test(firstLetter)) {
                firstLetter = '#'
            }
            if (!groupedContacts[firstLetter]) {
                groupedContacts[firstLetter] = []
            }
            groupedContacts[firstLetter].push(contact)
        })
        return groupedContacts
    }

    const groupedContacts = groupContactsByFirstLetter()

    return (
        <>
            {/* Contact List Container */}
            <section className='container gap-5 flex flex-col mx-auto py-7 px-5'>
                {/* Heading */}
                <div className='flex justify-between w-full items-center font-bold'>
                    <h1 className='text-3xl'>Contact</h1>
                    <Link className='text-blue-700' to={'/contact/add'}>
                        Add Contact
                    </Link>
                </div>
                {/* End Heading */}

                {/* Search Bar */}
                <form className='w-full flex items-center gap-2 h-auto px-3 py-2 bg-stone-100 rounded xl:rounded-md'>
                    <button className=''>
                        <BiSearch></BiSearch>
                    </button>
                    <input
                        type='text'
                        placeholder='Search name, number, etc'
                        className='bg-transparent focus:outline-none w-full'
                    />
                </form>
                {/* End Search Bar */}

                {/* Grouped Contact List */}
                <div className='w-full flex flex-col gap-3'>
                    {Object.entries(groupedContacts).map(
                        ([firstLetter, contactsGroup]) => (
                            <div
                                key={firstLetter}
                                className='mb-4 flex relative items-start pl-12 pr-2'
                            >
                                <span className='block absolute left-2 top-2 text-xl font-semibold text-stone-600'>
                                    {firstLetter}
                                </span>
                                <div className='flex flex-col w-full gap-4'>
                                    {contactsGroup.map((contact) => (
                                        <Link
                                            to={`/contact/${contact._id}`}
                                            key={contact._id}
                                            className='flex gap-4 items-center'
                                        >
                                            <Avatar
                                                bg={'green'}
                                                src='https://bit.ly/broken-link'
                                            />
                                            <div className='flex flex-col'>
                                                <span className='font-bold text-base'>
                                                    {contact.name}
                                                </span>
                                                <span className='text-stone-800 text-sm'>
                                                    {contact.no}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
                {/* End Grouped Contact List */}
            </section>
            {/* End Contact List Container */}
        </>
    )
}
