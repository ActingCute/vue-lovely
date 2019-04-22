package helper

import (
	"runtime"
	"strings"
	"fmt"
	"github.com/astaxie/beego"
	"strconv"
	"os"
)

var (
	IsDebug = GetBool(GetAppConf("IsDebug"))
)

//error
func Error(err ... interface{}) bool {
	if err[0] != nil {
		_, files, line, ok := runtime.Caller(1)
		if !ok {
			fmt.Println(fmt.Errorf("Error : Cant not print!"))
			return true
		}
		fs := strings.Split(files, "/")
		file := ""
		file = fs[0]
		if len(fs) > 2 {
			file = fs[len(fs)-2] + "/" + fs[len(fs)-1]
		}
		fileline := "[" + file + ":" + strconv.Itoa(line) + "]"
		go beego.Error(fileline, err, "\r\n")
		return true
	}
	return false
}

//debug
func Debug(debug ... interface{}) {
	if IsDebug {
		_, files, line, ok := runtime.Caller(1)
		if !ok {
			fmt.Println(fmt.Errorf("Error: Cant not print!"))
			return
		}
		fs := strings.Split(files, "/")
		file := ""
		file = fs[0]
		if len(fs) > 2 {
			file = fs[len(fs)-2] + "/" + fs[len(fs)-1]
		}
		fileline := "[" + file + ":" + strconv.Itoa(line) + "]"
		go beego.Debug(fileline, debug, "\r\n")
	}
}

//system

func IsExist(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil || os.IsExist(err)

}

// config
func GetAppConf(name string) string {
	return beego.AppConfig.String(name)
}

func GetBool(str string) bool {

	boolean := false

	if str == "1" || str == "true" {
		boolean = true
	}

	return boolean

}