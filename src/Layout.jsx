    url: createPageUrl("Products"),
    icon: Package,
  },
  {
    title: "Scanner",
    url: createPageUrl("Scanner"),
    icon: QrCode,
  },
  {
    title: "Import Data",
    url: createPageUrl("Import"),
    icon: Upload,
  },
  {
    title: "Export Data",
    url: createPageUrl("Export"),
    icon: Download,
  },
  {
    title: "Mass Assignment",
    url: createPageUrl("MassAssignment"),
    icon: Zap,
  },
];
export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="border-r border-slate-200">
          <SidebarHeader className="sidebar-brand p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">InventoryPro</h2>
                <p className="text-xs text-white/70">Smart Warehouse Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`nav-item-hover rounded-xl transition-all duration-200 ${
                          location.pathname === item.url 
@@ -152,26 +112,26 @@ export default function Layout({ children, currentPageName }) {
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">Warehouse Manager</p>
                <p className="text-xs text-slate-500 truncate">Inventory Control</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold">InventoryPro</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-slate-50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
