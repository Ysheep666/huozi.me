const {Router, Route, browserHistory} = ReactRouter

const isGuest = (nextState, replace) => {
  if (!Meteor.userId()) {
    replace({pathname: '/login', state: {nextPathname: nextState.location.pathname}})
  }
}

const isMember = (nextState, replace) => {
  if (Meteor.userId()) {
    replace('/dashboard')
  }
}

Meteor.startup(() => {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Welcome}/>
      <Route path="/login" component={Login} onEnter={isMember}/>
      <Route path="/register" component={Register} onEnter={isMember}/>
      <Route path="/forgot-password" component={ForgotPassword} onEnter={isMember}/>
      <Route path="/reset-password" component={ResetPassword} onEnter={isMember}/>
      <Route path="/dashboard(/:chose)" component={Dashboard} onEnter={isGuest}/>
      <Route path="/notes/:id" component={Note} onEnter={isGuest}/>
    </Router>
  ), document.getElementById('render-target'))
})
