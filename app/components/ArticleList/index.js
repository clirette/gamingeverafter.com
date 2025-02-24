import { compose } from 'redux'
import { withRouter } from 'react-router'
import ArticleList from './component'

const enhance = compose(
  withRouter
)

export default enhance(ArticleList)
