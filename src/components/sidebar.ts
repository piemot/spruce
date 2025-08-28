export interface SidebarPage {
  name: string;
  href: string;
  current: boolean;
}

export interface SidebarCategory {
  name: string;
  href: string;
  pages: SidebarPage[];
}
