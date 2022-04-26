# Angular testes unitário

## Requisitos

- NodeJs
- NPM
- Angular CLI
    
    ```bash
    npm install -g @angular/cli@9.1.13 # instala angular cli
    ```
## Criar um projeto angular

```bash
ng new [nome-projeto]
ex. `ng new angular-teste-unitario`
```

## Rodar o projeto
```bash
git clone https://github.com/joaolucasete/angular-teste-unitario.git
cd angular-teste-unitario
npm i
npm run start
```
`npm run start` executará um `ng serve` que sobe um servidor de desenvolvimento como explicado abaixo

## Servidor de desenvolvimento

Rode `ng serve` para um servidor de desenvolvimento. Abra o browser em `http://localhost:4200/`. O app automaticamente recarregará se algum arquivo for alterado.
    
## Rodando testes unitários

Rode `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Help me

Para obter mais informações acesse [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
