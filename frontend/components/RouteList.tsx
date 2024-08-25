"use client";

export interface RouteProp {
  name: string;
  path: string;
}

export const routeList: RouteProp[] = [
  { name: "Gallary", path: "/" },
  { name: "Create", path: "/services" },
  { name: "About", path: "/contact" },
];
