import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/api"; // Import deleteMovie function
import "@picocss/pico";
import Layout from "../components/layout";

interface IMovie {
  id: number;
  title: string;
  year: number;
}

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    console.log("Called once");

    async function getMoviesFromAPI() {
      setIsLoading(true);
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesFromAPI();
  }, [refresh]);

  async function handleDeleteMovie(id: number) {
    setRefresh(true);
    try {
      await deleteMovie(id);
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setRefresh(false);
    }
  }

  return (
    <>
      <Layout title="home">
        <h1>Home</h1>
        <div className="container">
          <Link to="/add" role="button" className="secondary">
            +
          </Link>
          <button
            disabled={isLoading}
            onClick={() => setRefresh((prev) => !prev)}
          >
            refresh list
          </button>
          {isLoading ? (
            <p>Loading movies!</p>
          ) : (
            <div className="grid">
              {movies.map((m) => (
                <article key={m.id}>
                  <h1>{m.title}</h1>
                  <h1>{m.year}</h1>

                  <Link to={`/edit/${m.id}`} className="pico-link">
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDeleteMovie(m.id)}
                    className="pico-link"
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
