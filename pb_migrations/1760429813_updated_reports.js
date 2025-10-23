/// <reference path="../pb_data/types.d.ts" />
// ФИНАЛЬНЫЙ ЧИСТЫЙ КОД: Добавление поля email.

migrate((db) => {
  // --- ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ: Явное объявление классов ---
  // Это обходит проблему, когда классы неявно не объявляются в области видимости.
  const Dao = (typeof Dao !== 'undefined' ? Dao : null);
  const Field = (typeof Field !== 'undefined' ? Field : null);

  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943"); // reports collection ID

  // --- UP: Добавление поля 'email' ---
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

  return dao.saveCollection(collection);
}, (db) => {
  // --- ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ: Явное объявление классов ---
  const Dao = (typeof Dao !== 'undefined' ? Dao : null);
  
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943"); // reports collection ID

  // --- DOWN: Удаление поля 'email' ---
  collection.schema.removeField("email3885137012");

  return dao.saveCollection(collection);
})
