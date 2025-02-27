import * as React from 'react'
import * as Kb from '../common-adapters/mobile.native'
import * as Styles from '../styles'
import Router from '../router-v2/router'
import {PortalHost} from '@gorhom/portal'
import ResetModal from '../login/reset/modal'
import GlobalError from './global-errors/container'
import OutOfDate from './out-of-date'
import RuntimeStats from './runtime-stats'
import {getBarStyle} from '../common-adapters/use-fix-statusbar.native'
import {useColorScheme} from 'react-native'

const Main = () => {
  // just used to trigger statusbar
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <>
      <Kb.NativeStatusBar key={isDarkMode ? 'dark' : 'light'} barStyle={getBarStyle()} />
      <Router />
      <PortalHost
        name="popup-root"
        // @ts-ignore
        pointerEvents="box-none"
        style={Styles.globalStyles.fillAbsolute}
      />
      <Kb.KeyboardAvoidingView
        style={Styles.globalStyles.fillAbsolute}
        pointerEvents="box-none"
        behavior={Styles.isIOS ? 'padding' : undefined}
      >
        <Kb.Box2 direction="vertical" pointerEvents="box-none" fullWidth={true} style={styles.portalParent}>
          <PortalHost name="keyboard-avoiding-root" />
        </Kb.Box2>
      </Kb.KeyboardAvoidingView>
      <ResetModal />
      <GlobalError />
      <OutOfDate />
      <RuntimeStats />
    </>
  )
}

const styles = Styles.styleSheetCreate(() => ({
  portalParent: {flexGrow: 1, position: 'relative'},
}))

export default Main
