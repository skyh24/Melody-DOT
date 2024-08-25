/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Hesin
 * @Date: 2024-08-21 16:05:19
 * @LastEditors: Hesin
 * @LastEditTime: 2024-08-25 18:55:56
 */
"use client";

export interface RouteProp {
  name: string;
  path: string;
}

export const routeList: RouteProp[] = [
  { name: "home", path: "/" },
  { name: "Create", path: "/services" },
  { name: "contact", path: "/contact" },
];
