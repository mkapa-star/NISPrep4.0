/// <reference path="../pb_data/types.d.ts" />
// Исправлено для использования dao (Data Access Object)

migrate((db) => {
  const dao = new Dao(db);
  // Поиск коллекции через dao
  const collection = dao.findCollectionByNameOrId("pbc_1615648943");

  // add field
  collection.fields.add(new Field({
    "exceptDomains": [],
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "onlyDomains": [],
    "presentable": false,
    "required": false,
    "system": false,
    "type": "email",
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }));

  // Сохранение коллекции через dao
  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  // Поиск коллекции через dao
  const collection = dao.findCollectionByNameOrId("pbc_1615648943");

  // remove field
  collection.fields.removeById("email3885137012");

  // Сохранение коллекции через dao
  return dao.saveCollection(collection);
})
