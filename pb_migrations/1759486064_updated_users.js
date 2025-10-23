/// <reference path="../pb_data/types.d.ts" />
// ИСПРАВЛЕНО: Использование collection.schema для добавления/удаления полей.

migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // 1. Добавление поля 'klass' (Используем .schema.add вместо .fields.add)
  collection.schema.add(new Field({
    "hidden": false,
    "id": "select3711652446",
    "name": "klass",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "options": {
      "maxSelect": 1,
      "values": [
        "6 класс",
        "9-10класс"
      ]
    }
  }));

  // 2. Обновление поля 'name'
  const nameField = collection.schema.getById("text1579384326");
  if (nameField) {
      nameField.options.max = 255;
      nameField.options.min = 3;
      nameField.presentable = true; 
  }

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // 1. Удаление поля 'klass'
  collection.schema.removeField("select3711652446");

  // 2. Откат поля 'name'
  const nameField = collection.schema.getById("text1579384326");
  if (nameField) {
      nameField.options.max = 255;
      nameField.options.min = 0;
      nameField.presentable = false;
  }

  return dao.saveCollection(collection);
})

