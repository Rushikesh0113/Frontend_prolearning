import React, { useEffect,useState } from 'react'
import Header from '../../Navbar/header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Loading from '../../Loading/Loading'
import { useSelector } from 'react-redux'

const Chapters = () => {
  const {id}=useParams()
  const role=useSelector(store=>store.user.data.role)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const navigate=useNavigate()
  const [data,setdata]=useState()
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/${id}`).then(res=>{setdata(res.data.data);console.log(res.data.data);}).catch(err=>console.log(err))
  },[id])
  return (
    <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
   <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
   <div className='p-2'>
    


<div className='flex flex-row justify-between '>
<div class="m-2 font-semibold text-xl flex flex-row ">
  <button className='px-2' onClick={()=>{navigate(-1)}}><IoIosArrowBack color='red' />
  </button>
 
  <p>Subject</p>
</div>
{ role==="TEACHER" && <div><Link to={`/create/subject/${id}`}><button className='m-2 px-4 rounded-xl border border-[#FF725E] hover:scale-1 dealy-700 '>+ Add New Chapter</button></Link></div>}
</div>

{/* <div><Link to={`/chapter/${items._id}`}>{items.name}</Link></div> */}

{data ? (<><div class="grid sm:grid-cols-2 md:grid-cols-3  m-2">
 {data && data.chapters.map((items)=>{
      return (<Link to={`/chapter/${items._id}`}> <div class="flex justify-between p-2 m-2 border rounded-lg hover:shadow-2xl h-l">
        <h1 class="pt-1">{items.name}</h1>
        <div>
        <h1 class="text-orange-600"><IoIosArrowForward color='red'/></h1>
        <Link to={`/student/chaptertest/${items._id}`}><h1>Test</h1></Link>
        </div>
      </div></Link>)
    })}

</div></>) : <Loading/>}


   </div>
    </div>
  )
}

export default Chapters