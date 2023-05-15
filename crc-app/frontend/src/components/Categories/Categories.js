import "./Categories.scss";
import { categories } from "../../appConfig";

import { Link, useParams } from "react-router-dom";

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
