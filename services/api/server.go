package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"github.com/cdebotton/obscura/handler"
)



func main() {
	router := mux.NewRouter()

	router.Methods("GET").Path("/").HandlerFunc(handler.Index)

	log.Fatal(http.ListenAndServe(":3000", router))
}