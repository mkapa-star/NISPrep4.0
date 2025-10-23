/// <reference path="../pb_data/types.d.ts" />
// КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Используем явное создание Dao в обеих функциях для обхода ошибок совместимости.

migrate((db) => {
  // UP миграция (создание коллекции)
  const dao = new Dao(db); // Явное создание DAO
  
  const collection = new Collection({
    "id": "pbc_1615648943",
    "name": "reports",
    "type": "base",
    "system": false,
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {},
    "schema": [
      {
        "system": false,
        "id": "select3770387442",
        "name": "rep",
        "type": "select",
        "options": {
          "maxSelect": 1,
          "values": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ]
        }
      },
      {
        "system": false,
        "id": "text1843675174",
        "name": "description",
        "type": "text",
        "options": {
          "max": 0,
          "min": 0,
          "pattern": ""
        }
      }
    ]
  });

  // !!! КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Используем dao.saveCollection
  return dao.saveCollection(collection);
}, (db) => {
  // DOWN миграция (удаление коллекции)
  // Для удаления коллекции требуется DAO
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943");

  // Используем dao.deleteCollection
  return dao.deleteCollection(collection);
})
