const http = require("http");
const hostname = "192.168.1.105";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const io = require("socket.io")(server);

var rooms = {};

io.sockets.on("connection", function(socket) {
  socket.on("subscribe", function(gameId) {
    var usersCount = rooms[gameId];
    if (typeof usersCount === "undefined" || usersCount < 2) {
      usersCount = increaseUsersCount(gameId);
      console.log("joining game", gameId);
      socket.join(gameId);
      io.in(gameId).emit("subscribed", usersCount);
    } else {
      console.log("Game %s is full.", gameId);
      socket.emit("gameIsFull", { gameId: gameId });
    }
  });

  socket.on("unsubscribe", function(gameId) {
    var usersCount = decreaseUsersCount(gameId);
    console.log("leaving game", gameId);
    socket.leave(gameId);
    io.in(gameId).emit("unsubscribed", usersCount);
  });

  socket.on("play", function(data) {
    console.log("sending move");
    socket.to(data.gameId).emit("play", data);
  });

  socket.on("reset", function(gameId) {
    console.log("reset");
    socket.to(gameId).emit("reset", gameId);
  });
});

var increaseUsersCount = function(gameId) {
  var usersCount = rooms[gameId];
  if (typeof usersCount === "undefined") {
    usersCount = 1;
  } else {
    usersCount += 1;
  }
  rooms[gameId] = usersCount;
  return usersCount;
};

var decreaseUsersCount = function(gameId) {
  var usersCount = rooms[gameId];
  if (typeof usersCount === "undefined" || usersCount < 2) {
    usersCount = 0;
  } else {
    usersCount = 1;
  }
  rooms[gameId] = usersCount;
  return usersCount;
};
