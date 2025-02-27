import {Dimensions, Platform, NativeModules} from 'react-native'
import RNFB from 'react-native-blob-util'
import * as iPhoneXHelper from 'react-native-iphone-x-helper'
import Constants from 'expo-constants'

const nativeBridge = NativeModules.KeybaseEngine || {
  getSecureFlagSetting: async () => Promise.resolve(true),
  isDeviceSecure: 'fallback',
  isTestDevice: false,
  serverConfig: '',
  setSecureFlagSetting: async () => Promise.resolve(true),
  uses24HourClock: false,
  usingSimulator: 'fallback',
  version: 'fallback',
}

type SetSecure = (s: boolean) => Promise<boolean> // true on successful write
type GetSecure = () => Promise<boolean>

export const setSecureFlagSetting: SetSecure =
  NativeModules?.ScreenProtector?.setSecureFlagSetting ?? (async (_s: boolean) => Promise.resolve(false))
export const getSecureFlagSetting: GetSecure =
  NativeModules?.ScreenProtector?.getSecureFlagSetting ?? (async () => Promise.resolve(false))
export const {version, isTestDevice, uses24HourClock} = nativeBridge
// Currently this is given to us as a boolean, but no real documentation on this, so just in case it changes in the future.
// Android only field that tells us if there is a lock screen.
export const isDeviceSecureAndroid: boolean =
  typeof nativeBridge.isDeviceSecure === 'boolean'
    ? nativeBridge.isDeviceSecure
    : nativeBridge.isDeviceSecure === 'true' || false

// @ts-ignore
export const isRemoteDebuggerAttached: boolean = typeof DedicatedWorkerGlobalScope !== 'undefined'
export const runMode = 'prod'

export const isIOS = Platform.OS === 'ios'
export const isAndroid = !isIOS
export const isMobile = true
export const isIPhoneX = iPhoneXHelper.isIphoneX()
export const isTablet = Platform.OS === 'ios' && Platform.isPad
export const isPhone = !isTablet

export const isDarwin = false
export const isElectron = false
export const isLinux = false
export const isWindows = false
export const isMac = false
export const isDebuggingInChrome = typeof location !== 'undefined'

export const defaultUseNativeFrame = true
export const fileUIName = 'File Explorer'
export const mobileOsVersion = Platform.Version
const mobileOsVersionNumber = typeof mobileOsVersion === 'string' ? parseInt(mobileOsVersion) : -1
export const isAndroidNewerThanM = isAndroid && mobileOsVersionNumber > 22
export const isAndroidNewerThanN = isAndroid && mobileOsVersionNumber >= 26
export const shortcutSymbol = ''
export const realDeviceName = Constants.deviceName ?? ''

export const windowHeight = Dimensions.get('window').height
// isLargeScreen means you have at larger screen like iPhone 6,7 or Pixel
// See https://material.io/devices/
export const isLargeScreen = windowHeight >= 667

const _dir = `${RNFB.fs.dirs.CacheDir}/Keybase`
export const logFileDir = _dir
export const pprofDir = _dir
export const serverConfigFileName = `${_dir}/keybase.app.serverConfig`

export const downloadFolder = ''
