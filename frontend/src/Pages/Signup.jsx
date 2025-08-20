import { signup } from '@/api/internal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    contact: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({type: '', message: ''});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await signup(data)
      if(response.status === 201){
        setMessage({type: 'success', message: 'Account created successfully!'})
        setSubmitting(false)
        setData({
          username: '',
          email: '',
          contact: '',
          password: ''
        })
        navigate('/login')
      }else if(response.code === "ERR_BAD_REQUEST"){
        setError(response.response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg text-center">
          Signup
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {message.type === 'success' && <div className="text-green-600 text-base bg-green-200 h-14 content-center rounded-md text-center">{message.message}</div>}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Username</label>
            <input
              type="text"
              value={data.username}
              onChange={e => setData({...data, username: e.target.value})}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Email</label>
            <input
              type="text"
              value={data.email}
              onChange={e => setData({...data, email: e.target.value})}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Contact</label>
            <input
              type="text"
              value={data.contact}
              onChange={e => setData({...data, contact: e.target.value})}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Password</label>
            <input
              type="password"
              value={data.password}
              onChange={e => setData({...data, password: e.target.value})}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide disabled:opacity-50"
          >
            {submitting ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 