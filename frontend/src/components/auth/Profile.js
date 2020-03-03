import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
  state = {
    user: {}
  }

  async getData() {
    try {
      const res = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async id => {
    try {
      await axios.delete(`/api/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      Auth.logout()
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { username, email, image, id } = this.state.user
    return (
      <div>
        <h2>{username}</h2>
        <p>{email}</p>
        <img src={image} alt="profile" />
        <Link to={'/profile/edit'} className="button">
          Edit Profile
        </Link>
        <button className="button is-danger" onClick={() => this.handleDelete(id)}>Delete account</button>
      </div>
    )
  }
}

export default Profile