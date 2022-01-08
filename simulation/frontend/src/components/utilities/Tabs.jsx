import React from "react"
import Scrollbar from "react-scrollbars-custom"

export default class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
    this.state = {
      activeTab: this.props.children[this.props.activeIndex || 0].props.label,
    }
  }

  changeTab = (tab) => {
    this.setState({
      activeTab: tab,
    })
  }

  componentDidMount() {
    this.special = this.state.activeTab === "JSON"
  }

  componentDidUpdate() {
    this.special = this.state.activeTab === "JSON"
  }

  componentWillUnmount() {
    this.special = false
  }

  render() {
    let content
    let buttons = []

    return (
      <>
        <div className="p-4 rounded-xl flex items-center justify-start space-x-3 bg-slate-100 dark:bg-slate-700 mb-4">
          {React.Children.map(this.props.children, (child) => {
            buttons.push(child.props.label)
            if (child.props.label === this.state.activeTab) content = child.props.children
          })}
          <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab} />
        </div>
        <article
          className="relative bg-cover rounded-xl flex items-start justify-between space-x-8 bg-opacity-90 w-full
            bg-[url('https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg')]"
        >
          <div className="w-full p-2">
            {this.special ? (
              <Scrollbar style={{ minHeight: "calc(65vh + 1rem)", maxHeight: "74vh" }}>
                <div className="p-2 h-full">{content}</div>
              </Scrollbar>
            ) : (
              <div className="p-2 h-full">{content}</div>
            )}
          </div>
        </article>
      </>
    )
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div>
      {buttons.map((button, index) => {
        return (
          <button
            key={`tab-${index}`}
            className={classNames(
              button === activeTab
                ? "text-blue-400 dark:text-blue-300 border-blue-300"
                : "text-slate-700 dark:text-white no-underline border-transparent",
              "px-2 py-1 mx-1 h-auto transition duration-300 ease border-b-2 hover:text-slate-400 hover:border-slate-300"
            )}
            onClick={() => changeTab(button)}
          >
            {button}
          </button>
        )
      })}
    </div>
  )
}
