import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default HomePage;