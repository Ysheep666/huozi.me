const {PropTypes} = React
const {cx} = RcTabsUtils

const tabBarExtraContentStyle = {
  float: 'right',
};

function noop() {
}

const Nav = React.createClass({
  propTypes: {
    tabPosition: PropTypes.string,
    tabBarExtraContent: PropTypes.any,
    onTabClick: PropTypes.func,
  },

  mixins: [RcTabsInkBarMixin],

  getInitialState() {
    return {
      next: false,
      offset: 0,
      prev: false,
    };
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (prevProps && prevProps.tabPosition !== props.tabPosition) {
      this.setOffset(0);
      return;
    }
    const navNode = this.refs.nav;
    const navNodeWH = this.getOffsetWH(navNode);
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const state = this.state;
    let offset = state.offset;
    const minOffset = navWrapNodeWH - navNodeWH;
    let {next, prev} = this.state;
    if (minOffset >= 0) {
      next = false;
      this.setOffset(0);
      offset = 0;
    } else if (minOffset < offset) {
      next = (true);
    } else {
      next = (false);
      this.setOffset(minOffset);
      offset = minOffset;
    }

    if (offset < 0) {
      prev = (true);
    } else {
      prev = (false);
    }

    this.setNext(next);
    this.setPrev(prev);

    const nextPrev = {next, prev};
    // wait next,prev show hide
    if (this.isNextPrevShown(state) !== this.isNextPrevShown(nextPrev)) {
      this.setNextPrev({}, this.scrollToActiveTab);
    } else {
      // can not use props.activeKey
      if (!prevProps || props.activeKey !== prevProps.activeKey) {
        this.scrollToActiveTab();
      }
    }
  },

  onTabClick(key) {
    this.props.onTabClick(key);
  },

  // work around eslint warning
  setNextPrev(nextPrev, callback) {
    this.setState(nextPrev, callback);
  },

  getTabs() {
    const props = this.props;
    const children = props.panels;
    const activeKey = props.activeKey;
    const rst = [];
    const prefixCls = props.prefixCls;

    React.Children.forEach(children, (child)=> {
      const key = child.key;
      let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
      cls += ` ${prefixCls}-tab`;
      let events = {};
      if (child.props.disabled) {
        cls += ` ${prefixCls}-tab-disabled`;
      } else {
        events = {
          onClick: this.onTabClick.bind(this, key),
        };
      }
      const ref = {};
      if (activeKey === key) {
        ref.ref = 'activeTab';
      }
      rst.push(<div {...events}
        className={cls}
        key={key}
        {...ref}>
        <div className={`${prefixCls}-tab-inner`}>{child.props.tab}</div>
      </div>);
    });

    return rst;
  },

  getOffsetWH(node) {
    const tabPosition = this.props.tabPosition;
    let prop = 'offsetWidth';
    if (tabPosition === 'left' || tabPosition === 'right') {
      prop = 'offsetHeight';
    }
    return node[prop];
  },

  getOffsetLT(node) {
    const tabPosition = this.props.tabPosition;
    let prop = 'left';
    if (tabPosition === 'left' || tabPosition === 'right') {
      prop = 'top';
    }
    return node.getBoundingClientRect()[prop];
  },

  setOffset(offset) {
    const target = Math.min(0, offset);
    if (this.state.offset !== target) {
      this.setState({
        offset: target,
      });
    }
  },

  setPrev(v) {
    if (this.state.prev !== v) {
      this.setState({
        prev: v,
      });
    }
  },

  setNext(v) {
    if (this.state.next !== v) {
      this.setState({
        next: v,
      });
    }
  },

  isNextPrevShown(state) {
    return state.next || state.prev;
  },

  scrollToActiveTab() {
    const {activeTab, navWrap} = this.refs;
    if (activeTab) {
      const activeTabWH = this.getOffsetWH(activeTab);
      const navWrapNodeWH = this.getOffsetWH(navWrap);
      let {offset} = this.state;
      const wrapOffset = this.getOffsetLT(navWrap);
      const activeTabOffset = this.getOffsetLT(activeTab);
      if (wrapOffset > activeTabOffset) {
        offset += (wrapOffset - activeTabOffset);
        this.setState({offset});
      } else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
        offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
        this.setState({offset});
      }
    }
  },

  prev() {
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const state = this.state;
    const offset = state.offset;
    this.setOffset(offset + navWrapNodeWH);
  },

  next() {
    const navWrapNode = this.refs.navWrap;
    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
    const state = this.state;
    const offset = state.offset;
    this.setOffset(offset - navWrapNodeWH);
  },

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = props.prefixCls;
    const tabs = this.getTabs();
    const tabMovingDirection = props.tabMovingDirection;
    const tabPosition = props.tabPosition;
    let inkBarClass = `${prefixCls}-ink-bar`;
    if (tabMovingDirection) {
      inkBarClass += ` ${prefixCls}-ink-bar-transition-${tabMovingDirection}`;
    }
    let nextButton;
    let prevButton;

    const showNextPrev = state.prev || state.next;

    if (showNextPrev) {
      prevButton = (<span
        onClick={state.prev ? this.prev : noop}
        unselectable="unselectable"
        className={cx({
          [`${prefixCls}-tab-prev`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !state.prev,
        })}>
        <span className={`${prefixCls}-tab-prev-icon`}></span>
      </span>);

      nextButton = (<span
        onClick={state.next ? this.next : noop}
        unselectable="unselectable"
        className={cx({
          [`${prefixCls}-tab-next`]: 1,
          [`${prefixCls}-tab-btn-disabled`]: !state.next,
        })}>
        <span className={`${prefixCls}-tab-next-icon`}></span>
      </span>);
    }

    let navOffset = {};
    if (tabPosition === 'left' || tabPosition === 'right') {
      navOffset = {
        top: state.offset,
      };
    } else {
      navOffset = {
        left: state.offset,
      };
    }

    const tabBarExtraContent = this.props.tabBarExtraContent;

    return (<div className={`${prefixCls}-tabs-bar`}>
      {tabBarExtraContent ? <div style={tabBarExtraContentStyle}>{tabBarExtraContent}</div> : null}
      <div className={`${prefixCls}-nav-container ${showNextPrev ? `${prefixCls}-nav-container-scrolling` : ''}`}
           style={props.style}
           ref="container">
        {prevButton}
        {nextButton}
        <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
          <div className={`${prefixCls}-nav-scroll`}>
            <div className={`${prefixCls}-nav`} ref="nav" style={navOffset}>
              <div className={inkBarClass} ref="inkBar"/>
              {tabs}
            </div>
          </div>
        </div>
      </div>
    </div>);
  },
});

RcTabsNav = Nav;
