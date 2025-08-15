# ?? Teste Técnico Front-End ? Onfly  

Este projeto é um **SPA (Single Page Application)** desenvolvido como parte do **teste técnico Front-End da Onfly**.  
O objetivo é implementar uma aplicação para buscar, listar, filtrar e detalhar hotéis a partir de um arquivo JSON servido via **JSON Server**.  

---

## ?? Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/)  
- [Quasar Framework](https://quasar.dev/) (UI)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Pinia](https://pinia.vuejs.org/) (gerenciamento de estado)  
- [Vite](https://vitejs.dev/) (build tool)  
- [JSON Server](https://www.npmjs.com/package/json-server) (simulação de API)  
- [SASS](https://sass-lang.com/) (estilização)  
- [Vitest](https://vitest.dev/) (testes unitários)  

---

## ?? Estrutura dos Dados (payload.json)

O arquivo `payload.json` é a fonte de dados da aplicação e contém:  

- **hotels**  
- **hotels_details**  
- **cities**  

## ?? Funcionalidades Implementadas

### ?? Busca de Hotéis
- Campo **Destino** com busca de cidades:  
  - A busca inicia apenas após o **3º caractere digitado**.  
  - Sugestões exibidas no formato: `Cidade, Estado`.  

- **Filtros disponíveis**:  
  - Ordenar por **Preço** ou **Estrelas**.  
  - Filtrar por **nome do hotel**.  

- **Listagem**:  
  - Exibição paginada.  
  - Cada hotel em um **card** com **thumb + informações principais**.  
  - Exibe **Diária R$ X** e **Taxa R$ Y** (sem necessidade de calcular quantidade de diárias).  

### ?? Detalhes do Hotel
- Botão **?Ver detalhes?** abre um **drawer lateral** com:  
  - Nome do hotel.  
  - Descrição.  
  - Endereço completo.  
  - Lista de amenidades.  
  - Imagens adicionais.  

---

## ?? Padrões de Design Onfly

- **Cores principais**  
  - `primary-100: #009EFB`  
  - `primary-200: #007DC7`  
  - `success-100: #00835C`  
  - `info-100: #ADADB3`, `info-200: #84858C`, `info-300: #84858C`, `info-400: #696A71`, `info-500: #58585F`, `info-600: #434347`  

- **Layout**  
  - Container máx.: **1200px**  
  - Espaçamento: múltiplos de **4**  
  - Arredondamento: múltiplos de **4**  

- **Fonte**: Poppins  
  - Padrão: **12px**  
  - Títulos: **16px**  

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

- Os testes unitários foram implementados com **Vitest**.  
- Cobrem **Pinia Store** (hotéis e cidades) e principais funcionalidades de filtro, busca e ordenação.  

---

?? Desenvolvido como parte do processo seletivo da **Onfly** - Gilbert Sampaio ??  
