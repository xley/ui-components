import React from 'react'
import Collapsible from 'react-collapsible'
import { IconWrapper, LoadingIconWrapper, MenuItemWrapper, SubMenuWrapper, MenuItemLabelWrapper } from './style'
import { FontAwesomeIcon } from '../../../Icons'

export interface IMenuItemProps {
  /** HTML id to use for the menu */
  url?: string
  label: string
  icon?: JSX.Element
  render?: (label: string, iconContent?: JSX.Element, url?: string) => JSX.Element
  className?: string
  isLoading?: boolean
  isOpen?: boolean
  handleSizeChange?: () => void
}

export class MenuItem extends React.PureComponent<IMenuItemProps> {
  get icon (): JSX.Element | undefined {
    const { icon } = this.props

    if (icon) {
      return (
        <IconWrapper>
          {icon}
        </IconWrapper>
      )
    }
  }

  get loadingIcon (): JSX.Element | undefined {
    const {
      isLoading
    } = this.props

    if (isLoading) {
      return (
        <LoadingIconWrapper>
          <FontAwesomeIcon
            type='circle-o-notch'
            isSpinning
          />
        </LoadingIconWrapper>
      )
    }
  }

  get label (): JSX.Element {
    const {
      label
    } = this.props

    return (
      <MenuItemLabelWrapper>
        {label}
      </MenuItemLabelWrapper>
    )
  }

  get component () {
    const {
      render,
      url,
      label,
      className
    } = this.props

    if (render) {
      return (
        <MenuItemWrapper className={className}>
          {render(label, this.icon, url)}
        </MenuItemWrapper>
      )
    }

    return (
      <MenuItemWrapper className={className}>
        <a href={url}>
          {this.icon}
          {this.label}
          {this.loadingIcon}
        </a>
      </MenuItemWrapper>
    )
  }

  public render (): JSX.Element {
    const {
      children,
      isOpen,
      handleSizeChange
    } = this.props

    if (children) {
      return (
        <Collapsible
          trigger={this.component}
          open={isOpen}
          transitionTime={250}
          onOpen={handleSizeChange}
          onClose={handleSizeChange}
        >
          <SubMenuWrapper>
            {children}
          </SubMenuWrapper>
        </Collapsible>
      )
    }

    return this.component
  }
}