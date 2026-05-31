import {useState, useEffect} from 'react';
import axios from 'axios';


import {useTopicStore} from "../../store/topicStore";

const Notes = () => {

  const URL = `${import.meta.env.VITE_API_URL}/api/generate/notes`;
  const token = localStorage.getItem("access_token");

  const topic_id = useTopicStore((state)=>state.topic_id);
  const [notes, setNotes]=useState([]);


  useEffect(()=>{
    const fetchNotes = async()=>{
      console.log(topic_id)
      const response = await axios.post(URL,{
        topic_id:topic_id
      },
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