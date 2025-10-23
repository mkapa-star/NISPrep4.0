/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // add field
  collection.fields.add(new Field({
    "hidden": false,
    "id": "select3711652446",
    "maxSelect": 1,
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

  // update field (Note: using add instead of addAt is safer for migration scripts)
  const nameField = collection.schema.getById("text1579384326");
  if (nameField) {
      nameField.options.max = 255;
      nameField.options.min = 3;
      nameField.options.presentable = true;
  }

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

  // remove field
  collection.fields.removeById("select3711652446");

  // update field
  const nameField = collection.schema.getById("text1579384326");
  if (nameField) {
      nameField.options.max = 255;
      nameField.options.min = 0;
      nameField.options.presentable = false;
  }

  return dao.saveCollection(collection);
})
