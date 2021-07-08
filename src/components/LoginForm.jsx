import React from 'react'

const LoginForm = ({username, password,chengeeUsername,chengeePassword, onSubmit }) => (
  <form onSubmit={onSubmit}>
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
)

export default LoginForm