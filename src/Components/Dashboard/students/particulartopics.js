import React, { useEffect, useState } from 'react'
import Header from '../../Navbar/header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import Loading from '../../Loading/Loading'
import { BiSolidEdit } from "react-icons/bi";
import Suggestion from './Suggestion.js'
const Particulartopics = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const [data, setdata] = useState()
  console.log(data);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/topics/${id}`).then(res => { setdata(res.data.data); console.log(res.data.data); }).catch(err => console.log(err))
  }, [id, navigate])
  return (
    <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`} >
      <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
      {/* <div>Title: {data?.name}</div>
    <div>{data?.description}</div> */}

      <div className='p-2'>



        <div class="m-2 font-semibold text-xl flex flex-row ">
          <button className='px-2' onClick={() => { navigate(-1) }}><IoIosArrowBack color='red' />
          </button>
          <p></p>

        </div>

        {data ? <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className='flex flex-row justify-between'>
            <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
            <div className='flex flex-row justify-between'>
              <button onClick={() => navigate(`/edit/topic/${id}`)}>
                <BiSolidEdit size={24} />
              </button>
            </div>

          </div>

          <div className="mb-4">
            <span className="font-semibold">Standard:</span> {data?.subject?.standard}
          </div>
          <div className="mb-4 text-gray-600">
            <span className="font-semibold">Chapter:</span> {data?.chapter.name}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Subject:</span> <Link to={`/subject/${data?.subject?._id}`}>{data?.subject?.name}</Link>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Topic Level:</span> {data?.topic_level}
          </div>
          <div className="mb-6">
            <span className="font-semibold">Created At:</span> {new Date(data?.createdAt).toLocaleDateString()}
          </div>
          <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Related Topic</h2>
            <ul className="list-disc list-inside px-4">
              {data?.RelatedTopic.map((topic) => (
                <li key={topic._id}><a href={`/topic/${topic._id}`}>{topic.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Questions</h2>
            <ul className="list-disc list-inside px-4">
              {data?.questions.map((question) => (
                <li key={question._id}>{question.questionText}</li>
              ))}
            </ul>
          </div>
        </div>
          : <Loading />}
      </div>

      {data && <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"><Suggestion topicId={id} /></div>}

    </div>)
}

export default Particulartopics