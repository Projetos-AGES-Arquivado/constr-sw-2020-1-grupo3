# constr-sw-2020-1-grupo3
Repositório de artefatos do Grupo 3 da turma 2020/1 de Construção de Software da Escola Politécnica da PUC-RS

### Para fazer testes:

http://3.95.159.215:3456/login { "login": "user", "password": "user" }

http://3.95.159.215:3456/ping

54.234.119.208:8080 -> keycloak

### Swagger

```yaml
swagger: "2.0"
info:
  description: "This is the API for the resources."
  version: "0.1.0"
  title: "Types + Resources"
host: "54.234.109.208:3456"
basePath: "/"
tags:
- name: "Equipment"
  description: "Equipment CRUD"
- name: "Room"
  description: "Room CRUD"
schemes:
- "http"
paths:
  /equipment:
    post:
      tags:
      - "Equipment"
      summary: "Add a new equipment"
      description: "Creates a equipment with the given parameters."
      operationId: "addEquipment"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "Equipment object that needs to be added"
        required: true
        schema:
          $ref: "#/definitions/Equipment"
      responses:
        "201":
          description: "successful operation"
          schema:
            $ref: "#/definitions/ResponseEquipment"
        "400":
          description: "Bad request"
        "403":
          description: "Forbidden"

    get:
      tags:
      - "Equipment"
      summary: "Return list of equipments"
      description: "Returns all the equipments in the database or returns a subset of equipments corresponding to the query, if used"
      parameters:
      - in: query
        name: brand
        type: "string"
      - in: query
        name: description
        type: "string"
      - in: query
        name: type
        type: "string"
      responses:
        "200": 
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseEquipment"
          description: "OK"
        "403":
          description: "Forbidden"
          
  /equipment/{equipId}:
    get:
      tags:
      - "Equipment"
      summary: "Find equipment by ID"
      description: "Returns a single equipment."
      operationId: "getEquipById"
      produces:
      - "application/json"
      parameters:
      - name: "equipId"
        in: "path"
        description: "Equipment ID to return"
        required: true
        type: "integer"
        format: "int64"
      responses:
        "200":
          description: "successful operation"
          schema:
            $ref: "#/definitions/ResponseEquipment"
        "400":
          description: "Invalid ID supplied"
        "404":
          description: "Equipment not found"

    delete:
      tags:
      - "Equipment"
      summary: "Deletes an equipment"
      description: ""
      operationId: "deleteEquipment"
      produces:
      - "application/json"
      parameters:
      - name: "equipId"
        in: "path"
        description: "Equipment ID to delete"
        required: true
        type: "integer"
        format: "int64"
      responses:
        "400":
          description: "Invalid ID supplied"
        "404":
          description: "Equipment not found"
          
    put:
      tags: 
      - "Equipment"
      summary: "Update all the attributes of the object"
      consumes:
      - "application/json"
      parameters:
      - name: "equipId"
        in: "path"
        description: "Equipment ID to update"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "Equipment object that needs to be updated"
        required: true
        schema:
          $ref: "#/definitions/Equipment"
      responses:
        "200":
          description: "OK"
        "400":
          description: "Invalid ID supplied"
          
    patch:
      tags: 
      - "Equipment"
      summary: "Update some of the attributes of the object"
      consumes:
      - "application/json"
      parameters:
      - name: "equipId"
        in: "path"
        description: "Equipment ID to update"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "Equipment object attribute that needs to be updated"
        required: true
        schema:
          $ref: "#/definitions/PatchEquipment"
      responses:
        "200":
          description: "OK"
        "400":
          description: "Invalid ID supplied"
          
  /room:
    post:
      tags:
      - "Room"
      summary: "Add a new room"
      description: "Creates a room with the given parameters."
      operationId: "addRoom"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "Room object that needs to be added"
        required: true
        schema:
          $ref: "#/definitions/Room"
      responses:
        "201":
          description: "successful operation"
          schema:
            $ref: "#/definitions/ResponseRoom"
        "400":
          description: "Bad request"
        "403":
          description: "Forbidden"

    get:
      tags:
      - "Room"
      summary: "Return list of rooms"
      description: "Returns all the rooms in the database or returns a subset of rooms corresponding to the query, if used"
      parameters:
      - in: query
        name: capacity
        type: "integer"
      - in: query
        name: description
        type: "string"
      - in: query
        name: type
        type: "string"
      responses:
        "200": 
          schema:
            type: "array"
            items:
              $ref: "#/definitions/ResponseRoom"
          description: "OK"
        "403":
          description: "Forbidden"
          
  /room/{roomId}:
    get:
      tags:
      - "Room"
      summary: "Find room by ID"
      description: "Returns a single room."
      operationId: "getRoomById"
      produces:
      - "application/json"
      parameters:
      - name: "roomId"
        in: "path"
        description: "Room ID to return"
        required: true
        type: "integer"
        format: "int64"
      responses:
        "200":
          description: "successful operation"
          schema:
            $ref: "#/definitions/ResponseRoom"
        "400":
          description: "Invalid ID supplied"
        "404":
          description: "Room not found"

    delete:
      tags:
      - "Room"
      summary: "Delete a room"
      operationId: "deleteRoom"
      produces:
      - "application/json"
      parameters:
      - name: "roomId"
        in: "path"
        description: "Equipment ID to delete"
        required: true
        type: "integer"
        format: "int64"
      responses:
        "400":
          description: "Invalid ID supplied"
        "404":
          description: "Room not found"
          
    put:
      tags: 
      - "Room"
      summary: "Update all the attributes of the object"
      consumes:
      - "application/json"
      parameters:
      - name: "roomId"
        in: "path"
        description: "Room ID to update"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "Room object that needs to be updated"
        required: true
        schema:
          $ref: "#/definitions/Room"
      responses:
        "200":
          description: "OK"
        "400":
          description: "Invalid ID supplied"
          
    patch:
      tags: 
      - "Room"
      summary: "Update some of the attributes of the object"
      consumes:
      - "application/json"
      parameters:
      - name: "roomId"
        in: "path"
        description: "Room ID to update"
        required: true
        type: "integer"
        format: "int64"
      - in: "body"
        name: "body"
        description: "Room object attributes that needs to be updated"
        required: true
        schema:
          $ref: "#/definitions/PatchRoom"
      responses:
        "200":
          description: "OK"
        "400":
          description: "Invalid ID supplied"
 
definitions:
  Equipment:
    type: "object"
    required:
    - "description"
    - "type"
    - "brand"
    properties:
      description:
        type: "string"
        example: "Projetor 1"
      type:
        type: "string"
        example: "Projetor"
        enum:
            - "Projetor"
            - "Notebook"
      brand:
        type: "string"
        example: "Samsung"
  
  PatchEquipment:
    type: "object"
    required:
    - "description"
    - "type"
    - "brand"
    properties:
      description:
        type: "string"
        example: "Projetor 2"

  ResponseEquipment:
    type: "object"
    properties:
      _id:
        type: "string"
        example: "5eb34dfecfe3e3f151c61"
      description:
        type: "string"
        example: "Projetor 1"
      type:
        type: "string"
        example: "Projetor"
        enum:
            - "Projetor"
            - "Notebook"
      brand:
        type: "string"
        example: "Samsung"
      createdAt:
        type: "string"
        format: "date-time"
        example: "2020-05-06T23:47:35.598Z"
      updatedAt:
        type: "string"
        format: "date-time"
        example: "2020-05-06T23:47:35.598Z"
      __v:
        type: "integer"
        example: 0

  Room:
    type: "object"
    required:
    - "description"
    - "type"
    - "capacity"
    properties:
      description:
        type: "string"
        example: "Laboratório 310"
      type:
        type: "string"
        example: "Laboratório"
        enum:
            - "Sala de aula"
            - "Auditório"
            - "Laboratório" 
      capacity:
        type: "integer"
        example: 60

  PatchRoom:
    type: "object"
    properties:
      capacity:
        type: "integer"
        example: 30
        
  ResponseRoom:
    type: "object"
    properties:
      _id:
        type: "string"
        example: "5eb34dfecfe3e3f151c61"
      description:
        type: "string"
        example: "Laboratório 310"
      type:
        type: "string"
        example: "Laboratório"
      capacity:
        type: "integer"
        example: 30
      createdAt:
        type: "string"
        format: "date-time"
        example: "2020-05-06T23:47:35.598Z"
      updatedAt:
        type: "string"
        format: "date-time"
        example: "2020-05-06T23:47:35.598Z"
      __v:
        type: "integer"
        example: 0

externalDocs:
  description: "API Repository"
  url: "github.com/AGES-PUCRS/constr-sw-2020-1-grupo3"
```
