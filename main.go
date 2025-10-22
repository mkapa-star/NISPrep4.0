package main

import (
	"log"
	"github.com/pocketbase/pocketbase"
	
	// ОЧЕНЬ ВАЖНЫЙ ИМПОРТ: РЕГИСТРАЦИЯ ПАКЕТА МИГРАЦИЙ
	_ "github.com/mkapa-star/NISPrep4.0/pb_migrations" 
)

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
