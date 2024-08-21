"use client";

export interface RouteProp {
  name: string;
  path: string;
}

export const routeList: RouteProp[] = [
  { name: "home", path: "/" },
  { name: "services", path: "/pages/services" },
  { name: "contact", path: "/pages/contact" },
];
