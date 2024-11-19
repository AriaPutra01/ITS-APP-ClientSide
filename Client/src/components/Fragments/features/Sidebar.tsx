import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Tambahkan useLocation
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";

type SidebarContextType = {
  expanded: boolean;
  open: () => void;
};

const SidebarContext = createContext({} as SidebarContextType);

export default function Sidebar({
  children,
  img,
  title,
  username,
  email,
}: any) {
  const [expanded, setExpanded] = useState(false);
  const open = () => setExpanded(true);
  return (
    <aside className="h-full flex flex-col bg-white border-r shadow-sm transition-all ">
      <div className="py-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <img
            src={img}
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }`}
            alt=""
          />
          {expanded && (
            <span className="text-gray-600 font-bold text-xl">{title}</span>
          )}
        </div>
        <button
          onClick={() => {
            setExpanded((curr) => !curr);
          }}
          className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors">
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      <SidebarContext.Provider value={{ expanded, open }}>
        <ul className="flex-1 px-3 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {children}
        </ul>
      </SidebarContext.Provider>

      <div
        className={`border-t-2 flex justify-${
          expanded ? "start" : "center"
        } items-center p-3`}>
        <img src={img} alt="" className="w-8 transition-all rounded-md" />
        <div
          className={`
              flex justify-between items-center
              overflow-hidden transition-all
              ${expanded ? "w-full" : "w-0"}
          `}>
          <div className="leading-4 ps-[1rem]">
            <h4 className="font-semibold">{username}</h4>
            <span className="text-xs text-gray-600">{email}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function SidebarItem({
  onClick,
  href,
  icon = <MdKeyboardArrowRight />,
  text,
  alert,
}: any) {
  const { expanded, open } = useContext(SidebarContext);
  const location = useLocation();
  const active = location.pathname === href;
  return (
    <li>
      <Link
        onClick={onClick || open}
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-sky-600 to-sky-500 border-b-2 text-slate-100"
            : "hover:bg-sky-50 text-gray-600"
        }
    `}
        to={href}>
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "ml-[1rem]" : "w-0"
          }`}>
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-sky-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
      </Link>
    </li>
  );
}

export function SidebarCollapse({ children, icon, text, alert }: any) {
  const { expanded, open } = useContext(SidebarContext);
  const [drop, setDrop] = useState(false);
  const location = useLocation(); // Dapatkan path saat ini

  // Periksa apakah salah satu children aktif
  const isChildActive = children.some(
    (child: any) => location.pathname === child.props.href
  );

  useEffect(() => {
    if (isChildActive) {
      setDrop(true);
    }
  }, [isChildActive]);

  return (
    <>
      <li
        onClick={() => {
          if (expanded) {
            setDrop((curr) => !curr);
          }
          open();
        }}
        className={`relative flex justify-between items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isChildActive
            ? "bg-gradient-to-tr from-sky-200 to-sky-100 text-sky-800"
            : "hover:bg-sky-50 text-gray-600"
        }`}>
        <div className="flex justify-center items-center gap-[.5rem]">
          {icon}
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-44 ml-4" : "w-0"
            }`}>
            {text}
          </span>
        </div>

        {expanded && (drop ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />)}

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-sky-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
      </li>

      {expanded && (
        <ul
          className={`transition-max-height ease-in-out overflow-hidden ${
            drop ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } ms-4 space-y-2`}>
          {children}
        </ul>
      )}
    </>
  );
}
