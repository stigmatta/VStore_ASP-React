import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import React from "react";

export default function ShowMoreGreen({ isUser, id, items }) {
  const linkPath = isUser
    ? `/Profile/${id}/Achievements`
    : `/Game/${id}/Achievements`;

  return (
    <Link to={linkPath}>
      <div className="flex gap-1">
        <span className="text-green">Show more</span>
        <ChevronRight size={24} color="#7BC74D" />
      </div>
    </Link>
  );
}
