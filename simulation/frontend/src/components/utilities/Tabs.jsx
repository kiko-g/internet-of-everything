import React from "react"
import PillDivNest from "./PillDivNest"

export default class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label,
  }

  changeTab = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    let content
    let buttons = []
    return (
      <>
        <PillDivNest color="bg-bluegray-100 dark:bg-bluegray-700 mb-4">
          {React.Children.map(this.props.children, (child) => {
            buttons.push(child.props.label)
            if (child.props.label === this.state.activeTab) content = child.props.children
          })}
          <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab} />
        </PillDivNest>
        <div
          className="bg-bluegray-100 p-4 rounded-xl flex items-start justify-between space-x-8 bg-opacity-90 w-full"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "75vh",
          }}
        >
          {content}
        </div>
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
                : "text-bluegray-700 dark:text-white no-underline border-transparent",
              "px-2 py-1 mx-1 h-auto transition duration-300 ease border-b-2 hover:text-bluegray-400 hover:border-bluegray-300"
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
