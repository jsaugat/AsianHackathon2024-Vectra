import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import axios from 'axios'; // Using axios for API requests

export default function Login() {
  const [credentials, setCredentials] = useState({
    // username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', credentials);

      if (response.status === 201) {
        // Store user details or token in localStorage
        console.log("response ", response)
        localStorage.setItem('user', JSON.stringify(response)); // Storing user details
        // Or if you're using a token: localStorage.setItem('token', response.data.token);

        console.log('Login successful:', response.data);

        // Navigate to homepage after successful login
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </div> */}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-red-600">{error}</p>} {/* Show error message if login fails */}

              <Button type="submit">
                Sign in
              </Button>

              <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
