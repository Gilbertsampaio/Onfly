# ?? Teste T�cnico Front-End ? Onfly  

Este projeto � um **SPA (Single Page Application)** desenvolvido como parte do **teste t�cnico Front-End da Onfly**.  
O objetivo � implementar uma aplica��o para buscar, listar, filtrar e detalhar hot�is a partir de um arquivo JSON servido via **JSON Server**.  

---

## ?? Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/)  
- [Quasar Framework](https://quasar.dev/) (UI)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Pinia](https://pinia.vuejs.org/) (gerenciamento de estado)  
- [Vite](https://vitejs.dev/) (build tool)  
- [JSON Server](https://www.npmjs.com/package/json-server) (simula��o de API)  
- [SASS](https://sass-lang.com/) (estiliza��o)  
- [Vitest](https://vitest.dev/) (testes unit�rios)  

---

## ?? Estrutura dos Dados (payload.json)

O arquivo `payload.json` � a fonte de dados da aplica��o e cont�m:  

- **hotels**  
- **hotels_details**  
- **cities**  

## ?? Funcionalidades Implementadas

### ?? Busca de Hot�is
- Campo **Destino** com busca de cidades:  
  - A busca inicia apenas ap�s o **3� caractere digitado**.  
  - Sugest�es exibidas no formato: `Cidade, Estado`.  

- **Filtros dispon�veis**:  
  - Ordenar por **Pre�o** ou **Estrelas**.  
  - Filtrar por **nome do hotel**.  

- **Listagem**:  
  - Exibi��o paginada.  
  - Cada hotel em um **card** com **thumb + informa��es principais**.  
  - Exibe **Di�ria R$ X** e **Taxa R$ Y** (sem necessidade de calcular quantidade de di�rias).  

### ?? Detalhes do Hotel
- Bot�o **?Ver detalhes?** abre um **drawer lateral** com:  
  - Nome do hotel.  
  - Descri��o.  
  - Endere�o completo.  
  - Lista de amenidades.  
  - Imagens adicionais.  

---

## ?? Padr�es de Design Onfly

- **Cores principais**  
  - `primary-100: #009EFB`  
  - `primary-200: #007DC7`  
  - `success-100: #00835C`  
  - `info-100: #ADADB3`, `info-200: #84858C`, `info-300: #84858C`, `info-400: #696A71`, `info-500: #58585F`, `info-600: #434347`  

- **Layout**  
  - Container m�x.: **1200px**  
  - Espa�amento: m�ltiplos de **4**  
  - Arredondamento: m�ltiplos de **4**  

- **Fonte**: Poppins  
  - Padr�o: **12px**  
  - T�tulos: **16px**  

- **CSS** estruturado com **BEM**  

---

### 3. Startar o JSON Server
```bash
npm run start-api
```

### 4. Startar p Quasar
```bash
npx quasar dev
```

Acesse em: [http://localhost:9000/](http://localhost:9000/)

---

## ?? Executando Testes

```bash
npm test
```

- Os testes unit�rios foram implementados com **Vitest**.  
- Cobrem **Pinia Store** (hot�is e cidades) e principais funcionalidades de filtro, busca e ordena��o.  

---

?? Desenvolvido como parte do processo seletivo da **Onfly** - Gilbert Sampaio ??  
