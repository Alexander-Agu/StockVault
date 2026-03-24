import { useState } from "react";
import NavigateBackButton from "../UI/NavigateBackButton";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alexander Agu",
    phone: "098764321",
    dob: "11.25.2003",
    gender: "Male"
  });

  const handleUpdate = () => {
    // Logic for updating the profile would go here
    setIsEditing(false);
  };

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-screen bg-[#F8EEED] flex flex-col items-start justify-start p-6 overflow-hidden font-sans">
      
      <div className="w-full mb-8 p-4">
        <NavigateBackButton title="Back to accounts" />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Profile Header Card */}
        <div className="p-8 flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between bg-white/60 backdrop-blur-md border border-white rounded-none shadow-xl shadow-red-900/5">
          <div className="space-y-1">
            <span className="text-[1rem] font-medium tracking-[0.1em] text-red-500/50">Profile</span>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">
              {formData.name}
            </h2>
          </div>

          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="mt-4 sm:mt-0 bg-red-600 text-white px-10 py-4 rounded-none text-xs font-bold tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
            >
              Update Profile
            </button>
          ) : (
            <div className="flex gap-4 mt-4 sm:mt-0">
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-white text-slate-600 border border-slate-200 px-6 py-4 rounded-none text-xs font-bold tracking-widest hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="bg-red-600 text-white px-8 py-4 rounded-none text-xs font-bold tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Personal Information Section */}
        <div className="bg-white/40 backdrop-blur-md border border-white rounded-none shadow-xl shadow-red-900/5 flex flex-col">
          <div className="border-b border-red-100 w-full p-8 bg-white/20">
            <h2 className="text-[1rem] font-medium tracking-[0.1em] text-red-500/50">
              {isEditing ? "Edit personal information" : "Personal information"}
            </h2>
          </div>

          <div className="w-full p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Full Name Field */}
            <div className="space-y-2 border-l-2 border-red-500 pl-4">
              <h3 className="text-[1.2rem] font-bold tracking-widest text-slate-800">Full Name</h3>
              {isEditing ? (
                <input 
                  className="w-full bg-white border border-red-100 p-2 text-sm font-black focus:outline-none focus:border-red-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              ) : (
                <p className="text-[16px] font-black">{formData.name}</p>
              )}
            </div>
            
            {/* Birth date Field */}
            <div className="space-y-2 border-l-2 border-red-500 pl-4">
              <h3 className="text-[1.2rem] font-bold tracking-widest text-slate-800">Date of Birth</h3>
              {isEditing ? (
                <input 
                  className="w-full bg-white border border-red-100 p-2 text-sm font-black focus:outline-none focus:border-red-500"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              ) : (
                <p className="text-[16px] font-black">{formData.dob}</p>
              )}
            </div>

            {/* Gender Field */}
            <div className="space-y-2 border-l-2 border-red-500 pl-4">
              <h3 className="text-[1.2rem] font-bold tracking-widest text-slate-800">Gender</h3>
              {isEditing ? (
                <select 
                  className="w-full bg-white border border-red-100 p-2 text-sm font-black focus:outline-none focus:border-red-500"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <p className="text-[16px] font-black">{formData.gender}</p>
              )}
            </div>

            {/* Contact Field */}
            <div className="space-y-2 border-l-2 border-red-500 pl-4">
              <h3 className="text-[1.2rem] font-bold tracking-widest text-slate-800">Contact</h3>
              {isEditing ? (
                <input 
                  className="w-full bg-white border border-red-100 p-2 text-sm font-black focus:outline-none focus:border-red-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <p className="text-[16px] font-black">{formData.phone}</p>
              )}
            </div>
          </div>

          <div className="p-8 bg-red-500/5 border-t border-red-100">
            <div className="flex items-center gap-2 mb-2 text-red-600">
              <span className="text-[10px] font-black tracking-widest text-red-500 uppercase">Security Notice</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              * ensuring your personal information is accurate helps us protect your account. 
              never share your banking credentials with anyone.
            </p>
          </div>
        </div>

        <div className="flex justify-start pb-12">
          {!isEditing && (
            <button className="group relative px-12 py-5 bg-white text-red-600 border border-red-200 rounded-none font-bold tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-500/10 active:scale-[0.98]">
              Logout Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}