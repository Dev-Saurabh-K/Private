import axios from "axios";
import {useState} from "react";

const UploadPDF = () => {
    const [Pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);

    const URL = `${import.meta.env.VITE_API_URL}/api/generate/syllabus`;

    const handleFileChange =(e) =>{
        const file =e.target.files[0]
        setPdf(file)
        console.log(Pdf)
    }

    const token = localStorage.getItem("access_token");

    const uploadPdf = async()=>{
        if(!Pdf){
            alert("Please select a PDF");
            return;
        }
        const formData = new FormData();
        formData.append("file", Pdf);
        
        try{
            setLoading(true)
            const response = await axios.post(
                URL,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            setLoading(false)
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        UploadPDF
        <div>
            <input type="file" accept=".pdf" onChange={handleFileChange}/>
        </div>
        <div onClick={uploadPdf} className="size-20 bg-amber-300">
            submit
        </div>
        
        {loading && <div className="bg-red-600 size-5">submitting...</div>}
    </div>
  )
}

export default UploadPDF