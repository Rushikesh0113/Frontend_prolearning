import React, { useEffect,useState } from 'react'
import Header from '../../Navbar/header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Loading from '../../Loading/Loading'
import { useSelector } from 'react-redux'
const Topics = () => {
  const {id}=useParams()
  const navigate=useNavigate()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const role=useSelector(store=>store.user.data.role)

  const [data,setdata]=useState()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/chapters/${id}`).then(res=>{setdata(res.data.data);console.log(res.data.data);}).catch(err=>console.log(err))
  },[id])
  return (
    <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
 
   <div className='p-2'>



   <div className='flex flex-row justify-between '>
<div class="m-2 font-semibold text-xl flex flex-row ">
  <button className='px-2' onClick={()=>{navigate(-1)}}><IoIosArrowBack color='red' />
  </button>
 
  <p>List Of Topic</p>
</div>
{ role==="TEACHER" && <div><Link to={`/create/topic/${id}`}><button className='m-2 px-4 rounded-xl border border-[#FF725E] hover:scale-1 dealy-700 '>+ Add New Topic</button></Link></div>}
</div>

  
  {data ? (<>  <div class="grid sm:grid-cols-2 md:grid-cols-3 pt-2 m-2 border border-gray-400 rounded-lg">
     {data && data.topics.map((items)=>{
      return (  
    <Link to={`/topic/${items._id}`}>  <div class="border-r border-black border-spacing-y-4">
    <div class="flex justify-between p-4 m-2 border-solid border-gray-500 border-b">
     <div>
     <h1 class="font-semibold w-60 h-12 flex items-center">{items.name}</h1>
     </div>
     <div className='flex justify-center items-center'>
     <IoIosArrowForward color='red'size={22}/>
      </div>

   
 </div>
 </div></Link>
      )
    })}

</div></>):<Loading/>}
</div>
</div>
    
  )
}

export default Topics