import { Link } from "react-router-dom";

function Navbar() {
  
  

  return (
    <div className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold text-black">
          Book Reviewer
        </div>
        <div className="flex items-center space-x-6">
          <Link 
            to="/publish" 
            className="text-lg text-black hover:underline transition-colors duration-300"
          >
            Publish
          </Link>
          
          <div>
            logout
          </div>
          <div className="rounded-full h-12 w-12 flex justify-center mt-1 mr-2 bg-slate-500">
            <div className="flex flex-col justify-center h-full text-xl"  >
              <button className="text-xl">U</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
