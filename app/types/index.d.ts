export interface CollapsibleProps {
    collapsed: boolean
}

export interface MenuItemsProps {
    items: NavigationMenuItem[]
}

export interface HeaderProps extends CollapsibleProps, MenuItemsProps { }

export interface SidebarProps extends CollapsibleProps, MenuItemsProps { }

export interface UserMenuProps extends CollapsibleProps { }