import './index.css'

const TabItem = props => {
  const {tabDetails, changeTabButton, isActive} = props
  const {tabId, displayText} = tabDetails

  const activeClassName = isActive ? 'active-tab' : ''
  const onClickTabChange = () => {
    changeTabButton(tabId)
  }
  return (
    <li className="tab-list-item">
      <button
        type="button"
        className={`tab-button ${activeClassName}`}
        onClick={onClickTabChange}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
