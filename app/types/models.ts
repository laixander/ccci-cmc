export const colors = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'error',
    'neutral',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
] as const

export type ColorType = typeof colors[number]

export interface PageProps {
    title?: string
    description?: string
    alignCenter?: boolean
    toolbarClass?: string
}

export interface BlockProps {
    title?: string
    description?: string
    showDivider?: boolean        // Optional: shows divider if true
    noBodyPadding?: boolean      // Optional: removes body padding if true
    icon?: string
}

export interface StepperLayoutProps {
    step: number
    steps: string[]
    value: number
    stepComponents: any[] // You can replace `any` with a more specific type if needed
}

export interface StatCardProps {
    label: string
    count: number
    color: ColorType
    icon: string
    hasDetails?: boolean
    trendValue?: string           // e.g. "2%" or "-4%"
    trendDescription?: string     // optional sublabel
    useGradient?: boolean         // grdiet option
}

export interface ListItemProps {
    title: string
    description?: string
}

export interface ListIconProps {
    icon?: string
    styledIcon?: boolean
    label: string
    description?: string
    withContainer?: boolean
    iconColor?: string
}

export interface ListProfileProps {
    profilePhoto?: string
    profileName?: string
    profileDescription?: string
}

export interface BoardProps {
    title: string
    badgeLabel?: string | number
    badgeColor?: ColorType
}

export type BoardCardSource = 'external' | 'internal'
export type BoardCardPriority = 'high' | 'medium' | 'low'
export type BoardCardReviewer = 'Internal' | 'Partner' | 'Legal' | 'Final';
export interface BoardCardProps {
    boardColor?: string
    title: string
    institution: string
    contact: string
    description?: string
    progress?: number
    reviewer?: BoardCardReviewer
    source?: BoardCardSource
    priority?: BoardCardPriority
    dueDate?: string
    alert?: string
    timeSubmitted: string
}

export type BoardCardType = {
    title: string
    institution: string
    contact: string
    description?: string
    progress?: number
    reviewer?: BoardCardReviewer
    source?: BoardCardSource
    priority?: BoardCardPriority
    dueDate?: string
    alert?: string
    timeSubmitted: string
}

export type ProposalBoardType = {
    title: string
    badgeLabel: number
    badgeColor: ColorType
    cards: BoardCardType[]
}

export type WorkflowBoardType = {
    title: string
    badgeLabel: number
    badgeColor: ColorType
    cards: BoardCardType[]
}

import type { DropdownMenuItem } from '@nuxt/ui'
export type CardLayoutSection = 'description' | 'highlights' | 'tags'
export interface CardProps {
    title: string
    subtitle?: string
    description?: string
    tags?: string[]
    icon?: string
    actions?: DropdownMenuItem[]
    /** Controls the order of body sections */
    layout?: CardLayoutSection[]
}