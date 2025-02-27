import * as React from 'react'
import * as ProfileGen from '../../actions/profile-gen'
import * as Kb from '../../common-adapters'
import * as Styles from '../../styles'
import * as RouteTreeGen from '../../actions/route-tree-gen'
import * as Container from '../../util/container'
import Modal from '../modal'

type OwnProps = {}

const Info = props => (
  <Modal onCancel={props.onCancel} skipButton={true}>
    <Kb.Box2 direction="vertical" fullWidth={true} gap="tiny" style={styles.content}>
      <Kb.PlatformIcon platform="pgp" overlay="icon-proof-unfinished" style={styles.centered} />
      <Kb.Text type="BodySemibold" style={styles.centered}>
        Fill in your public info.
      </Kb.Text>
      <Kb.LabeledInput
        autoFocus={true}
        placeholder="Your full name"
        value={props.fullName}
        onChangeText={props.onChangeFullName}
      />
      <Kb.LabeledInput
        placeholder="Email 1"
        onChangeText={props.onChangeEmail1}
        onEnterKeyDown={props.onNext}
        value={props.email1}
        error={props.errorEmail1}
      />
      <Kb.LabeledInput
        placeholder="Email 2 (optional)"
        onChangeText={props.onChangeEmail2}
        onEnterKeyDown={props.onNext}
        value={props.email2}
        error={props.errorEmail2}
      />
      <Kb.LabeledInput
        placeholder="Email 3 (optional)"
        onChangeText={props.onChangeEmail3}
        onEnterKeyDown={props.onNext}
        value={props.email3}
        error={props.errorEmail3}
      />
      <Kb.Text type={props.errorText ? 'BodySmallError' : 'BodySmall'}>
        {props.errorText || 'Include any addresses you plan to use for PGP encrypted email.'}
      </Kb.Text>
    </Kb.Box2>
    <Kb.Box2 fullWidth={true} direction="horizontal" gap="small">
      <Kb.Button type="Dim" label="Cancel" onClick={props.onCancel} />
      <Kb.Button
        label="Let the math begin"
        disabled={props.nextDisabled}
        onClick={props.onNext}
        style={styles.math}
      />
    </Kb.Box2>
  </Modal>
)

const styles = Styles.styleSheetCreate(
  () =>
    ({
      centered: {alignSelf: 'center'},
      content: {flexGrow: 1},
      math: {flexGrow: 1},
    } as const)
)

const mapStateToProps = state => ({
  email1: state.profile.pgpEmail1,
  email2: state.profile.pgpEmail2,
  email3: state.profile.pgpEmail3,
  errorEmail1: state.profile.pgpErrorEmail1,
  errorEmail2: state.profile.pgpErrorEmail2,
  errorEmail3: state.profile.pgpErrorEmail3,
  errorText: state.profile.pgpErrorText,
  fullName: state.profile.pgpFullName,
})

const mapDispatchToProps = dispatch => ({
  onCancel: () => dispatch(RouteTreeGen.createNavigateUp()),
  onChangeEmail1: pgpEmail1 => dispatch(ProfileGen.createUpdatePgpInfo({pgpEmail1})),
  onChangeEmail2: pgpEmail2 => dispatch(ProfileGen.createUpdatePgpInfo({pgpEmail2})),
  onChangeEmail3: pgpEmail3 => dispatch(ProfileGen.createUpdatePgpInfo({pgpEmail3})),
  onChangeFullName: pgpFullName => dispatch(ProfileGen.createUpdatePgpInfo({pgpFullName})),
  onNext: () => dispatch(ProfileGen.createGeneratePgp()),
})

export default Container.connect(mapStateToProps, mapDispatchToProps, (s, d, o: OwnProps) => ({
  ...o,
  ...s,
  ...d,
  nextDisabled: !s.email1 || !s.fullName || !!s.errorText,
}))(Info)
