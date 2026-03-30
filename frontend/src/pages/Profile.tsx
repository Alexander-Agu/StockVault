import { useState, useEffect } from "react";
import NavigateBackButton from "../UI/NavigateBackButton";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store/store";
import { UpdateUser } from "../state/User/UserSlice";
import { useParams } from "react-router-dom";
import ResetStore from "../state/store/ResetStore";
import useResetStore from "../state/store/ResetStore";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { userId } = useParams();
  const logout = useResetStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.user ? user.user.name : "",
    phone: user.user ? user.user.phone : "",
  });


  useEffect(() => {
    if (user.user) {
      setFormData({
        name: user.user.name,
        phone: user.user.phone,
      });
    }
  }, [user.user?.name]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const res = await dispatch(UpdateUser(Number(userId), {
        name: formData.name,
        phone: formData.phone
      }));

      if (res) {
        setIsEditing(false);
      }
    } catch (error) {
      alert("Failed to update profile");

    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = () => {
    alert("Logic coming later");
  };

  return (
    <div className="relative z-3 sm:z-0 w-full min-h-screen bg-[#F8EEED] flex flex-col items-start justify-start p-6 overflow-hidden font-sans">
      
      <div className="w-full mb-8 p-4">
        <NavigateBackButton title="Back to accounts" />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Profile Header Card */}
        <div className="p-8 flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between bg-white/80 backdrop-blur-md border border-white rounded-xl shadow-2xl shadow-slate-900/5">
          <div className="space-y-1">
            <span className="text-[0.75rem] font-bold tracking-[0.2em] text-slate-400 uppercase">Account Settings</span>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">
              {formData.name}
            </h2>
          </div>

          {!isEditing ? (
            <div className="flex flex-wrap gap-3 mt-6 sm:mt-0">
              <button 
                onClick={handlePasswordUpdate}
                className="bg-slate-800 text-white px-6 py-4 rounded-lg text-xs font-bold tracking-widest hover:bg-slate-900 transition-all active:scale-[0.98]"
              >
                Update Password
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-xs font-bold tracking-widest hover:bg-red-700 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="flex gap-4 mt-6 sm:mt-0">
              <button 
                onClick={() => setIsEditing(false)}
                disabled={isUpdating}
                className="bg-white text-slate-600 border border-slate-200 px-6 py-4 rounded-lg text-xs font-bold tracking-widest hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="bg-slate-900 text-white px-8 py-4 rounded-lg text-xs font-bold tracking-widest hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Personal Information Section */}
        <div className="bg-white border border-white rounded-xl shadow-xl shadow-slate-900/5 flex flex-col overflow-hidden">
          <div className="border-b border-slate-100 w-full p-8 bg-slate-50/50">
            <h2 className="text-[0.75rem] font-bold tracking-[0.15em] text-slate-500 uppercase">
              {isEditing ? "Edit Account Details" : "Personal Information"}
            </h2>
          </div>

          <div className="w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Full Name Field */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Full Name</h3>
              {isEditing ? (
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              ) : (
                <p className="text-lg font-bold text-slate-900">{formData.name}</p>
              )}
            </div>

            {/* Contact Field */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Contact Number</h3>
              {isEditing ? (
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <p className="text-lg font-bold text-slate-900">{formData.phone}</p>
              )}
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Security Note</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pl-3">
              Ensuring your personal information is accurate helps us protect your account. 
              Never share your banking credentials or passwords with third parties.
            </p>
          </div>
        </div>

        <div className="flex justify-start pb-12">
          {!isEditing && (
            <button onClick={() => logout()} className="px-10 py-4 bg-transparent text-red-500 border border-red-100 rounded-lg font-bold tracking-widest hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98]">
              Logout Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}