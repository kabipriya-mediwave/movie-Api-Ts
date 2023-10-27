import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout";
import { IMovie } from "../type";
import { updateMovie } from "../services/api";

interface IEditForm {
  movie: IMovie;
}

const Edit: React.FC<IEditForm> = ({ movie }) => {
  const { id } = useParams();
  const [editValue, setEditValue] = useState({
    title: movie.title,
    year: movie.year,
  });

  useEffect(() => {
    console.log("Getting info of ", id);
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  }

  async function handleEditMovie() {
    try {
      const moviePayload = {
        title: editValue.title,
        year: editValue.year,
      };
      const response = await updateMovie(moviePayload, movie.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Layout title="EDIT FORM">
        <h1>Edit Form</h1>
        <form>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              value={editValue.title}
              placeholder="Title"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>

          <label htmlFor="year">
            Year
            <input
              type="number"
              id="year"
              name="year"
              value={editValue.year}
              placeholder="Year"
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
          <div className="grid">
            <Link to="/">
              <button onClick={() => handleEditMovie()}>add</button>
            </Link>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Edit;
