import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const ContactTable = () => {
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

    const deleteContact = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/contact/${id}/delete`
            )
            getContacts()
            console.log(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <table className='border w-full'>
            <thead className='w-full'>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>No</th>
                    <th>Email</th>
                    <th colSpan={3}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={contact._id} className='border text-center'>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.no}</td>
                        <td>{contact.email}</td>
                        <td className='w-28'>
                            <Link to={`/contact/${contact._id}`}>Detail</Link>
                        </td>
                        <td className='w-28'>
                            <Link to={`/contact/${contact._id}/edit`}>
                                Edit
                            </Link>
                        </td>
                        <td className='w-28'>
                            <button onClick={() => deleteContact(contact._id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
