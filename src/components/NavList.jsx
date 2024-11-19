import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [
  {
    id: 1,
    url: "about",
    text: "About",
  },
  {
    id: 2,
    url: "products",
    text: "Products",
  },
  {
    id: 3,
    url: "orders",
    text: "Orders",
  },
  {
    id: 4,
    url: "checkout",
    text: "checkout",
  },
];

const NavList = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        if ((url === "orders" || url === "checkout") && !user) {
          return null;
        }

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
