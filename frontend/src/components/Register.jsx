import { useState } from "react";
import { toast } from "react-toastify";
import { postApi } from "../hooks/useApiHandle";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });
  const { name, email, password, confirmPassword, image } = data;

  
  const handleChange = (e) => {
    if(e.target.files[0]){
    const Reader = new FileReader();
    Reader.readAsDataURL(e.target.files[0]);
    
    Reader.onload=()=>{
      if(Reader.readyState === 2){
        setData({...data, image : Reader.result});
      }
    }
  }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(name.length>30){
      toast.warn("Name length can not be greater than 30");
      return;
    }
    let k = 0;
    for(let i=0;i<name.length;i++){
      if(name[i]!=" "){
        k++;
      }
    }
    if(k===0){
      toast.warn("Only space can not be provided in the name field");
      return;
    }
    if(!name | !email | !password | ! confirmPassword){
      toast.warn("All the field must be filled");
      return;
    }

    if(password!=confirmPassword){
      toast.warn("Confirm password did not match to the password");
      return;
    }

    const get = await postApi("api/user/register",data);
    
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image : ""
    })
  };


  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 drop-shadow-md"
      >
        <h2 className="bold bg text-white boxShadow px-1 rounded-sm">SIGN UP PAGE</h2>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="Name">
            Name *
          </label>
          <input
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={name}
            className="rounded-sm px-1 outline-none border-none"
            placeholder="Name..."
            type="text"
            name="name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="Email">
            Email *
          </label>
          <input
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={email}
            className="rounded-sm px-1 outline-none border-none"
            placeholder="Email..."
            type="email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="Password">
            Password *
          </label>
          <input
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={password}
            className="rounded-sm px-1 outline-none border-none"
            placeholder="Password..."
            type="password"
            name="password"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="confirmPassword">
            Confirm Password *
          </label>
          <input
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={confirmPassword}
            className="rounded-sm px-1 outline-none border-none"
            placeholder="Confirm Password..."
            type="password"
            name="confirmPassword"
            required
          />
        </div>

        <label className="text-white text-start" htmlFor="image">
          Upload Your Image *
        </label>
        {
          image&&(<img className="w-[60%] sm:w-[40%] lg:w-[20%]" src={image} />)
        }

        <input
          onChange={handleChange}
          className="w-[70%] md:w-[65%] border-none"
          type="file"
          name="image"
          accept="image/*"
        />

        <button className="text-white bg-[#ac2340] rounded-md px-2 py-[0.5px]">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Register;
