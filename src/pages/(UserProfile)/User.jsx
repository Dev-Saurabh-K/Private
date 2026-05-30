
const User = () => {
    const URL = `${import.meta.env.VITE_API_URL}/api/user/data`
    // console.log(URL)

  return (
    <div>
        <div>
            hi, user
        </div>
        <div>
            <p>Username:</p>
            
        </div>
    </div>
  )
}

export default User