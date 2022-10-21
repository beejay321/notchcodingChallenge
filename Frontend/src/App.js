import { useState, useEffect } from "react";
import { Container, Input, Button } from "reactstrap";
// const BACKEND_URL = process.env.REACT_APP_BACKENDURL;
const BACKEND_URL = "http://localhost:3001";

const INIT_VALUE = {
  title: "",
  description: "",
};
function App() {
  const [text, setText] = useState(INIT_VALUE);
  const [posts, setPosts] = useState([]);

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

  // const handleDateConvert = (date) => {
  //   date.split("z");
  //      let convertDate = new Date(date);
  //   convertDate.getDate()
  //   console.log(convertDate)
  //   return convertDate;
  // };

  useEffect(() => {
    // setIsLoading(true);

    const getPosts = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/posts`, {});
        if (response.ok) {
          let data = await response.json();
          console.log(data.posts);

          setPosts(data.posts);
          // setIsLoading(false);
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
        <h1>Create new Article</h1>
        <Input className="mb-2" name="title" value={text.title} onChange={handleChange} />
        <Input id="exampleText" type="textarea" className="mb-2" name="description" value={text.description} onChange={handleChange} />
        <Button color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Container>

      <Container>
        <h3> Articles</h3>
        {posts &&
          posts.map((post) => (
            <div>
              <h3> {post.title}</h3>
              <p> {post.description}</p>
              {/* <h3> {post.createdAt}</h3> */}
            </div>
          ))}
      </Container>
    </>
  );
}

export default App;
