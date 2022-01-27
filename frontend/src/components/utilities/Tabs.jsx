import React from "react"
import { Link } from "react-router-dom"
import Scrollbar from "react-scrollbars-custom"

export default class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polish: false,
      activeTab: this.props.children[this.props.activeIndex || 0].props.label,
    }
  }

  changeTab = (tab) => {
    this.setState({
      activeTab: tab,
    })
  }

  togglePolish = () => {
    this.setState({
      polish: !this.state.polish,
    })
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
          <TabButtons
            activeTab={this.state.activeTab}
            buttons={buttons}
            changeTab={this.changeTab}
            togglePolish={this.togglePolish}
          />
        </div>
        <article
          className={`relative bg-cover rounded-xl flex items-start justify-between space-x-8 w-full ${
            this.state.polish ? "bg-hero" : "bg-slate-100"
          }`}
        >
          <div className="w-full p-2">
            <Scrollbar style={{ minHeight: "calc(65vh + 1.1rem)", maxHeight: "74vh" }}>
              <div className="p-2 h-full">{content}</div>
            </Scrollbar>
          </div>
        </article>
      </>
    )
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const TabButtons = ({ buttons, changeTab, activeTab, togglePolish }) => {
  return (
    <div className="relative w-full flex items-center justify-between">
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

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={togglePolish}
          className="p-1 rounded-full text-violet-300 hover:bg-violet-300 hover:text-white duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
