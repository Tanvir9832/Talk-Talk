import { useState } from "react";
import picture from "../assets/picture.jpg";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  const [val, setVal] = useState(1);
  return (
    <div className="h-screen w-full grid md:grid-cols-2 items-center justify-center p-8">
      <img
        className="md:col-start-1 border hidden md:block h-[90%] md:col-end-2 drop-shadow-md"
        src={picture}
        alt="loading"
      />
      <div className="md:cols-start-2 drop-shadow-md p-12 md:p-0 h-[90%] w-full md:cols-end-2 gap-8 bg-[#eee] border flex items-center justify-center flex-col">
        <div className="flex gap-4">
          <button
            onClick={() => setVal(0)}
            className="bg-[#383949] boxShadow text-white px-4 rounded-lg"
          >
            SIGN UP
          </button>
          <button
            onClick={() => setVal(1)}
            className="bg-[#383949] boxShadow text-white px-4 rounded-lg"
          >
            SIGN IN
          </button>
        </div>
        <div >{val ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
};

export default Home;
