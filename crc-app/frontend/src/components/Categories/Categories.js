import "./Categories.scss";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { setConfig } from "../../utils/requestConfig";
import useHttp from "../../hooks/useHttp";
import { authContext } from "../../context/authContext";

export default function Categories({ setTrainingCategory }) {
  const [categories, setCategories] = useState([]);
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  const onChangeCategoryHandler = (category) => {
    setTrainingCategory(category);
  };

  const {
    requestForData: fetchCategories,
    isLoading,
    isError,
  } = useHttp((value) => value);

  useEffect(() => {
    async function getCategories() {
      if (authCtx.authToken === null) {
        return navigate("/auth/login");
      }
      const getCategories = await fetchCategories(
        "http://localhost:8800/trainings",
        setConfig("GET", null, true, authCtx.authToken)
      );
      if (!getCategories) return;
      const { allCategories } = getCategories;
      setCategories(
        allCategories.map((category) => {
          return category.training_category;
        })
      );
    }
    getCategories();
  }, []);

  return (
    <header className="main-header">
      <nav className="categories">
        {isError && <p>Failed to load categories</p>}
        {categories?.map((category) => (
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
