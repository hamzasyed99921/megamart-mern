import { login } from '@/api/internal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message,setMessage] = useState({type: '', message: ''})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    if (!username || !password) {
      setError('Please enter both username and password.');
      setSubmitting(false);
      return;
    }
    try {
      const response = await login({username, password})
      // console.log(response.data)
      
      if(response.status === 200){
        setSubmitting(false)
        setMessage({type: 'success', message: 'User Login Successfully!'})
        localStorage.setItem('token', response.data.user.username)
        localStorage.setItem('auth', response.data.auth);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('role', response.data.user.role);

        
        window.dispatchEvent(new Event('authChange'));
        navigate('/')
      }else if(response.status === 401){
        setError(response)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-100/40 via-white/60 to-purple-100/40 py-12 px-2">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-cyan-200/40 futuristic-card">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 futuristic-title drop-shadow-lg text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        {message.type === 'success' && <div className="text-green-600 text-base bg-green-200 h-14 content-center rounded-md text-center">{message.message}</div>}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-blue-900 futuristic-title">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-4 py-2 rounded-lg border border-cyan-200/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-cyan-300 outline-none"
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            // disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-400 hover:to-blue-600 transition-all duration-200 futuristic-btn text-lg tracking-wide disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 