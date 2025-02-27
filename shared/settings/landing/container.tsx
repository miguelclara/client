import logger from '../../logger'
import * as SettingsGen from '../../actions/settings-gen'
import * as Constants from '../../constants/settings'
import {connect, compose} from '../../util/container'
import Bootstrapable from '../../util/bootstrapable'
import Landing from '.'
import * as RouteTreeGen from '../../actions/route-tree-gen'

type OwnProps = {}

const mapStateToProps = state => {
  const {emails} = state.settings.email
  const {rememberPassword} = state.settings.password
  let accountProps
  let email = ''
  let isVerified = false
  if (emails && emails.first()) {
    const firstEmail = emails.first()
    email = firstEmail.email
    isVerified = firstEmail.isVerified
  }

  accountProps = {
    email,
    hasRandomPW: state.settings.password.randomPW,
    isVerified,
    onChangeEmail: () => logger.debug('todo'),
    onChangePassword: () => logger.debug('todo'),
    rememberPassword,
  }

  let bootstrapDone = !!accountProps

  return {
    bootstrapDone: bootstrapDone,
    originalProps: {
      account: accountProps,
    },
  }
}

const mapDispatchToProps = (dispatch: (a: any) => void) => ({
  onBootstrap: () => {
    dispatch(SettingsGen.createLoadSettings())
    dispatch(SettingsGen.createLoadRememberPassword())
    dispatch(SettingsGen.createLoadHasRandomPw())
  },
  onChangeEmail: () => dispatch(RouteTreeGen.createNavigateAppend({path: ['changeEmail']})),
  onChangePassword: () => dispatch(RouteTreeGen.createNavigateAppend({path: [Constants.passwordTab]})),
  onChangeRememberPassword: (checked: boolean) =>
    dispatch(SettingsGen.createOnChangeRememberPassword({remember: checked})),
  onInfo: selectedLevel =>
    dispatch(RouteTreeGen.createNavigateAppend({path: [{props: {selectedLevel}, selected: 'changePlan'}]})),
})

const mergeProps = (stateProps, dispatchProps, _: OwnProps) => {
  if (!stateProps.bootstrapDone) {
    return {
      ...stateProps,
      onBootstrap: dispatchProps.onBootstrap,
    }
  }

  return {
    ...stateProps,
    originalProps: {
      ...stateProps.originalProps,
      account: {
        ...stateProps.originalProps.account,
        onChangeEmail: dispatchProps.onChangeEmail,
        onChangePassword: dispatchProps.onChangePassword,
        onChangeRememberPassword: (checked: boolean) => dispatchProps.onChangeRememberPassword(checked),
      },
      plan: {
        ...stateProps.originalProps.plan,
        onInfo: selectedLevel => {
          dispatchProps.onInfo(selectedLevel)
        },
      },
    },
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps, mergeProps), Bootstrapable)(Landing)
