package main

import (
	"log"
	"github.com/pocketbase/pocketbase"
	
	_ "./pb_migrations" 
)

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}


