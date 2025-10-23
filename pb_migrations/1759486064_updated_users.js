/// <reference path="../pb_data/types.d.ts" />
// Исправлено: замена устаревшего синтаксиса и .addAt на .add для стабильности

migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // add field 'klass' (Используем .add вместо .addAt для стабильности)
  collection.fields.add(new Field({
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

  // update field 'name'
  const nameField = collection.schema.getById("text1579384326");
  if (nameField) {
      nameField.options.max = 255;
      nameField.options.min = 3;
      nameField.presentable = true; // Обновляем свойство на самом объекте поля
  }

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // remove field 'klass'
  collection.fields.removeById("select3711652446");

  // revert field 'name'
  const nameField = collection.schema.getById("text1579384326");
  if (nameField) {
      nameField.options.max = 255;
      nameField.options.min = 0;
      nameField.presentable = false; // Обновляем свойство на самом объекте поля
  }

  return dao.saveCollection(collection);
})
