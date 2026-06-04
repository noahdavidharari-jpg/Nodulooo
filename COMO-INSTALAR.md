# NÓDULO — instalar como app no Android (PWA)

Este pacote transforma o NÓDULO num app instalável. Tudo já está pronto:
o editor, o manifest, o service worker (offline) e os ícones.

> ⚠️ Importante: o Android só deixa **instalar** um PWA quando ele está
> hospedado num endereço **https**. Abrir o arquivo direto do celular
> (file://) NÃO mostra o botão "Instalar" — é uma regra do Chrome, não dá
> pra contornar. Por isso o passo 1 é hospedar (de graça).

## Arquivos do pacote
```
index.html             ← o editor (já com as tags de PWA)
manifest.webmanifest   ← nome, ícones, cor do app
sw.js                  ← funciona offline depois de instalado
icon-192.png           ← ícone do app
icon-512.png           ← ícone do app (alta resolução)
```
Mantenha os 5 arquivos juntos, na mesma pasta.

## PASSO 1 — Hospedar de graça (escolha UMA opção)

### Opção A — Netlify Drop (mais fácil, sem conta)
1. No navegador, abra: https://app.netlify.com/drop
2. Arraste a **pasta inteira** (os 5 arquivos) pra área indicada.
   - No celular: compacte em .zip e solte; ou use um computador, é mais simples.
3. Em segundos ele te dá um link tipo `https://algo-aleatorio.netlify.app`.
   **Esse link já é https — pronto pra instalar.**

### Opção B — GitHub Pages
1. Crie um repositório no GitHub e suba os 5 arquivos.
2. Settings → Pages → Branch: `main` / pasta `/root` → Save.
3. Em ~1 min sai um link `https://seu-usuario.github.io/repo/`.

### Opção C — Cloudflare Pages
1. https://dash.cloudflare.com → Pages → Upload assets.
2. Suba os 5 arquivos → publica em `https://seu-projeto.pages.dev`.

## PASSO 2 — Instalar no Android
1. Abra o link **https** no **Chrome** do Android.
2. Espere carregar 1x por completo (isso ativa o offline).
3. Toque no menu **⋮** → **"Instalar app"** ou **"Adicionar à tela inicial"**.
   - Em muitos aparelhos aparece sozinho um banner "Instalar NÓDULO".
4. Pronto: vira um ícone na tela inicial, abre em tela cheia (sem a barra do
   navegador) e **funciona offline** depois da primeira abertura.

## Como saber que deu certo
- Abre em tela cheia, sem barra de endereço → é um PWA instalado.
- Ative o modo avião e abra: deve continuar funcionando (offline).
- O ícone na tela inicial é a logo do nó.

## Atualizar o app depois
Se você mudar os arquivos e subir de novo, o app se atualiza sozinho na
próxima vez que abrir com internet (o service worker usa a versão `nodulo-v1`
em sw.js — se quiser forçar atualização, troque pra `nodulo-v2`).

## Observações honestas
- Seus projetos continuam salvos no aparelho (IndexedDB), igual a antes.
- O PWA não vira um .apk da Play Store — é um app instalado pelo navegador
  (mesma tecnologia que CapCut Web, Spotify Web etc. usam). Pra Play Store de
  verdade seria preciso empacotar com algo como Bubblewrap/TWA, um passo extra.
