/// <reference path="../pb_data/types.d.ts" />
// Исправлено для использования db.saveCollection и dao.deleteCollection

migrate((db) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select3770387442",
        "maxSelect": 1,
        "name": "rep",
        "presentable": false,
        "required": false,
        "system": false,
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
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1843675174",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      // Autodate fields are handled automatically and usually not defined explicitly in schema creation
    ],
    "id": "pbc_1615648943",
    "indexes": [],
    "listRule": null,
    "name": "reports",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  // Правильный синтаксис для сохранения новой коллекции
  return db.saveCollection(collection);
}, (db) => {
  // Для операций удаления и поиска нужен DAO
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943");

  // Правильный синтаксис для удаления коллекции
  return dao.deleteCollection(collection);
})
