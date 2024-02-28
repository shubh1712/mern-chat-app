import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { set } from "mongoose";
export const useSignup =()=>{
    const [loading, setLoading] = useState(false)
    const {authUser ,setAuthUser} = useAuthContext()
    const signup = async ({fullName ,username,password,confirmPassword,gender})=>{
        const success = hanldleInputError({fullName ,username,password,confirmPassword,gender})
        
        if(!success) return
        setLoading(true);

        try {
            const res= await fetch("/api/auth/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify({fullName ,username,password,confirmPassword,gender})
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user" , JSON.stringify(data)) 
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return {loading,signup}
 }

function hanldleInputError ({ fullName, username, password, confirmPassword,gender })  {

    if (!fullName ||!username||!password||!confirmPassword||!gender){
        toast.error("Please Fill i all fields")
        return false
    }
    if (password !== confirmPassword){
        
    }
    if (password.length<6){
        toast.error("Passwords length less than 6")
        return false
    }
    return true
}