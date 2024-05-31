import { Link, useNavigate } from "react-router-dom";
import {useAppContext} from "../Hooks/useContext";
import { useMutation, useQueryClient } from "react-query";
// import SignOutButton from "./SignOutButton";
import * as apiClient from '../api-client'

const Header = () => {
  const navigate=useNavigate()
  const queryClient = useQueryClient();

  const{ isLoggedin,showToast}  = useAppContext();

const mutation=useMutation(apiClient.signout,{
  onSuccess:async()=>{
    await queryClient.invalidateQueries("validateToken");
    showToast({message:"Log out Success", type:"sucess"})
    navigate('/sign-in')
  
  },
  onError:(err:Error)=>{
    showToast({message:err.message, type:"error"})
  }
})
  
  const handleClick=()=>{
    mutation.mutate()
  }
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedin ? (
               <>
               <Link
                 className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                 to="/my-bookings"
               >
                 My Bookings
               </Link>
               <Link
                 className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                 to="/my-hotels"
               >
                 My Hotels
               </Link>
               <button
               onClick={handleClick}
              className="flex h-5/6 bg-white items-center text-blue-600 px-3 mx-3 font-bold hover:bg-gray-100"
            >
              Sign Out
            </button>
             </>) : (
            <Link
              to="/sign-in"
              className="flex h-5/6 bg-white items-center text-blue-600 px-3 mx-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
        {/* <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span> */}
      </div>
    </div>
  );
};

export default Header;
