module pocketbase

go 1.21

require (
	github.com/pocketbase/pocketbase v0.22.10
)
// ЭТА СТРОКА ГОВОРИТ GO: 'Замени удаленный путь на локальную папку'
replace pocketbase/pb_migrations => ./pb_migrations
