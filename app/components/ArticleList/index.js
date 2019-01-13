import { compose, lifecycle, branch, renderComponent } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GET_ARTICLES } from '../../constants/serviceTypes'
import { actions as asyncActions } from 'async-ops'
import { withRouter } from 'react-router'
import LoadingIcon from '../LoadingIcon'
import ArticleList from './component'

const mapStateToProps = state => ({
  loading: state.articles.loading,
  articles: state.articles.list
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncOperationStart: asyncActions.asyncOperationStart
}, dispatch)

const lifecycleMethods = {
  componentWillMount () {
    this.props.asyncOperationStart(GET_ARTICLES)
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle(lifecycleMethods),
  branch(props => props.loading, renderComponent(LoadingIcon))
)

export default enhance(ArticleList)
