import './App.css'
import ColorList from './components/ColorList'
import ColorForm from './components/ColorForm'
import DeleteForm from './components/DeleteForm'
import UpdateForm from './components/UpdateForm'

function App() {

  return (
    <>
      <div className='list_container'>
        <ColorList/>
      </div>
      <div className='form_container'>
        <ColorForm/>
        <UpdateForm/>
        <DeleteForm/>
      </div>
    </>
  )
}

export default App
