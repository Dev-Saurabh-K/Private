import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";
import { useHistoryRefreshStore } from "../../store/historyRefreshToken";

const UploadPDF = () => {
  const [Pdf, setPdf] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loading, setLoading] = useState(false);
  const sethrt = useHistoryRefreshStore((state)=> state.sethrt)

  const URL = `${import.meta.env.VITE_API_URL}/api/generate/syllabus`;

  const onDrop = useCallback((acceptedFiles) => {
    //Do somethingwith the files
    setPdf(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name)
    setFileSize(acceptedFiles[0].size)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     setPdf(file);
  //     console.log(Pdf);
  //   };

  const token = localStorage.getItem("access_token");

  const uploadPdf = async () => {
    if (!Pdf) {
      alert("Please select a PDF");
      return;
    }
    const formData = new FormData();
    formData.append("file", Pdf);

    try {
      setLoading(true);
      const response = await axios.post(URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast.success("File Uploaded Sucessgully!")
      sethrt();
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full m-6 h-full py-4">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 font-semibold justify-start items-center">
          <Upload className="font-bold size-4.5" />
          UploadPDF
        </div>

        <p className="font-thin text-slate-800 pb-2">
          Upload study materials for analysis
        </p>
      </div>

      {loading && <CircularProgress aria-label="Loading…" className="absolute z-10"/>}

      <div className="w-full h-full flex flex-col gap-6">
        <div
          {...getRootProps()}
          className="border border-dashed border-slate-400 rounded-md w-full h-8/12 flex justify-center items-center flex-col gap-3"
        >
          <input {...getInputProps()} />
          <Upload className="text-slate-500 size-14"/>
          
          {fileName?(<div className="flex flex-col text-black font-semibold items-center justify-center"><div>{fileName}</div><div className="font-medium text-slate-800">{(fileSize/1024).toFixed(2)+"KB"}</div></div>):isDragActive ? (
            <div><p>Drop the PDF files here ...</p><p>PDF files only</p></div>
            
          ) : (
            <p className="text-black font-semibold flex items-center justify-center flex-col">Drag 'n' drop some files here, or click to select files. <p className="text-slate-700 font-semibold">PDF files only</p></p>
          )}
        </div>
        {fileName?(<div onClick={uploadPdf} className="size-20 bg-black text-white flex items-center justify-center w-full h-10 rounded-md hover:bg-slate-900">
          Upload PDF
        </div>):(<div className="size-20 bg-slate-600 text-white flex items-center justify-center w-full h-10 rounded-md cursor-not-allowed" >Select a PDF to upload</div>)}
        
      </div>
    </div>
  );
};

export default UploadPDF;
