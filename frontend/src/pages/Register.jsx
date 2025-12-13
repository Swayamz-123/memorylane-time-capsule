import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function SignupPage() {
    const { register } = useAuth(); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const [fullName, setFullName] = useState('');
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 
        if (!fullName ||  !email || !password ) {
            setError("Please fill all required fields and upload an avatar.");
            return;
        }
        
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);

        try {
            await register(formData); 
            alert('Signup successful! You will now be redirected to the login page.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
            console.error("Signup failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleFormSubmit} className="auth-form">
                <h2>Create Account</h2>
                {error && <p className="error-message">{error}</p>}
                

                <input 
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) => setFullName(e.target.value)} 
                    value={fullName}
                    required
                />
                    <input 
                        type="email" 
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                
                <input 
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
                
                <p className="redirect-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default SignupPage;
