import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContactList } from './pages/ContactList'
import { ContactAdd } from './pages/ContactAdd'
import { ContactDetail } from './pages/ContactDetail'
import { ContactEdit } from './pages/ContactEdit'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ContactList></ContactList>} />
                <Route path='/contact' element={<ContactList></ContactList>} />
                <Route
                    path='/contact/add'
                    element={<ContactAdd></ContactAdd>}
                />
                <Route
                    path='/contact/:id'
                    element={<ContactDetail></ContactDetail>}
                />
                <Route
                    path='/contact/:id/edit'
                    element={<ContactEdit></ContactEdit>}
                />
            </Routes>
        </BrowserRouter>
    )
}
