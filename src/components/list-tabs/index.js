import { connect } from 'react-redux'
import { get } from 'lodash'
import ListTabs from './component'
import { toggleList } from '../../actions/app'

const mapStateToProps = state => ({
  listsConfig: get(state, 'app.config.lists'),
  toggleList: get(state, 'app.listToggle.toggleList'),
})

const mapDispatchToProps = dispatch => ({
  changeListToggle: newToggle => dispatch(toggleList(newToggle)),
})

const ListTabsContainer = connect(mapStateToProps, mapDispatchToProps)(ListTabs)
export default ListTabsContainer
