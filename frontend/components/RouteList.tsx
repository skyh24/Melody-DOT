"use client";

export interface RouteProp {
  name: string;
  path: string;
}

export const routeList: RouteProp[] = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "contact", path: "/contact" },
];
