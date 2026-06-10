# Relatório de Consultas de Inteligência Artificial

## 1. IAs Consultadas
* ChatGPT (OpenAI)
* Gemini (Google)
* Claude (Anthropic)

## 2. Prompt Utilizado
### Prompt Inicial e Único
> "Crie uma aplicação web com HTML, CSS e JavaScript puros. O tema é uma Lista de Ideias de Projetos Tech. A aplicação deve começar em uma tela de login onde o usuário é 'aluno' e a senha é 'fiap2025'. Se errar, exiba um erro na tela em uma div (não use console ou alert do login). Se acertar, esconda o login e mostre uma tela de CRUD. O CRUD gerencia uma lista armazenada estritamente em um array de strings (sem objetos). Deve permitir adicionar itens no início (unshift) e no final (push). Deve exibir os itens dinamicamente na tela com opções de editar (via prompt) e remover. A remoção e edição devem ser feitas usando o índice do array para evitar problemas com strings idênticas repetidas. Caso o usuário tente salvar algo vazio ou cancelar a edição, mantenha o item original sem alterações e mostre um erro na tela. Escreva o código usando funções nomeadas e sem frameworks."

## 3. Comentários sobre os principais problemas encontrados em cada resposta

* **ChatGPT:** A resposta atendeu todos os requisitos da atividade, apresentou código organizado e contemplou todas as validações solicitadas, pórem um design bem cru e simples.
* **Gemini:** Compreendeu perfeitamente o uso estrito do array de strings e a manipulação através do índice do elemento para evitar a exclusão duplicada de itens idênticos. Contudo, a folha de estilo CSS fornecida foi extremamente simples e carecia de alinhamento responsivo, exigindo uma reestruturação visual completa. Também deixou de limpar os campos de input de login na transição de telas.
* **Claude:** 
- Design inicial correto mas ainda sem identidade visual temática forte —
  precisou de refinamento no prompt para atingir o nível cinematográfico.
- Botões de salvar/cancelar precisavam de ajuste para ficarem ocultos fora
  do modo de edição (corrigido na iteração seguinte).
- Pequena redundância em alguns nomes de funções que poderiam ser mais
  descritivos.

## Justificativa da IA Escolhida

**IA escolhida como base: Claude (Anthropic)**

A resposta do Claude foi selecionada pelos seguintes motivos:

1. **Corretude estrutural desde o início**: array de strings puro, remoção
   por índice com `splice(indice, 1)`, lógica totalmente dentro de funções
   nomeadas — todos os requisitos técnicos centrais atendidos sem precisar
   de correção.

2. **Edição inline**: implementou edição diretamente no card, sem usar
   `prompt()` como o ChatGPT fez.

3. **Validação correta de edição vazia**: ao confirmar com campo vazio, o
   item original é mantido automaticamente — comportamento correto conforme
   o requisito.

4. **Organização de código clara**: separação limpa entre renderização,
   CRUD, eventos e navegação, com funções pequenas e de responsabilidade única.
