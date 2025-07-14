<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aprende Jugando</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <canvas id="bg"></canvas>
  <div class="container">
    <h1>Aprende Jugando</h1>
    <p>¡Elige tu avatar y comienza a aprender con juegos!</p>
    <div class="avatars" id="avatars">
      <!-- Los avatares se insertan aquí con JS -->
    </div>
    <button id="startBtn" disabled>Empezar a Jugar</button>
    <div id="game" class="hidden">
      <h2>Juego: Pregunta Rápida</h2>
      <div id="question"></div>
      <div id="answers"></div>
      <div id="result"></div>
      <button id="nextBtn" class="hidden">Siguiente</button>
    </div>
  </div>
  <script src="main.js"></script>
</body>
</html>