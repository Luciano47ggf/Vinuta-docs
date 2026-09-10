# Projeto Vinuta · Avaliação NPS

## O que é
Site estático (GitHub Pages) para coleta de NPS (Net Promoter Score) dos convidados
da "Vinuta · Vino Atelier" no evento Iguaçu Golf Experience. Estilo visual elegante,
tema vinho/dourado, com animações nas taças de avaliação.

## Arquivos

- **`index.html`** — formulário público que os convidados preenchem (acessado via
  QR code / link 1). Pergunta em estilo NPS: "O quanto você recomendaria a
  Vinuta?" numa escala de **1 a 10**, representada por 10 taças de vinho em linha reta.
  Ao escolher uma nota, uma **garrafa animada** aparece, se inclina e "serve"
  a taça escolhida (jorro de vinho sincronizado, taças anteriores enchem
  junto). Sem campos de nome/telefone/comentário — é só a nota. Ao enviar,
  grava no Firestore (coleção `avaliacoes`) e mostra uma tela de conclusão
  com mensagem que varia conforme a nota (baixa/média/alta).

- **`admin.html`** — painel interno (acessado via QR code / link 2), protegido por
  login (Firebase Authentication e-mail/senha). Mostra em tempo real
  (`onSnapshot`):
  - Cards de acesso com QR code + link de cada uma das 2 páginas (gerados
    automaticamente a partir da URL atual)
  - Estatísticas: total de avaliações, média geral (de 5), respostas de hoje
  - Histograma "Votos por taça" (quantas pessoas deram cada nota de 1 a 10)
  - Lista das últimas avaliações (taças preenchidas + data)
  - Card "Resumo do desempenho" no final, com texto interpretativo automático
    (ex: nível "excelente/muito bom/razoável/de atenção" baseado na média) +
    grid com nota média, nota mais comum, % notas 4-5, % notas 1-2

- **`firebase-config.js`** — configuração compartilhada do Firebase (chaves do
  projeto). Não é secreto (a segurança vem das regras do Firestore, não das
  chaves).

- **`README.md`** — passo a passo completo de configuração do Firebase e
  publicação no GitHub Pages.

## Banco de dados (Firestore)

Coleção `avaliacoes`, cada documento tem:
```
{
  rating: number (1–10),
  criadoEm: timestamp (serverTimestamp)
}
```

Regras de segurança (já configuradas no console do Firebase pelo usuário):
- `create`: qualquer um pode enviar uma avaliação (convidados não fazem login)
- `read/update/delete`: só usuários autenticados (o admin logado em `admin.html`)

## Animação da garrafa (index.html)

Elemento central da experiência — vale entender antes de mexer:
- `.pour-stage` contém a `.bottle` (garrafa) e as `.glasses` (taças), posição
  relativa compartilhada para cálculos de coordenadas.
- A garrafa tem um `.neck-marker` invisível exatamente no bico (topo, centro).
  Depois que ela gira (`transitionend` no `transform`, não um tempo fixo
  chutado), o JS mede a posição REAL do bico na tela via
  `getBoundingClientRect()` e só então desenha o jorro (`.wine-stream`) —
  isso garante que o vinho sempre nasce no lugar certo, mesmo que o ângulo
  ou tamanho da garrafa mude no futuro.
- Antes de girar, o JS já compensa matematicamente (seno/cosseno) o quanto a
  rotação vai deslocar o bico para o lado, e desloca a posição inicial da
  garrafa (`getNeckOffsetX()`) para que o bico "aterrisse" em cima da taça
  certa — não mexer nesse cálculo sem entender a trigonometria por trás.
- O preenchimento da taça (`setGlassesFilled`) só acontece no momento em que
  o jorro "pousa" (`landPour`), nunca antes — mantém causa e efeito
  sincronizados.
- Se ajustar `POUR_ANGLE_DEG`, o tamanho da garrafa, ou o `transform-origin`
  do CSS `.bottle`, o cálculo de `getNeckOffsetX()` se ajusta sozinho (não
  precisa reescrever números mágicos).

## Paleta e estilo

```css
--wine-900: #3a0d17;   /* vinho escuro - fundo do header, botões */
--wine-800: #4c1220;
--gold:     #b8935a;   /* dourado - detalhes, hover */
--gold-light: #d4b483;
--cream:    #f4ede2;   /* fundo geral */
```
Fontes: Cormorant Garamond (títulos), Cinzel (marca/botões), EB Garamond (corpo).
Logo real da marca embutida em base64 (recortada do arquivo oficial da Vinuta).

## Histórico de decisões (para não repetir perguntas)

1. Começou como avaliação 1–5 taças (nota de degustação de vinho) → foi
   convertido para NPS 0–10 → voltou para 1–5 (mantendo a pergunta estilo
   NPS: "O quanto você recomendaria a Vinuta?") → por fim voltou para
   **1–10 em uma única linha reta** (formato final atual), ainda com a
   pergunta de recomendação.
2. Campos de nome/telefone e campo de comentário livre foram removidos —
   avaliação é 100% anônima, só a nota.
3. Preenchimento das taças é **cumulativo** (como um rating de estrelas: taça
   3 selecionada enche as taças 1, 2 e 3), não seleção única.
4. A animação da garrafa passou por duas rodadas de correção: (a) a garrafa
   tinha cor errada (verde) e o jorro nascia na posição errada — corrigido
   com o `neck-marker` + medição real via `getBoundingClientRect`; (b) o
   bico ficava fora da taça porque a rotação desloca a garrafa para o lado —
   corrigido com o cálculo trigonométrico em `getNeckOffsetX()`. Não
   reintroduzir posicionamento "chutado" em pixels fixos — sempre calcular
   ou medir dinamicamente.
5. Uma versão chegou a ter glasses 0–10 em uma única linha reta centralizada
   (fase NPS 0–10) — não é mais o estado atual, mas se o usuário pedir para
   voltar ao NPS 0–10 no futuro, essa é a referência de layout que funcionou.
6. Existe um texto dinâmico abaixo das taças (elemento `#ratingHint`) que
   muda de frase conforme a nota clicada (ex: "Pouco provável", "Neutro",
   "Muito provável"...). O objeto `hints` no JS precisa ter uma entrada
   para CADA nota de 1 a 10 — se faltar alguma chave, o texto fica em
   branco para aquela nota (bug já corrigido uma vez, não reintroduzir).
   Não existem mais rótulos fixos nas pontas da fileira — só esse texto
   único e dinâmico, centralizado.

## Convenções ao editar

- Manter os 4 arquivos (`index.html`, `admin.html`, `firebase-config.js`,
  `README.md`) na raiz do repositório — GitHub Pages serve a partir daí.
- CSS e JS ficam inline em cada HTML (sem build step, é publicado direto no
  GitHub Pages).
- Sempre validar balanceamento de chaves `{}` do `<style>` e de cada `<script>`
  depois de editar (esses arquivos são grandes e um erro de sintaxe quebra a
  página inteira).
- Ao alterar `index.html`, verificar se `admin.html` precisa de ajuste
  correspondente (e vice-versa) — os dois compartilham o schema do Firestore
  (campo `rating`, 1–5).

