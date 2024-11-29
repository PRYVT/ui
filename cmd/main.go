package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func main() {
	url := os.Getenv("HOST_URL")
	if url == "" {
		log.Fatal().Msg("HOST_URL is not set")
	}
	router := gin.Default()

	indexFunc := func(c *gin.Context) {
		content, err := os.ReadFile("../dist/index.html")
		if err != nil {
			c.String(http.StatusInternalServerError, "Error reading file")
			return
		}
		modifiedContent := strings.ReplaceAll(string(content), "/**{{envUrl-override}}**/", "window.envUrl='"+url+"'")
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(modifiedContent))
	}

	router.GET("/", indexFunc)
	router.GET("/index.html", indexFunc)
	router.Static("/assets", "../dist/assets")
	router.Run(":5518")
}
