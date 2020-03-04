import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    const preset = this.props.preset
    data.append('file', files[0])
    data.append('upload_preset', `${preset}`)
    const res = await axios.post('https://api.cloudinary.com/v1_1/dqrkw1z1a/image/upload', data)
    this.setState({ image: res.data.url }, () => {
      this.props.handleChange({ target: { name: this.props.fieldName, value: res.data.url } })
    })
  }

  render() {
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const displayImgUp = this.props.displayImgUp
    const { image } = this.state
    return (
      <>
        {image && displayImgUp ?
          <div>
            <img src={image} alt="profile" />
          </div>
          :
          <>
            {/* <label className={labelClass}>{this.props.labelText}</label> */}
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
      </>
    )
  }
}

export default ImageUpload