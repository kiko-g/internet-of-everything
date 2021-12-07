import React from "react"
import PillDivNest from "./PillDivNest"
import tw from "twin.macro"
const Pill = tw.div`p-4 rounded-lg flex items-center justify-between space-x-8 bg-opacity-90`

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
                ? "text-blue-300 border-blue-300"
                : "no-underline border-transparent",
              "px-2 py-1 mx-1 h-auto transition duration-300 ease border-b-2 text-white hover:text-bluegray-400 hover:border-bluegray-300"
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

class Tabs extends React.Component {
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
        <PillDivNest color="bg-bluegray-700 dark:bg-bluegray-500 mb-4">
          {React.Children.map(this.props.children, (child) => {
            buttons.push(child.props.label)
            if (child.props.label === this.state.activeTab)
              content = child.props.children
          })}
          <TabButtons
            activeTab={this.state.activeTab}
            buttons={buttons}
            changeTab={this.changeTab}
          />
        </PillDivNest>
        <Pill className="bg-bluegray-100">{content}</Pill>
      </>
    )
  }
}

export default Tabs
