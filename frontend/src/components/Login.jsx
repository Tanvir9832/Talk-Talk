import { useState } from "react";
import { postApi } from "../hooks/useApiHandle";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { email, password } = data;
  const handleSubmit = async(e) => {
    e.preventDefault();
    const get = await postApi("api/user/login",data);
    localStorage.setItem("Chat-App-Token",get?.token);
    setData({ email: "", password: "" });
  };
  return (
    <div className="px-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 drop-shadow-md"
      >
        <h2 className="bold text-white boxShadow bg px-1 rounded-sm">SIGN IN PAGE</h2>
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
            className="rounded-sm px-1 outline-none boeder-none"
            placeholder="Password..."
            type="password"
            name="password"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[#ac2340] rounded-sm px-2"
        >
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default Login;
