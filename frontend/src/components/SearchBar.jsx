/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import { BiSearch } from 'react-icons/bi'

export const ContactList = () => {
    const [contacts, setContact] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const searchContact = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/contact/search/${searchValue}`
            )
            setContact(response.data.contacts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Search Bar */}
            <form
                onChange={searchContact}
                className='w-full flex items-center gap-2 h-auto px-3 py-2 bg-stone-100 rounded xl:rounded-md'
            >
                <button className=''>
                    <BiSearch></BiSearch>
                </button>
                <input
                    type='text'
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder='Search name, number, etc'
                    className='bg-transparent focus:outline-none w-full'
                />
            </form>
            {/* End Search Bar */}
        </>
    )
}
