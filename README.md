yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

** Requisitos funcionais ** => **RF** 


** Requisitos Não Funcionais ** => **RNF**


** Regras de negócio ** => **RN**


# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro

**RN**
Não deve ser possível cadastrar um com uma placa já existente.
O carro deve ser cadastrdo, por padrão, com disponibilidade.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Alterar Carro 
Não deve ser possível alterar a placa de um carro já cadastrado.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro.
**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
--Deve ser possível listar todas as especificações. 
--Deve ser possível litar todos os carros.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

# Cadastro de imagens do carro para
**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF** 
Utilizar o multer para upload dos arquivos
**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Aluguel de carros

**RF**
Deve ser possível cadastrar um alguel 
**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo carro.
Ao realizar um aluguel, o status do carro deverá ser alterado para indísponivel.

# Devolução de carros para
**RF** 
Deve ser possível realizar a devolução de um carro de

**RN** 

Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o osuario deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do Aluguel
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do alguel.

# Recuperar Senha

**RF**
- Deve ser possivel o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail. com o passo a passo para recuperação da senha
- O usuário deve conseguir inserir uma nova Senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas