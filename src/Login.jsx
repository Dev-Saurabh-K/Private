// import useCounterStore from './store/counterStore'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
// import axios from 'axios';


function Login() {

  // const toggletheme = () =>{
  //   document.documentElement.classList.toggle("dark");
  // }
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const URL=`${import.meta.env.VITE_API_URL}/login`;
  const navigate = useNavigate();


  const submitLogin = async()=>{

    try{

      const formData = new URLSearchParams();
      formData.append("username",username);
      formData.append("password",password);
      

      // const reponse = await axios.post(
      //   URL,
      //   {
      //     username:username,
      //     password:password
      //   }
      // )
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      const data = await response.json();

      if(response.ok){
        localStorage.setItem("access_token", data.access_token);
        navigate('/dashboard')
      }else{
        setError(`Error: ${response.status}, ${response.statusText}`)
        // console.log(response.statusText)
      }

    }catch(error){
      console.log(error)
      setError(error)
    }


  }

  // const { count, increment, decrement } = useCounterStore();
  return (
    <div className="bg-background text-foreground w-full min-h-screen flex items-center justify-center flex-col">
      <div className="fixed top-10 bg-red-200 w-56 h-28">
        {error}
      </div>
      <div>
        login
      </div>
      <div>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        {/* <div className="flex items-center justify-center">login</div> */}
      </div>
      <div onClick={submitLogin} className="w-52 h-52 cursor-pointer">
        login
      </div>
    </div>
  )
}

export default Login