import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../../Navbar/header';
import Loading from '../../../Loading/Loading';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';

export const Stdtest = () => {
  const navigate = useNavigate();
  
  const data = useSelector(store => store.user.data);
  const Id = parseInt(data.standard);

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [test, setTest] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  


  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/subjects/standard/${Id}`);
        console.log(response.data.data.standards[0].subjects);
        setSubjects(response.data.data.standards[0].subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [Id]);

  useEffect(() => {
    const fetchTest = async (subject) => {
      try {
        axios.defaults.withCredentials = true;
        const url = subject 
          ? `${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/standard/${Id}/${subject}`
          : `${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/standard/${Id}`;
        const response = await axios.get(url);
        setTest(response.data.data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };
    fetchTest(subject);
  }, [subject, Id]);

  useEffect(() => {
    const fetchTest = async (subject) => {
      try {
        axios.defaults.withCredentials = true;
        const url = subject 
          ? `${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/standard/${Id}/${subject}`
          : `${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/standard/${Id}`;
        const response = await axios.get(url);
        setTest(response.data.data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };
    fetchTest('');
  }, [Id]);

  return (
    <>
      <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
        <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
        <div className='p-2'>
          <div className='flex flex-row justify-between'>
            <div className="m-2 font-semibold text-xl flex flex-row">
              <button className='px-2' onClick={() => { navigate(-1) }}>
                <IoIosArrowBack color='red' />
              </button>
              <p>Chapter Tests</p>
            </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <select
              className='p-2 border rounded-lg'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>Select Subject</option>
              {subjects && subjects.map((sub, index) => (
                <option key={index} value={sub.name}>{sub.name}</option>
              ))}
            </select>
          </div>
          {
            test ? test.map((data, index) => (
              <Link key={index} to={`/student/test/${data?._id}`}>
                <div className="flex justify-between p-2 m-2 border rounded-lg shadow-2xl">
                  <h1 className="pt-1">{data?.testName}</h1>
                </div>
              </Link>
            )) : <Loading />
          }
        </div>
      </div>
    </>
  );
};
