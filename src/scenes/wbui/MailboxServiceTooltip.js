import PropTypes from 'prop-types'
import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import ReactPortalTooltip from 'react-portal-tooltip'
import { withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import FAIcon from './FAIcon'
import { faExclamation } from '@fortawesome/pro-solid-svg-icons/faExclamation'
import { faGem } from '@fortawesome/pro-regular-svg-icons/faGem'
import DefaultTooltip400w from 'wbui/Tooltips/DefaultTooltip400w'
import ThemeTools from 'wbui/Themes/ThemeTools'

const styles = (theme) => ({
  root: {
    textAlign: 'center'
  },
  hr: {
    height: 1,
    border: 0,
    backgroundImage: 'linear-gradient(to right, #bcbcbc, #fff, #bcbcbc)'
  },
  proIcon: {
    color: ThemeTools.getValue(theme, 'wavebox.popover.color'),
    fontSize: 14,
    marginRight: 2
  },
  authInvalidText: {
    color: red['A200']
  },
  authInvalidIcon: {
    color: red['A200'],
    width: 14,
    height: 14,
    marginRight: 6
  }
})

@withStyles(styles, { withTheme: true })
class MailboxServiceTooltip extends React.Component {
  /* **************************************************************************/
  // Class
  /* **************************************************************************/

  static propTypes = {
    ...ReactPortalTooltip.propTypes,
    mailbox: PropTypes.object.isRequired,
    service: PropTypes.object.isRequired,
    isRestricted: PropTypes.bool.isRequired
  }

  /* **************************************************************************/
  // Rendering
  /* **************************************************************************/

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const {
      mailbox,
      service,
      isRestricted,
      classes,
      theme,
      ...passProps
    } = this.props

    if (!mailbox.displayName) { return false }

    let unreadContent
    if (isRestricted) {
      unreadContent = (
        <span>
          <FAIcon icon={faGem} className={classes.proIcon} />
          <span>Upgrade to Pro</span>
        </span>
      )
    } else if (mailbox.isAuthenticationInvalid) {
      unreadContent = (
        <span className={classes.authInvalidText}>
          <FAIcon icon={faExclamation} className={classes.authInvalidIcon} />
          <span>Authentication Problem. Right click to reauthenticate</span>
        </span>
      )
    } else if (service.supportsUnreadCount || service.supportsUnreadActivity) {
      const unreadType = service.humanizedUnreadItemType
      if (service.supportsUnreadCount && service.unreadCount > 0) {
        const count = service.unreadCount
        unreadContent = `${count} unread ${unreadType}${count === 1 ? '' : 's'}`
      } else if (service.supportsUnreadActivity && service.hasUnreadActivity) {
        unreadContent = `New unseen ${unreadType}s`
      } else {
        unreadContent = `No unread ${unreadType}s`
      }
    }

    return (
      <DefaultTooltip400w {...passProps}>
        <div className={classes.root}>
          <div>
            {`${service.humanizedTypeShort} : ${mailbox.displayName}`}
          </div>
          {unreadContent ? (
            <div>
              <hr className={classes.hr} />
              <div>{unreadContent}</div>
            </div>
          ) : undefined}
        </div>
      </DefaultTooltip400w>
    )
  }
}

export default MailboxServiceTooltip
