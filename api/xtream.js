export default async function handler(req, res) {
  const { servidor, usuario, senha, action } = req.query;

  if (!servidor || !usuario || !senha) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  try {
    let url = `${servidor}/player_api.php?username=${usuario}&password=${senha}`;

    if (action) {
      url += `&action=${action}`;
    }

    const resposta = await fetch(url);
    const texto = await resposta.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).send(texto);
  } catch (e) {
    return res.status(500).json({
      erro: "Erro ao conectar no servidor Xtream",
      detalhe: e.message
    });
  }
}
