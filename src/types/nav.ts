export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  /** Direct link target. Omit when the item only opens a dropdown. */
  href?: string;
  /** Dropdown entries shown under the item. */
  children?: NavChild[];
};