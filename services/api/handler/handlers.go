package handler

import (
	"encoding/json"
	"net/http"
)

func writeJsonResponse(w http.ResponseWriter, bytes []byte) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Write(bytes)
}

func Index(w http.ResponseWriter, _ *http.Request) {
	bytes, err := json.Marshal("hello worlds!")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	writeJsonResponse(w, bytes)
}