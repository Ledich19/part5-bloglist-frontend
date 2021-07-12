import React from 'react'

const LoginForm = ({ username, password, chengeeUsername, chengeePassword, onSubmit }) => {
  return (
    <div>
      <form  onSubmit={onSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={chengeeUsername}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={chengeePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm