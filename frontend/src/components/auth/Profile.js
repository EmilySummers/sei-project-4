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
      <div className="hero profile-hero">
        <div className="profile-wrapper">
          <div className="profile-container">
            <img className="profile-image" src={image} alt="profile" />
            <h2>{username}</h2>
            <p>{email}</p>
          </div>
          <div className="profile-buttons">
            <Link to={'/profile/edit'} className="button edit">
              Edit Profile
        </Link>
            <button className="button delete-account" onClick={() => this.handleDelete(id)}>Delete account</button>
          </div>
        </div>
      </div >
    )
  }
}

export default Profile