import React from "react";

import './style.scss';

interface ListProps {
  children: React.ReactNode;
}

const List: React.FC<ListProps> = ({ children }) => {
  return (
    <li className="list">
      {children}
    </li>
  );
};

export default List;
