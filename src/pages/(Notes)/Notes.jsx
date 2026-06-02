import {useState, useEffect} from 'react';
import axios from 'axios';
import Chat from "./Chat";
import Navbar from "../(Dashboard)/Navbar";

import HighlightedNotes from "./HighlightedNotes"


import {useTopicStore} from "../../store/topicStore";

const Notes = () => {

  const topic_id = useTopicStore((state)=>state.topic_id);
  const URL = `${import.meta.env.VITE_API_URL}/api/retrieve/notes?topic_id=${topic_id}`;
  const token = localStorage.getItem("access_token");


  const [notes, setNotes]=useState([]);

  useEffect(()=>{
    const fetchNotes = async()=>{
      // console.log(topic_id)
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
    <div className="min-h-screen mb-40 w-screen flex items-center justify-center flex-col bg-slate-50 gap-4">
      <Navbar/>
      <div>
          <div key={notes.id}>
            <h2>{notes.topic_text}</h2>
            {/* {notes.topic_notes} */}
            <HighlightedNotes text={notes.topic_notes} words={notes.keywords}/>
            {/* {console.log(notes.keywords)} */}
            {/* {keywords} */}
            <div>
              <h4>keywords</h4>
              {notes?.keywords?.map((keyword, index)=>(
                <span key={index} className="flex">{keyword}</span>
              ))}
            </div>
          </div>

      </div>
      <div>
        <Chat/>
      </div>
    </div>
  )
}

export default Notes