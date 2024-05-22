import { useNavigate } from "react-router-dom";
import {updateUser} from "../adapters/user-adapter";
import { useState } from "react";

export default function UpdateUserForm({ currentUser, setCurrentUser }) {
  const [formValues, setFormValues] = useState({
    username: currentUser.username,
    bio: currentUser.bio,
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    pfp: currentUser.pfp
  })
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUser(Object.fromEntries(formData));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return <form onSubmit={handleSubmit} aria-labelledby="update-heading">
    <h2 id="update-heading">Update User {currentUser.username} </h2>
    <label htmlFor='username'>New Username</label>
    <input type='text' id='username' name='username' value={formValues.username} onChange={e => setFormValues({...formValues, username: e.target.value})}/>
    <label htmlFor='pfp'>New Profile Pictures</label>
    <input type='text' id='pfp' name='pfp' value={formValues.pfp} onChange={e => setFormValues({...formValues, pfp: e.target.value})}/>
    <label htmlFor='bio'>New Bio</label>
    <input type='text' id='bio' name='bio' value={formValues.bio} onChange={e => setFormValues({...formValues, bio: e.target.value})}/>
    <label htmlFor='first_name'>New First Name</label>
    <input type='text' id='first_name' name='first_name' value={formValues.first_name} onChange={e => setFormValues({...formValues, first_name: e.target.value})}/>
    <label htmlFor='last_name'>New Last Name</label>
    <input type='text' id='last_name' name='last_name' value={formValues.last_name} onChange={e => setFormValues({...formValues, last_name: e.target.value})}/>
    {/* bio, pfp, first_name, last_name */}
    <input type="hidden" name="id" value={currentUser.id} />
    <button type='button' onClick={()=>{
      setFormValues({
        username: currentUser.username,
        bio: currentUser.bio,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        pfp: currentUser.pfp
      })
    }}>Reset values</button>
    <button>Update Username</button>
  </form>;
}
