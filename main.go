package mainpackage mainpackage main

import (
	"log"
	"github.com/pocketbase/pocketbase"
	
	// ЭТА СТРОКА РЕГИСТРИРУЕТ ВАШИ МИГРАЦИИ
	// (Используем имя вашего модуля 'pocketbase')
	_ "pocketbase/pb_migrations" 
)

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
