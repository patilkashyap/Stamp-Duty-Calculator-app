import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const propertyType = ["Residential", "Commercial"];
  const areaType = ["Rural", "Urban", "Suburb"];
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  //const [stampDuty, setStampDuty] = useState(0);
  const [names, setNames] = useState(" ");

  // useEffect(()=> {
  //   async function Fetch() {
  //     await fetch("http://localhost:3000")
  //       .then(res => res.json())
  //       .then((data) => {console.log(data)})
  //   }
  //   Fetch();
  // },[])

  function handleChange(e) {
    let naam = e.target.value;
    naam.trim();
    setNames(naam);
  }

  async function handleLogin(e) {
    e.preventDefault();
    //setUsername(e.target.value);
    console.log(username);
    console.log(password);
    const res = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await res.json();
    //console.log("token: " + data);
    setToken(data.userToken);
    //console.log(token);
  }

  if (!token) {
    return (
      <div className="bg-sky-200 w-1vh h-lvh">
        <h1>Hello</h1>
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            name="username"
            type="text"
            className="bg-white rounded-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            name="password"
            type="text"
            className="bg-white rounded-xl"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="bg-emerald-500 border-2 border-black">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="text-black bg-sky-200 h-lvh w-1vh flex ">
        <div className="w-full">
          <div className="justify-items-center mb-9 mt-14 font-serif">
            <h1 className="text-4xl">Stamp Duty Calculator</h1>
          </div>
          <div className="bg-white border ml-2 mb-3 mt-9  w-100 justify-self-center rounded-md">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-100 pt-0.5 pb-0.5 pl-2.5 rounded-2xl"
              value={names}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="bg-white border ml-2 mb-3 mt-6 w-100 justify-self-center">
            <input
              type="number"
              name="contact"
              maxLength="10"
              placeholder="Contact No."
              className="w-100"
            />
            <br />
          </div>
          <div className="flex justify-center mt-6 mb-3">
            <div className="ml-2">
              <label>Property Type:</label>
              <select className="bg-white border ml-2 w-26">
                {propertyType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-4">
              <label>Area Type: </label>
              <select className="bg-white border ml-2 w-21">
                {areaType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <br />
            </div>
          </div>
          <div className="justify-self-center mt-6">
            <input
              type="number"
              name="cost"
              placeholder="Property Cost(in rupees)"
              className="bg-white border ml-2 w-100"
            />
          </div>
          <div className="justify-self-center mt-6">
            <p>Your Stamp Duty is:{names}</p>
          </div>
        </div>
        <div className=" w-full justify-items-center">
          <h1 className="text-4xl mt-14 font-serif">How to Calculate</h1>
          <p className="justify-self-center m-16">
            Stamp Duty is 6% of the total property cost and Registration fees is
            1% of the property cost.lorem ipsum dolor sit amet consectetur
            adipiscing elit anim deleniti exercitation eu omnis elit aliqua
            placeat dolor facilis elit ut ut nulla culpa est sint mollitia
            dolores labore molestias exercitation nostrud duis mollit et facilis
            facilis laborum duis officia officia culpa officia magna facilis
            deserunt in est et culpa dignissimos
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
