import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [signUpValues, setSignUpValues] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    bio: 'THIS IS A BIO',
    pfp:'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
    location: ''
  })
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const errorArr = [];
    if(!signUpValues.username){
      errorArr.push('username')
    }
    if (!signUpValues.password){
      errorArr.push('password')
    }
    if(!signUpValues.first_name){
      errorArr.push('first name')
    }
    if(!signUpValues.last_name){
      errorArr.push('last name')
    }
    if(errorArr.length){
      return setErrorText(`Missing ${errorArr.join(' or ')}`)
    }
    // if (!username || !password) return setErrorText('Missing username or password');
    console.log(signUpValues)
    const [user, error] = await createUser(signUpValues);
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setSignUpValues({...signUpValues, username: value});
    if (name === 'password') setSignUpValues({...signUpValues, password: value});
    if (name === 'first_name') setSignUpValues({...signUpValues, first_name: value});
    if (name === 'last_name') setSignUpValues({...signUpValues, last_name: value});
  };

  return <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
      <h2 id="create-heading">Create New User</h2>
      <label htmlFor="username">Username</label>
      <input
        autoComplete="off"
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        value={signUpValues.username}
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="off"
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={signUpValues.password}
      />

      <label htmlFor="first_name">First Name</label>
      <input
        autoComplete="off"
        type="text"
        id="first_name"
        name="first_name"
        onChange={handleChange}
        value={signUpValues.first_name}
      /> 

      <label htmlFor="last_name">last Name</label>
      <input
        autoComplete="off"
        type="text"
        id="last_name"
        name="last_name"
        onChange={handleChange}
        value={signUpValues.last_name}
      /> 


      {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      */}

      <button>Sign Up Now!</button>
    </form>
    { !!errorText && <p>{errorText}</p> }
    <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
  </>;
}
