
import './App.css'
import ListOfUsers from './components/ListOfUsers'
import { CreateUser } from './components/CreateUser'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <ListOfUsers />
      <CreateUser />
      <Toaster richColors />
    </>
  )
}

export default App
