import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUserForm from "../components/UpdateUserForm";
export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };
  console.log(currentUser)
  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width:200, margin: 20}}>
      <img src={currentUser.pfp} style={{width: 200, height: 200, borderRadius: 200, objectFit: 'cover'}}></img>
      <h1>@{profileUsername}</h1>
    </div>
    <div style={{marginLeft: 20}}>
      <p style={{fontWeight: 'bold', marginBottom: 0}}>Bio:</p>
      <p style={{marginTop: 0}}>{currentUser.bio}</p>
    </div>
    {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
    {
      !!isCurrentUserProfile
      && <UpdateUserForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    }
  </>;
}
