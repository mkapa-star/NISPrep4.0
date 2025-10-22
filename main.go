package main

import (
	"log"
	"github.com/pocketbase/pocketbase"
	
	// Теперь Go знает, что это нужно заменить на локальную папку
	_ "pocketbase/pb_migrations"
)

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

