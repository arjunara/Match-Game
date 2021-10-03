import {Component} from 'react'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'

import './index.css'

class MatchGamePage extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = props
    const {tabsList} = props
    this.state = {
      isGameWin: false,
      matchedImageId: imagesList[0].id,
      score: 0,
      elapsedTime: 60,
      activeTabId: tabsList[0].tabId,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer(this.timerId)
  }

  stopTimer = () => clearInterval(this.timerId)

  changeTabButton = tabId => {
    const {imagesList} = this.props
    const filteredImagesList = imagesList.filter(
      each => each.category === tabId,
    )
    this.imagesList = filteredImagesList
    this.setState({activeTabId: tabId})
  }

  timerOnFunction = () => {
    const {elapsedTime} = this.state
    if (elapsedTime === 1) {
      this.stopTimer()
      this.setState({isGameWin: true})
    }
    this.setState(prevState => ({elapsedTime: prevState.elapsedTime - 1}))
  }

  startTimer = () => {
    this.timerId = setInterval(this.timerOnFunction, 1000)
  }

  onResetGame = () => {
    const {imagesList} = this.props
    const {tabsList} = this.props
    this.setState({
      isGameWin: false,
      matchedImageId: imagesList[0].id,
      score: 0,
      elapsedTime: 60,
      activeTabId: tabsList[0].tabId,
    })
    this.startTimer()
  }

  changeThumbnail = id => {
    const {matchedImageId} = this.state
    const {imagesList} = this.props
    if (id === matchedImageId) {
      const newImageObj = imagesList[Math.ceil(Math.random() * 30 - 1)]
      this.setState(prevState => ({
        score: prevState.score + 1,
        matchedImageId: newImageObj.id,
      }))
    } else {
      this.stopTimer()
      this.setState({isGameWin: true})
    }
  }

  renderScoreCardPage = () => {
    const {score} = this.state
    return (
      <div className="score-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="tropy-img"
        />
        <h1 className="your-score">YOUR SCORE</h1>
        <p className="your-score-value">{score}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={this.onResetGame}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          <p className="paly-again-text">PLAY AGAIN</p>
        </button>
      </div>
    )
  }

  getCategoryWiseImagesList = () => {
    const {imagesList} = this.props
    const {activeTabId} = this.state
    const filteredImagesList = imagesList.filter(
      each => each.category === activeTabId,
    )
    return filteredImagesList
  }

  getMarkedImage = () => {
    const {matchedImageId} = this.state
    const {imagesList} = this.props
    const findImage = imagesList.find(eachObj => eachObj.id === matchedImageId)
    return (
      <img src={findImage.imageUrl} alt="match" className="home-page-image" />
    )
  }

  renderGameHomePage = () => {
    const {tabsList} = this.props
    const {activeTabId} = this.state
    const categoryWiseImagesList = this.getCategoryWiseImagesList()
    return (
      <div className="app-container">
        <div className="home-container">
          {this.getMarkedImage()}
          <ul className="tabs-container">
            {tabsList.map(eachTab => (
              <TabItem
                tabDetails={eachTab}
                key={eachTab.tabId}
                changeTabButton={this.changeTabButton}
                isActive={eachTab.tabId === activeTabId}
              />
            ))}
          </ul>
          <ul className="thumbnail-container">
            {categoryWiseImagesList.map(eachImageDetails => (
              <ThumbnailItem
                thumbnailDetails={eachImageDetails}
                key={eachImageDetails.id}
                changeThumbnail={this.changeThumbnail}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isGameWin, elapsedTime, score} = this.state
    return (
      <div className="app-bg-container">
        <nav className="navbar">
          <div className="header-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <div className="score-container">
              <p className="score">
                score: <span className="score-count">{score}</span>
              </p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />
              <p className="timer-count">{elapsedTime} sec</p>
            </div>
          </div>
        </nav>
        <div className="app-container">
          {isGameWin ? this.renderScoreCardPage() : this.renderGameHomePage()}
        </div>
      </div>
    )
  }
}

export default MatchGamePage
