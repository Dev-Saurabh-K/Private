import {useState, useEffect} from 'react';
import axios from 'axios';


import {useTopicStore} from "../../store/topicStore";

const Notes = () => {

  const topic_id = useTopicStore((state)=>state.topic_id);
  const URL = `${import.meta.env.VITE_API_URL}/api/retrieve/notes?topic_id=${topic_id}`;
  const token = localStorage.getItem("access_token");

  // http://localhost:8000/api/retrieve/notes?topic_id=2

  const [notes, setNotes]=useState([]);


  useEffect(()=>{
    const fetchNotes = async()=>{
      console.log(topic_id)
      const response = await axios.get(URL,
      {
        headers:{
          Authorization: `Bearer ${token}`,
        },
      },
      );
      setNotes(response.data);
    };
    fetchNotes()
  },[topic_id])

  
  return (
    <div>
      <div>
          <div key={notes.id}>
            <h2>{notes.topic_text}</h2>
            {notes.topic_notes}
            {/* {keywords} */}
          </div>

      </div>
    </div>
  )
}

export default Notes