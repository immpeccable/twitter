import { Link } from "react-router-dom";
import TweetIcon from "../../utils/images/tweet.png";
import HomeIcon from "../../utils/images/home.png";
import SearchIcon from "../../utils/images/search.png";
import MessageIcon from "../../utils/images/email.png";
import { ABSOLUTE_PATH } from "../../utils/constants";

export const Footer = () => {
  return (
    <footer
      className="inline-flex justify-between items-center fixed bottom-0 box-borde
    r w-full px-4 py-4 bg-[#16202a] z-20 border-t-2 border-gray-500 border-opacity-50"
    >
      <Link to={`${ABSOLUTE_PATH}/home`}>
        <img className="w-[20px] h-[20px]" src={HomeIcon} alt="home icon" />
      </Link>
      <Link to="explore">
        <img className="w-[20px] h-[20px]" src={SearchIcon} alt="search icon" />
      </Link>
      <img className="w-[20px] h-[20px]" src={MessageIcon} alt="message icon" />
    </footer>
  );
};
