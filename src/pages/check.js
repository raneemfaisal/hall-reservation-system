import Home  from './Home';
import Login from './Login';
import { useUserContext } from './userContext';

export default function check() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {loading, error, user} = useUserContext();
return(
    <div> 
  {error && <p>{error}</p>}
  {loading ? <h2>Loading...</h2> : <>{user ? <Home />: <Login />}</>}
</div>
);

}