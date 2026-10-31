# Jogar no iPhone e no Android (sem loja e sem sideload)

O jogo vira um **PWA**: um site que se instala na tela inicial, abre em tela cheia e funciona offline.

## 1) Publicar (uma vez, grátis)
Suba **todo o conteúdo desta pasta `publicar`** (index.html, manifest.webmanifest, sw.js, pasta icons e a pasta musica) num serviço de hospedagem estática com HTTPS. Exemplos gratuitos:
- **GitHub Pages**: crie um repositório, envie os arquivos e ligue o Pages nas configurações.
- **Netlify** ou **Cloudflare Pages**: arraste a pasta `publicar` para o painel.

Importante: tem que ser HTTPS (o service worker não funciona abrindo o arquivo direto no celular).
O jogo não coleta nenhum dado: tudo fica salvo no aparelho de quem joga.

## 2) Instalar
- **iPhone**: abra o link no **Safari** → botão Compartilhar → **Adicionar à Tela de Início**.
- **Android**: abra o link no **Chrome** → menu ⋮ → **Instalar app** (ou "Adicionar à tela inicial").

## 3) Dicas
- Faça **Exportar partida** (Configurações) de vez em quando: o navegador pode apagar dados de sites que ficam muito tempo sem uso. Instalado na tela inicial isso quase não acontece.
- Para mudar o jogo e publicar de novo: rode `bash build.sh` na pasta de cima e envie o novo `index.html`. Aumente o número da versão em `sw.js` (`const V`) para os aparelhos pegarem a atualização.
- **Música de guerra**: no jogo, Configurações → Música de guerra → Escolher música (funciona no celular). Ou coloque `guerra.mp3` na pasta `musica` antes de publicar.
