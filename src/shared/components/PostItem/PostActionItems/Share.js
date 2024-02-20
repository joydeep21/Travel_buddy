import share from "../../../../assets/share.svg";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import useToast from "../../../../hooks/useToast";

const Share = (props) => {
  const themeCtx = useContext(ThemeContext);
  const showToast = useToast();

  const shareLink = () => {
    showToast("Feature coming soon!!!", true);
  };

  return (
    <img
      src={share}
      onClick={shareLink}
      alt=""
      style={{
        filter: themeCtx.isDarkMode
          ? "invert(100%) sepia(3%) saturate(8%) hue-rotate(315deg) brightness(86%) contrast(80%)"
          : "none",
      }}
    />
  );
};

export default Share;
