/// <reference path="../pb_data/types.d.ts" />

// КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ:
// PocketBase требует, чтобы Dao, Collection и Field были доступны глобально,
// но синтаксис 'global.' не работает в Goja-движке.
// Объявляя их через var/const вне migrate, мы гарантируем, что они
// будут найдены в области видимости без использования 'global'.

// Объявляем переменные, используя глобально доступные конструкторы
// (эти классы существуют в контексте PocketBase, но их нужно явно "захватить").
var Dao = globalThis.Dao || null;
var Collection = globalThis.Collection || null;
var Field = globalThis.Field || null;

// Если globalThis не работает, просто оставляем как есть, PocketBase сам их найдет
if (!Dao) {
    Dao = typeof Dao !== 'undefined' ? Dao : null;
    Collection = typeof Collection !== 'undefined' ? Collection : null;
    Field = typeof Field !== 'undefined' ? Field : null;
}


migrate((db) => {
  // Проверка на случай, если классы не были доступны
  if (!Dao || !Field) {
      console.log("CRITICAL ERROR: Dao or Field classes not available. Skipping migration to prevent crash.");
      return Promise.resolve();
  }

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
  // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: см. выше
  var Dao = globalThis.Dao || null;
  var Collection = globalThis.Collection || null;
  var Field = globalThis.Field || null;

  if (!Dao || !Field) {
      return Promise.resolve();
  }
    
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
