export default async function handler(req, res) {
  const { servidor, usuario, senha, action } = req.query;

  try {
    const base = String(servidor).replace(/\/$/, "");

    let url = `${base}/player_api.php?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(senha)}`;

    if (action) {
      url += `&action=${encodeURIComponent(action)}`;
    }

    const resposta = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    const texto = await resposta.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).send(texto);

  } catch (erro) {
    return res.status(500).json({
      erro: "Erro ao conectar",
      detalhe: erro.message
    });
  }
}
