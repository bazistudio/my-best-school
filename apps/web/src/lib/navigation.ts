export interface UserIdentity {
  id: string;
  name: string;
  email: string;
  role: string;
  branchId?: string;
  branchName?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  iconName?: string;
  badge?: string;
  requiredRole?: string[];
}
