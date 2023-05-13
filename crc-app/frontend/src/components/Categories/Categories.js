import "./Categories.scss";

import { Link, useParams } from "react-router-dom";

const categories = [
  "data science",
  "software engineering",
  "game development",
  "mobile development",
];

export default function Categories({ setTrainingCategory }) {
  const onChangeCategoryHandler = (category) => {
    setTrainingCategory(category);
  };

  return (
    <header className="main-header">
      <nav className="categories">
        {categories.map((category) => (
          <Link
            to={`/trainings/${category}`}
            style={{ textDecoration: "none" }}
          >
            <span
              className={category ? "active" : undefined}
              key={Math.random() * 1000}
              onClick={() => onChangeCategoryHandler(category)}
            >
              {category}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
