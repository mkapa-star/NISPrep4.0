/// <reference path="../pb_data/types.d.ts" />
// Исправлено: Структура миграции приведена к рабочему виду (используется 'schema' вместо 'fields').
// ВНИМАНИЕ: Используется универсальный синтаксис db.dao().saveCollection() для обхода ошибок совместимости версий.

migrate((db) => {
  // Правильный синтаксис для сохранения коллекции в PocketBase 0.22+
  const collection = new Collection({
    "id": "pbc_1615648943",
    "name": "reports",
    "type": "base",
    "system": false,
    // Удалены поля 'id', 'created', 'updated' и 'system' - PocketBase создает их сам
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {},
    // Используем 'schema' вместо 'fields'
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

  // !!! КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Используем db.dao().saveCollection для максимальной совместимости
  return db.dao().saveCollection(collection);
}, (db) => {
  // Для операций удаления и поиска нужен DAO
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pbc_1615648943");

  // Используем dao.deleteCollection для DOWN миграции
  return dao.deleteCollection(collection);
})
