package main

import (
	_ "lovely/routers"
	helper "lovely/helper"
	"github.com/astaxie/beego"
	"os"
	"fmt"
	"strings"
	"github.com/astaxie/beego/logs"
)

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	go initLog()
	beego.Run()
}

func initLog() {
	logpath := "./Log"
	if !helper.IsExist(logpath) {
		err := os.Mkdir(logpath, os.ModePerm)
		if helper.Error(err) {
			fmt.Println("Create logpath error:", logpath)
			return
		}
	}
	log_name := []string{"sql", "server"}
	for i, name := range log_name {
		ph := logpath + "/" + name + ".log"
		if !helper.IsExist(ph) {
			_, err := os.Create(ph)
			if helper.Error(err) {
				fmt.Println("Create log error:", name)
				continue
			}
		}

		if i == 1 {
			logFilePath := "{\"filename\":\"" + ph + "\",\"separate\":[\"error\", \"warning\", \"info\", \"debug\"]}"
			logFilePath = strings.Replace(logFilePath, "\\", "\\\\", -1)
			logFilePath = strings.Replace(logFilePath, "/", "\\\\", -1)
			beego.Debug(logFilePath)
			beego.SetLogger(logs.AdapterMultiFile, logFilePath)
		}
	}
	beego.SetLogFuncCall(false)
}