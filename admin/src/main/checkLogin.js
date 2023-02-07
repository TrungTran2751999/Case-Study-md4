import axios from "axios";
import port from "../util/until";
import { useNavigate } from "react-router-dom";
function checkLogin(navigate, link){
    let admin = localStorage.getItem("admin");
        if(admin!=null){
            async function check(){
                let res = await axios.post(port+"auth/check",JSON.parse(admin)).then((res)=>{
                    return useNavigate(link);
                }).catch(()=>{
                    return useNavigate("/login")
                })
            }
            check();
        }else{
            return navigate("/login");
        }
}
export default checkLogin;