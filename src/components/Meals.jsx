import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadMeals,
    isloading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isloading) {
    return <p className="center">Featching meals...</p>;
  }

  if(error) {
    return <Error title="Failed to fetch measls" message={error} />
  }

  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
