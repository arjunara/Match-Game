import './index.css'

const ThumbnailItem = props => {
  const {thumbnailDetails, changeThumbnail} = props
  const {id, thumbnailUrl} = thumbnailDetails

  const onClickThumbnail = () => {
    changeThumbnail(id)
  }
  return (
    <li className="thumbnail-list-item">
      <button
        type="button"
        className="thumbnail-btn"
        onClick={onClickThumbnail}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default ThumbnailItem
