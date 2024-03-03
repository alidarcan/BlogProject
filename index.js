import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogs = [
  {
    title: "Demo Title",
    date: "03/03/2024",
    text: `1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni maxime, labore optio asperiores
    vitae illo hic, consequuntur corporis est cumque sapiente, nesciunt voluptatum laboriosam
    necessitatibus provident recusandae quasi culpa veritatis!`,
  },
  {
    title: "Demo Title 2",
    date: "04/03/2024",
    text: `2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni maxime, labore optio asperiores
    vitae illo hic, consequuntur corporis est cumque sapiente, nesciunt voluptatum laboriosam
    necessitatibus provident recusandae quasi culpa veritatis!`,
  },
  {
    title: "Demo Title 3",
    date: "05/03/2024",
    text: `3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni maxime, labore optio asperiores
    vitae illo hic, consequuntur corporis est cumque sapiente, nesciunt voluptatum laboriosam
    necessitatibus provident recusandae quasi culpa veritatis!`,
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    blogs : blogs
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
