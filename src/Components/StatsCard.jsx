// Import font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../util/fontAwesome.js";

// Component structure
export default function StatsCard({
  children,
  icon,
  bgColor,
  iconColor,
  count,
}) {
  // Variables
  const faIcon = icon;
  // end of variables
  return (
    <div className="w-1/3 flex justify-between items-center px-5 py-8 bg-white border rounded-2xl border-neutral-200">
      <div>
        <p className="text-neutral-600 mb-3">{children}</p>
        <p>{count}</p>
      </div>
      <div className={`${bgColor && bgColor} p-2 rounded-full ${iconColor}`}>
        <FontAwesomeIcon
          icon={`fa-solid ${faIcon}`}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: bgColor && bgColor,
          }}
        />
      </div>
    </div>
  );
}
