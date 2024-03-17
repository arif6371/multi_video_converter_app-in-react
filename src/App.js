import { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setprogress] = useState(0);

  const onsubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setFile(formdata.get("video"));

    try {
      const { data } = await axios.post("/convert", formdata, {
        onUploadProgress: (e) => {
          const p = (e.loaded * 100) / e.total;
          setprogress(p);
        },
      });
      console.log(data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="bg-gray-100 md:h-screen flex items-center justify-center">
      <div className="bg-white p-16 rounded-lg shadow-lg md:w-6/12">
        <h1 className="text-black text-5xl font-bold mb-8">
          video converter App
        </h1>
        <form className="flex flex-col gap-6" onSubmit={onsubmit}>
          <div className="flex">
            <input
              required
              name="video"
              type="file"
              accept="video/*"
              className=" flex-1 bg-gray-200 p-3 rounded-sm"
            />
            <select
              name="format"
              required
              className="bg-indigo-600 p-[15px] text-white"
            >
              <option value=".mp4">mp4</option>
              <option value=".3gp">3gp</option>
              <option value=".mp3">mp3</option>
            </select>
          </div>
          <button className="w-fit bg-indigo-600 py-2 px-8 rounded-sm text-white text-lg">
            Submit
          </button>
        </form>

        {file && (
          <>
            <div className="flex justify-between my-3">
              <label className="capitalize font-semibold">{file.name}</label>
              <label className="text-zinc-600">
                {(file.size / 1000 / 1000).toFixed(1)} Mb
              </label>
            </div>

            <div className="bg-gray-200 h-8 mt-8">
              <div
                className="bg-green-500 h-full"
                style={{ width: progress + "%" }}
              ></div>
              <label className="text-zinc-600 font-semibold">
                Progress-{Math.floor(progress)}%
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default App;
