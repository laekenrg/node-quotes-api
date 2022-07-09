const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const quotes = require("./quotes.json");

app.get("/", function (request, response) {
  response.send("/quotes/17 should return one quote, by id");
});

app.get("/quotes", function (request, response) {
  response.json(quotes);
});

//--Encontrar una quote by id.
app.get("/quotes/:id", function (req, res) {
  const id = Number(req.params.id);
  const quoteById = quotes.filter((quote) => quote.id === id)[0]; //<--Si queremos obtener solo un objeto con la quote agregamos [0]
  return res.send(quoteById); //por el contrario si queremos un array con un objeto de la quote  dentro quitamos [0].
}); //tambien en vez de "filter" podriamos usar "find", con la ventaja que no  recorrera todo el
//array buscando iguales, solo al encontrar el primero lo traera, y no necesitariamos colocar [0]  ya que lo trae como un objeto.

//--Agregar una nueva quote.
app.post("/quotes", function (req, res) {
  const newQuote = {
    author: req.body.author,
    quote: req.body.quote,
    id: quotes.length,
  };
  quotes.push(newQuote);
  return res.send(newQuote);
});

//--Modificar una quote existente.
app.put("/quotes/:id", function (req, res) {
  const id = Number(req.params.id);
  const findQuoteById = quotes.find((quote) => quote.id === id);
  findQuoteById.author = req.body.author;
  findQuoteById.quote = req.body.quote;
  return res.send(findQuoteById);
});

//--Eliminar una quote existente.
app.delete("/quotes/:id", function (req, res) {
  const id = Number(req.params.id);
  const index = quotes.findIndex((quote) => quote.id === id);
  quotes.splice(index, 1);
  return res.send({ id: id });
});
app.listen(5000, () => console.log("Listening on port 5000"));
