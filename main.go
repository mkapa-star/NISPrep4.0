package mainpackage main

import (
	"log"
	"github.com/pocketbase/pocketbase"
	
	// ВАЖНАЯ СТРОКА: Регистрация миграций
	_ "./pb_migrations" // Используем относительный путь
)

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
