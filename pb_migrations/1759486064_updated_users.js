/// <reference path="../pb_data/types.d.ts" />
// ИСПРАВЛЕНО: Явное объявление глобальных классов Dao, Collection, и Field для устранения ReferenceError.

// Важно: Классы Collection, Field и Dao должны использоваться как глобальные переменные
// в контексте выполнения миграций PocketBase. Явно объявляем их.

migrate((db) => {
  // ЯВНОЕ ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ КЛАССОВ
  const Dao = global.Dao;
  const Collection = global.Collection;
  const Field = global.Field;
  
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");
  
  // КРИТИЧНО: Если коллекция users еще не создана (нет админа), пропускаем этот шаг.
  if (!collection) {
      console.log("Collection 'users' not found. Skipping migration.");
      return Promise.resolve();
  }

  // 1. Добавление поля 'klass'
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
  // ЯВНОЕ ОБЪЯВЛЕНИЕ ГЛОБАЛЬНЫХ КЛАССОВ
  const Dao = global.Dao;
  const Collection = global.Collection;
  const Field = global.Field;
    
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // КРИТИЧНО: Если коллекции users нет, пропускаем откат.
  if (!collection) {
      return Promise.resolve();
  }
  
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
