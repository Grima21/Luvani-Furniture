import React from "react";
import { Link } from "react-router-dom";

export default function MegaMenuPanel({ panelSections }) {
  if (!panelSections || panelSections.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        No content avaible for this category
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {panelSections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/*Titulo de la columna*/}
          <h4 className="text-sm mb-3 ">{section.title}</h4>

          <ul className="space-y-2 text-sm">
            {section.links.map((linkItem, linkIndex) => (
              <li key={linkIndex}>
                {linkItem.to && linkItem.to !== "#" ? (
                  <Link to={linkItem.to} className="hover:text-gray-600 block">
                    {linkItem.name}
                  </Link>
                ) : (
                  <a
                    href={linkItem.to || "#"}
                    onClick={(e) => linkItem.to === "#" && e.preventDefault()}
                    className="hover:text-gray-600 block"
                  >
                    {linkItem.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
