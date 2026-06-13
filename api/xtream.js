export default async function handler(req, res) {
  const { servidor, usuario, senha, action } = req.query;

  if (!servidor || !usuario || !senha) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  try {
    const base = servidor.replace(/\/$/, "");

    let url = `${base}/player_api.php?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(senha)}`;

    if (action) {
      url += `&action=${encodeURIComponent(action)}`;
    }

    const resposta = await fetch(url);
    const texto = await resposta.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).send(texto);
  } catch (erro) {
    return res.status(500).json({
      erro: "Erro ao conectar no servidor Xtream",
      detalhe: erro.message
    });
  }
}
