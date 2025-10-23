/// <reference path="../pb_data/types.d.ts" />
// Исправлено: Убрана любая ссылка на db.dao() в UP миграции.

migrate((db) => {
  // UP миграция (создание коллекции)
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

  // !!! КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Вызываем db.saveCollection напрямую, без db.dao()
  return db.saveCollection(collection);
}, (db) => {
  // DOWN миграция (удаление коллекции)
  // Для удаления коллекции требуется DAO
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943");

  // Используем dao.deleteCollection
  return dao.deleteCollection(collection);
})
