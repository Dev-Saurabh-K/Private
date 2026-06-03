import axios from "axios";
import { X, Lightbulb, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const KeywordCard = ({ modelOpen, keyword, setModelOpen, response }) => {
  const URL = `${import.meta.env.VITE_API_URL}/api/generate/image`;
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImg = async () => {
      const res = await axios.get(URL, {
        params: {
          topic: keyword,
        },
      });
      setImageUrl(res.data?.imageurl);
    };
    fetchImg();
  }, [keyword]);
  return (
    <>
      {modelOpen && (
        <div className="w-full h-fit bg-blue-100 mt-2 shadow-lg rounded-md p-4 relative text-xs flex flex-row justify-center items-center">
          <div
            className="absolute top-0 right-0 rounded-full bg-red-400 hover:bg-red-500 border-2 hover:border-red-500 cursor-pointer"
            onClick={() => setModelOpen(false)}
          >
            <X />
          </div>
          {/* {context} */}
          {response && (
            <div className="flex flex-col flex-3 gap-1">
              <div>{keyword}</div>
              <div className="border border-blue-300 bg-blue-200 p-1 rounded-md flex items-center justify-center">
                {response?.info}
              </div>

              {response?.note && (
                <div className="flex flex-row items-center justify-center gap-1">
                  <div className="h-fit w-fit flex items-center justify-center bg-orange-300 p-2 rounded-sm ">
                    <FileText className="size-5" />
                  </div>
                  <div className="border border-orange-300 bg-orange-200 p-1 rounded-md flex items-center justify-center">
                    {response?.note}
                  </div>
                </div>
              )}

              {response?.fact && (
                <div className="flex flex-row items-center justify-center gap-1">
                  <div className="flex items-center justify-center bg-green-300 p-2 rounded-sm h-fit w-fit">
                    <Lightbulb className="size-5" />
                  </div>

                  <div className="border border-green-300 bg-green-200 p-1 rounded-md flex items-center justify-center">
                    {response?.fact}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="IMG size-full bg-blue-200 flex flex-1 flex-col border border-blue-300 rounded-md">
            <div className="h-full w-full p-2">
              {imageUrl && <img src={imageUrl} alt="" className="h-full w-full" />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeywordCard;
