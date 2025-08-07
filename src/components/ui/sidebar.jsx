import React from 'react'

export function Sidebar({ className = '', children }) {
  return <aside className={className}>{children}</aside>
}

export function SidebarContent({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarGroup({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarGroupLabel({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarGroupContent({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenu({ className = '', children }) {
  return <nav className={className}>{children}</nav>
}

export function SidebarMenuItem({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenuButton({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function SidebarHeader({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarFooter({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarProvider({ children }) {
  return <>{children}</>
}

export function SidebarTrigger({ className = '', ...props }) {
  return (
    <button className={className} {...props}>
      ≡
    </button>
  )
}
