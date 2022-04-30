// Dependencies
import React from "react";
import Link from "next/link";

// Types
import { NavigationProps, NavItemProp } from "./types";

// Components
import { Layout } from "./styles";

function Navigation({ routes }: NavigationProps) {
  return (
    <Layout>
      {routes.map((route: NavItemProp, index: number) => (
        <Link href={route.path} key={`--route-path-${index.toString()}`}>
          <a className={route.isActive ? "active" : ""}>{route.label}</a>
        </Link>
      ))}
    </Layout>
  );
}

export default Navigation;
