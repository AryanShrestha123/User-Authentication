import {useState} from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import "../styles/Form.css"

function Forms({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            }
            else {
                navigate("/login")
            }
        }
        catch (error) {
            console.log(error.response?.data);
            alert(JSON.stringify(error.response?.data));
        }
        finally {
            setLoading(false);
        }
    }

    const name = method === "login" ? "Login" : "Register";

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            type="text"
            value={username}
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            type="password"
            value={password}
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Forms;
