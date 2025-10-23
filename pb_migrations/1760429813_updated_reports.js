/// <reference path="../pb_data/types.d.ts" />
// Исправлено: Удалено ошибочное поле 'klass'. Используется Dao и collection.schema.

migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943"); // reports collection ID

  // --- UP: Добавление поля 'email' ---
  // Это поле, относящееся к отчету, остается
  collection.schema.add(new Field({
    "hidden": false,
    "id": "email3885137012",
    "name": "email",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "email",
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }));

  // !!! ПОЛЕ 'KLASS' УДАЛЕНО - ОНО ПРИНАДЛЕЖИТ КОЛЛЕКЦИИ USERS !!!

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943"); // reports collection ID

  // --- DOWN: Удаление поля 'email' ---
  collection.schema.removeField("email3885137012");

  // !!! ПОЛЕ 'KLASS' УДАЛЕНО - ОНО ПРИНАДЛЕЖИТ КОЛЛЕКЦИИ USERS !!!

  return dao.saveCollection(collection);
})
