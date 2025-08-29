import { useState } from 'react'
import { BaseModal } from '../components/modals/BaseModal'
import './LanguageMenuModal.css'

const LanguageMenuModal = ({ isOpen, handleClose }) => {
  // Default selections as specified: Māori for Interface, Hawaiian for Game
  const [interfaceLanguage, setInterfaceLanguage] = useState(() => {
    return localStorage.getItem('interfaceLanguage') || 'maori'
  })
  const [gameLanguage, setGameLanguage] = useState(() => {
    return localStorage.getItem('gameLanguage') || 'hawaiian'
  })

  const handleCancel = () => {
    // Reset to stored values
    setInterfaceLanguage(localStorage.getItem('interfaceLanguage') || 'maori')
    setGameLanguage(localStorage.getItem('gameLanguage') || 'hawaiian')
    handleClose()
  }

  const handleOK = () => {
    // Save to localStorage but don't connect to app behavior as specified
    localStorage.setItem('interfaceLanguage', interfaceLanguage)
    localStorage.setItem('gameLanguage', gameLanguage)
    handleClose()
  }

  return (
    <BaseModal
      title="Language Settings"
      isOpen={isOpen}
      handleClose={handleCancel}
    >
      <div className="language-modal-content">
        {/* Interface Language Group */}
        <div className="language-group">
          <h4 className="language-group-heading">Interface Language</h4>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="interfaceLanguage"
                value="hawaiian"
                checked={interfaceLanguage === 'hawaiian'}
                onChange={(e) => setInterfaceLanguage(e.target.value)}
                className="radio-input"
              />
              <span className="radio-label">Hawaiian</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="interfaceLanguage"
                value="maori"
                checked={interfaceLanguage === 'maori'}
                onChange={(e) => setInterfaceLanguage(e.target.value)}
                className="radio-input"
              />
              <span className="radio-label">Māori (under development)</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="interfaceLanguage"
                value="english"
                checked={interfaceLanguage === 'english'}
                onChange={(e) => setInterfaceLanguage(e.target.value)}
                className="radio-input"
              />
              <span className="radio-label">English</span>
            </label>
          </div>
        </div>

        {/* Game Language Group */}
        <div className="language-group">
          <h4 className="language-group-heading">Game Language</h4>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="gameLanguage"
                value="hawaiian"
                checked={gameLanguage === 'hawaiian'}
                onChange={(e) => setGameLanguage(e.target.value)}
                className="radio-input"
              />
              <span className="radio-label">Hawaiian</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="gameLanguage"
                value="maori"
                checked={gameLanguage === 'maori'}
                onChange={(e) => setGameLanguage(e.target.value)}
                className="radio-input"
              />
              <span className="radio-label">Māori</span>
            </label>
          </div>
        </div>

        {/* Thank you note */}
        <div className="thank-you-note">
          <p>Thank you to Mary Boyce for the Māori word list.</p>
        </div>

        {/* Action buttons */}
        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="button" className="ok-button" onClick={handleOK}>
            OK
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

export default LanguageMenuModal
