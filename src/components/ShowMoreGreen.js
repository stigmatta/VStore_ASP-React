import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import React from "react";

export default function ShowMoreGreen() {
  return (
    <Link to="/Achievements">
      <div className="flex gap-1">
        <span className="text-green">Show more</span>
        <ChevronRight size={24} color="#7BC74D" />
      </div>
    </Link>
  );
}
