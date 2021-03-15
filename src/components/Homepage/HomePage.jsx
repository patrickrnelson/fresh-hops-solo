import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user)

  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  const handleAdd = () => {
    history.push('/newbeer')
  }

  return (
    <div>
      <button onClick={handleAdd}> Add Beer </button>
      <h2>Hi, {user.name}!</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default HomePage;