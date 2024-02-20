import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { Link } from "react-router-dom";

const NavbarItem = (props) => {
  const themeCtx = useContext(ThemeContext);
  return (
    <Link to={props.to}>
      <img
        style={{
          filter:
            props.active === props.alt
              ? "brightness(0) saturate(100%) invert(35%) sepia(32%) saturate(7480%) hue-rotate(192deg) brightness(100%) contrast(83%)"
              : themeCtx.isDarkMode
              ? "invert(50%) grayscale(100%) brightness(100%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(100%)"
              : "none",
          transform: props.active === props.alt ? "scale(1)" : "none",
          mixBlendMode: props.active === props.alt ? "difference" : "normal",
        }}
        src={props.src}
        alt={props.alt}
      />
    </Link>
  );
};
export default NavbarItem;
