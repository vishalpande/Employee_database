import './App.css'
import Header from './components/Header'
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from './components/Footer'
import { Route,Router,Routes } from 'react-router-dom'
import Emp_Table from './pages/Emp_Table'
import AddEmp from './pages/AddEmp'
import Hero from './pages/Hero'
import { useEffect, useState } from 'react'
import Edit from './pages/Edit'

function App() {

  const [empData,setEmpData]=useState([]);

const addDataHandler=(empId,empName,empAge,empCity)=>
  {

const newData=[
  ...empData,
  {
Id:empId,
Name:empName,
Age:empAge,
City:empCity
  },
];
setEmpData(newData);
console.log(empData)
  };



const onDelete=(Id)=>{
const newData=empData.filter(item=> item.Id!=Id);
setEmpData(newData);

}


useEffect(()=>
{
  localStorage.setItem('empData',JSON.stringify(empData));
},[empData])


  return (
    <>
     <Header/>
     <Routes>
     <Route path='/' element={<Hero/>}></Route> 
     <Route path='/table' element={<Emp_Table empArr={empData} onDelete={onDelete}/>}></Route> 
     <Route path='/add' element={<AddEmp addData={addDataHandler}/>}></Route> 
     <Route path='/edit/:id' element={<Edit   empData={empData}/>}></Route>
      </Routes>
     <Footer/>
    </>
  )
}

export default App
