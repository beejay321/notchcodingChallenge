import { useState, useEffect } from "react";
import { Container, Input, Button } from "reactstrap";
import "./style.css";
// const BACKEND_URL = process.env.REACT_APP_BACKENDURL;
const BACKEND_URL = "http://localhost:3001";

const INIT_VALUE = {
  title: "",
  description: "",
};
function App() {
  const [text, setText] = useState(INIT_VALUE);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const handleChange = (evt) => {
    setText({ ...text, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetch(`${BACKEND_URL}/posts`, {
      method: "POST",

      body: JSON.stringify(text),
    });
    console.log(text);
    console.log(response);
  };

  const handleDateConvert = (date) => {
    const convert = new Date(date);
    const dateConverted = convert.toISOString().substring(0, 10);
    return dateConverted.replaceAll("-", ".");
  };

  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/posts`, {});
        if (response.ok) {
          let data = await response.json();
          setPosts(data.posts);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <Container>
        <h3>Create new Article</h3>
        <Input className="mb-2 articleInput" name="title" value={text.title} onChange={handleChange} />
        <Input id="exampleText" type="textarea" className="mb-2 articleInput" name="description" value={text.description} onChange={handleChange} />

        <div className="createBtnDiv">
          <Button className="createBtn" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </Container>

      <Container>
        <h3 className="sectionTitle"> Articles</h3>
        {posts &&
          posts.map((post) => (
            <>
              <div className="eachArticle">
                <div className="articleHeading" key={post._id}>
                  <p className="postTitle"> {post.title}</p>
                  <p className="date"> {handleDateConvert(post.createdAt)}</p>
                </div>
                <p className="article"> {post.description}</p>
              </div>
            </>
          ))}
      </Container>
    </>
  );
}

export default App;
